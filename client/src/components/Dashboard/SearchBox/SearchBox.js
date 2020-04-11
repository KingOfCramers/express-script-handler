import { InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

export const SearchBox = ({ filter, setFilter, search }) => {
  const handleSearch = e => {
    e.preventDefault();
    search(filter);
  };

  const onSearchChange = e => {
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
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};
