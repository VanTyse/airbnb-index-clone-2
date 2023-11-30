"use client";

import { createContext, useReducer } from "react";
import { SearchAction, SearchContextType, SearchDetails } from "../lib/types";

const INITIAL_STATE: SearchDetails = {
  region: "flexible",
  time: {
    typeSelected: "dates",
    dates: [null, null],
    flexible: {
      type: "week",
      months: [],
    },
  },

  people: {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  },
};

const reducer = (
  state: SearchDetails,
  action:
    | SearchAction<"update_person">
    | SearchAction<"update_person--clear">
    | SearchAction<"update_time--timetype">
    | SearchAction<"update_time--flexible">
    | SearchAction<"update_time--dates">
    | SearchAction<"update_region">
    | SearchAction<"clear_all">
) => {
  if (action.type === "update_region" && action.payload) {
    return {
      ...state,
      region: action.payload.value,
    };
  }
  if (action.type === "update_person" && action.payload) {
    return {
      ...state,
      people: {
        ...state.people,
        [action.payload.person_type]: action.payload.value,
      },
    };
  }
  if (action.type === "update_person--clear") {
    return {
      ...state,
      people: {
        ...state.people,
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      },
    };
  }

  if (action.type === "update_time--timetype" && action.payload) {
    return {
      ...state,
      time: {
        ...state.time,
        typeSelected: action.payload.value,
      },
    };
  }

  if (action.type === "update_time--dates" && action.payload) {
    return {
      ...state,
      time: {
        ...state.time,
        dates: action.payload.value,
      },
    };
  }

  if (action.type === "update_time--flexible" && action.payload) {
    return {
      ...state,
      time: {
        ...state.time,
        flexible: {
          ...state.time.flexible,
          ...action.payload,
        },
      },
    };
  }

  if (action.type === "clear_all") {
    return INITIAL_STATE;
  }
  return state;
};

export const SearchContext = createContext<SearchContextType>({
  data: INITIAL_STATE,
});

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ data: state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
