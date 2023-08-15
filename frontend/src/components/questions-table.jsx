/* eslint-disable react/prop-types */
import { Button, Divider, Table, AspectRatio, Skeleton } from '@mui/joy';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import axios from 'axios';
import download from 'downloadjs';
import { useAsyncValue } from 'react-router-dom';

import TablePagination from './table-pagination';
import TableHead from './table-head';
import TableBody from './table-body';

const columnHelper = createColumnHelper();
const emptyData = {
  id: 1,
  attributes: {
    author: '',
    email: '',
    board: '',
    subject: '',
    year: '',
    standard: '',
    set: '',
    city: '',
    state: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    file: {
      data: {
        id: 1,
        attributes: {
          name: '',
          alternativeText: null,
          caption: null,
          width: null,
          height: null,
          formats: null,
          hash: '',
          ext: '',
          mime: '',
          size: 0,
          url: '',
          previewUrl: null,
          provider: '',
          provider_metadata: null,
          createdAt: '',
          updatedAt: '',
        },
      },
    },
  },
};
const columns = [
  columnHelper.accessor((row) => row.attributes.author, {
    id: 'author',
    header: 'Uploaded By',
  }),
  //   columnHelper.accessor((row) => row.attributes.email, {
  //     id: 'email',
  //     header: 'E-mail Address',
  //   }),
  columnHelper.accessor((row) => row.attributes.board, {
    id: 'board',
    header: 'Board Name',
    size: 300,
  }),
  columnHelper.accessor((row) => row.attributes.subject, {
    id: 'subject',
    header: 'Subject Name',
  }),
  columnHelper.accessor((row) => row.attributes.year, {
    id: 'year',
    header: 'Year',
  }),
  columnHelper.accessor((row) => row.attributes.standard, {
    id: 'standard',
    header: 'Class Name',
  }),
  columnHelper.accessor((row) => row.attributes.set, {
    id: 'set',
    header: 'Set Name',
  }),
  columnHelper.accessor((row) => row.attributes.state, {
    id: 'state',
    header: 'State Name',
  }),
  columnHelper.accessor((row) => row.attributes.city, {
    id: 'city',
    header: 'City Name',
  }),
  columnHelper.accessor((row) => row.attributes.file.data.attributes.url, {
    id: 'file',
    header: 'Download',
    enableSorting: false,
    cell: ({ getValue }) => (
      <Button
        onClick={() => download(`${axios.defaults.baseURL}${getValue()}`)}
      >
        download
      </Button>
    ),
  }),
];

const QuestionsTable = (props) => {
  const { pagination, setPagination, sorting, setSorting } = props;
  const res = useAsyncValue();
  console.log('Res', res);
  const table = useReactTable({
    data:
      res?.data?.data ??
      new Array(pagination.pageSize).fill('').map((el, index) => ({
        ...emptyData,
        id: index,
      })),
    columns,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    pageCount: res?.data.meta.pagination.pageCount,
    onPaginationChange: setPagination,
    manualPagination: true,
    manualSorting: true,
    enableMultiSort: true,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Table size="lg">
        <TableHead table={table} />
        <TableBody table={table} />
      </Table>
      <Divider />
      <TablePagination table={table} />
    </>
  );
};

export default QuestionsTable;
