import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d73d36",
    },
  },
});

/* export const useStyles = makeStyles((theme) => ({
  inputDefault: {
    width: "100%",
  },
  button: {
    backgroundImage: "linear-gradient(to right, #ec3b2b, #ff402d, #ec3b2b)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: "100%",
    height: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: "#ff402d",
    overflow: "auto",
  },
}));

export const styleInput = {
  color: "#555",
  fontSize: "1.2rem",
  fontFamily: "Poppins, sans-serif",
};

export const styleInputLabel = {
  fontSize: "1.2rem",
  fontFamily: "Poppins, sans-serif",
};
 */
