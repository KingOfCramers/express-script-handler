import React, { useState, useEffect } from "react";
import Table from "./Table";

// contact route component
const DashboardComponent = props => {
  return (
    <div>
      <h2>Dashboard Component</h2>
      <Table />
    </div>
  );
};

export default DashboardComponent;
