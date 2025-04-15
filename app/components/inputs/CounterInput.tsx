"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCallback, useState } from "react";

interface CounterInputProps {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (value: number) => void;
}

const CounterInput: React.FC<CounterInputProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value == 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        {subtitle && <div className="font-light text-gray-600">{subtitle}</div>}
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onReduce}
          className="p-2 border rounded-full cursor-pointer"
        >
          <AiOutlineMinus />
        </button>
        <div className="text-lg">{value}</div>
        <button
          onClick={onAdd}
          className="p-2 border rounded-full cursor-pointer"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default CounterInput;
