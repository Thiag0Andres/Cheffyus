import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

// Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import "./styles.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      color: "#d73d36",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Spinner animation="border" />
    </Container>
  );
};

export default Loading;
