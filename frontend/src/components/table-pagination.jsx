/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from '@mui/joy';

const TablePagination = ({ table }) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'} sx={{ p: 2 }}>
      <Button
        disabled={!table.getCanPreviousPage()}
        color="neutral"
        onClick={table.previousPage}
      >
        previous page
      </Button>
      <Typography>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </Typography>
      <Button
        disabled={!table.getCanNextPage()}
        color="neutral"
        onClick={table.nextPage}
      >
        next page
      </Button>
    </Stack>
  );
};

export default TablePagination;
