import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const googleApiKey = Deno.env.get("GOOGLE_CLOUD_API_KEY");

    if (!googleApiKey) {
      throw new Error("GOOGLE_CLOUD_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get auth token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify user
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { imageBase64, location } = await req.json();

    // Call Google Vision API
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${googleApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: [{
            image: { content: imageBase64 },
            features: [
              { type: "LABEL_DETECTION", maxResults: 10 },
              { type: "OBJECT_LOCALIZATION", maxResults: 5 }
            ]
          }]
        })
      }
    );

    const visionData = await visionResponse.json();
    
    if (!visionResponse.ok) {
      console.error("Vision API error:", visionData);
      throw new Error("Failed to analyze image with Google Vision API");
    }

    // Analyze labels to determine trash type
    const labels = visionData.responses[0]?.labelAnnotations || [];
    const objects = visionData.responses[0]?.localizedObjectAnnotations || [];
    
    const allDetections = [
      ...labels.map((l: any) => l.description.toLowerCase()),
      ...objects.map((o: any) => o.name.toLowerCase())
    ];

    console.log("Detected items:", allDetections);

    // Determine trash type and points
    let trashType = "general";
    let points = 5;

    if (allDetections.some(d => d.includes("plastic") || d.includes("bottle") || d.includes("container"))) {
      trashType = "plastic";
      points = 10;
    } else if (allDetections.some(d => d.includes("paper") || d.includes("cardboard") || d.includes("newspaper"))) {
      trashType = "paper";
      points = 8;
    } else if (allDetections.some(d => d.includes("metal") || d.includes("can") || d.includes("aluminum"))) {
      trashType = "metal";
      points = 12;
    } else if (allDetections.some(d => d.includes("glass") || d.includes("jar"))) {
      trashType = "glass";
      points = 15;
    } else if (allDetections.some(d => d.includes("organic") || d.includes("food") || d.includes("waste"))) {
      trashType = "organic";
      points = 7;
    }

    // Save to database
    const { data: scannedTrash, error: insertError } = await supabase
      .from("scanned_trash")
      .insert({
        user_id: user.id,
        trash_type: trashType,
        location_lat: location?.lat,
        location_lng: location?.lng,
        points_earned: points,
        verified: true,
        image_url: `data:image/jpeg;base64,${imageBase64.substring(0, 100)}...` // Store preview only
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    // Update user profile
    const { error: updateError } = await supabase.rpc("increment_user_stats", {
      user_id: user.id,
      points: points
    });

    if (updateError) {
      console.log("Update error (non-critical):", updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        trashType,
        points,
        detections: allDetections.slice(0, 5),
        scannedTrash
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in scan-trash function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});