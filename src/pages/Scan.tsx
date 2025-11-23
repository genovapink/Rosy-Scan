import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, MapPin, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Scan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please log in to scan trash");
      navigate("/auth");
      return;
    }
    setUser(session.user);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setScanning(true);
      }
    } catch (error) {
      toast.error("Failed to access camera. Please allow camera permissions.");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setScanning(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
      if (blob) {
        await processImage(blob);
      }
    }, "image/jpeg", 0.8);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImage(file);
    }
  };

  const processImage = async (imageBlob: Blob) => {
    if (!user) {
      toast.error("Please log in first");
      navigate("/auth");
      return;
    }

    setLoading(true);
    stopCamera();

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(",")[1];

        // Get location
        let location = null;
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        } catch (error) {
          console.log("Location not available");
        }

        // Call scan function
        const { data, error } = await supabase.functions.invoke("scan-trash", {
          body: {
            imageBase64: base64Data,
            location,
          },
        });

        if (error) throw error;

        setResult(data);
        toast.success(`Detected ${data.trashType}! +${data.points} points earned! 🎉`);
      };
    } catch (error: any) {
      console.error("Scan error:", error);
      toast.error(error.message || "Failed to scan trash");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 p-4">
        <div className="container mx-auto max-w-2xl py-12">
          <div className="bg-card rounded-3xl p-8 shadow-2xl border-2 border-primary/20 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground font-quicksand mb-2">Scan Complete!</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-sm text-muted-foreground font-quicksand">Trash Type</p>
                <p className="text-2xl font-bold text-foreground font-quicksand capitalize">{result.trashType}</p>
              </div>

              <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-4">
                <p className="text-sm text-muted-foreground font-quicksand">Points Earned</p>
                <p className="text-3xl font-bold text-foreground font-quicksand">+{result.points} 🌟</p>
              </div>

              {result.detections && result.detections.length > 0 && (
                <div className="bg-muted rounded-2xl p-4">
                  <p className="text-sm text-muted-foreground font-quicksand mb-2">Detected Items</p>
                  <div className="flex flex-wrap gap-2">
                    {result.detections.map((item: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-primary/20 rounded-full text-sm font-quicksand text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setResult(null);
                  navigate("/missions");
                }}
                className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary font-quicksand font-bold"
                size="lg"
              >
                View Missions
              </Button>
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                className="flex-1 rounded-full font-quicksand font-bold border-2"
                size="lg"
              >
                Scan Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 p-4">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-quicksand font-bold text-4xl md:text-5xl text-foreground mb-4">
            Scan Trash 📸
          </h1>
          <p className="font-quicksand text-lg text-muted-foreground">
            Use your camera or upload an image to identify trash and earn points
          </p>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
          {scanning ? (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-2xl bg-black"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex gap-3">
                <Button
                  onClick={captureImage}
                  disabled={loading}
                  className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary font-quicksand font-bold"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Capture
                    </>
                  )}
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="rounded-full font-quicksand font-bold border-2"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                <Camera className="w-24 h-24 text-muted-foreground" />
              </div>

              <div className="grid gap-3">
                <Button
                  onClick={startCamera}
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-primary to-secondary font-quicksand font-bold"
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Open Camera
                </Button>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  variant="outline"
                  className="w-full rounded-full font-quicksand font-bold border-2"
                  size="lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="bg-muted rounded-2xl p-4 mt-6">
                <p className="text-sm text-muted-foreground font-quicksand flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location permission helps us track your eco impact
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-6 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground font-quicksand mt-2">
                Analyzing with AI...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;