import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const onGoogleLogin = async (response: any) => {
  try {
    const googleResponse = await axios.post(
      `
			${process.env.NEXT_PUBLIC_API_URL}googleLogin`,
      { credential: response.credential }
    );
    localStorage.setItem("qid", googleResponse.data.token);
  } catch (error) {
    console.error(error);
  }
};
