import { createTheme } from "@mui/material/styles";
import { ThemeConstants } from "./variable";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.search-box": {
            borderRadius: "3px",

            marginLeft: "100px",

            marginRight: "40px",

            height: "40px",

            backgroundColor: ThemeConstants.OFF_WHITE_COLOR,

            "&.search-box-mobile": {
              borderRadius: "3px",
              height: "46px",
              backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
            },
            "& input::placeholder": {
              fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            },
            "& input": {
              fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            },
          },
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            width: "100%",
            fontSize: ThemeConstants.FONTSIZE_H7,
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              backgroundColor: "#f7f7f7",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
          },
        },
      ],
    },
  },
});

export default theme;
