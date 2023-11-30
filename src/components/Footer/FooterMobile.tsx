"use client";

import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import Link from "next/link";
import {
  airbnbLinks,
  footerNavs,
  hostingLinks,
  supportLinks,
} from "../../lib/data";
import NavSlider from "../Sliders/NavSlider";

export default function ({
  footerItems,
}: {
  footerItems: { item: string; subItem: string }[];
}) {
  const [limit, setLimit] = useState(9);
  const [selectedNav, setSelectedNav] = useState(footerNavs[0]);
  return (
    <div className="md:hidden py-10 bg-vantyse-grey-3">
      <div className="border-b border-black/20 py-12 px-[5%]">
        <h1 className="text-black text-2xl font-medium mb-8">
          Inspiration for future Gateways
        </h1>
        <div className="mb-12 border-b border-black/20">
          <NavSlider hideButtons>
            {footerNavs.map((nav) => (
              <div
                className={`whitespace-nowrap py-3 font-semibold ${
                  nav === selectedNav && "border-b-2 border-black"
                }`}
                onClick={() => setSelectedNav(nav)}
                key={nav}
              >
                {nav}
              </div>
            ))}
          </NavSlider>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {footerItems.map((item, index) => {
            if (index < limit)
              return (
                <Link key={index} href={"#"}>
                  <h1 className="text-black font-medium">{item.item}</h1>
                  <h2 className="capitalize">{item.subItem}</h2>
                </Link>
              );
          })}
          <div
            className={`text-black font-semibold flex gap-2 items-center cursor-pointer ${
              limit >= 20 && "hidden"
            }`}
            onClick={() => setLimit(20)}
          >
            <Icon name="ChevronDown" />
            <span className="text-sm">Show more</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-b border-black/20 py-8 px-[5%] flex flex-col gap-6">
          <h1 className="text-black">Support</h1>
          <div className="flex flex-col gap-4">
            {supportLinks.map((supportLink) => (
              <Link key={supportLink} href={"#"}>
                <div>{supportLink}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-b border-black/20 py-8 px-[5%] flex flex-col gap-6">
          <h1 className="text-black">Hosting</h1>
          <div className="flex flex-col gap-4">
            {hostingLinks.map((hostingLink) => (
              <Link key={hostingLink} href={"#"}>
                <div>{hostingLink}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-b border-black/20 py-8 px-[5%] flex flex-col gap-6">
          <h1 className="text-black">Airbnb</h1>
          <div className="flex flex-col gap-4">
            {airbnbLinks.map((link) => (
              <Link key={link} href={"#"}>
                <div>{link}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className=" px-[5%] pt-8 flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <div className="flex gap-3 items-center">
            <Icon name="WorldIcon" color="black" />
            <span>English (US)</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>$</span>
            <span>USD</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>&copy; 2023 Airbnb, inc,</div>
          <div className="flex items-center gap-1">
            <Link href={"#"}>Terms</Link>{" "}
            <span className="">
              <Icon name="Dot" />
            </span>{" "}
            <Link href={"#"}>Sitemap</Link>
            <span className="">
              <Icon name="Dot" />
            </span>{" "}
            <Link href={"#"}>Privacy</Link>
          </div>
          <Link href={"#"}>Your privacy choices</Link>
        </div>
      </div>
    </div>
  );
}
