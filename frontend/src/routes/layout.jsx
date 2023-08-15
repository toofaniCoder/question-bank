import { Container } from '@mui/joy';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default Layout;
