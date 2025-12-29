import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import DataTable from "react-data-table-component";   
import { useLocation, useNavigate } from "react-router-dom";
import customStyle from "../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendor } from "../../../Redux/Actions/MasterPage/VendorAction";
import FileDownloadIcon from '@mui/icons-material/Visibility';
import { fetchSRODetails } from "../../../Redux/Actions/MasterPage/SRODetailsAction";
import Spinner from 'react-bootstrap/Spinner';
import FileView from "../../../Utils/FileView/FileView";


function ViewAllDetails() {

 

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

 

 

// ************************************
//  Property view 
// ************************************
const [stepProperty, setStepProperty] = useState(1);
const location = useLocation(); 
const queryParams = new URLSearchParams(location.search); 
const id = queryParams.get('id');
const statusType = queryParams.get('status');
const propertyType = queryParams.get('type');

const columnSurveyLand = [
  {
    name: "S.No",
    selector: (row,index) => index+1,
    sortable: true,
    wrap: true,
  },
  {
    name: "Project ID",
    selector: (row) => row.glk_projectid,
    sortable: true,
    wrap: true,
  },
  {
    name: "Total Land area",
    selector: (row) => row.glk_totalarea,
    sortable: true,
    width: "150px",
    wrap: true,
  },
  {
    name: "TLA Unit",
    selector: (row) => row.glk_totalunit,
    sortable: true,
    wrap: true,
  },
  {
    name: "f-line",
    selector: (row) => row.glk_fline,
    sortable: true,
    wrap: true,
  },
  {
    name: "f-line Unit",
    selector: (row) => row.glk_fline_unit,
    sortable: true,
    wrap: true,
  },
  {
    name: "G-line",
    selector: (row) => row.glk_gline,
    sortable: true,
    wrap: true,
  },
  {
    name: "Gline Unit",
    selector: (row) => row.glk_glineunit,
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
    width: "150px",
    wrap: true,
  },
  {
    name: "SD Unit",
    selector: (row) => row.glk_sdunit,
    sortable: true,
    wrap: true,
  },


];
const columnSurveyLayout = [
  {
    name: "S.No",
    selector: (row,index) =>index + 1,
    sortable: true,
    wrap: true,
  },
  {
    name: "Project ID",
    selector: (row) => row.glk_projectid,
    sortable: true,
    wrap: true,
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
];

 let columnSurvey;
 let urlLink;
  switch (propertyType) {
    case 'Land':
      columnSurvey = columnSurveyLand;
      urlLink = 'land'
      break;
    case 'Layout':
      columnSurvey = columnSurveyLayout;
      urlLink = 'layout' 
      break;
    case 'C':
      columnSurvey = <div>Content for C</div>;
      break;
    default:
      columnSurvey = [];
  }


const [land,SetLand] = useState([])
const [doc,SetDoc] = useState([])
const [survey,SetSurvey] = useState([]) 

// get vendor details 
const dispatch = useDispatch(); 
const vendorData = useSelector((state) => state.vendor.vendorData) 
const getVendor = land?.vendor ? vendorData.filter((data) => data.id === land.vendor): [];

useEffect(()=>{
  dispatch(fetchVendor())
    if(land.project_document){
      const parsedObject = JSON.parse(land.project_document);
      SetDoc(parsedObject)
    }
},[land.project_document,dispatch])

const [loading,setLoading] = useState(true)

useEffect(() => {
    axios.get(`${API_BASE_URL}/project/${id}`, {
      headers: { 
        'Gl-Status':statusType,    
      },
  })
      .then(response => {
        SetLand(response.data[0].land);
        SetSurvey(response.data[0].survey); 
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
      });
  }, [id,statusType]);






 
// ************************************
//  Field survey Department
// ************************************  
const [stepField, setStepField] = useState(1);
const columnMarketResearch = [
  {
    name: "S.no",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  },
  {
    name: "Name ",
    selector: (row) => row.owner_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Location",
    selector: (row) => row.location,
    wrap: true,
    width: "180px",
    sortable: true,
  },
  {
    name: "Directions",
    selector: (row) => row.direction,
    wrap: true,
    width: "180px",
    sortable: true,
  },
  {
    name: "Per sqft ",
    selector: (row) => row.per_sqft,
    wrap: true,
    sortable: true,
  },
  {
    name: "Distance Km ",
    selector: (row) => row.distance ,
    wrap: true,
    sortable: true,
  } ,
  {
    name: "Mobile No 1",
    selector: (row) => row.mobile,
    wrap: true,
    sortable: true,
  },
  {
    name: "Mobile No 2",
    selector: (row) => row.mobilef,
    wrap: true,
    sortable: true,
  },
];
const columnSurveyVerifyLand = [
  {
    name: "S.No",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Project ID",
    selector: (row) => row.glk_projectid,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Total Land area",
    selector: (row) => row.glk_totalarea,
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
    name: "Status",
    selector: (row) => row.status,
    wrap: true,
    width: "120px",
    sortable: true,
  }
 
];
const columnSurveyVerifyLayout = [
  {
    name: "S.No",
    selector: (row,index) =>index + 1,
    sortable: true,
    wrap: true,
  },
  {
    name: "Project ID",
    selector: (row) => row.glk_projectid,
    sortable: true,
    wrap: true,
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
    name: "Status",
    selector: (row) => row.status,
    wrap: true,
    width: "120px",
    sortable: true,
  }
 
];

let columnSurveyVerify;

  switch (propertyType) {
    case 'Land':
      columnSurveyVerify = columnSurveyVerifyLand;
      break;
    case 'Layout':
      columnSurveyVerify = columnSurveyVerifyLayout;
      break;
    case 'C':
      columnSurveyVerify = <div>Content for C</div>;
      break;
    default:
      columnSurveyVerify = [];
  }

const [fieldDetails,setFieldDetails] = useState([])
const [surveyDetails,setSurveyDetails] = useState([]) 
const [market,setMarket] = useState([]) 


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projectsurvey/${id}`, {
        headers: {
          'Gl-Status':statusType 
        },
      }); 
      setFieldDetails(response.data[0].land);
      setSurveyDetails(response.data[0].survey);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [id,statusType]);

const [marketId,setMarketId] = useState("")
useEffect(()=>{
if(fieldDetails){
  setMarketId(fieldDetails.id)
}
},[fieldDetails])
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/market/${marketId}`); 
      setMarket(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [marketId]);

// get sro details 
const SRODetailsData = useSelector((state) => state.SRODetails.SRODetailsData); 
useEffect(() => {
  dispatch(fetchSRODetails());
}, [dispatch]);
const getSro = SRODetailsData.filter((data) => data.id === fieldDetails.sro_details) 
 
// view amenities 
const [amenitiesData,setAmenitiesData] = useState([]) 
useEffect(()=>{
  const fetch = async()=>{
    try{
      const response = await axios.get(`${API_BASE_URL}/landamenities`)
      setAmenitiesData(response.data)
    }catch(error){
      console.error(error)
    }
  }
  fetch()
},[])
const [selectedIds, setSelectedIds] = useState([]); 

useEffect(() => {
  if (fieldDetails && fieldDetails.survey_amenities) {
    try {
      const data = JSON.parse(fieldDetails.survey_amenities);
      setSelectedIds(data);
    } catch (error) {
      console.error('Error parsing JSON:', error); 
    }
  } else { 
  }
}, [fieldDetails]);




{/* 
// ************************************
// Land Owner agreement
// ************************************ */}
const [stepOwner, setStepOwner] = useState(1);
const [landOwner,setLandOwner] = useState([])
const [landOwnerSurvey,setLandOwnerSurvey] = useState([])
const [bankData,setBankData] = useState([])
const [contactData,setContactData] = useState([])
 
const headers = Array.from(
  new Set(
    landOwnerSurvey.flatMap((row) => {
      const amtPrice = JSON.parse(row.agree_amtprice);   
      return amtPrice.map((item) => item.name);   
    })
  )
);

const columnAmenitiesChargeLand = [
  {
    name: "S.No",
    selector: (row,index) => index+1,
    sortable: true,
    wrap: true,
  },
  
  {
    name: "Project Name",
    selector: (row) =>landOwner.project,
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
  ...headers.map((headerName) => ({
    name: headerName,  
    selector: (row) => {
      const amtPrice = JSON.parse(row.agree_amtprice);   
      const currentItem = amtPrice.find((item) => item.name === headerName);   
      return currentItem ? currentItem.price : "N/A";   
    },
    wrap: true,
    sortable: false,
  }))
 
];
const columnAmenitiesChargeLayout = [
  {
    name: "S.No",
    selector: (row, index) => index + 1,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Project Name",
    selector: (row) => landOwner.project,
    wrap: true,
    width: "150px",
    sortable: true,
  },
  {
    name: "Plot No",
    selector: (row) => row.glk_plotno || row["Plot No"],
    wrap: true, 
    sortable: true,
  },
  {
    name: "Plot Area(sqft)",
    selector: (row) => row.glk_sqft,
    wrap: true,
    width: "150px",
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
    width: "130px",
    sortable: true,
  },
  // ...dynamicColumns
  ...headers.map((headerName) => ({
    name: headerName,  
    selector: (row) => {
      const amtPrice = JSON.parse(row.agree_amtprice);   
      const currentItem = amtPrice.find((item) => item.name === headerName);   
      return currentItem ? currentItem.price : "N/A";   
    },
    wrap: true,
    sortable: false,
  })) 
];

const columnPropertyDetailsLand = [
  {
    name: "S.No",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  },  
  {
    name: "Project name",
    selector: (row) => landOwner.project_name,
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
const columnPropertyDetailsLayout = [
  {
    name: "S.No",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  },  
  {
    name: "Project name",
    selector: (row) => landOwner.project,
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

const columnContact = [
  {
    name: "sl.no",
    selector: (row,index) =>index+1,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Name",
    selector: (row) => row.contact_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.contact_phone,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Remarks",
    selector: (row) => row.remark,
    wrap: true,
    sortable: true,
  },
];
const columnsBank = [
  {
    name: "sl.no",
    selector: (row,index) => index+1,
    sortable: true,
    wrap: true,
  },
  {
    name: "Account Name",
    selector: (row) => row.account_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Account Number",
    selector: (row) => row.account_no,
    wrap: true,
    width: "180px",
    sortable: true,
  },
  {
    name: "IFSC Code",
    selector: (row) => row.account_ifsc,
    wrap: true,
    sortable: true,
  },
  {
    name: "Bank Name",
    selector: (row) => row.account_bank,
    wrap: true,
    sortable: true,
  },
  {
    name: "Bank Branch",
    selector: (row) => row.account_branch,
    wrap: true,
    sortable: true,
  }, 
];

let columnOwnerAmenities;
let columnOwnerPropertyDetails;

  switch (propertyType) {
    case 'Land':
      columnOwnerAmenities = columnAmenitiesChargeLand;
      columnOwnerPropertyDetails = columnPropertyDetailsLand;
      break;
    case 'Layout':
      columnOwnerAmenities = columnAmenitiesChargeLayout;
      columnOwnerPropertyDetails = columnPropertyDetailsLayout;
      break;
    case 'C':
      columnOwnerAmenities = <div>Content for C</div>;
      columnOwnerPropertyDetails = <div>Content for C</div>;
      break;
    default:
      columnOwnerAmenities = [];
      columnOwnerPropertyDetails = [];
  }
 
useEffect(() => {
  const data ={
    id:id
  }
  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/projectagree`,data, {
        headers: {
          'Gl-Status':statusType
        },
      }); 
      setLandOwner(response.data[0].land)
      setLandOwnerSurvey(response.data[0].survey)
    } catch (error) {
      console.error('Error fetching land data:', error);
    }
  };

  fetchData();
}, [id,statusType]);


useEffect(() => { 
    const fetchData = async () => { 
      try {
        const response = await axios.get(`${API_BASE_URL}/contactdetails/${landOwner.id}`);
        setContactData(response.data);
      } catch (err) {
        console.error(err.message);
      }  
    }; 
    fetchData(); 
}, [landOwner]);  

useEffect(() => { 
  const fetchData = async () => { 
    try {
      const response = await axios.get(`${API_BASE_URL}/bankdetails/${landOwner.id}`);
      setBankData(response.data);
    } catch (err) {
      console.error(err.message);
    }  
  }; 
  fetchData(); 
}, [landOwner]);  

// 









{/* 
// ************************************
// Admin Department
// ************************************ */}
const [stepAdmin, setStepAdmin] = useState(1);
const [adminData,setAdminData] = useState([]);

 // amenities price and property details data get from land owner section 
const Goolokheaders = Array.from(
  new Set(
    landOwnerSurvey.flatMap((row) => {
      const amtPrice = JSON.parse(row.admin_amtprice);   
      return amtPrice.map((item) => item.name);   
    })
  )
);



const adminAmenitiesPriceLand = [
  {
    name: "S.No",
    selector: (row,index) => index+1,
    sortable: true,
    wrap: true,
  },
  
  {
    name: "Project Name",
    selector: (row) =>landOwner.project_name,
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
  ...headers.map((headerName) => ({
    name: headerName,  
    selector: (row) => {
      const amtPrice = JSON.parse(row.agree_amtprice);   
      const currentItem = amtPrice.find((item) => item.name === headerName);   
      return currentItem ? currentItem.price : "N/A";   
    },
    wrap: true,
    sortable: false,
  })),
  ...Goolokheaders.map((headerName) => ({
    name: headerName,  
    selector: (row) => {
      const amtPrice = JSON.parse(row.admin_amtprice);   
      const currentItem = amtPrice.find((item) => item.name === headerName);   
      return currentItem ? currentItem.price : "N/A";   
    },
    wrap: true,
    sortable: false,
  })),

];

const adminAmenitiesPriceLayout = [
  {
    name: "S.No",
    selector: (row,index) => index+1,
    sortable: true,
    wrap: true,
  },
  
  {
    name: "Project Name",
    selector: (row) => landOwner.project_name,
    wrap: true, 
    sortable: true,
  }, 
  {
    name: "Plot No",
    selector: (row) => row.glk_plotno || row["Plot No"],
    wrap: true, 
    sortable: true,
  },
  {
    name: "Plot Area(sqft)",
    selector: (row) => row.glk_sqft,
    wrap: true,
    width: "150px",
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
    width: "130px",
    sortable: true,
  },
  ...headers.map((headerName) => ({
    name: headerName,  
    selector: (row) => {
      const amtPrice = JSON.parse(row.agree_amtprice);   
      const currentItem = amtPrice.find((item) => item.name === headerName);   
      return currentItem ? currentItem.price : "N/A";   
    },
    wrap: true,
    sortable: false,
  })),
  ...Goolokheaders.map((headerName) => ({
    name: headerName,  
    selector: (row) => {
      const amtPrice = JSON.parse(row.admin_amtprice);   
      const currentItem = amtPrice.find((item) => item.name === headerName);   
      return currentItem ? currentItem.price : "N/A";   
    },
    wrap: true,
    sortable: false,
  })),
];

const adminPropertyChargeLand = [
  {
    name: "S.No",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  },  
  {
    name: "Project name",
    selector: (row) => row.project_name,
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
    name: "Goolok Rate per cent or any unit",
    selector: (row) => row.admin_centprice,
    sortable: true,
    width:"150px",
    wrap: true,
  },  
  {
    name: "Total cost",
    selector: (row) =>row.agree_total,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Goolok Total cost",
    selector: (row) =>row.admin_total,
    sortable: true,
    wrap: true,
  }, 
 
];

const adminPropertyChargeLayout = [
  {
    name: "S.No",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  },  
  {
    name: "Project name",
    selector: (row) => landOwner.project_name,
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
    name: "Goolok Rate per cent or any unit",
    selector: (row) => row.admin_centprice,
    sortable: true,
    width:"150px",
    wrap: true,
  },  
  {
    name: "Total cost",
    selector: (row) =>row.agree_total,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Goolok Total cost",
    selector: (row) =>row.admin_total,
    sortable: true,
    wrap: true,
  }, 
 
];

let adminAmenitiesPrice;
let adminPropertyCharge;

  switch (propertyType) {
    case 'Land':
      adminAmenitiesPrice = adminAmenitiesPriceLand;
      adminPropertyCharge = adminPropertyChargeLand;
      break;
    case 'Layout':
      adminAmenitiesPrice = adminAmenitiesPriceLayout;
      adminPropertyCharge = adminPropertyChargeLayout;
      break;
    case 'C':
      adminAmenitiesPrice = <div>Content for C</div>;
      adminPropertyCharge = <div>Content for C</div>;
      break;
    default:
      adminAmenitiesPrice = [];
      adminPropertyCharge = [];
  }

useEffect(() => { 
  const data ={
    id:id
  }
  const fetchData = async () => { 
    try {
      const response = await axios.post(`${API_BASE_URL}/projectadmin`,data, {
        headers: {
          'Gl-Status':statusType,
          'Content-Type':'application/json'
        }
      });
      setAdminData(response.data[0].land)
    } catch (err) {
      console.error(err.message);
    }  
  }; 
  fetchData(); 
}, [id,statusType]);  






{/* 
// ************************************
// Media Department
// ************************************ */}
const [stepMedia, setStepMedia] = useState(1);
const [mediaData,setMediaData] = useState([])
const [descriptionData,setDescriptionData] = useState([])
const [mapView,setMapView] = useState([])

const mediaColumn = [
  {
    name: "S.no",
    selector: (row,index) => index + 1,
    sortable: true,
    wrap: true,
  },  
  {
    name: "Media",
    cell: (row) => {
      let tag;
      switch (row.type) {
        case 'image': 
          tag =  <img src={`${IMG_PATH}/property/${row.source_name}`} style={{ width: "150px", height: "100%"}} alt=""></img>; 
          break;
        case 'video': 
          tag = (
            <video width="200px" controls>
              <source src={`${IMG_PATH}/property/${row.source_name}`} type="video/mp4" />   
              Your browser does not support the video tag.
            </video>
          );
          break;
        case 'link': 
          tag =    <img src={row.source_link} style={{ width: "150px", height: "100%"}} alt=""></img>;  
          break;
        default: 
          tag = 'No Data'; 
          break;
      }
      
      return (
        <>
          {tag}
        </>
      );
    },
    wrap: true,
    sortable: true,
  }, 
  {
    name: "Description",
    selector: (row) => row.source_remark,
    wrap: true,
    sortable: true,
  }, 
 
];
const discriptionColumn = [
  {
    name: "S.no",
    selector: (row, index) => index + 1,
    sortable: true,
    wrap: true,
  },
  {
    name: "Meta Tag",
    selector: (row) => row.meta_tag,
    wrap: true,
    sortable: true,
  },
  {
    name: "Tag",
    selector: (row) => row.content_tag,
    wrap: true,
    sortable: true,
  },

  {
    name: "Language",
    selector: (row) => row.select_lang,
    wrap: true,
    sortable: true,
  },
  {
    name: "Description", 
    cell: (row) => (<>
        <div dangerouslySetInnerHTML={{ __html: row.content }} />
    </>),
    wrap: true,
    sortable: true,
  },
   
];
// media fetch 
useEffect(() => {  
  const fetchData = async () => { 
    try {
      const response = await axios.get(`${API_BASE_URL}/projectmedia/${id}`);
      setMediaData(response.data)
    } catch (err) {
      console.error(err.message);
    }  
  }; 
  fetchData(); 
}, [id]);  


// description fetch 
useEffect(() => {  
  const fetchData = async () => { 
    try {
      const response = await axios.get(`${API_BASE_URL}/contentdata/${id}`);
      setDescriptionData(response.data)
    } catch (err) {
      console.error(err.message);
    }  
  }; 
  fetchData(); 
}, [id]);  


// map fetch 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mapdata/${descriptionData[0].mediaid}`);
      setMapView(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, [descriptionData]);


// view file 
const [url,setUrl] = useState('') 
const viewFileUrl = (url)=>{
   setUrl(url)
   openModalFile()
}
const [isModalOpenFile, setIsModalOpenfile] = useState(false);
const openModalFile = () => {
  setIsModalOpenfile(true);
};
const closeModalFile = () => {
  setIsModalOpenfile(false);
};
  return (
    <>
   <FileView isOpen={isModalOpenFile} closeModal={closeModalFile} fileUrls={url}/> 
      <section className="section">
        <div className="container">
          <div className="row">
          {loading ? 
          <div style={{height:"32vh",display:"flex",justifyContent:"center"}}>
             <Spinner className="mt-auto"/> 
          </div>
          :
            <div className="col-12">
              <div className="card">
                <div className="card-heaer mb-3">
                  <div className="d-flex bottom1">
                    <div>
                      <nav className="nav">
                        <a
                          className={`nav-link link1 ${
                            step === 1 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(1)}
                        >
                          Property
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 2 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(2)}
                        >
                          Field survey Department
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 3 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(3)}
                        >
                          Owner Agreement
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 4 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(4)}
                        >
                          Admin Department
                        </a>
                        <a
                          className={`nav-link link1 ${
                            step === 5 ? "active1" : ""
                          }`}
                          href="#"
                          onClick={() => setStep(5)}
                        >
                        Media Department
                        </a>
                      </nav>
                    </div>
                  
                  </div>
                </div>
                <div className="card-body p-3">
{/* 
// ************************************
//  Property view 
// ************************************ */}
                <div className={step === 1 ? "d-block" : "d-none"}>
                      <div className="row">
                        
                       <div className="d-flex bottom1">
                        <div>
                          <nav className="nav"> 
                            <a
                              className={`nav-link link1 ${
                                stepProperty === 1 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepProperty(1)}
                            >
                              Basic Details
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepProperty === 2 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepProperty(2)}
                            >
                             Upload Documents
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepProperty === 3 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepProperty(3)}
                            >
                               Survey
                            </a>
                            
                          </nav>
                        </div>
                      </div>


                      {stepProperty === 1 && (<>
                      <div className="row mt-5">
                      <div className="col-md-12 col-lg-4 mb-3">
                        <div className="row">
                            <div className="col-5">
                            <label htmlFor="lastName" className="form-label">
                                Project ID :
                            </label>
                            </div>
                            <div className="col-7">
                            <span className="field_value">{land.project_tid}</span>
                            </div>
                        </div>
                        </div>


                        <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                  Land Type :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.subpro_name}</span>
                                </div>
                            </div>
                            </div>


                            <h6 className="mt-4 mb-3">Vendor Deatils</h6>
                            <hr /> 
                            <div className="row">
                        {getVendor.length > 0 ? (
                        <>
                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                    vendor Name :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].username}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Vendor Mobile :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].vendor_mobile}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Email :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].vendor_email}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       State :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].state_name}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       District :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].district}</span>
                                    </div>
                                </div>
                                </div>


                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Village :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].village_name}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Taluk :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].taluk_name}</span>
                                    </div>
                                </div>
                                </div>

                                <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label">
                                       Pincode :
                                    </label>
                                    </div>
                                    <div className="col-7">
                                    <span className="field_value">{getVendor[0].pincode}</span>
                                    </div>
                                </div>
                                </div>


                                </>
                       ) :  (
                        <>
                             <div className="col-md-12 col-lg-4 mb-3">
                                <div className="row">
                                    <div className="col-5">
                                    <label htmlFor="lastName" className="form-label text-danger">
                                        empty Data
                                    </label>
                                    </div>
                              
                                </div>
                                </div>

                        </>
                       )}
                      </div>
 

                        <h6 className="mt-4 mb-3">Basic Deatils</h6>
                        <hr /> 

                        <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                 Name :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_name}</span>
                                </div>
                            </div>
                            </div>


                     

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Phone No :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_mobile}</span>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Address 1 :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_address}</span>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                 Address 2 :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.project_addressf}</span>
                                </div>
                            </div>
                            </div>

       
 
                   

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                State :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.state_name}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                District :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.district}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Taluk :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.taluk_name}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Village :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.village_name}</span>
                                </div>
                            </div>
                            </div>  <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-5">
                                <label htmlFor="lastName" className="form-label">
                                Pincode :
                                </label>
                                </div>
                                <div className="col-7">
                                <span className="field_value">{land.pincode}</span>
                                </div>
                            </div>
                            </div>

                            {propertyType === 'Layout' && <>
                            <h6 className="mt-4 mb-3">Project Deatils</h6>
                            <hr /> 
                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                Project Name :
                                </label>
                                </div>
                                <div className="col-6">
                                <span className="field_value">{land.project}</span>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                Total project area :
                                </label>
                                </div>
                                <div className="col-6">
                                <span className="field_value">{`${land.project_area} - ${land.project_areaunit}`}</span>
                                </div>
                            </div>
                            </div>


                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                Total saleable area :    
                                </label>
                                </div>
                                <div className="col-6">
                                   <span className="field_value">{`${land.saleable_area} - ${land.saleable_unit}`}</span>
                                 </div>
                            </div>
                            </div>



                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                  Total no of plots :
                                </label>
                                </div>
                                <div className="col-6">
                                <span className="field_value">{land.total_plot}</span>
                                </div>
                            </div>
                            </div>


                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                Total no of plots available for sale :
                                </label>
                                </div>
                                <div className="col-6">
                                <span className="field_value">{land.available_plot}</span>
                                </div>
                            </div>
                            </div>



                            <div className="col-md-12 col-lg-4 mb-3">
                            <div className="row">
                                <div className="col-6">
                                <label htmlFor="lastName" className="form-label">
                                Brochure :
                                </label>
                                </div>
                                <div className="col-6">
                                <span className="field_value">
                                 {land.brochure ?  <a href={`${IMG_PATH}/layout/${land.brochure}`} className="btn1" download>
                                    <FileDownloadIcon />
                                  </a> : null} 
                                </span>
                                </div>
                            </div>
                            </div>
                     </>}
    

                            </div>
                            </>)}

                            {stepProperty === 2 && (<>
                            <div className="row">
                            {doc.map((data, index) => (
                                <div className="col-md-12 col-lg-6" key={index}>
                                  <div className="form-group mt-5">
                                    <div className="row">
                                      <div className="col-4">
                                        <label className="form-label">{data.label}</label>
                                      </div>
                                      <div className="col-7">
                                        <div className="">
                                        {/* <a href={`${IMG_PATH}/land/${data.file}`} className="btn1" download>
                                            <FileDownloadIcon />
                                          </a> */}
                                           <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}/${urlLink}/${data.file}`)}>
                                            <FileDownloadIcon />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            </div>
                            </>)}
             

                            {stepProperty === 3 && (<>
                              <div>
                                <div className="row mt-5"> 
                                  <div className="col-lg-12">
                                    <div className="card2">
                                      <div className="">
                                        <DataTable
                                          columns={columnSurvey}
                                          data={survey}
                                          customStyles={customStyle}
                                          pagination
                                          // selectableRows
                                          persistTableHead={true}
                                          fixedHeader
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>)}

                        <div className="text-end py-3 px-3"> 
                          <button className="btn1" onClick={(e) => { e.preventDefault(); nextStep() }}>
                            Next
                          </button>
                        </div>
                      </div>
                    </div>


{/* 
// ************************************
//  Field survey Department
// ************************************ */}

                  {step === 2 && (
                    <div className="row">

                  <div className="d-flex bottom1">
                        <div>
                          <nav className="nav"> 
                            <a
                              className={`nav-link link1 ${
                                stepField === 1 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepField(1)}
                            >
                             Field Survey Details 
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepField === 2 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepField(2)}
                            >
                              Market Research
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepField === 3 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepField(3)}
                            >
                               Survey Report
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepField === 4 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepField(4)}
                            >
                              Amenities
                            </a>
                          </nav>
                        </div>
                      </div>

                      { stepField === 1 && (<>
                        <div className="row mt-5">
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Legal ID</label>
                            </div>
                            <div className="col-5"> 
                                <span>{`LEGL00`+fieldDetails.id}</span>  
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Project Name</label>
                            </div>
                            <div className="col-5"> 
                                <span>{land.project}</span> 
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Project ID</label>
                            </div>
                            <div className="col-5"> 
                                <span>{fieldDetails.project_tid}</span> 
                            </div>
                          </div>
                        </div>
                      </div>

                   

                      
                      <h6 className="mt-4 mb-3">Sro Deatils</h6>
                      <hr />
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">SRO Title</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_title}</span>
                               </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">SRO Address</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Mobile Number</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_mobile}</span>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group mt-3">
                          <div className="row">
                            <div className="col-4">
                              <label className="form-label">Email</label>
                            </div>
                            <div className="col-7">
                                    <span className="field_value">{getSro[0].sro_email}</span>
                              </div>
                          </div>
                        </div>
                      </div> 
                      
                   
                    </div>
                      </>)}

                       { stepField === 2 && (
                        <div className="row mt-5">
                      
                      <div className="mt-2">
                      <DataTable
                        columns={columnMarketResearch}
                        data={market}
                        customStyles={customStyle}
                        pagination 
                        persistTableHead={true}
                        fixedHeader
                      />
                      </div>
                      </div>
                      )}


                    { stepField === 3 && (
                        <div className="row mt-5">
                      
                      <div className="mt-2">
                      <DataTable
                        columns={columnSurveyVerify}
                        data={surveyDetails}
                        customStyles={customStyle}
                        pagination 
                        persistTableHead={true}
                        fixedHeader
                      />
                      </div>
                      </div>
                      )}


                    { stepField === 4 && (
                      <div className="row">
                      {amenitiesData.map((item) => (
                        <React.Fragment key={item.subtitle.id}>
                          <h6 className="mt-3 mb-3">{item.subtitle.subamenities}</h6>
                          <hr />
                          {item.amenities
                            .filter((amenity) => selectedIds.includes(amenity.id))  
                            .map((amenity) => (
                              <div className="col-md-6 col-lg-3 mt-2" key={amenity.id}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" 
                                    checked={selectedIds.includes(amenity.id)}  
                                  />
                                  <label
                                    className="form-check-label amenitiesBox"
                                    htmlFor={`checkbox-${amenity.id}`}
                                  >
                                    {amenity.amenities}
                                  </label>
                                </div>
                              </div>
                            ))}
                        </React.Fragment>
                      ))}
                    </div>
                    )}
                       
                   
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          next
                        </button>
                      </div>
                    </div>
                  )}


{/* 
// ************************************
// Land Owner agreement
// ************************************ */}

                  {step === 3 && (
                    <div className="row">
                      <div className="d-flex bottom1">
                        <div>
                          <nav className="nav"> 
                            <a
                              className={`nav-link link1 ${
                                stepOwner === 1 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepOwner(1)}
                            >
                              Land Owner
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepOwner === 2 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepOwner(2)}
                            >
                             Amenities Charges
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepOwner === 3 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepOwner(3)}
                            >
                             Property Details
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepOwner === 4 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepOwner(4)}
                            >
                             Contact Details
                            </a>
                            <a
                              className={`nav-link link1 ${
                                stepOwner === 5 ? "active1" : ""
                              }`}
                              href="#"
                              onClick={() => setStepOwner(5)}
                            >
                              Bank Account
                            </a>
                          </nav>
                        </div>
                      </div>

                      {stepOwner === 1 && (
                         <div>
                          <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Project ID
                                  </label>
                                </div>
                                <div className="col-5"> 
                                     <span>{landOwner.project_tid}</span> 
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                   Type
                                  </label>
                                </div>
                                <div className="col-5">
                                  <span>{landOwner.subpro_name}</span>  
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Project Name
                                  </label>
                                </div>
                                <div className="col-5"> 
                                    <span>{landOwner.project_name}</span>  
                                </div>
                              </div>
                            </div>
                          </div>
 

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Total days
                                  </label>
                                </div>
                                <div className="col-5">  
                                   <span>{landOwner.agree_days}</span>  
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Duration From - To
                                  </label>
                                </div>
                                <div className="col-5"> 
                                    <span>{`${landOwner.agree_startduration} - ${landOwner.agree_endduration}`}</span>  
                                 </div>
                              </div>
                            </div>
                          </div>

                        

                  

                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Advance given
                                  </label>
                                </div>
                                <div className="col-5"> 
                                   <span>{landOwner.agree_advance}</span>  
                                </div>
                              </div>
                            </div>
                          </div>

                 
                          <div className="col-md-12 col-lg-6">
                            <div className="form-group mt-3">
                              <div className="row">
                                <div className="col-4">
                                  <label className="form-label">
                                    Aggrement document
                                  </label>
                                </div>
                                <div className="col-5">
                                <div className="mt-2 d-flex w-100"  >
                                      {/* <a
                                        href={`${IMG_PATH}/agreement/${landOwner.project_document}`}
                                        className="btn1"
                                        download
                                      >
                                        <FileDownloadIcon />
                                      </a> */}
                                       <button className="btn1" onClick={()=>viewFileUrl(`${IMG_PATH}/agreement/${landOwner.agree_document}`)}>
                                        <FileDownloadIcon />
                                      </button>
                                      </div>
                                </div>
                              
                              </div>
                            </div>
                          </div>
                        </div>
                         </div>
                      )}

                      {stepOwner === 2 && (
                         <>
                         <div className="row mt-5">
                         <DataTable
                            columns={columnOwnerAmenities}
                            data={landOwnerSurvey}
                            customStyles={customStyle}
                            pagination
                            persistTableHead={true}
                            fixedHeader
                          />
            
                          </div></>
                      )}

                      {stepOwner === 3 && ( 
                           <div className="row mt-5">
                           <DataTable
                              columns={columnOwnerPropertyDetails}
                              data={landOwnerSurvey}
                              customStyles={customStyle}
                              pagination
                              persistTableHead={true}
                              fixedHeader
                            /> 
                            </div> 
                      )}

                      {stepOwner === 4 && (
                           <div className="row mt-5">
                           <DataTable
                              columns={columnContact}
                              data={contactData}
                              customStyles={customStyle}
                              pagination
                              persistTableHead={true}
                              fixedHeader
                            /> 
                            </div> 
                      )}
                      {stepOwner === 5 && (
                           <div className="row mt-5">
                           <DataTable
                              columns={columnsBank}
                              data={bankData}
                              customStyles={customStyle}
                              pagination
                              persistTableHead={true}
                              fixedHeader
                            /> 
                            </div> 
                      )}

                      
                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" onClick={prevStep}>
                          Previous
                        </button>
                        <button className="btn1" onClick={nextStep}>
                          Next
                        </button>
                      </div>
                    </div>
                  )}


{/* 
// ************************************
// Admin Department
// ************************************ */}
                  {step === 4 && (
                    <div className="row">
                    <div className="d-flex bottom1">
                      <div>
                        <nav className="nav"> 
                          <a
                            className={`nav-link link1 ${
                              stepAdmin === 1 ? "active1" : ""
                            }`}
                            href="#"
                            onClick={() => setStepAdmin(1)}
                          >
                            Project Details
                          </a>
                          <a
                            className={`nav-link link1 ${
                              stepAdmin === 2 ? "active1" : ""
                            }`}
                            href="#"
                            onClick={() => setStepAdmin(2)}
                          >
                           Amenities Charges
                          </a>
                          <a
                            className={`nav-link link1 ${
                              stepAdmin === 3 ? "active1" : ""
                            }`}
                            href="#"
                            onClick={() => setStepAdmin(3)}
                          >
                           Property Charges
                          </a> 
                        </nav>
                      </div>
                    </div>

                    {stepAdmin === 1 && (
                      <div className="row mt-5">
                      <h4 className="page_heading ticket-heading">
                        Project Details
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Project ID</label>
                              </div>
                              <div className="col-5">
                                   <span>{adminData.project_tid}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Project Name
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.project_name}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property Location
                                </label>
                              </div>
                              <div className="col-5">
                                  <span>{adminData.project_name}</span> 
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">
                                  Property Types
                                </label>
                              </div>
                              <div className="col-5">
                                 <span>{adminData.subpro_name}</span> 
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Address 1</label>
                              </div>
                              <div className="col-5">
                                 <span>{adminData.project_address}</span> 
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Address 2</label>
                              </div>
                              <div className="col-5">
                               <span>{adminData.project_addressf}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">State</label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.state_name}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Distric</label>
                              </div>
                              <div className="col-5">
                                <span>{adminData.district}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Taluk</label>
                              </div>
                              <div className="col-5">
                                <span>{adminData.taluk_name}</span> 
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Village</label>
                              </div>
                              <div className="col-5">
                                 <span>{adminData.village_name}</span>   
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-4">
                                <label className="form-label">Pincode</label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.pincode}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-5" />

                      <h4 className="page_heading ticket-heading">
                        Payment Details
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Blocking Amount
                                </label>
                              </div>
                              <div className="col-6">
                              <span>{adminData.blocking_amt}</span>  
                               </div>

                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Total Validity Days
                                </label>
                              </div>
                              <div className="col-6">
                              <span>{adminData.validity_days}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Total Installment
                                </label>
                              </div>
                              <div className="col-6">
                              <span>{adminData.total_installment}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Booking Amount
                                </label>
                              </div>
                              <div className="col-6">
                              <span>{adminData.booking_amt}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">Validity</label>
                              </div>
                              <div className="col-6">
                              <span>{adminData.validity}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Installment
                                </label>
                              </div>
                              <div className="col-6">
                              <span>{adminData.installment}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-5" />
                      <h4 className="page_heading ticket-heading">
                        Registration Expenses
                      </h4>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Document Value %
                                </label>
                              </div>
                              <div className="col-5">
                                <span>{adminData.document_value}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Document Comm. %
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.document_comm}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Document Fees %
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.document_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Doc.Writer Fees %
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.writer_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Computer Fees
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.computer_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Sub Division Fees
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.division_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Registration Gift
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.registration_gift}</span>  
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">D.D. Comm.</label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.dd_comm}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Customer Gift
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.customer_gift}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">CD</label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.cd_feees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">EC</label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.ec_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Reg.Expense
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.expense_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">MOT</label>
                              </div>
                              <div className="col-5">
                                <span>{adminData.mot_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Sales Agreement
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.sales_fees}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <div className="form-group mt-3">
                            <div className="row">
                              <div className="col-6">
                                <label className="form-label">
                                  Reg. Exp. Other
                                </label>
                              </div>
                              <div className="col-5">
                              <span>{adminData.expense_other}</span>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                    )}

                    {stepAdmin === 2 && (
                       <>
                         <div className="mt-5">
                              <DataTable
                                columns={adminAmenitiesPrice}
                                data={landOwnerSurvey}
                                customStyles={customStyle}
                                pagination
                                persistTableHead={true}
                                fixedHeader
                              />
                            </div>
                      </>
                    )}

                    {stepAdmin === 3 && ( 
                        <>
                         <div className="mt-5">
                              <DataTable
                                columns={adminPropertyCharge}
                                data={landOwnerSurvey}
                                customStyles={customStyle}
                                pagination
                                persistTableHead={true}
                                fixedHeader
                              />
                            </div></>
                    )}

                    
                    

                    
                    <div className="text-end py-3 px-3">
                      <button className="btn1 me-1" onClick={prevStep}>
                        Previous
                      </button>
                      <button className="btn1" onClick={nextStep}>
                        Next
                      </button>
                    </div>
                  </div>
                  )}

                  {step === 5 && (
                     <div className="row">
                     <div className="d-flex bottom1">
                       <div>
                         <nav className="nav"> 
                           <a
                             className={`nav-link link1 ${
                              stepMedia === 1 ? "active1" : ""
                             }`}
                             href="#"
                             onClick={() => setStepMedia(1)}
                           >
                            Image/Video
                           </a>
                           <a
                             className={`nav-link link1 ${
                              stepMedia === 2 ? "active1" : ""
                             }`}
                             href="#"
                             onClick={() => setStepMedia(2)}
                           >
                             Description
                           </a>
                           <a
                             className={`nav-link link1 ${
                              stepMedia === 3 ? "active1" : ""
                             }`}
                             href="#"
                             onClick={() => setStepMedia(3)}
                           >
                             Map
                           </a> 
                           <a
                             className={`nav-link link1 ${
                              stepMedia === 4 ? "active1" : ""
                             }`}
                             href="#"
                             onClick={() => setStepMedia(4)}
                           >
                            Near By
                           </a> 
                         </nav>
                       </div>
                     </div>
 
                     {stepMedia === 1 && (
                     <>
                     <div className="mt-5">
                     <DataTable
                        columns={mediaColumn} 
                        data={mediaData} 
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />
                     </div>
                     </>
                     )}
 
                     {stepMedia === 2 && (
                        <>
                           <div className="mt-5">
                     <DataTable
                        columns={discriptionColumn} 
                        data={descriptionData} 
                        customStyles={customStyle}
                        pagination
                        // selectableRows
                        persistTableHead={true}
                        fixedHeader
                      />
                     </div>
               
                       </>
                     )}
 
                     {stepMedia === 3 && ( 
                        <>
                        <div class="col-md-12">
                          <div class="form-group mt-3">
                            <div class="row mb-3">
                              <div class="col-2">
                                <label class="form-label">Map View</label>
                              </div>
                              <div class="col-10">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: mapView.map_view,
                                  }}
                                />
                              </div>
                            </div>
        
                            <div class="row mb-3">
                              <div class="col-2">
                                <label class="form-label">Street View</label>
                              </div>
                              <div className="col-10">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: mapView.street_view,
                                  }}
                                />
                              </div>
                            </div>
        
                            <div class="row mb-3">
                              <div class="col-2">
                                <label class="form-label">Location(lat,lng)</label>
                              </div>
                              <div class="col-5">
                                <input
                                  type="text"
                                  disabled
                                  class="form-control"
                                  value={mapView.location}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                     )}

                     {stepMedia === 4 && ( 
                         <>
                        </>
                     )}
 
                     
                     
 
                     
                     <div className="text-end py-3 px-3">
                       <button className="btn1 me-1" onClick={prevStep}>
                         Previous
                       </button> 
                     </div>
                   </div>
                  )}
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>
     </>
  );
}

export default ViewAllDetails;
