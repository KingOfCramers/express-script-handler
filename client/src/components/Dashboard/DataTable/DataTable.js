import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { AsyncHook } from "../../AsyncHook";
import { fetchTableData } from "./api/fetchTableData";
import { MaybeLoading } from "./MaybeLoading";
import { Headers } from "./Headers";
import { Cells } from "./Cells";

const useStyles = makeStyles(theme => ({
  header: {}
}));

export const DataTable = props => {
  // We have another component handle this Table's state.
  const { execute, pending, value, error } = AsyncHook(fetchTableData, [props.source], true);
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {!error && value && 
        <Table>
          <TableHead>
            <TableRow>
              <Headers headers={Object.keys(value[0])}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.map(doc => (
              <TableRow key={doc._id}>
                <Cells doc={doc} cols={Object.keys(value[0])} data={value} />
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      <MaybeLoading loading={pending} />
    </Paper>
  );
};