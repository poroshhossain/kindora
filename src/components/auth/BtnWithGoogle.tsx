"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { GoogleIcon } from "./google-icon";

const BtnWithGoogle = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google login failed");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type="button"
      variant="outline"
      className="mt-4 w-full"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <GoogleIcon />}

      {loading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
};

export default BtnWithGoogle;
