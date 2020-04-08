import React from "react";
import TableCell from "@material-ui/core/TableCell";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

export const CellContent = ({ type, doc, col }) => {
    const content = (() => {
      switch (type) {
        case "Boolean":
          return doc[col] ? <DoneIcon /> : <CloseIcon />;
        default:
          return doc[col];
      }
    })();
    return content
  };

export const Cells = ({ doc, cols, data }) =>
  cols.map(col => {
    let cellType = data ? typeof data[col] : null;
    return (
      <TableCell key={doc._id.concat(`_${col}`)}>
        <CellContent type={cellType} doc={doc} col={col} />
      </TableCell>
    )
  });