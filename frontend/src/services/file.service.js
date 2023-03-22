import axios from "axios";
import authHeader from "./auth-header";
import fileDownload from 'js-file-download'
const API_URL = "http://localhost:8080/api/";


const getFileInfo = () => {
  return axios.get(API_URL + "files", { headers: authHeader() });
};

const upload = (formData) => {
  const url = API_URL + "files";
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      "x-access-token": user.accessToken
    }
  };
  return axios.post(url, formData, config);
}

const download = (filename) => {
  const url = API_URL + `files/download?id=${filename}`;
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      "x-access-token": user.accessToken,
      "responseType": 'blob'
    }
  };
  axios.get(url, config).then((res) => {
    fileDownload(res.data, filename)
  });
}
export default {
  getFileInfo,
  upload,
  download
};