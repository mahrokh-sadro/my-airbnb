import React from "react";
import Button from "@mui/material/Button";

import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-4">
      <div className="text-2xl font-semibold">
        ${price} <span className="text-sm font-light">/ night</span>
      </div>

      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={onSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Reserve
      </Button>

      <div className="flex justify-between text-lg font-semibold mt-4">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
