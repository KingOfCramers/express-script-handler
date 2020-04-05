import React, { useState, useEffect } from "react";
import fetchData from "./fetchData";

// contact route component
const DashboardComponent = props => {
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState("committees/house/hfacs");

  useEffect(() => {
    fetchData(dataSource).then(newData => setData(newData));
  }, []);

  return (
    <div>
      <h2>Dashboard Component</h2>
      {data.map((x, i) => (
        <div key={i}>{i}</div>
      ))}
    </div>
  );
};

export default DashboardComponent;
