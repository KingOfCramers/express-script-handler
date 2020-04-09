import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

import { AsyncHook as useTableData } from "../../AsyncHook";
import { fetchTableData } from "./api/fetchTableData";
import { MaybeLoading } from "./MaybeLoading";
import { Headers } from "./Headers";
import { Cells } from "./Cells";

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

  if (a[prop] < b[prop]) {
    return -1 * order;
  }

  if (a[prop] > b[prop]) {
    return 1 * order;
  }

  return 0 * order;
};

export const DataTable = props => {
  // We have another component handle this Table's state.
  const { execute, pending, value, error } = useTableData(
    fetchTableData,
    [props.source],
    true
  );

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {value && (
        <Table onClick={execute}>
          <TableHead>
            <TableRow>
              <Headers headers={Object.keys(value[0])} />
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map(doc => (
              <TableRow key={doc._id}>
                <Cells doc={doc} cols={Object.keys(value[0])} data={value} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <MaybeLoading loading={pending} />
    </Paper>
  );
};
