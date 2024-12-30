/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const handleGoogleLogin = async (response: any) => {
  try {
    const googleResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}google`,
      { credential: response.credential }
    );
    postMessage(googleResponse.data.message);
    // 로그인 성공 처리 (토큰 저장 등)
  } catch (error) {
    console.error(error);
    postMessage("Google login failed");
  }
};
