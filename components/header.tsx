"use client";

import React, { useContext } from "react";
import { UserContext } from "@/utils/userContext";
import DropdownMenu, { MenuType } from "@/components/dropdownMenu";

const Header: React.FC = ({}) => {
  const userData = useContext(UserContext);

  const mainColor = "#750314";

  console.log(userData);

  return (
    <div className="relative h-full mt-8">
      <div className="mx-auto h-full flex items-center justify-end">
        <div className="mx-8 text-3xl font-extrabold"></div>
        <div className="mx-8 whitespace-nowrap">
          <div>
            <DropdownMenu menu={userMenu} bgColor={mainColor}>
              <div className="flex gap-4">
                <div className="text-xl">{userData?.user?.name}</div>
                <picture>
                  <img
                    className="w-8 rounded-full"
                    src={userData?.user?.photoBase64}
                    alt="profile preview"
                  />
                </picture>
              </div>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const userMenu: MenuType[] = [
  { title: "Log out", func: "logout" },
  { title: "User Info", url: "/userInfo" },
];
