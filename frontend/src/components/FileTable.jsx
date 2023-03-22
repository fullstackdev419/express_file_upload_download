import React from "react";
import fileService from "../services/file.service";

const FileTable = (props) => {

  const { data } = props;
  const download = (filename) => {
    fileService.download(filename);
  }
  if (typeof data === "string") return <></>
  return !data.length ? (<></>) :
    (<>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">filename</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.filename}</td>
                <td><button onClick={() => download(item.filename)} 
                style={{
                  background: "#1ba685",
                  borderWidth: 0,
                  padding: 10,
                  color: "white",
                  borderRadius: 5,
                }}
                >download</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
    )
}

export default FileTable;