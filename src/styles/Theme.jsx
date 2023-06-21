import {ThemeProvider, createTheme} from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   mode: "light",
  //   primary: {
  //     main: "#BFCFCC",
  //   },
  //   secondary: {
  //     main: "#B8B6F2",
  //     contrastText: "#000000",
  //   },
  //   error: {
  //     main: "#b71c1c",
  //   },
  //   warning: {
  //     main: "#ed6c02",
  //   },
  //   info: {
  //     main: "#0288d1",
  //   },
  // },
  typography: {
    fontFamily:
      '"Mukta Mahee", "Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    h1: {
      fontSize: "5.3rem",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "div",
          h2: "div",
          h3: "div",
          h4: "div",
          h5: "div",
          h6: "div",
          subtitle1: "div",
          subtitle2: "div",
          body1: "span",
          body2: "span",
        },
      },
    },
    MuiButton: {
      variants: [
        {props: {variant: "black"}, style: {backgroundColor: "black"}},
      ],
    },
  },
});

export default function Theme({children}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
