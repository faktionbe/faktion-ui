import { type Table } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
/**
 * https://tanstack.com/table/v8/docs/guide/row-selection#render-row-selection-ui
 */
interface SelectableHeaderProps<DataType> {
  table: Table<DataType>;
}

const SelectableHeader = <DataType,>({
  table,
}: SelectableHeaderProps<DataType>) => {
  const handleCheckedChange = (checked: boolean) => {
    table.toggleAllRowsSelected(checked);
  };

  const isChecked = () => {
    if (table.getIsAllRowsSelected()) {
      return true;
    }
    if (table.getIsSomeRowsSelected()) {
      return 'indeterminate';
    }
    return false;
  };
  return (
    <Checkbox
      checked={isChecked()}
      onCheckedChange={handleCheckedChange}
    />
  );
};

export default SelectableHeader;
