import { useRef } from 'react';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useScrollBottom } from 'hooks/useScrollBottom';

import { TableRow, TableRowProps } from './table-row';

import { AnyRecord, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TableProps<RowData extends AnyRecord = AnyRecord> extends StyleProps {
  heads: Array<React.ReactNode>;
  getRowProps: (rowData: RowData, rowIndex: number) => TableRowProps;
  data: Array<RowData> | null;
  onScrollBottom?: () => void;
  isBusyBottom?: boolean;
}

export const Table = <RowData extends AnyRecord = AnyRecord>({
  heads,
  getRowProps,
  data,
  className,
  onScrollBottom,
  isBusyBottom,
}: TableProps<RowData>) => {
  const ref = useRef<HTMLDivElement>(null);

  const { onScroll } = useScrollBottom(ref, onScrollBottom);

  return (
    <div ref={ref} onScroll={onScroll} className={cn('overflow-auto max-h-screen', className)}>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {heads.map((head, index) => {
              return (
                <th
                  key={index}
                  className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  {head}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="bg-white ">
          {data?.map((d, index) => {
            const rowProps = getRowProps(d, index);
            return <TableRow key={index} {...rowProps} />;
          })}
        </tbody>
      </table>
      {isBusyBottom && (
        <div className="flex justify-center">
          <SpinnerEllipsis />
        </div>
      )}
    </div>
  );
};
