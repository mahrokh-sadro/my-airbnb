"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function SearchBar() {
  const [alignment, setAlignment] = React.useState("web");
  const handleChange = () => {};
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="location">Anywhere</ToggleButton>
        <ToggleButton value="time">Any week</ToggleButton>
        <ToggleButton value="guest">Add guest</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
