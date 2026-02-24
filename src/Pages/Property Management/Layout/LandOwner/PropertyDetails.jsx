import React, { useEffect, useRef, useState } from "react"; 
import DataTable from "react-data-table-component"; 
import ExportButton from "../../../../Utils/ExportButton"; 
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";
import Toast from "../../../../Utils/Toast";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Spinner from "react-bootstrap/Spinner";

const PropertyDetails = ({basicDetails,surveyDetails,propertyID,statusType}) => {
 
  
  const land = [
    {
      name: "S.No",
      selector: (row,index) => index+1 || row["S.No"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "id",
      selector: (row) => row.id || row["id"],
      sortable: true,
      wrap: true,
      width:"150px"
    }, 
    {
      name: "Project name",
      selector: (row) => basicDetails.project_name,
      sortable: true,
      wrap: true,
      width:"150px"
    }, 
    {
      name: "Project ID",
      selector: (row) => row.glk_projectid || row["Project ID"],
      sortable: true,
      wrap: true,
      width:"150px"
    }, 
    {
      name: "Plot no",
      selector: (row) => row.glk_plotno || row["Plot no"],
      sortable: true,
      wrap: true,
    },
    {
      name: "sqft",
      selector: (row) => row.glk_sqft || row["sqft"],
      sortable: true,
      wrap: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.glk_surveyno || row["Survey No"],
      sortable: true,
      wrap: true,
    },
    {
      name: "Sub division",
      selector: (row) => row.glk_division || row["Sub division"],
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "SD unit",
      selector: (row) => row.glk_sdunit || row["SD unit"],
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "Road width",
      selector: (row) => row.glk_roadwidth || row["Road width"],
      sortable: true,
      wrap: true,
    },
    {
      name: "Plot facing",
      selector: (row) => row.glk_landfacing || row["Plot facing"],
      sortable: true,
      wrap: true,
    },
    {
      name: "East Dimension",
      selector: (row) => row.glk_east_dimension || row["East Dimension"],
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "East unit",
      selector: (row) => row.glk_eastunit || row["East unit"],
      sortable: true,
      wrap: true,
    },
    {
      name: "West Dimension",
      selector: (row) => row.glk_west_dimension || row["West Dimension"],
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "West unit",
      selector: (row) => row.glk_westunit || row["West unit"],
      sortable: true,
      wrap: true,
    },
    {
      name: "South Dimension",
      selector: (row) => row.glk_south_dimension || row["South Dimension"],
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "South unit",
      selector: (row) => row.glk_southunit || row["South unit"],
      sortable: true,
      wrap: true,
    },
    {
      name: "North Dimension",
      selector: (row) => row.glk_north_dimension || row["North Dimension"],
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "North unit",
      selector: (row) => row.glk_northunit || row["North unit"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Rate per cent or any unit",
      selector: (row) => row.agree_centprice || row["Rate per cent or any unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Total cost",
      selector: (row) =>row.agree_total || row["Total cost"],
      sortable: true,
      wrap: true,
    }, 
   
  ];



  const landAdmin = [
    {
      name: "S.No",
      selector: (row,index) => index + 1,
      sortable: true,
      wrap: true,
    },  
    {
      name: "Project name",
      selector: (row) => basicDetails.project_name,
      sortable: true,
      wrap: true,
      width:"150px"
    }, 
    {
      name: "Project ID",
      selector: (row) => row.glk_projectid,
      sortable: true,
      wrap: true,
      width:"150px"
    }, 
    {
      name: "Plot no",
      selector: (row) => row.glk_plotno,
      sortable: true,
      wrap: true,
    },
    {
      name: "sqft",
      selector: (row) => row.glk_sqft,
      sortable: true,
      wrap: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.glk_surveyno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Sub division",
      selector: (row) => row.glk_division,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "SD unit",
      selector: (row) => row.glk_sdunit,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "Road width",
      selector: (row) => row.glk_roadwidth,
      sortable: true,
      wrap: true,
    },
    {
      name: "Plot facing",
      selector: (row) => row.glk_landfacing,
      sortable: true,
      wrap: true,
    },
    {
      name: "East Dimension",
      selector: (row) => row.glk_east_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "East unit",
      selector: (row) => row.glk_eastunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "West Dimension",
      selector: (row) => row.glk_west_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "West unit",
      selector: (row) => row.glk_westunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "South Dimension",
      selector: (row) => row.glk_south_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "South unit",
      selector: (row) => row.glk_southunit,
      sortable: true,
      wrap: true,
    },
    {
      name: "North Dimension",
      selector: (row) => row.glk_north_dimension,
      sortable: true,
      width: "150px",
      wrap: true,
    },
    {
      name: "North unit",
      selector: (row) => row.glk_northunit,
      sortable: true,
      wrap: true,
    }, 
    
    {
      name: "Rate per cent or any unit",
      selector: (row) => row.agree_centprice,
      sortable: true,
      width:"150px",
      wrap: true,
    },  
    {
      name: "Total cost",
      selector: (row) => row.agree_total,
      sortable: true,
      wrap: true,
    }, 
   
  ];


  const details = surveyDetails ? surveyDetails : [];


 
 
 

  
  //   excel upload ==---------------------------------------------------------->
  const fileUploadRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
  const [finalData, setFinalData] = useState([]);

 
 

  useEffect(() => {
    const PreviewData = excelData.length > 0 ? excelData : details;
    setFinalData(PreviewData);
  }, [excelData,details]);


  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();     
 
    if(excelData.length == 0){
      alert("Please Upload File")
      return
    } 

    const data = finalData.map((item)=>({ 
      id:item["id"],
      agree_centprice:item["Rate per cent or any unit"]?item["Rate per cent or any unit"]:null,
      agree_total:item["Total cost"] ? item["Total cost"] :null,
    }))
 
    const form = new FormData();
    form.append("survey", JSON.stringify(data));
 
    setIsLoading(true)
    try{
         await axios.post(`${API_BASE_URL}/propertyupdate`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      Toast({ message: "Successfully Updated", type: "success" }); 
     setIsLoading(false) 
    }catch(error){
      alert("error on updating")
    }

  };

  const staffid = JSON.parse(localStorage.getItem('token')); 

  return (
    <div>
      <div className=""> 
      {staffid.logintype === "admin" || statusType ==="pending" || statusType ==="complete"?  (<>
        <div className="">
              <DataTable
                columns={landAdmin}
                data={finalData}
                customStyles={customStyle}
                pagination
                persistTableHead={true}
                fixedHeader
              />
            </div>
      </>):(
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
                columns={land}
                data={details}
                type={"Download Format"}
                filename={"layout_property_details"}
              />
            </div>
            <div className="p-3 mt-3"></div>

            <div className="">
              <DataTable
                columns={land}
                data={finalData}
                customStyles={customStyle}
                pagination
                persistTableHead={true}
                fixedHeader
              />
            </div>

            <div className="text-end py-3 px-3">
              <button className="btn1 me-2" style={{width:"100px"}} onClick={handleSubmit}> 
              {isLoading ? (
                              <>
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">wait...</span>
                              </>
                            ) : (
                              "Submit"
                            )} </button> 
          </div>

          </div>
      )}
      </div>

    
    
      
    </div>
  );
}

export default PropertyDetails;
