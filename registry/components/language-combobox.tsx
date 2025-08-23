import { type FC, useCallback, useMemo } from 'react';
import { languages } from '@reacture-io/iso-locale/languages';

import Combobox, {
  type CmdkFilterHandler,
  type ComboboxProps,
} from '@/registry/components/combobox';

interface LanguageComboboxProps extends Omit<ComboboxProps<false>, 'options'> {
  native?: boolean;
}
const LanguageCombobox: FC<LanguageComboboxProps> = ({ native, ...props }) => {
  const options = useMemo(
    () =>
      Object.values(languages).map((language) => ({
        label: native ? language.native : language.language,
        value: language.iso639_1,
        keywords: [
          language.language.toLowerCase(),
          language.iso639_1.toLowerCase(),
          language.iso639_3.toLowerCase(),
          language.native.toLowerCase(),
        ],
      })),
    [native]
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
      placeholder='Select a language'
    />
  );
};

export default LanguageCombobox;
