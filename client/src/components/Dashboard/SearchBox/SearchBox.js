import { InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
export const SearchBox = ({ filter, setFilter }) => {
  const onSearchChange = e => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <TextField
      value={filter}
      onChange={onSearchChange}
      //className={classes.search}
      id="input-search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
};
