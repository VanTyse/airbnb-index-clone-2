"use client";

import Icon from "../../assets/icons/Icon";

export default function () {
  return (
    <div className="md:hidden flex gap-3 items-center w-full rounded-full shadow-vantyse-grey bg-white p-2 pt-3 border px-4">
      <Icon name="Lens" color="black" width={22} height={22} />
      <div>
        <h1 className="text-sm leading-3 text-black font-semibold">Anywhere</h1>
        <h2 className="text-xs">
          Any week &nbsp; <span className="text-lg">.</span> &nbsp; Add Guests
        </h2>
      </div>
    </div>
  );
}
