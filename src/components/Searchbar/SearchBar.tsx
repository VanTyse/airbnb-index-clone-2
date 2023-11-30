"use client";

import SearchBarDesktop from "./SearchbarDesktop";
import SearchBarMobile from "./SearchBarMobile";

export default function SearchBar({
  forceShowLargeBar,
  setForceShowLargeBar,
}: {
  forceShowLargeBar: boolean;
  setForceShowLargeBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <SearchBarDesktop
        forceShowLargeBar={forceShowLargeBar}
        setForceShowLargeBar={setForceShowLargeBar}
      />
      <SearchBarMobile />
    </>
  );
}
