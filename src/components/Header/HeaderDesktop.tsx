"use client";

import Icon from "../../assets/icons/Icon";
import useScroll from "../../custom_hooks/useScroll";
import Logo from "../Logo/Logo";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "../Searchbar/SearchBar";
import { useEffect, useMemo, useState } from "react";
import NavbarDesktop from "../Navbar/NavbarDesktop";

export default function HeaderDesktop({
  onHeightChange,
}: {
  onHeightChange: (height: 24 | 44) => void;
}) {
  const [forceShowLargeSearchBar, setForceShowLargeSearchBar] = useState(false);

  const { scrollOffset } = useScroll();

  const reduceHeaderHeight = useMemo(() => {
    if (forceShowLargeSearchBar) return false;
    return scrollOffset && +scrollOffset > 50 ? true : false;
  }, [scrollOffset, forceShowLargeSearchBar]);

  useEffect(() => {
    if (reduceHeaderHeight) onHeightChange(24);
    else onHeightChange(44);
  }, [reduceHeaderHeight]);

  return (
    <>
      <header
        className={`fixed hidden md:block z-20 bg-white ${
          reduceHeaderHeight
            ? "h-44"
            : forceShowLargeSearchBar
            ? "h-64 lg:h-44"
            : "h-80 lg:h-64"
        } w-full transition-all duration-[100ms] ease-out top-0 shadow left-0 px-[5%]`}
      >
        <div className="flex items-center justify-between py-4 z-50">
          <div className="lg:basis-1/4 w-fit">
            <Logo />
          </div>
          <SearchBar
            forceShowLargeBar={forceShowLargeSearchBar}
            setForceShowLargeBar={setForceShowLargeSearchBar}
          />

          <div className="basis-1/4 flex gap-3 items-center">
            <p className="text-black/90 font-semibold hover:bg-vantyse-grey-2 p-3 w-full rounded-full cursor-pointer whitespace-nowrap">
              Airbnb your home
            </p>
            <div className="hover:bg-vantyse-grey-2 p-3 rounded-full cursor-pointer">
              <Icon name="WorldIcon" />
            </div>
            <ProfileMenu />
          </div>
        </div>
        {!forceShowLargeSearchBar && (
          <div
            className={`absolute z-0 flex justify-center bottom-0 w-full left-0 border-y px-[5%]${
              reduceHeaderHeight ? "shadow-md" : ""
            }`}
          >
            <div
              className={`${
                reduceHeaderHeight ? "max-w-[90%]" : "max-w-[100%]"
              }`}
            >
              <NavbarDesktop />
            </div>
          </div>
        )}
      </header>
      {forceShowLargeSearchBar && (
        <div
          onClick={() => setForceShowLargeSearchBar(false)}
          className="min-w-[100dvw] min-h-[100dvh] bg-vantyse-grey-1 opacity-30 z-10 fixed top-44 left-0 md:block hidden"
        ></div>
      )}
    </>
  );
}
