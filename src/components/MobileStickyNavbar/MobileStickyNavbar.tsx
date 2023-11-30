"use client";

import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import useScroll from "../../custom_hooks/useScroll";

export default function () {
  const [navSelected, setNavSelected] = useState("explore");
  const { scrollDirection } = useScroll();

  return (
    <div
      className={`fixed z-10 transition-all ease-out border-t ${
        scrollDirection === "up" ? "translate-y-0" : "translate-y-[4.4rem]"
      } lg:hidden w-full bottom-0 left-0 flex justify-center bg-white shadow-sm-top p-3`}
    >
      <div className="flex justify-between w-[60%]">
        <div
          className={`flex flex-col items-center gap-1 font-medium ${
            navSelected === "explore"
              ? "text-vantyse-primary"
              : "text-vantyse-grey-text"
          }`}
          onClick={() => setNavSelected("explore")}
        >
          <Icon name="Lens" width={20} height={20} />
          <span>Explore</span>
        </div>
        <div
          className={`flex flex-col gap-1 items-center font-medium ${
            navSelected === "wishlists"
              ? "text-vantyse-primary"
              : "text-vantyse-grey-text"
          }`}
          onClick={() => setNavSelected("wishlists")}
        >
          <Icon name="Heart" width={20} height={20} />
          <span>Wishists</span>
        </div>
        <div
          className={`flex flex-col gap-1 items-center font-medium ${
            navSelected === "log in"
              ? "text-vantyse-primary"
              : "text-vantyse-grey-text"
          }`}
          onClick={() => setNavSelected("log in")}
        >
          <Icon name="PersonCircle" width={20} height={20} />
          <span>Log in</span>
        </div>
      </div>
    </div>
  );
}
