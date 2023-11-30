export interface SVGPropTypes {
  color?: string;
  width?: number;
  height?: number;
}

export type VisitType = "stays" | "experiences" | "online experiences";

export type region =
  | "flexible"
  | "africa"
  | "us"
  | "uk"
  | "middle-east"
  | "canada";

export type month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type SearchDetails = {
  region: region;
  time: {
    typeSelected: "dates" | "flexible";
    dates: [Date | null, Date | null];
    flexible: {
      type: "weekend" | "week" | "month";
      months: month[];
    };
  };

  people: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
};

type SearchActionType =
  | "update_person"
  | "clear_all"
  | "update_person--clear"
  | "update_time--timetype"
  | "update_time--dates"
  | "update_time--flexible"
  | "update_region";

export type SearchAction<T extends SearchActionType> = {
  type: T;
  payload?: T extends "update_person"
    ? {
        value: number;
        person_type: keyof SearchDetails["people"];
      }
    : T extends "update_person--clear"
    ? null
    : T extends "update_time--dates"
    ? {
        value: [Date | null, Date | null];
      }
    : T extends "update_time--timetype"
    ? {
        value: "dates" | "flexible";
      }
    : T extends "update_time--flexible"
    ? {
        months?: month[];
        type?: "weekend" | "week" | "month";
      }
    : T extends "update_region"
    ? {
        value: region;
      }
    : T extends "clear_all"
    ? null
    : unknown;
};

export type SearchContextType = {
  data: SearchDetails;
  dispatch?: React.Dispatch<
    | SearchAction<"update_time--timetype">
    | SearchAction<"update_person">
    | SearchAction<"update_person--clear">
    | SearchAction<"update_time--flexible">
    | SearchAction<"update_time--dates">
    | SearchAction<"update_region">
    | SearchAction<"clear_all">
  >;
};

export type ItemType = {
  images: string[];
  shortDescription: string;
  dates: string;
  location: string;
  rating: number;
  price: number;
};

export type ItemsAction = {
  type: string;
  payload: ItemType[];
};

export type ItemsContextType = {
  data: ItemType[];
  dispatch?: React.Dispatch<ItemsAction>;
};
