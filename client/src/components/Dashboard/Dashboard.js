import React, { useState, useEffect } from "react";

import { DataTable } from "./DataTable";
import { SearchBox } from "./SearchBox/SearchBox";
import { fetchTableData } from "./DataTable/api/fetchTableData";

// contact route component
export const Dashboard = props => {
  const [filter, setFilter] = useState("");
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPending(true);
    setValue(null);
    setError(null);
    fetchTableData(["committees/house/hfacs"])
      .then(res => setValue(res))
      .catch(err => setError(err))
      .finally(() => setPending(false));
  }, []);
  //const { execute, pending, value, error } = useTableData(
  //fetchTableData,
  //["committees/house/hfacs", filter],
  //true // Call on initial mount
  //);

  return (
    <div>
      <h2>Dashboard Component</h2>
      <SearchBox filter={filter} setFilter={setFilter} />
      <DataTable value={value} pending={pending} error={error} />
    </div>
  );
};
