import React, { useEffect, useRef, useState } from "react"; 
import DataTable from "react-data-table-component"; 
import ExportButton from "../../../../Utils/ExportButton"; 
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";

const PropertyDetails = () => {
 
  

  const  villaColum = [
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
      width:"140px"
    }, 
    {
      name: "Plot no",
      selector: (row) => row["Plot no"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "sqft",
      selector: (row) => row["sqft"],
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
      width:"150px",
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row["SD unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "Road width",
      selector: (row) => row["Road width"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Plot facing",
      selector: (row) => row["Plot facing"],
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
      width:"150px",
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
      width:"150px",
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
      width:"150px",
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
      width:"150px",
      wrap: true,
    },  
    {
      name: "Built up area",
      selector: (row) => row["Built up area"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of floors",
      selector: (row) => row["No of floors"],
      sortable: true,
      wrap: true,
    },   
    {
      name: "Door facing",
      selector: (row) => row["Door facing"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bedroom",
      selector: (row) => row["no of bedroom"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bathrooms",
      selector: (row) => row["no of bathrooms"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of balconies",
      selector: (row) => row["No of balconies"],
      sortable: true,
      wrap: true,
    },  
   
    {
      name: "Plot price per unit",
      selector: (row) => row["Plot price per unit"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Built up area cost per unit",
      selector: (row) => row["Built up area cost per unit"],
      sortable: true,
      wrap: true,
      width:"130px"
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
      "Project ID": "G24VLAO100",
      "Plot no": "P001",
      "sqft": 2000,
      "Survey No": "S001",
      "Sub division": 500,
      "SD unit": "sqft",
      "Road width": "20ft",
      "Plot facing": "North",
      "East Dimension": 50,
      "East unit": "ft",
      "West Dimension": 50,
      "West unit": "ft",
      "South Dimension": 40,
      "South unit": "ft",
      "North Dimension": 40,
      "North unit": "ft",
      "Built up area": 1800,
      "No of floors": 2,
      "Door facing": "East",
      "no of bedroom": 3,
      "no of bathrooms": 2,
      "No of balconies": 1,
      "Plot price per unit": 1500,
      "Built up area cost per unit": 1200,
       "Status": "Unverify",
    },
    {
      "S.No": 2,
      "Project ID": "G24VLAO100",
      "Plot no": "P002",
      "sqft": 2500,
      "Survey No": "S002",
      "Sub division": 600,
      "SD unit": "sqft",
      "Road width": "25ft",
      "Plot facing": "East",
      "East Dimension": 60,
      "East unit": "ft",
      "West Dimension": 60,
      "West unit": "ft",
      "South Dimension": 45,
      "South unit": "ft",
      "North Dimension": 45,
      "North unit": "ft",
      "Built up area": 2200,
      "No of floors": 2,
      "Door facing": "North",
      "no of bedroom": 4,
      "no of bathrooms": 3,
      "No of balconies": 2,
      "Plot price per unit": 1600,
      "Built up area cost per unit": 1300,
       "Status": "Verify",
    },
    {
      "S.No": 3,
      "Project ID": "G24VLAO100",
      "Plot no": "P003",
      "sqft": 3000,
      "Survey No": "S003",
      "Sub division": 700,
      "SD unit": "sqft",
      "Road width": "30ft",
      "Plot facing": "West",
      "East Dimension": 70,
      "East unit": "ft",
      "West Dimension": 70,
      "West unit": "ft",
      "South Dimension": 50,
      "South unit": "ft",
      "North Dimension": 50,
      "North unit": "ft",
      "Built up area": 2500,
      "No of floors": 3,
      "Door facing": "West",
      "no of bedroom": 5,
      "no of bathrooms": 4,
      "No of balconies": 3,
      "Plot price per unit": 1700,
      "Built up area cost per unit": 1400,
       "Status": "Dispute",
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
                columns={villaColum}
                data={finalData}
                type={"Download Format"}
                filename={"apartment_upload_format"}
              />
            </div>
            <div className="p-3 mt-3"></div>

            <div className="">
              <DataTable
                columns={villaColum}
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
            columns={villaColum}
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
