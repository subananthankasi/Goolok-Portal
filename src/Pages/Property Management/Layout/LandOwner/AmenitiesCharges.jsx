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
import Spinner from "react-bootstrap/Spinner";


function AmenitiesCharges({
  basicDetails,
  surveyDetails,
  propertyID,
  statusType,
}) {
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
    const PreviewData = excelData.length != 0 ? excelData : details;
    setFinalData(PreviewData);
  }, [excelData, details]);

  let selectedAmenities = [];

  if (basicDetails.survey_amenities) {
    try {
      selectedAmenities = JSON.parse(basicDetails.survey_amenities);
      if (!Array.isArray(selectedAmenities)) {
        selectedAmenities = [];
      }
    } catch (error) {
      console.error("Error parsing survey_amenities:", error);
      selectedAmenities = [];
    }
  }
  const filterData = (AmnenitiestData || []).filter((item) => {
    return selectedAmenities.includes(item.id);
  });

  // old data amenities charges set on data table
  // const amenitiesWithChargesArray = surveyDetails.map((data)=> JSON.parse(data.agree_amtprice))
  // const headers = Array.from(new Set(amenitiesWithChargesArray.flat().map((item) => item.name)));
  // const headers = Array.from(new Set(
  //   amenitiesWithChargesArray
  //     .flat()
  //     .filter(item => item && Object.keys(item).length > 0 && item.name)
  //     .map(item => item.name)
  // ));
  // const dynamicColumns = headers.map((name) => ({
  //   name: name,
  //   selector: (row) => row[name],
  //   sortable: true,
  //   wrap: true,
  // }));

  const enrichedLandData = finalData.map((item, index) => {
    const prices = JSON.parse(item.agree_amtprice || "[]");
    const priceObject = Array.isArray(prices)
      ? prices.reduce((acc, { name, price }) => {
          acc[name] = price;
          return acc;
        }, {})
      : {};

    return {
      ...item,
      ...priceObject,
    };
  });

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
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
      name: "Plot Area(sqft)",
      selector: (row) => row.glk_sqft || row["Plot Area(sqft)"],
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

    ...filterData.map((item) => ({
      name: item.amenities,
      selector: (row) => row[item.amenities],
      wrap: true,
      sortable: false,
    })),
  ];

  const columnAdmin = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
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
    ...filterData.map((item) => ({
      name: item.amenities,
      selector: (row) => row[item.amenities],
      wrap: true,
      sortable: false,
    })),
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(excelData.length == 0){
      alert("Please Upload File")
      return
    } 
    const selectedAmenitiesNames = filterData.map((item) => item.amenities);

    const priceDetails = finalData.map((data) => {
      let amenitiesPrices = [];
      const id = data.id;
      selectedAmenitiesNames.forEach((amenity) => {
        if (data.hasOwnProperty(amenity)) {
          amenitiesPrices.push({
            name: amenity,
            price: data[amenity],
          });
        }
      });

      return { id: id, agree_amtprice: amenitiesPrices };
    });
    setIsLoading(true)
    try {
      const response = await axios.put(
        `${API_BASE_URL}/agreement/${propertyID}`,
        priceDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setIsLoading(false)
    } catch (error) {
      alert("error on updating");
    }
  };

  const staffid = JSON.parse(sessionStorage.getItem("token"));

  return (
    <div>
      <div className="">
        {staffid.logintype === "admin" ||
        statusType === "pending" ||
        statusType === "complete" ? (
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
                filename={"layout_Amenities_Charges_uploading_format.csv"}
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

            <div className="text-end py-3 px-3">
              <button
                className="btn1 me-2"
                style={{ width: "100px" }}
                onClick={handleSubmit}
              > 
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span className="ms-2"> wait...</span>
                  </>
                ) : (
                  "submit"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AmenitiesCharges;
