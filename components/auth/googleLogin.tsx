/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserContext } from "@/utils/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginProps {
  onGoogleLogin: (response: any) => Promise<void>;
}

const GoogleLogin = ({ onGoogleLogin }: GoogleLoginProps) => {
  const [loading, setLoading] = useState(false);
  const userData = useContext(UserContext);
  const router = useRouter();
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

    const handleGoogleLogin = async (response: any) => {
      try {
        setLoading(true);
        await onGoogleLogin(response);
        await userData?.fetchUser(); // 사용자 정보 갱신
        router.push("/todos"); // 로그인 성공 후 이동
        setLoading(false);
      } catch (error) {
        console.error("Login failed:", error);
        setLoading(false);
      }
    };

    const initializeGoogleButton = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        {
          type: "icon", // 아이콘 타입으로 변경
          shape: "circle", // 원형 모양
          size: "large", // 크기
          theme: "outline", // 테두리 스타일
        }
      );
    };

    loadGoogleScript();
    userData?.fetchUser();
  }, [onGoogleLogin, userData, router]);

  return (
    <div className="w-64">
      {loading ? (
        <div className="spinner" />
      ) : (
        <div id="googleButton" className="w-full flex justify-center my-2">
          google login
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
