"use client";

import { useState } from "react";

export default function Switch() {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  return (
    <label className="relative inline-block w-12 h-[22px] bg-[#97959B] shadow-[1px_2px_0px_0px_#74727A] border border-[#BFB5DEB2] rounded-t-[5px] rounded-bl-[5px]">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="hidden peer"
      />
      <span className="absolute shadow-[inset_-1px_1px_3.5px_0px_#4E27BF1A] before:border before:border-[#BFB5DEB2] cursor-pointer inset-0 transition-all duration-300 before:absolute before:content-[''] before:h-[16px] before:w-[18px] before:left-1 before:top-[2px] before:bg-[#1B1A1F] before:rounded-t-[5px] before:rounded-bl-[5px] peer-checked:before:translate-x-[20px]" />
    </label>
  );
}
