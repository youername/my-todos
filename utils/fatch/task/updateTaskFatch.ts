import axios from "axios";

export const updateTaskFatch = async ({
  id,
  title,
  color,
  icon,
}: {
  id: number;
  title: string;
  color: string;
  icon: string;
}) => {
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}updateTask`,
      { id, title, color, icon },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    return response.data.withoutUser;
  }
};
