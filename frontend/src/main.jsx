import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssVarsProvider, CssBaseline, GlobalStyles } from '@mui/joy';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:1337';

// import font
import '@fontsource/inter';

// import pages or routes
import Layout from './routes/layout';
import Home from './routes/home';
import Questions from './routes/questions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        action: async ({ request }) => {
          let formData = await request.formData();
          const { file, ...rest } = Object.fromEntries(formData);
          rest.publishedAt = null;
          formData = new FormData();
          formData.append('data', JSON.stringify(rest));
          formData.append('files.file', file);
          const res = await axios.post('/api/questions', formData);
          console.log(Object.fromEntries(formData));
          return res.data;
        },
      },
      {
        path: 'questions',
        element: <Questions />,
        loader: async () => {
          const res = await axios.get(
            '/api/content-type-builder/content-types/api::question.question'
          );
          return res.data;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider>
    <CssBaseline />
    <GlobalStyles
      styles={{ '::-webkit-file-upload-button': { display: 'none' } }}
    />
    <RouterProvider router={router} />
  </CssVarsProvider>
);
