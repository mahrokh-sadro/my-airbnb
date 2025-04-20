"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";

export default function SearchBar() {
  const [alignment, setAlignment] = React.useState("web");
  const searchModal = useSearchModal();

  const handleChange = () => {};
  return (
    <div
      onClick={searchModal.onOpen}
      className="flex items-center justify-between bg-white border rounded-md	 border-gray-300 px-3 py-2 shadow-sm hover:shadow-md transition duration-200 ease-in-out cursor-pointer w-[110px] max-w-full"
    >
      <div className="flex items-center justify-center  rounded-full p-2 mr-3">
        <FaSlidersH className="text-gray-600 text-lg" />
      </div>

      <span className="text-sm text-gray-600">Filters</span>

      <ToggleButtonGroup
        color="standard"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Search filter"
        className="flex items-center gap-2"
      ></ToggleButtonGroup>
    </div>
  );
}
