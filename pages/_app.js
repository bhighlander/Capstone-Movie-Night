/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { AuthProvider } from '../utils/context/authContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AuthProvider>
          <ViewDirectorBasedOnUserAuthStatus
            component={Component}
            pageProps={pageProps}
          />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
