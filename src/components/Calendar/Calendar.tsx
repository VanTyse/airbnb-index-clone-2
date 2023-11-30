"use client";

import { useMemo, useEffect, useRef, useState } from "react";

type MyCalendarType = {
  currentMonth: number;
  currentYear: number;
  period: {
    start: Date | null;
    end: Date | null;
  };
  setPeriod: React.Dispatch<
    React.SetStateAction<{
      start: Date | null;
      end: Date | null;
    }>
  >;
  endDate: Date;
  startDate?: Date;
  visible: boolean;
  mode: "mobile" | "desktop";
  loadMoreDates?: () => void;
};

type YearType = {
  date: number;
  endDate: Date;
  currentMonth: number;
  startYear: number;
  currentYear: number;
  period: {
    start: Date | null;
    end: Date | null;
  };
  setPeriod: React.Dispatch<
    React.SetStateAction<{
      start: Date | null;
      end: Date | null;
    }>
  >;
  visible: boolean;
  mode: "mobile" | "desktop";
};

type MonthType = {
  date: number;
  endDate: Date;
  period: {
    start: Date | null;
    end: Date | null;
  };
  setPeriod: React.Dispatch<
    React.SetStateAction<{
      start: Date | null;
      end: Date | null;
    }>
  >;
  mode: "mobile" | "desktop";
};

type DayType = {
  date: number;
  endDate: Date;
  count: number;
  month: number;
  year: number;
  period: {
    start: Date | null;
    end: Date | null;
  };
  setPeriod: React.Dispatch<
    React.SetStateAction<{
      start: Date | null;
      end: Date | null;
    }>
  >;
};

const MyCalendar = ({
  currentMonth,
  currentYear,
  period,
  setPeriod,
  visible,
  startDate,
  endDate,
  mode,
  loadMoreDates,
}: MyCalendarType) => {
  const startYear = 2023;
  const _startDate = startDate || new Date(`${startYear}-01-01`);
  // const endDate = new Date(`${startYear + 1}-12-31`);

  const date = Date.parse(_startDate.toString());

  return (
    <>
      {
        <div
          className={`mx-auto md:w-[740px]  z-10 ${
            mode === "mobile"
              ? "block overflow-y-scroll overflow-x-hidden max-h-[calc(100%_-_110px)] pb-6"
              : "flex overflow-hidden"
          } gap-[40px]`}
        >
          <Year
            startYear={startYear}
            currentYear={currentYear}
            currentMonth={currentMonth}
            date={date}
            endDate={endDate}
            period={period}
            setPeriod={setPeriod}
            visible={visible}
            mode={mode}
          />
          <button
            className="w-full flex justify-center items-center border-2 border-black rounded-md mt-6
            p-3 text-black font-semibold"
            onClick={loadMoreDates}
          >
            Load More Dates
          </button>
        </div>
      }
    </>
  );
};

const Year = ({
  date,
  endDate,
  currentMonth,
  currentYear,
  startYear,
  period,
  setPeriod,
  visible,
  mode,
}: YearType) => {
  const _currentYear = new Date(date).getFullYear();
  const nextYearDate = new Date(`${_currentYear + 1}-01-01`);
  const nextYearDateMilliseconds = Date.parse(nextYearDate.toString());
  const endDateMilliseconds = Date.parse(endDate.toString());

  const yearContainerRef = useRef<HTMLDivElement>(null);
  const [yearContainerWidth, setYearContainerWidth] = useState(0);

  useEffect(() => {
    if (!yearContainerRef.current) return;
    const yearContainer = yearContainerRef.current;
    setYearContainerWidth(yearContainer.scrollWidth);
  }, [yearContainerRef.current, visible]);

  useEffect(() => {
    const listener = () =>
      setYearContainerWidth(yearContainerRef.current?.scrollWidth ?? 0);

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  const translate = useMemo(() => {
    const index = currentMonth + (currentYear - startYear) * 12;

    return index * 390;
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (mode === "mobile") return;
    document.documentElement.style.setProperty(
      "--translate-value",
      `${translate}px`
    );
  }, [translate, mode]);

  if (date > endDateMilliseconds) return null;
  return (
    <>
      <div
        style={{ minWidth: mode === "mobile" ? yearContainerWidth : 4640 }}
        className=""
        ref={yearContainerRef}
      >
        {/* <h1>{currentYear}</h1> */}
        <div
          style={{
            transform:
              mode !== "mobile"
                ? `translateX(calc(var(--translate-value) * -1))`
                : "",
          }}
          className={`flex ${
            mode === "mobile" && "flex-col"
          } flex-nowrap gap-[40px] md:w-[700px] transition-all`}
        >
          <Month
            date={date}
            endDate={endDate}
            period={period}
            setPeriod={setPeriod}
            mode={mode}
          />
        </div>
      </div>
      <Year
        date={nextYearDateMilliseconds}
        endDate={endDate}
        period={period}
        currentMonth={0}
        startYear={startYear}
        currentYear={currentYear}
        setPeriod={setPeriod}
        visible={visible}
        mode={mode}
      />
    </>
  );
};

const Month = ({ date, endDate, period, setPeriod, mode }: MonthType) => {
  const currentDate = new Date(date);
  const currentYear = currentDate.getFullYear();
  const currentMonth = new Date(date).getMonth();
  const nextMonthDate =
    currentMonth < 11
      ? new Date(`${currentYear}-${currentMonth + 2}-01`)
      : new Date(0);
  const nextMonthDateMilliseconds = Date.parse(nextMonthDate.toString());
  const endDateMilliseconds = Date.parse(endDate.toString());

  if (date > endDateMilliseconds) return null;

  if (currentMonth > 11 || currentYear === 1970) return null;
  return (
    <>
      <div className="w-full min-w-[50%]">
        <h2
          className={`${
            mode === "desktop" ? "text-center" : "text-left pl-[25px] text-base"
          } mb-2 font-semibold text-lg capitalize text-black`}
        >
          {months[currentMonth]} {currentYear}
        </h2>
        <div className="grid grid-cols-7 gap-y-1 max-w-[350px] mx-auto md:max-w-none md:mx-0 rounded-lg gap-0 [&>div]:p-4">
          {mode === "desktop" && (
            <>
              <div className="text-xs font-semibold text-center !px-0">S</div>
              <div className="text-xs font-semibold text-center !px-0">M</div>
              <div className="text-xs font-semibold text-center !px-0">T</div>
              <div className="text-xs font-semibold text-center !px-0">W</div>
              <div className="text-xs font-semibold text-center !px-0">T</div>
              <div className="text-xs font-semibold text-center !px-0">F</div>
              <div className="text-xs font-semibold text-center !px-0">S</div>
            </>
          )}
          <Day
            date={date}
            endDate={endDate}
            count={0}
            month={currentMonth}
            year={currentYear}
            setPeriod={setPeriod}
            period={period}
          />
        </div>
      </div>
      <Month
        date={nextMonthDateMilliseconds}
        endDate={endDate}
        period={period}
        setPeriod={setPeriod}
        mode={mode}
      />
    </>
  );
};

const Day = ({
  date,
  endDate,
  count,
  month,
  year,
  period,
  setPeriod,
}: DayType) => {
  const currentDate = new Date(date);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDayOfWeek = currentDate.getDay();
  const currentDay = currentDate.getDate();
  const newCount = count === 6 ? 0 : count + 1;
  const formatter = new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 })
    .format;

  const periodStart = period.start;
  const periodEnd = period.end;

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date
  ) => {
    e.stopPropagation();
    if (period.start === null) {
      setPeriod((period) => ({ ...period, start: date }));
    } else {
      if (date < period.start)
        return setPeriod((period) => ({ ...period, start: date }));
      if (isDatePeriodStart(date)) return setPeriod({ start: date, end: date });
      if (date > period.start)
        return setPeriod((period) => ({ ...period, end: date }));
    }
  };

  const isDatePeriodStart = (date: Date) => {
    if (!periodStart) return false;
    return (
      date.getDate() === periodStart.getDate() &&
      date.getMonth() === periodStart.getMonth() &&
      date.getFullYear() === periodStart.getFullYear()
    );
  };

  const isDatePeriodEnd = (date: Date) => {
    if (!periodEnd) return false;
    return (
      date.getDate() === periodEnd.getDate() &&
      date.getMonth() === periodEnd.getMonth() &&
      date.getFullYear() === periodEnd.getFullYear()
    );
  };

  const isDateBewteenStartandEnd = (date: Date) => {
    if (periodEnd === null) return false;
    return date > periodStart! && date < periodEnd! && !isDatePeriodEnd(date);
  };

  const isPeriodEndSunday = (date: Date) => {
    return isDatePeriodEnd(date) && date.getDay() === 0;
  };

  if (currentMonth > month || currentYear > year) return null;
  if (currentDayOfWeek !== count) {
    return (
      <>
        <div
        // className={`
        //       ${
        //         (isDateBewteenStartandEnd(currentDate) ||
        //           isDatePeriodEnd(currentDate)) &&
        //         "bg-[#e0e0e0] border-y border-[#fff] border-collapse"
        //       }
        //       `}
        ></div>
        {/*Used for the spaces at the start of the month view, 
                so that if Feb 1st is wenesday, sunday to tuesday is skipped*/}
        <Day
          date={date}
          endDate={endDate}
          count={count + 1}
          month={currentMonth}
          year={currentYear}
          period={period}
          setPeriod={setPeriod}
        />
      </>
    );
  }
  return (
    <>
      <div
        className={`px-5 h-[50px] aspect-square relative`}
        onClick={(e) => handleClick(e, currentDate)}
      >
        <div
          className={`
            absolute top-1/2 h-[50px] aspect-square left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm
            flex items-center justify-center z-10 text-black font-semibold hover:cursor-pointer 
            hover:rounded-full hover:border hover:border-vantyse-grey-1
            ${
              isDatePeriodStart(currentDate) &&
              " bg-black !text-white rounded-full"
            }
            ${
              isDatePeriodEnd(currentDate) &&
              "flex items-center justify-center bg-black !text-white rounded-full"
            }
            ${
              isDateBewteenStartandEnd(currentDate) &&
              `bg-[#e0e0e0] border-y !border-[#fff] border-collapse 
              hover:rounded-none hover:cursor-default hover:border-none`
            }
          `}
        >
          {formatter(currentDay)}
        </div>
        {isDatePeriodEnd(currentDate) && !isDatePeriodStart(currentDate) ? (
          isPeriodEndSunday(currentDate) ? (
            <div className="absolute top-0 left-0 rounded-r-full  h-[50px] border-y border-[#fff] aspect-square bg-[#e0e0e0]"></div>
          ) : (
            <div className="absolute top-0 -left-1/2 h-[50px] border-y border-[#fff] aspect-square bg-[#e0e0e0]"></div>
          )
        ) : null}

        {isDatePeriodStart(currentDate) &&
          period.end &&
          !isDatePeriodEnd(currentDate) && (
            <div className="absolute top-0 left-1/2 h-[50px] border-y border-[#fff] aspect-square bg-[#e0e0e0]"></div>
          )}
      </div>
      <Day
        date={date + 86400000}
        endDate={endDate}
        count={newCount}
        month={currentMonth}
        year={currentYear}
        period={period}
        setPeriod={setPeriod}
      />
    </>
  );
};

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export default MyCalendar;
