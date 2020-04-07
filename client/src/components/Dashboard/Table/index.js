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
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  header: {}
}));

import capitalize from "../../../util/capitalize";

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
  const [headerMeta, setHeaderMeta] = useState([]);
  const [dataSource] = useState("committees/house/hfacs");
  const [metaSource] = useState("keys/house/hfacs");

  useEffect(() => {
    fetchTableData(dataSource, metaSource).then(({ metaData, newData }) => {
      setHeaders(Object.keys(metaData));
      setHeaderMeta(metaData);
      setData(newData);
      setLoading(false);
    });
  }, []);

  const makeHeaders = headers =>
    headers.map((header, i) => <TableCell key={i}>{capitalize(header)}</TableCell>);

  const createCell = (dbDocument, header, cellType) => {
    const content = (() => {
      switch (cellType) {
        case "Boolean":
          console.log(dbDocument[header]);
          return dbDocument[header] ? <DoneIcon /> : <CloseIcon />;
        default:
          return dbDocument[header];
      }
    })();

    return (
      <TableCell key={dbDocument._id.concat(`_${header}`)}>{content}</TableCell>
    );
  };

  const makeCells = dbDocument =>
    headers.map(header => {
      let cellType = headerMeta[header].instance;
      return createCell(dbDocument, header, cellType);
    });

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>{makeHeaders(headers)}</TableRow>
        </TableHead>
        <TableBody>
          {data.map(dbDocument => {
            return <TableRow key={dbDocument._id}>{makeCells(dbDocument)}</TableRow>;
          })}
        </TableBody>
      </Table>
      <MaybeLoading loading={loading} />
    </Paper>
  );
};

export default TableComponent;
