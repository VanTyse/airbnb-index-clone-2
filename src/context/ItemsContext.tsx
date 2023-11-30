"use client";

import { createContext, useReducer } from "react";
import { ItemType, ItemsAction, ItemsContextType } from "../lib/types";

const INITIAL_STATE: ItemType[] = [];

const getRandomImageurl = () => {
  const images = [
    "/assets/images/image-1.jpeg",
    "/assets/images/image-2.jpeg",
    "/assets/images/image-3.jpeg",
    "/assets/images/image-4.jpeg",
    "/assets/images/image-5.jpeg",
    "/assets/images/image-6.jpeg",
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
const getRandomDescription = () => {
  const desc = [
    "featured in the wall street journal",
    "3593 kilometeres away",
    "Designed by Pedro Cavaco",
    "Featured in Maison du Maroc",
    "Designed by Sonia Pena",
  ];

  const randomIndex = Math.floor(Math.random() * desc.length);
  return desc[randomIndex];
};
const getRandomDates = () => {
  const dates = [
    "Nov 10 - 15",
    "Nov 12 - 18",
    "Dec 1 - 7",
    "Nov 20 - 25",
    "Nov 17 - 25",
  ];

  const randomIndex = Math.floor(Math.random() * dates.length);
  return dates[randomIndex];
};

const reducer = (state: ItemType[], action: ItemsAction) => {
  if (action.type === "update" && action.payload) {
    const fullData = action.payload.map((item) => {
      const { images } = item;
      const myImages = images.map((image) => {
        return getRandomImageurl();
      });
      const shortDescription = getRandomDescription();
      const date = getRandomDates();

      return {
        ...item,
        images: myImages,
        shortDescription,
        dates: date,
      };
    });
    return [...fullData];
  }
  return state;
};

export const ItemsContext = createContext<ItemsContextType>({
  data: INITIAL_STATE,
});

export const ItemsContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <ItemsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
