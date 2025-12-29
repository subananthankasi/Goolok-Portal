import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const ImageView = ({ url }) => {
  return (
    <>
      <div className="text-end">
        <a href={url} className="btn1" download>
          <FileDownloadIcon />
        </a>
      </div>
      <img src={url} width={"100%"} alt="new" />
    </>
  );
};

export default ImageView;
