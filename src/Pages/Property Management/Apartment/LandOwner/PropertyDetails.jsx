import React, { useEffect, useRef, useState } from "react"; 
import DataTable from "react-data-table-component"; 
import ExportButton from "../../../../Utils/ExportButton"; 
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";

const PropertyDetails = () => {
 
  


  const apartmentColum = [
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
      width:"150px"
    }, 
    {
      name: "Flat no",
      selector: (row) => row["Flat no"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "UDS %",
      selector: (row) => row["UDS %"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "udscost",
      selector: (row) => row["udscost"],
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
      width:"140px",
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row["SD unit"],
      sortable: true, 
      wrap: true,
    }, 
    {
      name: "Town/village survey",
      selector: (row) => row["Town/village survey"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Common area",
      selector: (row) => row["Common area"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Common are cost",
      selector: (row) => row["Common are cost"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Built up area",
      selector: (row) => row["Built up area"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "sqft charges",
      selector: (row) => row["sqft charges"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Floor no",
      selector: (row) => row["Floor no"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "Total floors",
      selector: (row) => row["Total floors"],
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
      selector: (row) => row["No of bedroom"],
      sortable: true,
      wrap: true,
    },  
    {
      name: "No of bathrooms",
      selector: (row) => row["No of bathrooms"],
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
      name: "Total cost",
      selector: (row) => row["Total cost"],
      sortable: true,
      wrap: true,
    }, 
   
  ];

 
  const data = [
    {
      "S.No": 1,
      "Project ID": "G24APTO100",
      "Flat no": "FL001",
      "UDS %": 20,
      "udscost": 500000,
      "Survey No": "S001",
      "Sub division": 200,
      "SD unit": "sqft",
      "Town/village survey": "Town A",
      "Common area": "Garden, Pool",
      "Common are cost": 150000,
      "Built up area": 1000,
      "sqft charges": 3000,
      "Floor no": 2,
      "Total floors": 5,
      "Door facing": "North",
      "No of bedroom": 2,
      "No of bathrooms": 2,
      "No of balconies": 1,
      "Amenities": "Gym, Clubhouse",
      "Maintenance": 2000,
       "Status": "Unverify",
    },
    {
      "S.No": 2,
      "Project ID": "G24APTO100",
      "Flat no": "FL002",
      "UDS %": 25,
      "udscost": 600000,
      "Survey No": "S002",
      "Sub division": 200,
      "SD unit": "sqft",
      "Town/village survey": "Village B",
      "Common area": "Park, Playground",
      "Common are cost": 200000,
      "Built up area": 1200,
      "sqft charges": 3500,
      "Floor no": 3,
      "Total floors": 7,
      "Door facing": "East",
      "No of bedroom": 3,
      "No of bathrooms": 3,
      "No of balconies": 2,
      "Amenities": "Swimming Pool, Gym",
      "Maintenance": 2500,
       "Status": "Verify",
    },
    {
      "S.No": 3,
      "Project ID": "G24APTO100",
      "Flat no": "FL003",
      "UDS %": 30,
      "udscost": 700000,
      "Survey No": "S003",
      "Sub division": 200,
      "SD unit": "sqft",
      "Town/village survey": "Town C",
      "Common area": "Gym, Library",
      "Common are cost": 250000,
      "Built up area": 1400,
      "sqft charges": 4000,
      "Floor no": 4,
      "Total floors": 10,
      "Door facing": "South",
      "No of bedroom": 4,
      "No of bathrooms": 4,
      "No of balconies": 3,
      "Amenities": "Community Hall, Gym",
      "Maintenance": 3000,
       "Status": "Dispute",
    },
    // Add more dummy data as needed
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
                columns={apartmentColum}
                data={finalData}
                type={"Download Format"}
                filename={"apartment_upload_format"}
              />
            </div>
            <div className="p-3 mt-3"></div>

            <div className="">
              <DataTable
                columns={apartmentColum}
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
            columns={apartmentColum}
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
