import axios from "axios";
const fetchData = async (dataSource, metaSource) => {
  let api =
    process.env.NODE_ENV === "production"
      ? "https://dcdocs.app"
      : "http://localhost:3001/api";
  let resData = await axios.get(`${api}/data/${dataSource}`);
  let metaData = await axios.get(`${api}/data/meta/${metaSource}`);

  return {
    metaData: metaData.data,
    newData: resData.data
  };
};

export default fetchData;
