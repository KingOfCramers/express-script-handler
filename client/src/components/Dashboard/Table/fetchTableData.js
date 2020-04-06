import axios from "axios";
const fetchData = async (dataSource, headerSource) => {
  let api =
    process.env.NODE_ENV === "production"
      ? "https://dcdocs.app"
      : "http://localhost:3001/api";
  let resData = await axios.get(`${api}/data/${dataSource}`);
  let resHeaders = await axios.get(`${api}/data/meta/${headerSource}`);

  return {
    newHeaders: resHeaders.data,
    newData: resData.data
  };

};

export default fetchData;
