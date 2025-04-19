"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function SearchBar() {
  const [alignment, setAlignment] = React.useState("web");
  const searchModal = useSearchModal();

  const handleChange = () => {};
  return (
    <div
      onClick={searchModal.onOpen}
      className="border rounded-full px-4 py-1 shadow-md hover:shadow-lg transition duration-200 ease-in-out bg-white w-[350px]"
    >
      <ToggleButtonGroup
        color="standard"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        className="gap-1"
        sx={{
          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: "9999px",
            textTransform: "none",
            padding: "8px 16px",
            fontWeight: "500",
            fontSize: "0.875rem",
            color: "#555",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            "&.Mui-selected": {
              backgroundColor: "#eeeeee",
              color: "#000",
              fontWeight: 600,
            },
          },
        }}
      >
        <ToggleButton value="location">Anywhere</ToggleButton>
        <ToggleButton value="time">Any week</ToggleButton>
        <ToggleButton value="guest">Add guest</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
