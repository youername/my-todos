"use client";
import resizeFile from "@/utils/resizeFile";
import { UserContext } from "@/utils/userContext";
import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

type InputDataType = {
  name: string;
  address: string;
  studentNum: string;
  photoBase64: string;
};

const UserInfo: React.FC = () => {
  const [resizedImage, setResizedImage] = useState<string>();
  const [profile, setProfile] = useState<string>();
  const ctx = useContext(UserContext);
  const [inputData, setInputData] = useState<InputDataType>({
    name: "",
    address: "",
    studentNum: "",
    photoBase64: "",
  });

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const image = await resizeFile(file);
        setResizedImage(image);
        setInputData((prev) => ({ ...prev, photoBase64: image }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("qid");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}updateUser`,
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setResizedImage(undefined);
        setProfile(inputData.photoBase64);
        console.log("Update successful:", response.data);
      } else {
        throw new Error("Failed to update user info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (ctx?.user) {
      setInputData({
        name: ctx.user.name || "",
        address: ctx.user.address || "",
        studentNum: ctx.user.studentNum || "",
        photoBase64: ctx.user.photoBase64 || "",
      });
      setProfile(ctx.user.photoBase64);
    }
  }, [ctx?.user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-220px)]">
      <div className="text-center text-[2rem] font-extrabold mt-12">
        Information
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 justify-center items-center text-slate-800">
          <div className="text-white">사용자정보</div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">이름</div>
              <input
                className="text-slate-800 w-[20rem]"
                type="text"
                name="name"
                value={inputData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">주소</div>
              <input
                className="text-slate-800 w-[20rem]"
                type="text"
                name="address"
                value={inputData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex gap-4">
              <div className="text-white">학생증 번호</div>
              <input
                className="text-slate-800 w-[20rem]"
                type="text"
                name="studentNum"
                value={inputData.studentNum}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {resizedImage ? (
            <div className="">
              <picture>
                <img src={resizedImage} alt="Resized preview" />
              </picture>
            </div>
          ) : (
            <picture>
              <img src={profile} alt="profile preview" />
            </picture>
          )}
          <div className="flex">
            <label htmlFor="file">
              <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                프로필 사진변경
              </div>
            </label>
            {resizedImage && (
              <button
                className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  setInputData((prev) => ({
                    ...prev,
                    photoBase64: profile || "",
                  }))
                }
              >
                복구
              </button>
            )}

            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
