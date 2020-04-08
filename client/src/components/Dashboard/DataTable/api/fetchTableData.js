import axios from "axios";
export const fetchTableData = async (dataSource, metaSource) => {
  let api =
    process.env.NODE_ENV === "production"
      ? "https://dcdocs.app"
      : "http://localhost:3001/api";
  console.log(`Fetching data from ${api}/data/${dataSource}`)
  let res = await axios.get(`${api}/data/${dataSource}`);
  return res.data;
};