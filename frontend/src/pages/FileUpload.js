import React, { useState, useEffect } from "react";
import axios from "axios";
import FileService from "../services/file.service";
import EventBus from "../common/EventBus";
import FileTable from "../components/FileTable";
const FileUpload = () => {
  const [content, setContent] = useState([]);
  const [file, setFile] = useState();
  useEffect(() => {
    FileService.getFileInfo().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      alert("Please select file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    FileService.upload(formData).then((res) => {
      setContent([...content, res.data]);
    });
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>File Management</h3>
      </header>
      <FileTable data={content} />
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleChange}></input>
        <button
          type="submit"
          style={{
            background: "#1ba685",
            borderWidth: 0,
            padding: 10,
            color: "white",
            borderRadius: 5,
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
