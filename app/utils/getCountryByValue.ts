import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  latlng: country.latlng,
}));

export const getCountryByValue = (value: string) =>
  formattedCountries.find((item) => item.value === value);
