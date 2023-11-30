"use client";

import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import NavbarMobile from "../Navbar/NavbarMobile";
import SearchBarMobile from "../Searchbar/SearchBarMobile";

export default function HeaderMobile() {
  const [showSearchDetails, setShowSearchDetailsScreen] = useState(false);

  return (
    <header className="block md:hidden w-full pt-5 sticky top-0 left-0 shadow-md z-20 bg-white">
      <div
        className="flex gap-4 px-[5%] items-center"
        onClick={() => setShowSearchDetailsScreen(true)}
      >
        <SearchBarMobile />
        <div className="min-w-[36px] h-9 rounded-full flex items-center justify-center bg-white border border-vantyse-grey-text">
          <Icon name="SettingsIcon" color="black" />
        </div>
      </div>
      <NavbarMobile
        showSearch={showSearchDetails}
        closeSearch={() => setShowSearchDetailsScreen(false)}
      />
    </header>
  );
}
