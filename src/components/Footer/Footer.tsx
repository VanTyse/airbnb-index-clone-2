"use client";

import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export default function () {
  const footerItems = [
    { item: "Adolfo Ruiz Cortines", subItem: "house rentals" },
    { item: "Abuochiche", subItem: "house rentals" },
    { item: "Krajan Joho", subItem: "vacation rentals" },
    { item: "Mullsjö", subItem: "vacation rentals" },
    { item: "Jixian", subItem: "vacation rentals" },
    { item: "Nynäshamn", subItem: "vacation rentals" },
    { item: "Gorshechnoye", subItem: "vacation rentals" },
    { item: "Cuchumbaya", subItem: "vacation rentals" },
    { item: "Porirua", subItem: "house rentals" },
    { item: "Beidong", subItem: "house rentals" },
    { item: "Leigongmiao", subItem: "house rentals" },
    { item: "Batugede Kulon", subItem: "vacation rentals" },
    { item: "Frederiksberg", subItem: "vacation rentals" },
    { item: "Seynod", subItem: "house rentals" },
    { item: "La Ferté-Bernard", subItem: "house rentals" },
    { item: "Tanbu", subItem: "house rentals" },
    { item: "Dongla", subItem: "house rentals" },
    { item: "Shenshan", subItem: "house rentals" },
    { item: "Fovissste", subItem: "vacation rentals" },
    { item: "Capandanan", subItem: "house rentals" },
    { item: "Abuochiche", subItem: "house rentals" },
    { item: "Krajan Joho", subItem: "vacation rentals" },
    { item: "Mullsjö", subItem: "vacation rentals" },
    { item: "Jixian", subItem: "vacation rentals" },
    { item: "Nynäshamn", subItem: "vacation rentals" },
    { item: "Gorshechnoye", subItem: "vacation rentals" },
    { item: "Cuchumbaya", subItem: "vacation rentals" },
    { item: "Porirua", subItem: "house rentals" },
    { item: "Beidong", subItem: "house rentals" },
    { item: "Leigongmiao", subItem: "house rentals" },
  ];
  return (
    <div>
      <FooterDesktop footerItems={footerItems} />
      <FooterMobile footerItems={footerItems} />
    </div>
  );
}
