import React from "react";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ExportButton = ({ columns, data, filename, type }) => {
  const csvHeaders = columns?.map((column) => ({
    label: column?.name,
    key: column?.name,
  }));
  const csvData = data?.map((row) =>
    columns?.map((column) =>
      typeof column.selector === "function"
        ? column.selector(row)
        : row[column?.selector]
    )
  );

  return (
    <CSVLink
      data={[csvHeaders?.map((header) => header?.label), ...csvData]}
      filename={filename}
      className="btn1 me-2"
      data-tooltip-id="export"
    >
      <DownloadIcon />
      {type && <span style={{ marginLeft: "8px" }}>{type}</span>}
      <ReactTooltip
        id="export"
        place="bottom"
        content="Export"
        style={{ fontSize: "10px", zIndex: "1000" }}
      />
    </CSVLink>
  );
};

export default ExportButton;
