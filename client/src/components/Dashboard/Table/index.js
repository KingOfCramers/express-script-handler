import React, { useState, useEffect } from "react";
import fetchTableData from "./fetchTableData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {});

const useProgressStyles = makeStyles(theme => ({
  progress: { margin: theme.spacing(2) }
}));

const MaybeLoading = ({ loading }) => {
  const classes = useProgressStyles();
  return loading ? <CircularProgress className={classes.progress} /> : null;
};

const TableComponent = props => {
  const classes = useStyles();
  const [loading, setLoading] = useState([]);
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState("committees/house/hfacs");

  useEffect(() => {
    fetchTableData(dataSource).then(newData => {
      setData(newData);
      setLoading(false);
    });
  }, []);

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => {
            return (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.type}
                </TableCell>
                <TableCell align="right">{item.location}</TableCell>
                <TableCell align="right">{item.time}</TableCell>
                <TableCell align="right">{item.title}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <MaybeLoading loading={loading} />
    </Paper>
  );
};

export default TableComponent;
