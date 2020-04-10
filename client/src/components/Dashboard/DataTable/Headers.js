import React from "react";
import TableCell from "@material-ui/core/TableCell";
import capitalize from "../../../util/capitalize";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export const Headers = ({ setSortBy, sortBy, sortOrder, setSortOrder, headers }) => {
  const handleSort = header => {
    setSortOrder(!sortOrder);
    setSortBy(header);
  };
  return headers.map((header, i) => (
    <TableCell onClick={() => handleSort(header)} key={i}>
      <TableSortLabel
        active={header === sortBy}
        direction={sortOrder ? "asc" : "desc"}
        onClick={() => handleSort(header)}
      >
        {capitalize(header)}
      </TableSortLabel>
    </TableCell>
  ));
};
