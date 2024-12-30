/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GoogleLogin from "@/components/auth/googleLogin";
import Login from "@/components/auth/login";
import { handleGoogleLogin } from "@/utils/googleLoginHanedle";

export default function LoginPage() {
  return (
    <div className="bg-white h-screen pt-[130px] bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {Login()}
      <GoogleLogin onGoogleLogin={handleGoogleLogin} />
    </div>
  );
}
