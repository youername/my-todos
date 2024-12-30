/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginProps {
  onGoogleLogin: (response: any) => void;
}

const GoogleLogin = ({ onGoogleLogin }: GoogleLoginProps) => {
  useEffect(() => {
    const loadGoogleScript = () => {
      if (typeof window.google === "undefined") {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = initializeGoogleButton;
      } else {
        initializeGoogleButton();
      }
    };

    const initializeGoogleButton = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: onGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        { theme: "outline", size: "large", width: "270" }
      );
    };

    loadGoogleScript();
  }, [onGoogleLogin]);

  return (
    <div id="googleButton" className="w-full flex justify-center my-2">
      google login
    </div>
  );
};

export default GoogleLogin;
