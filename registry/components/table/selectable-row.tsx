import { type MouseEventHandler, useCallback } from 'react';
import { type Row } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/registry/components/radio-group';

/**
 * https://tanstack.com/table/v8/docs/guide/row-selection#render-row-selection-ui
 */
interface SelectableRowProps<DataType> {
  row: Row<DataType>;
  multiSelect?: boolean;
}

const SelectableRow = <DataType,>({
  row,
  multiSelect = true,
}: SelectableRowProps<DataType>) => {
  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      row.toggleSelected(checked);
    },
    [row]
  );

  const handleValueChange = useCallback(() => {
    row.toggleSelected(!row.getIsSelected());
  }, [row]);

  const handleClick: MouseEventHandler<HTMLButtonElement | HTMLDivElement> =
    useCallback((event) => {
      event.stopPropagation();
    }, []);

  const handleSpanClick: MouseEventHandler<HTMLSpanElement> = useCallback(
    (event) => {
      event.stopPropagation();
      row.toggleSelected(!row.getIsSelected());
    },
    [row]
  );

  return multiSelect ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      className='p-1'
      onClick={handleSpanClick}>
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={handleCheckedChange}
        onClick={handleClick}
      />
    </span>
  ) : (
    <RadioGroup
      value={row.getIsSelected() ? row.id : undefined}
      onValueChange={handleValueChange}
      options={[{ value: row.id }]}
      onClick={handleClick}
    />
  );
};

export { SelectableRow };
