const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function (date: Date) {
  const month = date.getMonth();
  const d = date.getDate();

  return `${monthsShort[month]} ${d}`;
}
