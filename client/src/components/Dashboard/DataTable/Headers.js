import React from "react";
import TableCell from "@material-ui/core/TableCell";
import capitalize from "../../../util/capitalize";

export const Headers = ({ headers }) => headers.map((header, i) => <TableCell key={i}>{capitalize(header)}</TableCell>);