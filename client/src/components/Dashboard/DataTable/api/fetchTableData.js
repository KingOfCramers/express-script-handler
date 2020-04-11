import axios from "axios";
export const fetchTableData = async (dataSource, search) => {
  let api =
    process.env.NODE_ENV === "production"
      ? "https://dcdocs.app"
      : "http://localhost:3001/api";
  let query = search
    ? `${api}/data/${dataSource}?date=${search}`
    : `${api}/data/${dataSource}`;
  //const query = `${api}/data/${dataSource}?${hasSearch}`;
  //console.log(`Fetching data from ${query}`);
  let res = await axios.get(query);
  return res.data;
};
