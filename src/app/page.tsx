"use client";

import { useContext, useEffect, useState } from "react";
import "./globals.css";
import Header from "@/components/Header/Header";
import AmazingSpaces from "@/components/Items/AmazingSpaces";
import { ItemsContext } from "@/context/ItemsContext";
import { ItemType } from "@/lib/types";
import Footer from "@/components/Footer/Footer";
import MobileStickyNavbar from "@/components/MobileStickyNavbar/MobileStickyNavbar";

function App() {
  const [currentHeaderHeight, setCurrentHeaderHeight] = useState(44);
  const { dispatch: itemsDispatch } = useContext(ItemsContext);

  const fetchItems = async () => {
    const items = [] as ItemType[];

    if (items)
      itemsDispatch && itemsDispatch({ type: "update", payload: items });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="text-vantyse-grey-text">
      <Header onHeightChange={(height) => setCurrentHeaderHeight(height)} />
      <div
        className={`${
          currentHeaderHeight === 24 ? "md:pt-24" : "md:pt-44"
        } pt-0`}
      ></div>

      <div className={`max-w-[1375px] w-[90%] z-0 mx-auto md:pt-28 pt-10`}>
        <AmazingSpaces />
        <div className="mt-10 mx-auto w-fit"></div>
      </div>
      <MobileStickyNavbar />
      <Footer />
    </div>
  );
}

export default App;
