import React from "react";
import Select from "react-select";
import useCountries from "../../hooks/useCountries";
import Image from "next/image";

export type CountrySelectValue = {
  label: string;
  value: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  console.log(getAll());
  return (
    <div>
      <Select
        placeholder="Select a country"
        isClearable
        options={getAll()}
        value={value}
        onChange={(val) => onChange(val as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-3">
            {/* <Image
              src={option.flag}
              alt={`Flag of ${option.label}`}
              width={20}
              height={16}
              className="object-cover rounded-sm"
            /> */}
            {option.label},
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
