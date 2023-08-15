/* eslint-disable react/prop-types */
import { Box, Input } from '@mui/joy';
const GlobalSearch = ({ searchText, setSearchText }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search anyhting..."
      />
    </Box>
  );
};

export default GlobalSearch;
