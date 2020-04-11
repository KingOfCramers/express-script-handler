import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { InputAdornment, TextField } from "@material-ui/core";

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

SearchBox.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  search: PropTypes.func
}