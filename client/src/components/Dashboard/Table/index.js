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
  const [headers, setHeaders] = useState([]);
  const [dataSource] = useState("committees/house/hfacs");
  const [headerSource] = useState("keys/house/hfacs");

  useEffect(() => {
    fetchTableData(dataSource, headerSource).then(({ newHeaders, newData }) => {
      setHeaders(newHeaders);
      setData(newData);
      setLoading(false);
    });
  }, []);

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(headers).map((x,i) => {
              return <TableCell key={i}>{x}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => {
            console.log(item)
            return (
              <TableRow key={item._id}>
                {Object.keys(headers).map((x,i) => {
                  return <TableCell key={`${i}`}>{item[x]}</TableCell> 
                })}
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
