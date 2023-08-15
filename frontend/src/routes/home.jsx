import { useState } from 'react';
import { Typography, Button, Grid, styled, Stack } from '@mui/joy';
import hero from '../assets/hero.svg';
import { Link } from 'react-router-dom';
import SubmissionModal from '../components/submission-modal';

const HeroHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'playfair display',
  fontSize: 130,
  fontWeight: 500,
  textTransform: 'capitalize',
  lineHeight: 1,
  color: theme.palette.neutral[800],
}));

const HeroSubHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral.lightChannel,
  fontFamily: 'Poppins',
  width: '80%',
}));

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SubmissionModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Grid sx={{ height: '100vh', px: 5 }} alignItems={'center'} container>
        <Grid sm={6} item>
          <Stack spacing={2} alignItems={'flex-start'}>
            <HeroHeading>question Bank</HeroHeading>
            <HeroSubHeading>
              Embark on your quest for excellence with access to a goldmine of
              questions that hold the key to unlocking your academic potential.
              Prepare with precision, practice with purpose, and achieve
              remarkable results.
            </HeroSubHeading>
            <Stack direction={'row'} spacing={1.5}>
              <Button color="warning" onClick={() => setIsOpen(true)}>
                submit questions
              </Button>
              <Button
                variant="soft"
                component={Link}
                to="questions"
                color="warning"
              >
                view all questions 🎉
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} sm={6} item>
          <img src={hero} style={{ height: '40vmax' }} alt="" />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
