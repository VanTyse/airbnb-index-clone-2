"use client";

import { useEffect, useState } from "react";
import Icon from "../../assets/icons/Icon";

export default function NumberSelctor({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [_value, setValue] = useState(value);

  useEffect(() => {
    onChange(_value);
  }, [_value]);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const increaseValue = () => {
    setValue((value) => value + 1);
  };

  const decreaseValue = () => {
    setValue((value) => (value !== 0 ? value - 1 : 0));
  };
  return (
    <div className="flex items-center gap-6">
      <button
        className="border hover:border-vantyse-grey-1 hover:text-vantyse-grey-1 
        hover:cursor-pointer border-vantyse-grey-1/30 rounded-full p-1.5
        disabled:text-vantyse-grey-2 disabled:border-vantyse-grey-2 disabled:cursor-not-allowed
        "
        disabled={_value === 0}
        onClick={decreaseValue}
      >
        <Icon name="Minus" width={22} height={22} />
      </button>
      <span>{_value}</span>

      <button
        className="border hover:border-vantyse-grey-1 hover:text-vantyse-grey-1 hover:cursor-pointer border-vantyse-grey-1/30 rounded-full p-2"
        onClick={increaseValue}
      >
        <Icon name="Plus" width={18} height={18} />
      </button>
    </div>
  );
}
