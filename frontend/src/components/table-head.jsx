/* eslint-disable react/prop-types */
import { Button } from '@mui/joy';
import { flexRender } from '@tanstack/react-table';

import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

const TableHead = ({ table }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th style={{ width: header.getSize() }} key={header.id}>
              <Button
                fullWidth
                variant="plain"
                color="neutral"
                onClick={
                  header.column.getCanSort()
                    ? () => header.column.toggleSorting(null, true)
                    : null
                }
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}{' '}
                {
                  { asc: <NorthIcon />, desc: <SouthIcon /> }[
                    header.column.getIsSorted()
                  ]
                }
              </Button>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHead;
