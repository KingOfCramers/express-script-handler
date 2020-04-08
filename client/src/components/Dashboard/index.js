import React, { useState, useEffect } from "react";
import { DataTable } from "./DataTable";

// contact route component
const DashboardComponent = props => {
  return (
    <div>
      <h2>Dashboard Component</h2>
      <DataTable source="committees/house/hfacs"/>
    </div>
  );
};

export default DashboardComponent;
