import React, { useEffect, useRef, useState } from "react"; 
import DataTable from "react-data-table-component"; 
import ExportButton from "../../../../Utils/ExportButton"; 
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";

const PropertyDetails = () => {
 
  
  const farmHoueColum = [
    {
      name: "S.No",
      selector: (row) => row["S.No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Project ID",
      selector: (row) => row["Project ID"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Total Land area",
      selector: (row) => row["Total Land area"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "TLA unit",
      selector: (row) => row["TLA unit"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "East Dimension",
      selector: (row) => row["East Dimension"],
      sortable: true,
      width:"150px",
       wrap: true,
    }, 
    {
      name: "East unit",
      selector: (row) => row["East unit"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "West Dimension",
      selector: (row) => row["West Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "West unit",
      selector: (row) => row["West unit"],
      sortable: true,
       wrap: true,
    }, 
    {
      name: "South Dimension",
      selector: (row) => row["South Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "South unit",
      selector: (row) => row["South unit"],
      sortable: true,
       wrap: true,
    }, 
    {
      name: "North Dimension",
      selector: (row) => row["North Dimension"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "North unit",
      selector: (row) => row["North unit"],
      sortable: true, 
      wrap: true,
    },  
    {
      name: "f-line",
      selector: (row) => row["f-line"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "f-line unit",
      selector: (row) => row["f-line unit"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "G-line",
      selector: (row) => row["G-line"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "G-line unit",
      selector: (row) => row["G-line unit"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Survey No",
      selector: (row) => row["Survey No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Sub division",
      selector: (row) => row["Sub division"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row["SD unit"],
      sortable: true, 
      wrap: true,
    }, 
     
    {
      name: "Road width",
      selector: (row) => row["Road width"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Land facing",
      selector: (row) => row["Land facing"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Built up area",
      selector: (row) => row["Built up area"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of floors",
      selector: (row) => row["No of floors"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Door facing",
      selector: (row) => row["Door facing"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of bedroom",
      selector: (row) => row["No of bedroom"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of bathrooms",
      selector: (row) => row["No of bathrooms"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "No of balconies",
      selector: (row) => row["No of balconies"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    
    {
      name: "Land price per unit",
      selector: (row) => row["Land price per unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Built up area cost per unit ",
      selector: (row) => row["Built up area cost per unit "],
      sortable: true,
      width:"150px",
      wrap: true,
    },   
    {
      name: "Total cost",
      selector: (row) => row["Total cost"],
      sortable: true,
      wrap: true,
    }, 
   
  ];

 
  const data = [
    {
      "S.No": 1,
      "Project ID": "PRJ001",
      "Total Land area": 5000,
      "TLA unit": "sqft",
      "East Dimension": 50,
      "East unit": "ft",
      "West Dimension": 50,
      "West unit": "ft",
      "South Dimension": 100,
      "South unit": "ft",
      "North Dimension": 100,
      "North unit": "ft",
      "f-line": 25,
      "f-line unit": "ft",
      "G-line": 30,
      "G-line unit": "ft",
      "Survey No": "S001",
      "Sub division": 2000,
      "SD unit": "sqft",
      "Road width": "30ft",
      "Land facing": "North",
      "Built up area": 4000,
      "No of floors": 2,
      "Door facing": "East",
      "No of bedroom": 4,
      "No of bathrooms": 3,
      "No of balconies": 2,
 
       "Status": "Unverify"
    },
    {
      "S.No": 2,
      "Project ID": "PRJ002",
      "Total Land area": 6000,
      "TLA unit": "sqft",
      "East Dimension": 60,
      "East unit": "ft",
      "West Dimension": 60,
      "West unit": "ft",
      "South Dimension": 110,
      "South unit": "ft",
      "North Dimension": 110,
      "North unit": "ft",
      "f-line": 26,
      "f-line unit": "ft",
      "G-line": 32,
      "G-line unit": "ft",
      "Survey No": "S002",
      "Sub division": 2500,
      "SD unit": "sqft",
      "Road width": "35ft",
      "Land facing": "East",
      "Built up area": 5000,
      "No of floors": 3,
      "Door facing": "North",
      "No of bedroom": 5,
      "No of bathrooms": 4,
      "No of balconies": 3,
 
       "Status": "Verify"
    },
    {
      "S.No": 3,
      "Project ID": "PRJ003",
      "Total Land area": 7000,
      "TLA unit": "sqft",
      "East Dimension": 70,
      "East unit": "ft",
      "West Dimension": 70,
      "West unit": "ft",
      "South Dimension": 120,
      "South unit": "ft",
      "North Dimension": 120,
      "North unit": "ft",
      "f-line": 27,
      "f-line unit": "ft",
      "G-line": 34,
      "G-line unit": "ft",
      "Survey No": "S003",
      "Sub division": 3000,
      "SD unit": "sqft",
      "Road width": "40ft",
      "Land facing": "West",
      "Built up area": 6000,
      "No of floors": 4,
      "Door facing": "South",
      "No of bedroom": 6,
      "No of bathrooms": 5,
      "No of balconies": 4,
         "Status": "Dispute"
    },
    // Add more entries as needed
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
                columns={farmHoueColum}
                data={finalData}
                type={"Download Format"}
                filename={"apartment_upload_format"}
              />
            </div>
            <div className="p-3 mt-3"></div>

            <div className="">
              <DataTable
                columns={farmHoueColum}
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
            columns={farmHoueColum}
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

export default PropertyDetails;
