import React, { useEffect, useRef, useState } from "react"; 
import DataTable from "react-data-table-component"; 
import ExportButton from "../../../../Utils/ExportButton"; 
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";
import Toast from "../../../../Utils/Toast";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";

const PropertyDetails = ({basicDetails,surveyDetails,propertyID,statusType}) => {
 
 
  

  const land = [
    {
      name: "S.No",
      selector: (row) => row["S.No"],
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
      name: "Total Land area",
      selector: (row) =>  row.glk_totalarea || row["Total Land area"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "TLA unit",
      selector: (row) => row.glk_totalunit || row["TLA unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "f-line",
      selector: (row) => row.glk_fline || row["f-line"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "f-line unit",
      selector: (row) => row.glk_fline_unit || row["f-line unit"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Land facing",
      selector: (row) => row.glk_landfacing || row["Land facing"],
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
      width:"150px",
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row.glk_sdunit || row["SD unit"],
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "G-line",
      selector: (row) => row.glk_gline || row["G-line"],
      sortable: true,
      wrap: true,
    }, 
    {
      name: "G-line unit",
      selector: (row) => row.glk_glineunit || row["G-line unit"],
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
      name: "Total Land area",
      selector: (row) =>  row.glk_totalarea,
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "TLA unit",
      selector: (row) => row.glk_totalunit,
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "f-line",
      selector: (row) => row.glk_fline,
      sortable: true,
      wrap: true,
    }, 
    {
      name: "f-line unit",
      selector: (row) => row.glk_fline_unit,
      sortable: true,
      wrap: true,
    }, 
    {
      name: "Land facing",
      selector: (row) => row.glk_landfacing,
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
      width:"150px",
      wrap: true,
    }, 
    {
      name: "SD unit",
      selector: (row) => row.glk_sdunit,
      sortable: true,
      width:"150px",
      wrap: true,
    }, 
    {
      name: "G-line",
      selector: (row) => row.glk_gline,
      sortable: true,
      wrap: true,
    }, 
    {
      name: "G-line unit",
      selector: (row) => row.glk_glineunit,
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


  const handleSubmit = async(e) => {
    e.preventDefault();     
 
    const data = finalData.map((item)=>({ 
      id:item["id"],
      agree_centprice:item["Rate per cent or any unit"]?item["Rate per cent or any unit"]:null,
      agree_total:item["Total cost"] ? item["Total cost"] :null,
    }))
 
    const form = new FormData();
    form.append("survey", JSON.stringify(data));
 

    try{
         await axios.post(`${API_BASE_URL}/propertyupdate`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      Toast({ message: "Successfully Updated", type: "success" }); 
    }catch(error){
      alert("error on updating")
    }

  };

  const staffid = JSON.parse(sessionStorage.getItem('token')); 

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
                filename={"land_property_details"}
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
              <button className="btn1 me-2" style={{width:"100px"}} onClick={handleSubmit}> submit </button> 
          </div>

          </div>
      )}
      </div>

    
    
      
    </div>
  );
}

export default PropertyDetails;
