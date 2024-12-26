import axios from "axios";

export const removeTaskFatch = async ({ id }: { id: number }) => {
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}removeTask`,

      {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  }
};
