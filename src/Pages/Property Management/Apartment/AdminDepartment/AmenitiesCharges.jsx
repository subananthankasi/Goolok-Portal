import React, { useEffect, useRef, useState } from "react"; 
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; 
import ExportButton from "../../../../Utils/ExportButton";
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";
function AmenitiesCharges() {

  
  const columns = [
    {
      name: "S.No",
      selector: (row) => row["S.No"],
      sortable: true,
      wrap: true,
    },
    {
        name: "Project Name",
        selector: (row) => row["Project Name"],
        wrap: true,
        width: "150px",
        sortable: true,
      },
      {
        name: "Plot no/Door no",
        selector: (row) => row["Plot no/Door no"],
        wrap: true,
        width:"150px",
        sortable: true,
      },
      {
        name: "Plot Area (sqft)",
        selector: (row) => row["Plot Area (sqft)"],
        wrap: true,
        width: "150px",
        sortable: true,
      },
      {
        name: "Survey No",
        selector: (row) => row["Survey No"],
        wrap: true,
        sortable: true,
      },
      {
        name: "Sub Division",
        selector: (row) => row["Sub Division"],
        wrap: true,
        width: "130px",
        sortable: true,
      },
 
    {
      name: "Tree",
      selector: (row) => row["Tree"],
      wrap: true,
      sortable: true,
    },
    {
      name: "Goolok Tree",
      selector: (row) => row["Goolok Tree"],
      wrap: true,
      sortable: true,
    },
    {
      name: "Well",
      selector: (row) => row["Well"],
      wrap: true,
      sortable: true,
    },
    {
      name: "Goolok Well",
      selector: (row) => row["Goolok Well"],
      wrap: true,
      sortable: true,
    },
    {
      name: "Nearby River, Lake",
      selector: (row) => row["Nearby River, Lake"],
      wrap: true,
      sortable: true,
      width:"180px"
    },
    {
      name: "Goolok Nearby River, Lake",
      selector: (row) => row["Goolok Nearby River, Lake"],
      wrap: true,
      sortable: true,
      width:"200px"
    },

  ];


  const data = [
    {
      "S.No": 1,
      "Project Name": "Alpha Construction",
      "Plot no/Door no": 1,
      "Plot Area (sqft)": "894 sqft",
      "Survey No": 547,
      "Sub Division": 874, 
      "Closet or other storage space": 500, 
      "Dishwasher": 450, 
      "Sink garbage disposal": 800, 
      "Microwave": 400, 
      "Air conditioning": 150, 
      "Clubhouse": 200, 
      "Kids Jungle Gym": 1000, 

    },
   
  ];
  //   excel upload ==---------------------------------------------------------->
  const fileUploadRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
  const [finalData, setFinalData] = useState([]);

 
  const [subStep, setSubStep] = useState(1);

  useEffect(() => {
    const PreviewData = excelData.length > 0 ? excelData : data;
    setFinalData(PreviewData);
  }, [excelData]);

  return (
    <div>
      <div className="">
        <div>
          <nav className="d-flex">
            <a
              className={`tab_custom link11 ${subStep === 1 ? "active2" : ""}`}
              href="#"
              onClick={() => setSubStep(1)}
            >
              Upload
            </a>

            <a
              className={`tab_custom link11 ${subStep === 2 ? "active2" : ""}`}
              href="#"
              onClick={() => setSubStep(2)}
            >
              Report
            </a>
          </nav>
        </div>

        {subStep === 1 && (
          <div className="row mt-4">
            <div className="col-lg">
              <div className="w-50">
                <h6 className="page_heading">Excel Upload</h6>
                <ExcelFileUpload
                  setExcelData={setExcelData}
                  fileInputRef={fileUploadRef}
                />
              </div>
            </div>

            <div className="col-auto">
              <h4 className="page_heading">Excel Format</h4>
              <ExportButton
                columns={columns}
                data={data}
                type={"Download Format"}
                filename={"Land_Amenities_Goolok_Charges_uploading_format.csv"}
              />
            </div>
            <div className="p-3 mt-3"></div>

            <div className="">
              <DataTable
                columns={columns}
                data={finalData}
                customStyles={customStyle}
                pagination
                persistTableHead={true}
                fixedHeader
              />
            </div>
          </div>
        )}
      </div>

      {subStep === 2 && (
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={excelData}
            customStyles={customStyle}
            pagination
            persistTableHead={true}
            fixedHeader
          />
        </div>
      )}
    </div>
  );
}

export default AmenitiesCharges;
