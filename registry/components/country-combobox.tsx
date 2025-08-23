import { type FC, useCallback, useMemo } from "react";
import Flag from "react-country-flag";
import { countries } from "@reacture-io/iso-locale/countries";

import type {
  CmdkFilterHandler,
  ComboboxProps,
} from "@/registry/components/combobox";
import Combobox from "@/registry/components/combobox";

type CountryComboboxProps = Omit<ComboboxProps<false>, "options">;

const CountryCombobox: FC<CountryComboboxProps> = (props) => {
  console.log(Object.entries(countries));
  const options = useMemo(
    () =>
      Object.values(countries).map((country) => ({
        label: (
          <span className="flex items-center gap-2">
            <Flag countryCode={country.alpha2} /> {country.name}
          </span>
        ),
        value: country.alpha2,
        keywords: [
          country.name.toLowerCase(),
          country.alpha2.toLowerCase(),
          country.alpha3.toLocaleLowerCase(),
        ],
      })),
    []
  );

  const handleFilter: CmdkFilterHandler = useCallback(
    (_, search, keywords) =>
      keywords?.some((keyword) => keyword.includes(search.toLowerCase()))
        ? 1
        : 0,
    []
  );

  return (
    <Combobox
      {...props}
      options={options}
      onFilter={handleFilter}
      placeholder="Select a country"
    />
  );
};

export default CountryCombobox;
