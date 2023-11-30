import Icon from "../../assets/icons/Icon";

export default function () {
  return (
    <div>
      <span className="hidden lg:block">
        <Icon name="AirbnbLogo" width={102} height={32} color="#F6475F" />
      </span>
      <span className="block lg:hidden">
        <Icon name="AirbnbLogoNoText" width={40} height={40} color="#F6475F" />
      </span>
    </div>
  );
}
