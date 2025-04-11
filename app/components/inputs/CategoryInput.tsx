"use client";

import React from "react";
import clsx from "clsx";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  icon: React.ReactNode;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={clsx(
        "flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer hover:border-black transition",
        selected ? "border-black bg-neutral-100" : "border-neutral-200"
      )}
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
