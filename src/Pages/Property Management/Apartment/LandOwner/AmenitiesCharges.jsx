import React, { useEffect, useRef, useState } from 'react' 
import DataTable from 'react-data-table-component';  
import customStyle from '../../../../Utils/tableStyle';
import ExcelFileUpload from '../../../../Utils/ExcelFileUpload';
import ExportButton from '../../../../Utils/ExportButton';

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
      name: "Well",
      selector: (row) => row["Well"],
      wrap: true,
      sortable: true,
    },
    {
      name: "Nearby River, Lake",
      selector: (row) => row["Nearby River, Lake"],
      wrap: true,
      sortable: true,
    },

  ];


    const data =[
        {
          "S.No":1,
          "Project Name":"Alpha Construction",
          "Plot no/Door no":1,
          "Plot Area (sqft)":"894 sqft",
          "Survey No":547,
          "Sub Division":874,
          "Land Area (unit)":"Sqft",
          "Plot Facing":"North",
          "four sides measurement (East,West,North,South)":"548,458,475,587",
          "Built up Area (unit)":"980",
          "Super Built up area (unit)":"580",
          "carpet area (unit)":"sqft",
          "Door Facing":"North",
          "Floor":8,
          "Parking - Covered/Open":"open",
          "No.of Parking":2,
          "CORPUS FUND":"yes",
          "REG COST":"5810",
          "Legal":"yes",
          "GST":"58741256325",
          "Documentation Charges":510,
          "Patta Charges":450,
          "Development Charges":1500,
          "Other Expenses":25000,
          "EB Charges":580,
          "Metro Water":450,
          "Sewage Charges":210,
          "Piped Natural Gas Connection":450,
          "Maintenance charges":5000
        },
        {
          "S.No":2,
          "Project Name":"Alpha Construction",
          "Plot no/Door no":1,
          "Plot Area (sqft)":"894 sqft",
          "Survey No":547,
          "Sub Division":874,
          "Land Area (unit)":"Sqft",
          "Plot Facing":"North",
          "four sides measurement (East,West,North,South)":"548,458,475,587",
          "Built up Area (unit)":"980",
          "Super Built up area (unit)":"580",
          "carpet area (unit)":"sqft",
          "Door Facing":"North",
          "Floor":8,
          "Parking - Covered/Open":"open",
          "No.of Parking":2,
          "CORPUS FUND":"yes",
          "REG COST":"5810",
          "Legal":"yes",
          "GST":"58741256325",
          "Documentation Charges":510,
          "Patta Charges":450,
          "Development Charges":1500,
          "Other Expenses":25000,
          "EB Charges":580,
          "Metro Water":450,
          "Sewage Charges":210,
          "Piped Natural Gas Connection":450,
          "Maintenance charges":5000
        }
      ]
//   excel upload ==---------------------------------------------------------->
    const fileUploadRef = useRef(null);
    const [excelData, setExcelData] = useState([]);
    const [finalData, setFinalData] = useState([]);

 
 
    const [subStep, setSubStep] = useState(1);

    useEffect(()=>{
        const PreviewData = excelData.length > 0 ? excelData : data;
        setFinalData(PreviewData)
    },[excelData])

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
                filename={"Amenities_Charges_uploading_format.csv"}
              />
            </div>
            <div className="p-3 mt-3">
            
            </div>

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
  )
}

export default AmenitiesCharges