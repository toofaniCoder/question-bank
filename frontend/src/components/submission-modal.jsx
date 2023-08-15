/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Suspense, useState, memo } from 'react';
import {
  Await,
  Form,
  useNavigation,
  useActionData,
  Link,
} from 'react-router-dom';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Option,
  Button,
} from '@mui/joy';
import success from '../assets/success.svg';
import axios from 'axios';

const BoardDropdown = memo(() => (
  <Select name="board" placeholder="Select the Board">
    <Suspense fallback={<p>loading..</p>}>
      <Await
        resolve={axios.get(
          '/api/content-type-builder/content-types/api::question.question'
        )}
      >
        {(res) =>
          res.data.data.schema.attributes.board.enum.map((boardName) => (
            <Option key={boardName} value={boardName}>
              {boardName}
            </Option>
          ))
        }
      </Await>
    </Suspense>
  </Select>
));

const SubjectDropdown = memo(() => (
  <Select name="subject" placeholder="Select the Subject">
    <Suspense fallback={<p>loading..</p>}>
      <Await
        resolve={axios.get(
          '/api/content-type-builder/content-types/api::question.question'
        )}
      >
        {(res) =>
          res.data.data.schema.attributes.subject.enum.map((subjectName) => (
            <Option key={subjectName} value={subjectName}>
              {subjectName}
            </Option>
          ))
        }
      </Await>
    </Suspense>
  </Select>
));

const PaperSetDropdown = memo(() => (
  <Select name="set" placeholder="Select the Paper Set">
    <Suspense fallback={<p>loading..</p>}>
      <Await
        resolve={axios.get(
          '/api/content-type-builder/content-types/api::question.question'
        )}
      >
        {(res) =>
          res.data.data.schema.attributes.set.enum.map((setName) => (
            <Option key={setName} value={setName}>
              {setName}
            </Option>
          ))
        }
      </Await>
    </Suspense>
  </Select>
));
const StandardDropdown = memo(() => (
  <Select name="standard" placeholder="Select the Paper Class">
    <Suspense fallback={<p>loading..</p>}>
      <Await
        resolve={axios.get(
          '/api/content-type-builder/content-types/api::question.question'
        )}
      >
        {(res) =>
          res.data.data.schema.attributes.standard.enum.map((standardName) => (
            <Option key={standardName} value={standardName}>
              {standardName}
            </Option>
          ))
        }
      </Await>
    </Suspense>
  </Select>
));

const StateDropdown = memo(({ setStateCode }) => (
  <Suspense fallback={<p>loading..</p>}>
    <Await
      resolve={axios.get(
        'https://api.countrystatecity.in/v1/countries/IN/states',
        {
          headers: {
            'X-CSCAPI-KEY': import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY,
          },
        }
      )}
    >
      {(res) => (
        <Select
          onChange={(e, value) =>
            setStateCode(res.data.find((el) => el.name === value)?.iso2)
          }
          name="state"
          placeholder="Select the State Name"
        >
          {res.data.map((state) => (
            <Option key={state.name} value={state.name}>
              {state.name}
            </Option>
          ))}
        </Select>
      )}
    </Await>
  </Suspense>
));

const CityDropdown = memo(({ stateCode }) => {
  console.log('hiii city...kaise ho');
  return stateCode ? (
    <Suspense fallback={<p>loading..</p>}>
      <Await
        resolve={axios.get(
          `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
          {
            headers: {
              'X-CSCAPI-KEY': import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY,
            },
          }
        )}
      >
        {(res) => (
          <Select name="city" placeholder="Select the City Name">
            {res.data.map((city) => (
              <Option key={city.name} value={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
        )}
      </Await>
    </Suspense>
  ) : (
    <Select name="city" placeholder="Select the City Name"></Select>
  );
});
const SubmissionModal = ({ isOpen, setIsOpen }) => {
  const [stateCode, setStateCode] = useState(null);
  const navigation = useNavigation();
  const data = useActionData();
  return (
    <Modal onClose={() => setIsOpen(false)} open={isOpen}>
      <ModalDialog sx={{ width: data ? 350 : 800 }}>
        <ModalClose />
        {data ? (
          <Stack spacing={2} textAlign={'center'}>
            <img src={success} height={'300px'} />
            <div>
              <Typography level="h6" sx={{ mb: 1 }}>
                Thank You!{' '}
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: (theme) => theme.palette.primary[500],
                  }}
                >
                  {data.data.attributes.author}
                </Typography>
              </Typography>
              <Typography>
                Sit tight and relax! Your submission is now in the review
                process. Once approved, we'll swiftly send you a confirmation
                email.
              </Typography>
            </div>
            <Button component={Link} to="questions">
              View All Questions 🎉
            </Button>
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Typography sx={{ fontWeight: 600 }}>
              Submit Your Question Paper
            </Typography>
            <Form method="post" encType="multipart/form-data">
              <Stack
                spacing={2}
                // sx={{
                //   '& .MuiStack-root>*': { flexBasis: '50%', maxWidth: '50%' },
                // }}
                sx={{
                  '& .MuiStack-root>*': {
                    flexBasis: '50%',
                    maxWidth: '50%',
                    overflow: 'hidden',
                  },
                }}
              >
                <Stack direction={'row'} spacing={2}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input placeholder="enter your full name" name="author" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>E-mail Address</FormLabel>
                    <Input
                      placeholder="enter your E-mail Address"
                      name="email"
                    />
                  </FormControl>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <FormControl>
                    <FormLabel>Board Name</FormLabel>
                    <BoardDropdown />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Subject Name</FormLabel>
                    <SubjectDropdown />
                  </FormControl>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <FormControl>
                    <FormLabel>Year</FormLabel>
                    <Input
                      type="number"
                      placeholder="enter the year"
                      name="year"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Paper Set</FormLabel>
                    <PaperSetDropdown />
                  </FormControl>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel>Class</FormLabel>
                    <StandardDropdown />
                  </FormControl>

                  <FormControl sx={{ flex: 1 }}>
                    <FormLabel>Select the State</FormLabel>
                    <StateDropdown setStateCode={setStateCode} />
                  </FormControl>
                </Stack>

                <Stack direction={'row'} spacing={2}>
                  <FormControl>
                    <FormLabel>Select the City</FormLabel>
                    <CityDropdown stateCode={stateCode} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Select the City</FormLabel>
                    <Input
                      type="file"
                      name="file"
                      sx={{ alignItems: 'center' }}
                    />
                  </FormControl>
                </Stack>
              </Stack>
              <Button
                loading={navigation.state === 'submitting'}
                disabled={navigation.state === 'submitting'}
                sx={{ mt: 2 }}
                fullWidth
                type="submit"
              >
                Submit Your Paper
              </Button>
            </Form>
          </Stack>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default SubmissionModal;
