"use client";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

export default function Header({
  onHeightChange,
}: {
  onHeightChange: (height: 24 | 44) => void;
}) {
  return (
    <>
      <HeaderDesktop onHeightChange={onHeightChange} />
      <HeaderMobile />
    </>
  );
}
