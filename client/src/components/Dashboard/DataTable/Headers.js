import React from "react";
import TableCell from "@material-ui/core/TableCell";
import capitalize from "../../../util/capitalize";

export const Headers = ({ setSortBy, sortOrder, setSortOrder, headers }) => {
  const handleSort = header => {
    setSortOrder(!sortOrder);
    setSortBy(header);
  };
  return headers.map((header, i) => (
    <TableCell onClick={() => handleSort(header)} key={i}>
      {capitalize(header)}
    </TableCell>
  ));
};
