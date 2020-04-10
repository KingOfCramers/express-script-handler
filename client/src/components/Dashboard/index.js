import React, { useState } from "react";

import { DataTable } from "./DataTable";
import { SearchBox } from "./SearchBox/SearchBox";

// contact route component
const DashboardComponent = props => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h2>Dashboard Component</h2>
      <SearchBox filter={filter} setFilter={setFilter} />
      <DataTable source="committees/house/hfacs" />
    </div>
  );
};

export default DashboardComponent;
