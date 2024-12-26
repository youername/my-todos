import axios from "axios";

export const createTaskFatch = async ({
  title,
  color,
  icon,
}: {
  title: string;
  color: string;
  icon: string;
}) => {
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}createTask`,
      { title, color, icon },
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
