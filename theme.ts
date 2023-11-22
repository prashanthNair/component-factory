// theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733',
    },
    secondary: {
      main: '#00C4CC',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
