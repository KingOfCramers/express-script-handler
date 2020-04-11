import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Cells } from "./Cells";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { Footer } from "./Footer";
import { Headers } from "./Headers";
import { MaybeLoading } from "./MaybeLoading";

const useStyles = makeStyles(theme => ({
  header: {}
}));

// This function should be passed as an argument
// to the sort function. It is the "compareFunction" that
// accepts the two arguments, and then passes those to another
// function, which is implicitly passed the two rows, a + b.
// That function then reuturns either less than 0, 0 or greater
// than zero, thus sorting the row.
const comparator = (prop, desc = true) => (a, b) => {
  const order = desc ? -1 : 1;
  if (!a[prop] && b[prop]) {
    // IF EITHER PROPERTY IS UNDEFINED, RETURN THE OTHER ONE FIRST
    return 1;
  }
  if (a[prop] && !b[prop]) {
    // IF EITHER PROPERTY IS UNDEFINED, RETURN THE OTHER ONE FIRST
    return -1;
  }

  if (a[prop] < b[prop]) {
    return -1 * order;
  }

  if (a[prop] > b[prop]) {
    return 1 * order;
  }

  return 0 * order;
};

export const DataTable = ({ value, pending, error }) => {
  // We have another component handle this Table's state.
  const [sortBy, setSortBy] = useState("_id");
  const [sortOrder, setSortOrder] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();
  return (
    <ErrorBoundary>
      <Paper className={classes.root}>
        {value && (
          <Table>
            <TableHead>
              <TableRow>
                <Headers
                  sortOrder={sortOrder}
                  setSortBy={setSortBy}
                  sortBy={sortBy}
                  setSortOrder={setSortOrder}
                  headers={Object.keys(value[0])}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {value
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(comparator(sortBy, sortOrder))
                .map(doc => (
                  <TableRow key={doc._id}>
                    <Cells doc={doc} cols={Object.keys(value[0])} data={value} />
                  </TableRow>
                ))}
            </TableBody>
            <Footer
              rows={value}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              setPage={setPage}
            />
          </Table>
        )}
        <MaybeLoading loading={pending} />
      </Paper>
    </ErrorBoundary>
  );
};
