"use client";

import Login from "@/components/auth/login";

export default function LoginPage() {
  return (
    <div className="bg-white h-screen pt-[130px] bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {Login()}
    </div>
  );
}
