import axios from "axios";
const fetchData = async dataSource => {
  let api = process.env.NODE_ENV === "production"
      ? "https://dcdocs.app"
: "http://localhost:3001/api";
  let res = await axios.get(`${api}/data/${dataSource}`);
  return res.data;
};

export default fetchData;
