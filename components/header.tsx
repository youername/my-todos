"use client";

import React, { useContext } from "react";
import { UserContext } from "@/utils/userContext";
import DropdownMenu, { MenuType } from "@/components/dropdownMenu";

const Header: React.FC = ({}) => {
  const userData = useContext(UserContext);

  const mainColor = "#750314";

  console.log(userData);

  return (
    <div className="relative h-[5rem] ">
      <div className="mx-auto h-full flex items-center">
        <div className="mx-8 text-3xl font-extrabold"></div>
        <div className="mx-8 whitespace-nowrap">
          <div>
            <DropdownMenu menu={userMenu} bgColor={mainColor}>
              <div className="text-xl">{userData?.user?.name}</div>
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
