"use client";

import Icon from "../../assets/icons/Icon";

export default function () {
  return (
    <button className="p-2 px-3 rounded-full border border-vantyse-grey-2 flex gap-4 items-center hover:shadow-vantyse-grey">
      <MenuBar />
      <Icon name="AvatarIcon" width={32} height={34} />
    </button>
  );
}

const MenuBar = () => {
  return <img src="/assets/icons/menu-bar.svg" alt="menu bar" />;
};
