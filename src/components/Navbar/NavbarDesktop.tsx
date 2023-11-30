"use client";

import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import { headerNavs } from "../../lib/data";
import Slider from "../Sliders/NavSlider";
import { Switch } from "antd";

export default function NavbarDesktop() {
  const [navSelected, setNavSelected] = useState(0);
  return (
    <div className="flex gap-8 items-center">
      <div className="basis-3/4 max-w-[calc(100%-410px)]">
        <Slider>
          {headerNavs.map((nav, index) => (
            <div
              className={`flex flex-col gap-2 p-3 py-4 cursor-pointer hover:text-black ${
                navSelected === index && "border-b-[3px]  border-black"
              }`}
              onClick={() => setNavSelected(index)}
              key={index}
            >
              <img src={nav.icon} alt="" className="h-5 w-auto" />
              <span className="text-xs whitespace-nowrap">{nav.name}</span>
            </div>
          ))}
        </Slider>
      </div>
      <div className="basis-1/4 flex gap-4">
        <div className="p-3 border rounded-md flex gap-3 items-center">
          <Icon name="SettingsIcon" />
          <span>Filters</span>
        </div>
        <div className="p-3 border rounded-md flex gap-3 items-center">
          <span className="font-semibold whitespace-nowrap">
            Display total before taxes
          </span>
          <Switch className="bg-vantyse-grey-2" />
        </div>
      </div>
    </div>
  );
}
