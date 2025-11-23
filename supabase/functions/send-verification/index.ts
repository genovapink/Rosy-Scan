import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { email, userId } = await req.json();

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save to profiles table
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        verification_code: verificationCode,
        verification_code_expires_at: expiresAt.toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Error saving verification code:", updateError);
      throw updateError;
    }

    // Send email
    const emailResponse = await resend.emails.send({
      from: "ROSY <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your ROSY Account 🌍",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { text-align: center; margin-bottom: 30px; }
              .logo { font-size: 32px; font-weight: bold; color: #A8E6CF; }
              .code-box { background: linear-gradient(135deg, #A8E6CF 0%, #89CFC5 100%); padding: 30px; border-radius: 15px; text-align: center; margin: 30px 0; }
              .code { font-size: 42px; font-weight: bold; color: #2C5F5D; letter-spacing: 8px; }
              .message { color: #666; line-height: 1.6; margin: 20px 0; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🌍 ROSY</div>
                <h1 style="color: #2C5F5D; margin: 10px 0;">Verify Your Account</h1>
              </div>
              
              <div class="message">
                <p>Hi there! 👋</p>
                <p>Thank you for joining ROSY! Use the verification code below to complete your registration:</p>
              </div>

              <div class="code-box">
                <div class="code">${verificationCode}</div>
              </div>

              <div class="message">
                <p>This code will expire in <strong>10 minutes</strong>.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>

              <div class="footer">
                <p>Help keep our world clean with ROSY! 🌱</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Verification code sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-verification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});