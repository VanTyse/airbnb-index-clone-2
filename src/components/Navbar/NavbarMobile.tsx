"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Icon from "../../assets/icons/Icon";
import Slider from "../Sliders/NavSlider";
import { SearchDetails, VisitType } from "../../lib/types";
import NavSlider from "../Sliders/NavSlider";
import { headerNavs, regions } from "../../lib/data";
import { SearchContext } from "../../context/SearchContext";
import MyCalendar from "../Calendar/Calendar";
import NumberSelctor from "../NumberSelector/NumberSelector";
import Link from "next/link";
import formatDate from "../../lib/utils/formatDate";

export default function ({
  showSearch,
  closeSearch,
}: {
  showSearch: boolean;
  closeSearch: () => void;
}) {
  const [selectedVisitOption, setSelectedVisitOption] =
    useState<VisitType>("stays");
  const { dispatch: searchDispatch } = useContext(SearchContext);
  const [navSelected, setNavSelected] = useState(0);

  const [selectedOption, setSelectedOption] = useState("region");

  const clearAll = () => {
    searchDispatch && searchDispatch({ type: "clear_all" });
  };

  return (
    <div className="block md:hidden gap-8 items-center pt-7">
      <Slider hideButtons>
        {headerNavs.map((nav, index) => (
          <div
            className={`flex flex-col gap-2 p-3 pt-0 ${
              navSelected === index && "border-b-[3px] pb-[9px] border-black"
            }`}
            onClick={() => setNavSelected(index)}
            key={index}
          >
            <img src={nav.icon} alt="" className="h-5 w-auto" />
            <span className="text-xs whitespace-nowrap">{nav.name}</span>
          </div>
        ))}
      </Slider>

      {showSearch && (
        <div className="fixed top-0 left-0 h-[100dvh] w-[100dvw] bg-vantyse-grey-3 px-[2.5%] pt-5">
          <div className="flex items-center mb-7">
            <div className="basis-1/4">
              <div
                className="w-7 h-7 rounded-full border-vantyse-grey-2 border flex items-center justify-center bg-white"
                onClick={closeSearch}
              >
                <Icon name="Close" color="black" />
              </div>
            </div>
            <div className="basis-1/2 flex justify-center items-center">
              <div className="flex ">
                <div
                  className={`p-2 border-b-2 ${
                    selectedVisitOption === "stays"
                      ? "border-black text-black font-semibold"
                      : ""
                  }`}
                  onClick={() => setSelectedVisitOption("stays")}
                >
                  Stays
                </div>
                <div
                  className={`p-2 border-b-2 ${
                    selectedVisitOption === "experiences"
                      ? "border-black text-black font-semibold"
                      : ""
                  }`}
                  onClick={() => setSelectedVisitOption("experiences")}
                >
                  Experiences
                </div>
              </div>
            </div>
            <div className="basis-1/4"></div>
          </div>
          <div className="flex flex-col gap-5">
            <Region
              expand={selectedOption === "region"}
              open={() => setSelectedOption("region")}
              setSelectedOption={setSelectedOption}
            />
            <Time
              expand={selectedOption === "time"}
              open={() => setSelectedOption("time")}
            />
            <People
              expand={selectedOption === "people"}
              open={() => setSelectedOption("people")}
            />
          </div>
          {selectedOption === "time" ? (
            <div className="absolute animate-enter-up left-0 z-10 bottom-0 bg-white w-full h-20 p-6 flex justify-between items-center border-t border-black">
              <div
                className="text-black font-bold underline text-lg"
                onClick={() => setSelectedOption("people")}
              >
                Skip
              </div>
              <button
                className="text-white bg-black p-3 rounded-lg w-36"
                onClick={() => setSelectedOption("people")}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="absolute animate-enter-up z-10 bottom-0 left-0 bg-white w-full h-20 p-6 flex justify-between items-center">
              <div
                className="text-black font-semibold text-lg underline"
                onClick={clearAll}
              >
                Clear all
              </div>
              <button
                className="text-white p-3 rounded-lg w-36 text-lg font-semibold
              bg-vantyse-primary flex  gap-4 items-center justify-center"
              >
                <Icon name="Lens" width={22} height={22} />
                Search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const Region = ({
  expand,
  open,
  setSelectedOption,
}: {
  expand: boolean;
  open: () => void;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data: searchData, dispatch: searchDispatch } =
    useContext(SearchContext);

  return (
    <div className="animate-enter-down">
      {expand ? (
        <div className="shadow-sm w-full bg-white rounded-2xl py-8 border">
          <div className="px-6">
            <h1 className="text-xl text-black font-bold mb-5">Where to?</h1>
            <div
              className="flex gap-2 justify-between items-center border border-vantyse-grey-text/40 
              rounded-xl px-3 mb-8 focus-within:border-black focus-within:border-2"
            >
              <Icon name="Lens" />
              <input
                id="region-input"
                type="text"
                defaultValue={
                  regions.find((r) => r.region === searchData.region)?.label
                }
                className="p-3 w-full block rounded-xl font-semibold focus:outline-none"
                placeholder="search destinations"
              />
            </div>
          </div>
          <NavSlider hideButtons>
            {regions.map((regionObj) => {
              return (
                <div
                  className="first-of-type:pl-6"
                  onClick={() => {
                    searchDispatch &&
                      searchDispatch({
                        type: "update_region",
                        payload: { value: regionObj.region },
                      });
                    setSelectedOption("time");
                  }}
                  key={regionObj.region}
                >
                  <img
                    src={regionObj.image}
                    alt=""
                    className={`block mb-2 border ${
                      searchData.region === regionObj.region && "border-black"
                    } min-w-[7rem] rounded-lg`}
                  />
                  <p className="whitespace-nowrap text-sm">{regionObj.label}</p>
                </div>
              );
            })}
          </NavSlider>
        </div>
      ) : (
        <div
          className="shadow-sm w-full flex justify-between items-center bg-white rounded-2xl p-4 py-6 border"
          onClick={open}
        >
          <h1>Where</h1>
          <h3 className="font-medium">
            {searchData.region === "flexible" ? (
              "I'm flexible"
            ) : (
              <span className="font-semibold text-black">
                {regions.find((r) => r.region === searchData.region)?.label}
              </span>
            )}
          </h3>
        </div>
      )}
    </div>
  );
};

const Time = ({ expand, open }: { expand: boolean; open: () => void }) => {
  const { dispatch: searchDispatch, data: searchData } =
    useContext(SearchContext);

  const timeTypeSelected = useMemo(() => {
    return searchData.time.typeSelected;
  }, [searchData]);

  const [showMoreMonthsCount, setShowMoreMonthsCount] = useState(1);
  const todaysMonth = new Date().getMonth();
  const todaysYear = new Date().getFullYear();
  const startDate = new Date(`${todaysYear}-${todaysMonth + 1}-01`);

  const endDate = useMemo(() => {
    const eYear =
      Math.floor((showMoreMonthsCount * 4 + todaysMonth) / 12) + todaysYear;

    const eMonth = (showMoreMonthsCount * 4 + todaysMonth) % 12;

    const N =
      Date.parse(new Date(`${eYear}-${eMonth + 1}-01`).toString()) - 86400000;

    return new Date(N);
  }, [showMoreMonthsCount, startDate]);

  const [currentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [period, setPeriod] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: searchData.time.dates[0],
    end: searchData.time.dates[1],
  });

  const setTimeTypeSelected = (typeSelected: "dates" | "flexible") => {
    searchDispatch &&
      searchDispatch({
        type: "update_time--timetype",
        payload: { value: typeSelected },
      });
  };

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

  return (
    <div onClick={open} className="animate-enter-down">
      {expand ? (
        <div className="shadow-sm w-full bg-white rounded-t-2xl py-8 p-6 border h-[calc(100dvh-263px)]">
          <h1 className="text-xl text-black font-bold mb-5">
            When's your trip?
          </h1>
          <div className="flex gap-2 items-center bg-vantyse-grey-3 w-fit p-1 rounded-full mx-auto">
            <div
              className={`w-20 p-1 py-1.5 rounded-full ${
                timeTypeSelected === "dates" &&
                "border border-vantyse-grey-2 text-black bg-white"
              } text-sm font-semibold text-center cursor-pointer`}
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
          <div>
            <div className="grid grid-cols-7 gap-y-1 max-w-[350px] mx-auto md:max-w-none md:mx-0 rounded-lg gap-0 [&>div]:p-4">
              <div className="text-xs font-semibold text-center !px-0">S</div>
              <div className="text-xs font-semibold text-center !px-0">M</div>
              <div className="text-xs font-semibold text-center !px-0">T</div>
              <div className="text-xs font-semibold text-center !px-0">W</div>
              <div className="text-xs font-semibold text-center !px-0">T</div>
              <div className="text-xs font-semibold text-center !px-0">F</div>
              <div className="text-xs font-semibold text-center !px-0">S</div>
            </div>
          </div>
          <MyCalendar
            currentMonth={currentMonth}
            currentYear={currentYear}
            period={period}
            setPeriod={setPeriod}
            visible={true}
            startDate={startDate}
            endDate={endDate}
            mode={"mobile"}
            loadMoreDates={() => setShowMoreMonthsCount((x) => x + 1)}
          />
        </div>
      ) : (
        <div className="shadow-sm w-full flex justify-between items-center bg-white rounded-2xl p-6 border">
          <h1>When</h1>
          <h3 className="font-medium">
            {searchData.time.dates[0]
              ? `${formatDate(searchData.time.dates[0])} ${
                  searchData.time.dates[1] &&
                  searchData.time.dates[1] !== searchData.time.dates[0]
                    ? `- ${formatDate(searchData.time.dates[1])}`
                    : ""
                }`
              : "Add dates"}
          </h3>
        </div>
      )}
    </div>
  );
};

const People = ({ expand, open }: { expand: boolean; open: () => void }) => {
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
    <div onClick={open} className="animate-enter-down">
      {expand ? (
        <div className="shadow-sm w-fulljustify-between items-center bg-white rounded-2xl p-6 border">
          <h1 className="text-xl text-black font-bold mb-5">Who's coming?</h1>
          <div>
            <div className="flex items-center justify-between pb-6 border-b">
              <div>
                <h1 className="font-semibold text-black">Adults</h1>
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
                <h1 className="font-semibold text-black">Children</h1>
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
                <h1 className="font-semibold text-black">Infants</h1>
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
                <h1 className="font-semibold text-black">Pets</h1>
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
        </div>
      ) : (
        <div className="shadow-sm w-full flex justify-between items-center bg-white rounded-2xl p-6 border">
          <h1>Who</h1>
          {searchData.people.adults
            ? `${searchData.people.adults + searchData.people.children} guest${
                searchData.people.adults + searchData.people.children === 1
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
        </div>
      )}
    </div>
  );
};
