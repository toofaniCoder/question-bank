/* eslint-disable react/prop-types */
import { flexRender } from '@tanstack/react-table';
import { AspectRatio, Skeleton } from '@mui/joy';
import { useAsyncValue } from 'react-router-dom';

const TableBody = ({ table }) => {
  const res = useAsyncValue();
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              <AspectRatio variant={!res ? 'soft' : 'palin'} maxHeight={50}>
                <Skeleton loading={!res} />
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </AspectRatio>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
