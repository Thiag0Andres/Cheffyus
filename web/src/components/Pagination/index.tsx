import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

interface Props {
  setValuePage: any;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const PaginationRounded: React.FC<Props> = ({ setValuePage }) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setValuePage(page);
  }, [page]);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const sum = value + 1;
    setPage(sum);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={page}
        shape="rounded"
        onChange={handleChangePagination}
      />
    </div>
  );
};

export default PaginationRounded;
