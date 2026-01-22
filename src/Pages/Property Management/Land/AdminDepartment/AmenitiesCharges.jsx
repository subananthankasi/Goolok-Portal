import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import customStyle from "../../../../Utils/tableStyle";
import ExcelFileUpload from "../../../../Utils/ExcelFileUpload";
import ExportButton from "../../../../Utils/ExportButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAmenities } from "../../../../Redux/Actions/Amenities/AmenitiesAction";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import axios from "axios";

function AmenitiesCharges({ basicDetails,surveyDetails,statusType}) {
 
  
  const AmnenitiestData = useSelector((state) => state.Amenities.Amenities);

  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(fetchAmenities());
  }, [dispatch]);




  //   excel upload ==---------------------------------------------------------->
  const fileUploadRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const details = surveyDetails ? surveyDetails : [];
 
  useEffect(() => {
    const PreviewData = excelData.length > 0 ? excelData : details;
    setFinalData(PreviewData);
  }, [excelData,details]);





  let selectedAmenities = [];
 
  if (basicDetails.survey_amenities) {
    try {
      selectedAmenities = JSON.parse(basicDetails.survey_amenities); 
      if (!Array.isArray(selectedAmenities)) {
        selectedAmenities = [];
      }
    } catch (error) {
      console.error('Error parsing survey_amenities:', error);
      selectedAmenities = [];
    }
  }
  const filterData = (AmnenitiestData || []).filter((item) => {
    return selectedAmenities.includes(item.id);
  }); 
 
 


  // old data amenities charges set on data table 
  const amenitiesWithChargesArray = surveyDetails.map((data)=> JSON.parse(data.agree_amtprice))  

  const originalNames = Array.from(new Set(amenitiesWithChargesArray.flat().map((item) => item.name)));

  const headers = []; 
  const Goolokheaders = []; 

  originalNames.forEach((name) => {
    headers.push(name);
    headers.push(`goolok ${name}`);
    Goolokheaders.push(`goolok ${name}`);
  }); 
 
 
    const dynamicColumns = headers.map((name) => ({
      name: name,
      selector: (row) => row[name],
      sortable: true,
      wrap: true,
    }));

 
  

 
const enrichedLandData = finalData.map((item, index) => {
  const prices = JSON.parse(item.agree_amtprice || '[]');
  const adminPrices = JSON.parse(item.admin_amtprice || '[]');

  // const priceObject = prices.reduce((acc, { name, price }) => {
  //     acc[name] = price;
  //     return acc;
  // }, {});
 const priceObject = Array.isArray(prices) ? prices.reduce((acc, { name, price }) => {
    acc[name] = price;
    return acc;
  }, {}) : {};

  // const adminPriceObject = adminPrices.reduce((acc, { name, price }) => {
  //     acc[name] = price;
  //     return acc;
  // }, {});

  const adminPriceObject = Array.isArray(adminPrices) ? adminPrices.reduce((acc, { name, price }) => {
    acc[name] = price;
    return acc;
  }, {}) : {};
  return {
      ...item,
      ...priceObject,
      ...adminPriceObject
  };
});   
 

  const columns = [
    {
      name: "S.No",
      selector: (row,index) => index+1,
      sortable: true,
      wrap: true,
    },
    {
      name: "id",
      selector: (row) => row.id || row["id"],
      sortable: true,
      wrap: true,
    },
    {
      name: "Project Name",
      selector: (row) => basicDetails.project_name,
      wrap: true,
      width: "150px",
      sortable: true,
    }, 
    {
      name: "Total Land Area",
      selector: (row) => row.glk_totalarea || row["Total Land Area"],
      wrap: true,
      width: "150px",
      sortable: true,
    },
    {
      name: "Total Land Area(Unit)",
      selector: (row) => row.glk_totalunit || row["Total Land Area(Unit)"],
      wrap: true,
      width: "150px",
      sortable: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.glk_surveyno || row["Survey No"],
      wrap: true,
      sortable: true,
    },
    {
      name: "Sub Division",
      selector: (row) => row.glk_division || row["Sub Division"],
      wrap: true,
      width: "130px",
      sortable: true,
    },
 
    // ...dynamicColumns
    ...excelData.length > 0 ?(
      headers.map((item) => ({
      name: item ,  
      selector: (row) => row[item],  
      wrap: true,
      sortable: false, 
    }))
    ):(dynamicColumns) 
    
 

 

  ];

  
  const columnAdmin = [
    {
      name: "S.No",
      selector: (row,index) => index+1,
      sortable: true,
      wrap: true,
    },
    
    {
      name: "Project Name",
      selector: (row) => basicDetails.project_name,
      wrap: true, 
      sortable: true,
    }, 
    {
      name: "Total Land Area",
      selector: (row) => row.glk_totalarea,
      wrap: true, 
      sortable: true,
    },
    {
      name: "Total Land Area(Unit)",
      selector: (row) => row.glk_totalunit,
      wrap: true, 
      sortable: true,
    },
    {
      name: "Survey No",
      selector: (row) => row.glk_surveyno,
      wrap: true,
      sortable: true,
    },
    {
      name: "Sub Division",
      selector: (row) => row.glk_division,
      wrap: true, 
      sortable: true,
    },
 
    ...dynamicColumns
 
  ];
 




  const handleSubmit = async(e) => {
    e.preventDefault();
   
     const selectedAmenitiesNames = Goolokheaders.map(item => item);
   
     const adminPriceDetails = finalData.map(data => {
      let amenitiesPrices = [];
      const id = data.id
      selectedAmenitiesNames.forEach(amenity => { 
         
        if (data.hasOwnProperty(amenity)) { 
          amenitiesPrices.push({
            name: amenity,
            price: data[amenity]
          });
        }
      });
  
      return { id: id, admin_amtprice: amenitiesPrices };
    });
 

    try{
         await axios.post(`${API_BASE_URL}/adminamenities`, adminPriceDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      Toast({ message: "Successfully Updated", type: "success" }); 
    }catch(error){
      alert("error on updating")
    }


  };
  
  
  
  
  const staffid = JSON.parse(localStorage.getItem('token')); 
  


  return (
    <div>
      <div className="">
      {staffid.logintype === "admin" || statusType ==="pending" || statusType ==="complete"?  (
        <>
            <div className="">
            <DataTable
              columns={columnAdmin}
              data={enrichedLandData}
              customStyles={customStyle}
              pagination
              persistTableHead={true}
              fixedHeader
            />
          </div>
          </>
      ) : ( 
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
              data={enrichedLandData}
              type={"Download Format"}
              filename={"land_Amenities_Charges_uploading_format.csv"}
            />
          </div>
          <div className="p-3 mt-3"></div>

          <div className="">
            <DataTable
              columns={columns}
              data={enrichedLandData}
              customStyles={customStyle}
              pagination
              persistTableHead={true}
              fixedHeader
            />
          </div>

          <div className="text-start py-3 px-3">
              <button className="btn1 me-2" style={{width:"100px"}} onClick={handleSubmit}> submit </button> 
          </div>
          
        
        </div>
      )}
      </div>
    </div>
  );
}

export default AmenitiesCharges;

 