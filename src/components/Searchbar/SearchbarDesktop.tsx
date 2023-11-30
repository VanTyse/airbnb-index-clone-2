"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Icon from "../../assets/icons/Icon";
import { VISIT_OPTIONS, months, regions } from "../../lib/data";
import { VisitType, SVGPropTypes, month, SearchDetails } from "../../lib/types";
import useScroll from "../../custom_hooks/useScroll";
import { SearchContext } from "../../context/SearchContext";
import NumberSelctor from "../NumberSelector/NumberSelector";
import Calendar from "../Calendar/Calendar";
import NavSlider from "../Sliders/NavSlider";
import formatDate from "../../lib/utils/formatDate";
import Link from "next/link";

type LargeBarType = {
  selectedVisitOption: VisitType;
  setSelectedVisitOption: React.Dispatch<React.SetStateAction<VisitType>>;
  hideBar: boolean;
  forceShowBar: boolean;
};

type SmallBarType = {
  selectedVisitOption: VisitType;
  setSelectedVisitOption: React.Dispatch<React.SetStateAction<VisitType>>;
  showBar: boolean;
  forceHideBar: boolean;
  setForceShowLargeBar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBarDesktop({
  forceShowLargeBar,
  setForceShowLargeBar,
}: {
  forceShowLargeBar: boolean;
  setForceShowLargeBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedVisitOption, setSelectedVisitOption] =
    useState<VisitType>("stays");

  const { scrollOffset } = useScroll();

  const hideLargeBar = useMemo(() => {
    if (forceShowLargeBar) return false;
    return scrollOffset && +scrollOffset > 50 ? true : false;
  }, [forceShowLargeBar, scrollOffset]);

  const showSmallBar = hideLargeBar;
  const forceHideSmallBar = forceShowLargeBar;

  return (
    <div className="hidden md:block z-20">
      <LargeBar
        hideBar={hideLargeBar}
        selectedVisitOption={selectedVisitOption}
        setSelectedVisitOption={setSelectedVisitOption}
        forceShowBar={forceShowLargeBar}
      />
      <SmallBar
        showBar={showSmallBar}
        selectedVisitOption={selectedVisitOption}
        setSelectedVisitOption={setSelectedVisitOption}
        forceHideBar={forceHideSmallBar}
        setForceShowLargeBar={setForceShowLargeBar}
      />
    </div>
  );
}

const LargeBar = ({
  selectedVisitOption,
  setSelectedVisitOption,
  hideBar,
}: LargeBarType) => {
  const { data: searchData, dispatch: searchDispatch } =
    useContext(SearchContext);

  const [searchDetailToShow, setSearchDetailToShow] = useState<
    "region" | "people" | "date1" | "date2" | "date3" | "date4" | null
  >(null);

  const timeTypeSelected = useMemo(() => {
    return searchData.time.typeSelected;
  }, [searchData]);

  // here I make sure that the calendar is still visible even when flexible is selected and that the 'date4' type of div is used below

  useEffect(() => {
    if (timeTypeSelected === "flexible")
      return setSearchDetailToShow((prev) =>
        prev?.startsWith("date") ? "date4" : null
      );
    else {
      setSearchDetailToShow((prev) =>
        prev?.startsWith("date")
          ? !searchData.time.dates[0]
            ? "date1"
            : "date2"
          : null
      );
    }
  }, [searchData.time.typeSelected]);

  const showSearchDetail = (
    detail: "region" | "people" | "date1" | "date2" | "date3" | "date4"
  ) => setSearchDetailToShow(detail);

  const clearDates = (type: (1 | 2)[]) => {
    const currentStartDate = searchData.time.dates[0];
    const value: [Date | null, Date | null] = type.includes(1)
      ? [null, null]
      : [currentStartDate, null];

    searchDispatch &&
      searchDispatch({
        type: "update_time--dates",
        payload: { value },
      });
  };

  useEffect(() => {
    const listener = () => setSearchDetailToShow(null);
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, []);

  useEffect(() => {
    if (searchData.time.typeSelected === "flexible") return;
    if (searchData.region !== "flexible") {
      if (selectedVisitOption === "stays") {
        if (!searchData.time.dates[0])
          return setSearchDetailToShow((prev) =>
            prev?.startsWith("people") ? "date1" : null
          );
        if (!searchData.time.dates[1])
          return setSearchDetailToShow((prev) =>
            prev?.startsWith("date") ? "date2" : null
          );
      }

      if (selectedVisitOption === "experiences") {
        if (!searchData.time.dates[0] || !searchData.time.dates[1])
          return setSearchDetailToShow((prev) =>
            prev?.startsWith("date") ? "date3" : null
          );
      }

      setSearchDetailToShow("people");
    }
  }, [searchData.region]);

  useEffect(() => {
    if (searchData.time.typeSelected !== "flexible") {
      if (selectedVisitOption === "stays") {
        if (!searchData.time.dates[0]) {
          return setSearchDetailToShow((prev) =>
            prev?.startsWith("date") ? "date1" : null
          );
        }

        if (!searchData.time.dates[1])
          return setSearchDetailToShow((prev) => {
            if (prev?.startsWith("date")) return "date2";
            else return null;
          });
      }

      if (selectedVisitOption === "experiences") {
        if (!searchData.time.dates[0] || !searchData.time.dates[1])
          return setSearchDetailToShow((prev) =>
            prev?.startsWith("date") ? "date3" : null
          );
      }

      // setSearchDetailToShow("date2");
      // setSearchDetailToShow("people");
    }
  }, [searchData.time]);

  return (
    <div
      className={`absolute z-20 transition-all ease-out duration-[400ms] ${
        hideBar && "scale-50 -translate-y-[40px] !opacity-0 max-h-0"
      } left-1/2 -translate-x-1/2 top-24 lg:top-7 w-full max-w-[90%] lg:max-w-[60%] opacity-100`}
    >
      <div className="basis-1/2 flex justify-center mb-6">
        <div className="flex gap-10 items-center">
          {VISIT_OPTIONS.map((option) => (
            <div
              className={`text-vantyse-grey-text capitalize hover:text-vantyse-grey-1 hover:cursor-pointer ${
                selectedVisitOption === option &&
                "text-vantyse-grey-1 font-semibold "
              }`}
              onClick={() => setSelectedVisitOption(option)}
              key={option}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full rounded-full flex gap-1 border border-vantyse-grey-2 ${
          !hideBar && "shadow-vantyse-grey"
        }   ${searchDetailToShow ? "bg-vantyse-grey-3" : "bg-white"}`}
      >
        <div
          className={`group basis-1/3 cursor-pointer rounded-full py-3.5 pl-8 text-left 
          ${
            searchDetailToShow === "region"
              ? "bg-white shadow-vantyse-search-btn"
              : "hover:bg-vantyse-grey-2"
          }
          `}
          onClick={() => showSearchDetail("region")}
        >
          <div>
            <h1 className="text-xs font-semibold text-vantyse-grey-1">Where</h1>
            <h3 className="text-sm text-vantyse-grey-text whitespace-nowrap">
              {searchData.region === "flexible" ? (
                "Search destinations"
              ) : (
                <span className="font-semibold text-black">
                  {searchData.region}
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="basis-1/3 flex gap-1">
          {selectedVisitOption !== "experiences" ? (
            timeTypeSelected === "flexible" ? (
              <div
                className={`group w-full ${
                  searchDetailToShow === "date4"
                    ? "bg-white shadow-vantyse-search-btn"
                    : "hover:bg-vantyse-grey-2"
                } hover:cursor-pointer rounded-full py-3.5 text-left`}
                onClick={() => showSearchDetail("date4")}
              >
                <div
                  className={`border-x border-vantyse-grey-1/20 group-hover:border-none ${
                    searchDetailToShow === "date4" && "border-none"
                  } px-8 w-full`}
                >
                  <h1 className="text-xs font-semibold text-vantyse-grey-1">
                    When
                  </h1>
                  <h3
                    className={`text-sm text-black capitalize font-semibold max-w-[95%] truncate whitespace-nowrap`}
                  >
                    {searchData.time.flexible.type
                      ? `${
                          searchData.time.flexible.months.length === 0
                            ? `Any`
                            : ""
                        }  ${searchData.time.flexible.type} ${
                          searchData.time.flexible.months.length > 0
                            ? `in ${searchData.time.flexible.months
                                .filter((m, index) => {
                                  if (index > 1000) return m; //I only did this so that site will build
                                  return index < 4 ? true : false;
                                })
                                .map((month) => month.slice(0, 3))
                                .join(", ")} ${
                                searchData.time.flexible.months.length > 4
                                  ? "..."
                                  : ""
                              }`
                            : ""
                        }`
                      : ""}
                  </h3>
                </div>
              </div>
            ) : (
              <>
                <button
                  className={`basis-1/2 group ${
                    searchDetailToShow === "date1"
                      ? "bg-white shadow-vantyse-search-btn f"
                      : "hover:bg-vantyse-grey-2"
                  } rounded-full py-3.5 text-left`}
                  onClick={() => showSearchDetail("date1")}
                >
                  <div
                    className={`border-x border-vantyse-grey-1/20 group-hover:border-none ${
                      searchDetailToShow === "date1" && "border-none"
                    } px-8 flex justify-between items-center`}
                  >
                    <div>
                      <h1 className="text-xs font-semibold text-vantyse-grey-1 whitespace-nowrap">
                        Check in
                      </h1>
                      <h3 className="text-sm text-vantyse-grey-text whitespace-nowrap">
                        {searchData.time.dates[0]
                          ? formatDate(searchData.time.dates[0])
                          : "Add dates"}
                      </h3>
                    </div>
                    {searchDetailToShow === "date1" &&
                    searchData.time.dates[0] ? (
                      <div onClick={() => clearDates([1, 2])}>
                        <Icon
                          name="Close"
                          color="black"
                          width={13}
                          height={13}
                        />
                      </div>
                    ) : null}
                  </div>
                </button>
                <button
                  className={`basis-1/2 group ${
                    searchDetailToShow === "date2"
                      ? "bg-white shadow-vantyse-search-btn"
                      : "hover:bg-vantyse-grey-2"
                  } rounded-full py-3.5 text-left`}
                  onClick={() => showSearchDetail("date2")}
                >
                  <div
                    className={`border-r border-vantyse-grey-1/20 group-hover:border-none px-8 ${
                      searchDetailToShow === "date2" && "border-none"
                    } flex items-center justify-between`}
                  >
                    <div>
                      <h1 className="text-xs font-semibold text-vantyse-grey-text whitespace-nowrap">
                        Check out
                      </h1>
                      <h3 className="text-sm text-vantyse-grey-text whitespace-nowrap">
                        {searchData.time.dates[1]
                          ? formatDate(searchData.time.dates[1])
                          : "Add dates"}
                      </h3>
                    </div>
                    {searchDetailToShow === "date2" &&
                    searchData.time.dates[1] ? (
                      <div onClick={() => clearDates([2])}>
                        <Icon
                          name="Close"
                          color="black"
                          width={13}
                          height={13}
                        />
                      </div>
                    ) : null}
                  </div>
                </button>
              </>
            )
          ) : (
            <div
              className={`group w-full ${
                searchDetailToShow === "date3"
                  ? "bg-white shadow-vantyse-search-btn"
                  : "hover:bg-vantyse-grey-2"
              } hover:cursor-pointer rounded-full py-3.5 text-left`}
              onClick={() => showSearchDetail("date3")}
            >
              <div
                className={`border-x border-vantyse-grey-1/20 group-hover:border-none ${
                  searchDetailToShow === "date3" && "border-none"
                } px-8 w-full`}
              >
                <h1 className="text-xs font-semibold text-vantyse-grey-1 whitespace-nowrap">
                  Date
                </h1>
                <h3 className="text-sm text-black whitespace-nowrap">
                  {searchData.time.dates[0]
                    ? `${formatDate(searchData.time.dates[0])} ${
                        searchData.time.dates[1] &&
                        searchData.time.dates[1] !== searchData.time.dates[0]
                          ? `to ${formatDate(searchData.time.dates[1])}`
                          : ""
                      }`
                    : "Add dates"}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="basis-1/3" onClick={() => showSearchDetail("people")}>
          <button
            className={`block w-full group hover:rounded-full py-3.5 text-left ${
              searchDetailToShow === "people"
                ? "bg-white shadow-vantyse-search-btn rounded-full"
                : "hover:bg-vantyse-grey-2"
            }`}
          >
            <div className="px-8">
              <h1 className="text-xs font-semibold text-vantyse-grey-1">Who</h1>
              <h3
                className={`text-sm max-w-[60%] truncate ${
                  !searchData.people.adults
                    ? "text-vantyse-grey-text"
                    : "text-black font-semibold"
                }`}
              >
                {searchData.people.adults
                  ? `${
                      searchData.people.adults + searchData.people.children
                    } guest${
                      searchData.people.adults + searchData.people.children ===
                      1
                        ? ""
                        : "s"
                    }${
                      searchData.people.infants
                        ? `, ${searchData.people.infants} infant${
                            searchData.people.infants === 1 ? "" : "s"
                          }`
                        : ""
                    }${
                      searchData.people.pets
                        ? `, ${searchData.people.pets} pet${
                            searchData.people.pets === 1 ? "" : "s"
                          }`
                        : ""
                    }`
                  : "Add guest"}
              </h3>
            </div>
          </button>
          <SearchCircle onClick={() => null} width={20} height={20} />
        </div>
      </div>
      <Regions show={searchDetailToShow === "region"} />
      <People show={searchDetailToShow === "people"} />
      <Dates
        show={
          searchDetailToShow === "date1" ||
          searchDetailToShow === "date2" ||
          searchDetailToShow === "date3" ||
          searchDetailToShow === "date4"
        }
      />
    </div>
  );
};

const SmallBar = ({ setForceShowLargeBar, showBar }: SmallBarType) => {
  return (
    <div
      className={`absolute z-50 left-1/3 lg:left-1/2 bg-white ${
        showBar ? "translate-y-0 opacity-100 delay-[250ms]" : "opacity-0 h-0"
      }
        top-4 lg:-translate-x-1/2 -translate-x-[calc(33%+60px)] transition-all w-full lg:max-w-[35%] lg:min-w-[450px] max-w-[45%] overflow-hidden rounded-full shadow-vantyse-grey`}
      onClick={(e) => {
        e.stopPropagation();
        setForceShowLargeBar(true);
      }}
    >
      <div className="relative w-full rounded-full flex gap-1 border border-vantyse-grey-2  shadow-vantyse-grey">
        <button className="group basis-1/3 rounded-full py-3.5 pl-8 text-left">
          <div>
            <h1 className="font-semibold text-vantyse-grey-1 w-[90%] truncate">
              Anywhere
            </h1>
          </div>
        </button>
        <div className="basis-1/3 flex gap-1">
          <button className=" py-3.5 text-left">
            <div className="border-x group-hover:border-none px-8">
              <h1 className="font-semibold text-vantyse-grey-1 w-[100%] truncate">
                Any week
              </h1>
            </div>
          </button>
        </div>
        <div className="basis-1/3">
          <button className="block w-full py-3.5 text-left">
            <div className="">
              <h3 className="text-vantyse-grey-text w-[90%] truncate">
                Add guests
              </h3>
            </div>
          </button>
          <SearchCircle
            onClick={() => null}
            className="min-w-7 h-10 justify-center items-center flex p-2 right-1"
            width={16}
            height={16}
            showText={false}
          />
        </div>
      </div>
    </div>
  );
};

const SearchCircle = ({
  height,
  width,
  className,
}: SVGPropTypes & {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  showText?: boolean;
}) => {
  return (
    <button
      className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-vantyse-primary text-white flex items-center gap-3 
      ${className}`}
    >
      <Icon name="Lens" width={width} height={height} color="white" />
      {/* {showText && (
        <p className={`font-semibold mr-1 lg:block hidden`}>Search</p>
      )} */}
    </button>
  );
};

const Regions = ({ show }: { show: boolean }) => {
  const { dispatch: searchDispatch } = useContext(SearchContext);
  return (
    <div
      className={`bg-white border rounded-3xl p-8 py-10 shadow-md w-1/2 mt-3.5 ${
        show ? "block" : "hidden"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-vantyse-grey-1 font-bold mb-9">Search by region</h1>
      <div className="grid grid-cols-3 gap-y-6 gap-x-4">
        {regions.map((regionObj) => {
          return (
            <div
              className="group hover:cursor-pointer"
              onClick={() =>
                searchDispatch &&
                searchDispatch({
                  type: "update_region",
                  payload: { value: regionObj.region },
                })
              }
              key={regionObj.region}
            >
              <img
                src={regionObj.image}
                alt=""
                className="block mb-2 border rounded-lg group-hover:border-vantyse-grey-1"
              />
              <p>{regionObj.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const People = ({ show }: { show: boolean }) => {
  const { data: searchData, dispatch: searchDispatch } =
    useContext(SearchContext);

  const onNumberChange = (
    person_type: keyof SearchDetails["people"],
    value: number
  ) => {
    if (person_type === "adults" && value === 0) {
      searchDispatch &&
        searchDispatch({
          type: "update_person--clear",
          payload: null,
        });
      return;
    }
    if (
      ((person_type === "children" && searchData.people.children === 0) ||
        (person_type === "infants" && searchData.people.infants === 0) ||
        (person_type === "pets" && searchData.people.pets === 0)) &&
      value > 0 &&
      searchData.people.adults === 0
    ) {
      searchDispatch &&
        searchDispatch({
          type: "update_person",
          payload: { person_type, value },
        });
      searchDispatch &&
        searchDispatch({
          type: "update_person",
          payload: { person_type: "adults", value: 1 },
        });
      return;
    }
    searchDispatch &&
      searchDispatch({
        type: "update_person",
        payload: { person_type, value },
      });
  };
  return (
    <div
      className={`absolute z-10 right-0 border bg-white rounded-3xl p-8 py-10 shadow-md w-1/2 translate-y-[13.5px] ${
        show ? "block" : "hidden"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between pb-6 border-b">
        <div>
          <h1 className="font-semibold text-vantyse-grey-1">Adults</h1>
          <h3>Ages 13 and above</h3>
        </div>
        <div>
          <NumberSelctor
            value={searchData.people.adults}
            onChange={(value) => onNumberChange("adults", value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-6 border-b">
        <div>
          <h1 className="font-semibold text-vantyse-grey-1">Children</h1>
          <h3>Ages 2 to 12</h3>
        </div>
        <div>
          <NumberSelctor
            value={searchData.people.children}
            onChange={(value) => onNumberChange("children", value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-6 border-b">
        <div>
          <h1 className="font-semibold text-vantyse-grey-1">Infants</h1>
          <h3>Under 2</h3>
        </div>
        <div>
          <NumberSelctor
            value={searchData.people.infants}
            onChange={(value) => onNumberChange("infants", value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-6">
        <div>
          <h1 className="font-semibold text-vantyse-grey-1">Pets</h1>
          <Link href={"#"} className="underline font-semibold">
            Bringing a service animal?
          </Link>
        </div>
        <div>
          <NumberSelctor
            value={searchData.people.pets}
            onChange={(value) => onNumberChange("pets", value)}
          />
        </div>
      </div>
    </div>
  );
};

const Dates = ({ show }: { show: boolean }) => {
  const { dispatch: searchDispatch, data: searchData } =
    useContext(SearchContext);

  const timeTypeSelected = useMemo(() => {
    return searchData.time.typeSelected;
  }, [searchData]);

  const setTimeTypeSelected = (typeSelected: "dates" | "flexible") => {
    searchDispatch &&
      searchDispatch({
        type: "update_time--timetype",
        payload: { value: typeSelected },
      });
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [period, setPeriod] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: searchData.time.dates[0],
    end: searchData.time.dates[1],
  });

  useEffect(() => {
    searchDispatch &&
      searchDispatch({
        type: "update_time--dates",
        payload: { value: [period.start, period.end] },
      });
  }, [period]);

  useEffect(() => {
    setPeriod({
      start: searchData.time.dates[0],
      end: searchData.time.dates[1],
    });
  }, [searchData.time.dates[0], searchData.time.dates[1]]);

  const prev = () => {
    console.log("prev;");

    if (currentMonth !== 0) setCurrentMonth((x) => x - 1);
    else {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    }
  };

  const next = () => {
    console.log("next;");
    if (currentMonth !== 11) setCurrentMonth((x) => x + 1);
    else {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    }
  };

  return (
    <div
      className={`absolute bg-white w-full translate-y-[13.5px] ${
        show ? "block" : "hidden"
      } rounded-3xl p-8 py-10 shadow-md border`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-2 items-center bg-vantyse-grey-3 w-fit p-1 rounded-full mx-auto">
        <div
          className={`w-20 p-1 py-1.5 rounded-full ${
            timeTypeSelected === "dates" &&
            "border border-vantyse-grey-2 text-black bg-white"
          } 
          text-sm font-semibold text-center cursor-pointer`}
          onClick={() => setTimeTypeSelected("dates")}
        >
          Dates
        </div>
        <div
          className={`w-20 p-1 py-1.5 rounded-full text-center ${
            timeTypeSelected === "flexible" &&
            "border border-vantyse-grey-2 text-black bg-white"
          }  text-black text-sm font-semibold cursor-pointer`}
          onClick={() => setTimeTypeSelected("flexible")}
        >
          Flexible
        </div>
      </div>
      {timeTypeSelected === "dates" && (
        <div className="relative">
          <div className="absolute flex justify-between mb-3 mt-2 w-full">
            <div className="w-4 cursor-pointer border z-10" onClick={prev}>
              <Icon name="ChevronLeft" />
            </div>

            <div className="w-5 cursor-pointer border z-10" onClick={next}>
              <Icon name="ChevronRight" />
            </div>
          </div>
          <Calendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            period={period}
            setPeriod={setPeriod}
            visible={show}
            endDate={new Date("2024-12-31")}
            mode="desktop"
          />
        </div>
      )}

      {timeTypeSelected === "flexible" && (
        <div className="relative">
          <FlexibleTimeType />
        </div>
      )}
    </div>
  );
};

const FlexibleTimeType = () => {
  const { dispatch: searchDispatch, data: searchData } =
    useContext(SearchContext);

  const onMonthClick = (month: month) => {
    const isAlreadyAdded = searchData.time.flexible.months.includes(month);
    const newMonths = isAlreadyAdded
      ? searchData.time.flexible.months.filter((m) => m !== month)
      : [...searchData.time.flexible.months, month];

    searchDispatch &&
      searchDispatch({
        type: "update_time--flexible",
        payload: {
          months: newMonths,
        },
      });
  };

  return (
    <div className="text-black mt-6">
      <h1 className="text-center font-semibold mb-5 text-lg">
        Stay for a {searchData.time.flexible.type}
      </h1>
      <div className="flex w-fit mx-auto gap-3 items-center">
        <div
          className={`p-1.5 px-3 text-center border border-vantyse-grey-2 ${
            searchData.time.flexible.type === "weekend" &&
            "bg-vantyse-grey-2 border-2"
          } text-black rounded-full cursor-pointer hover:border-vantyse-grey-text`}
          onClick={() =>
            searchDispatch &&
            searchDispatch({
              type: "update_time--flexible",
              payload: { type: "weekend" },
            })
          }
        >
          Weekend
        </div>
        <div
          className={`p-1.5 px-3 text-center border border-vantyse-grey-2 hover:border-vantyse-grey-text ${
            searchData.time.flexible.type === "week" &&
            "bg-vantyse-grey-2 border-2 border-vantyse-grey-text"
          } text-black rounded-full cursor-pointer hover:border-black`}
          onClick={() =>
            searchDispatch &&
            searchDispatch({
              type: "update_time--flexible",
              payload: { type: "week" },
            })
          }
        >
          Week
        </div>
        <div
          className={`p-1.5 px-3 text-center border ${
            searchData.time.flexible.type === "month" &&
            "bg-vantyse-grey-2 border-2"
          } border-vantyse-grey-2 text-black rounded-full cursor-pointer hover:border-vantyse-grey-text`}
          onClick={() =>
            searchDispatch &&
            searchDispatch({
              type: "update_time--flexible",
              payload: { type: "month" },
            })
          }
        >
          Month
        </div>
      </div>
      <h1 className="text-xl text-black font-semibold text-center mt-8 mb-4">
        {searchData.time.flexible.months.length === 0
          ? "Go anytime"
          : `Go in ${searchData.time.flexible.months
              .filter((month, index) => {
                if (index > 10000) return month;
                return index < 4 ? true : false;
              })
              .map((month) => {
                return month.charAt(0).toUpperCase() + month.slice(1);
              })
              .join(", ")}
            ${searchData.time.flexible.months.length > 3 ? "..." : ""}`}
      </h1>
      <NavSlider showSliderButtonsBg={false}>
        {months.map((month) => (
          <div
            key={month}
            className={`border hover:border-black cursor-pointer min-w-[8rem] h-36 
            ${searchData.time.flexible.months.includes(month) && "border-black"}
          rounded-xl flex flex-col gap-2 items-center justify-center`}
            onClick={() => onMonthClick(month)}
          >
            <div>
              {searchData.time.flexible.months.includes(month) ? (
                <Icon name="CalendarChecked" width={40} height={40} />
              ) : (
                <Icon name="calendar" width={40} height={40} />
              )}
            </div>
            <p className="capitalize text-vantyse-grey-text">{month}</p>
          </div>
        ))}
      </NavSlider>
    </div>
  );
};
