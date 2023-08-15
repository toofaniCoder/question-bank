import { Suspense, useState } from 'react';
import { Box, Sheet } from '@mui/joy';
import axios from 'axios';
import { Await, useLoaderData } from 'react-router-dom';
import QuestionsTable from '../components/questions-table';
import GlobalSearch from '../components/global-search';

const Questions = () => {
  const data = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, // PageIndex means page number (page)
    pageSize: 7,
  });

  const filterString = (data) => {
    return Object.keys(data.data.schema.attributes)
      .filter((item) => item !== 'file')
      .map(
        (item, index) =>
          `filters[$or][${index}][${item}][$containsi]=${searchText}`
      )
      .join('&');
  };
  const sortingString = () => {
    return sorting.length > 0
      ? sorting
          .map(
            (item, index) =>
              `sort[${index}]=${item.id}:${item.desc ? 'desc' : 'asc'}`
          )
          .join('&')
      : '';
  };
  return (
    <Box sx={{ py: 4 }}>
      <Sheet>
        <GlobalSearch {...{ searchText, setSearchText }} />
        <Suspense
          fallback={
            <QuestionsTable
              {...{ pagination, setPagination, sorting, setSorting }}
            />
          }
        >
          <Await
            resolve={axios.get(
              `/api/questions?populate=*&${filterString(
                data
              )}&pagination[page]=${
                pagination.pageIndex + 1
              }&pagination[pageSize]=${pagination.pageSize}&${sortingString()}`
            )}
          >
            <QuestionsTable
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
            />
          </Await>
        </Suspense>
      </Sheet>
    </Box>
  );
};

export default Questions;
