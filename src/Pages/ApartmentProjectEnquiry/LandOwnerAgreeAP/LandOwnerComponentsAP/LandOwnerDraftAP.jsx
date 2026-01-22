import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchPincode } from "../../../../Redux/Actions/MasterPage/PincodeAction";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { fetchState } from "../../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { ThreeDots } from "react-loader-spinner";
import GeneralState from "../../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../../Utils/Dropdown/GeneralVillageDropdown";
import GeneralPincodeDropdown from "../../../../Utils/Dropdown/GeneralPincodeDropdown";
import GeneralSroDropdown from "../../../../Utils/Dropdown/GeneralSroDropdown";



const LandOwnerDraftAP = ({ eid, id, status, subtype, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prDetails, setPrDetails] = useState([]);
  const [loading, setLoading] = useState(false)
  const StateData = useSelector((state) => state.State.StateNameData);
  const DistrictData = useSelector((state) => state.District.districtData);
  const talukData = useSelector((state) => state.Taluk.TalukData);
  const VillageData = useSelector((state) => state.Village.villageData);
  const pincodeData = useSelector((state) => state.Pincode.PincodeData);
  const [sroData, setSroData] = useState([]);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const fetchSro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/srodetails`);
      setSroData(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchState());
    dispatch(fetchDistrict());
    dispatch(fetchTaluk());
    dispatch(fetchPincode());
    dispatch(fetchVillage());

    fetchSro();
  }, [dispatch]);
  const isTownVillagePresent = prDetails.some(
    (row) => row.village_type === "Town village"
  );
  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Property ID",
      selector: (row) => row.property_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Village Type",
      selector: (row) => row.village_type,
      sortable: true,
      width: "160px",
    },
    {
      name: "State",
      selector: (row) => row.state_name,
      sortable: true,
    },
    {
      name: "Taluk",
      selector: (row) => row.taluk_name,
      sortable: true,
    },
    {
      name: "District",
      selector: (row) => row.district_name,
      sortable: true,
    },
    {
      name: "Village",
      selector: (row) => row.village_name,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode_name,
      sortable: true,
    },
    ...(isTownVillagePresent
      ? [
        {
          name: "Ward",
          selector: (row) => row.ward,
          sortable: true,
          width: "180px",
        },
        {
          name: "Block",
          selector: (row) => row.block,
          sortable: true,
          width: "200px",
        },
      ]
      : []),
    {
      name: "SRO",
      selector: (row) => row.sro_title,
      sortable: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.project_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Approval No",
      selector: (row) => row.approval_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "RERA No",
      selector: (row) => row.rera_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Land Extent",
      selector: (row) => row.total_land_extent,
      sortable: true,
      width: "170px",
    },
    {
      name: "No. of Flats",
      selector: (row) => row.no_of_flats,
      sortable: true,
      width: "170px",
    },
    {
      name: "Total No. of Floors",
      selector: (row) => row.total_floors,
      sortable: true,
      width: "180px",
    },
    {
      name: "No. of Car Parking",
      selector: (row) => row.no_of_car_parking,
      sortable: true,
      width: "180px",
    },
    {
      name: "Built-up Area",
      selector: (row) => row.built_up_area,
      sortable: true,
      width: "150px",
    },
    {
      name: "Common Area",
      selector: (row) => row.common_area,
      sortable: true,
      width: "150px",
    },
    {
      name: "Super Built up area ",
      selector: (row) => row.super_built_up_area,
      sortable: true,
      width: "200px",
    },
    {
      name: "UDS",
      selector: (row) => row.uds,
      sortable: true,
    },
    {
      name: "No. of BHK",
      selector: (row) => row.no_of_bhk,
      sortable: true,
      width: "150px",
    },
    {
      name: "Price per Sq.Ft.,",
      selector: (row) => row.price_per_sqft,
      sortable: true,
      width: "180px",
    },
    {
      name: "Apartment Cost",
      selector: (row) => row.apartment_cost,
      sortable: true,
      width: "180px",
    },
    {
      name: "Car Parking Cost",
      selector: (row) => row.car_parking_cost,
      sortable: true,
      width: "180px",
    },
    {
      name: "Total aparment cost",
      selector: (row) => row.total_apartment_cost,
      sortable: true,
      width: "190px",
    },
    {
      name: "Agreement draft",
      cell: (row) => (
        <>
          <a
            href={`${IMG_PATH}/enquiry/agreement/${row.agreement_file}`}
            class="btn btn-warning ms-2"
            download="download"
            target="_blank"
          >
            <RemoveRedEyeIcon />
          </a>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Digital sign status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge btn rounded-pill btnhover btn p-2 ${row.status == "pending" ? "bg-danger" : "bg-success"
              }`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Signed date",
      selector: (row) => row.signed_date,
      sortable: true,
      width: "190px",
    },

    ...((status === "pending" || status === "complete") &&
      staffid.Login === "staff" &&
      pagetype !== "reminder" &&
      prDetails[0]?.status !== "signed" &&
      enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="edit"
                onClick={() => handleEdit(row)}
              >
                <EditIcon />
              </button>
            </div>
          ),
        },
      ]
      : []),
  ];

  const handleEdit = (row) => {
    setNewDialog(true);
    formik.setFieldValue("price_per_sqft", enquiryDoumentData?.price_per_unit);
    formik.setFieldValue("id", row.id);
    formik.setFieldValue("property_id", row.property_id);
    formik.setFieldValue("type", row.village_type);
    formik.setFieldValue("state", row.state);
    formik.setFieldValue("taluk", row.taluk);
    formik.setFieldValue("district", row.district);
    formik.setFieldValue("village", row.village);
    formik.setFieldValue("pincode", row.pincode);
    formik.setFieldValue("ward", row.ward);
    formik.setFieldValue("block", row.block);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("project_name", row.project_name);
    formik.setFieldValue("approval_no", row.approval_no);
    formik.setFieldValue("rera_no", row.rera_no);
    formik.setFieldValue("total_land_extent", row.total_land_extent);
    formik.setFieldValue("no_of_flats", row.no_of_flats);
    formik.setFieldValue("total_floors", row.total_floors);
    formik.setFieldValue("no_of_car_parking", row.no_of_car_parking);
    formik.setFieldValue("built_up_area", row.built_up_area);
    formik.setFieldValue("common_area", row.common_area);
    formik.setFieldValue("super_built_up_area", row.super_built_up_area);
    formik.setFieldValue("uds", row.uds);
    formik.setFieldValue("no_of_bhk", row.no_of_bhk);
    // formik.setFieldValue("price_per_sqft", row.price_per_sqft);
    formik.setFieldValue("apartment_cost", row.apartment_cost);
    formik.setFieldValue("car_parking_cost", row.car_parking_cost);
    formik.setFieldValue("total_apartment_cost", row.total_apartment_cost);
    formik.setFieldValue("file", row.agreement_file);
    formik.setFieldValue("oldfile", row.agreement_file);
    setUrl(row.agreement_file);
  };
  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/viewapartmentprdetails/${eid}`,
        {}
      );
      setPrDetails(response.data);
    } catch (error) { }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const onSubmit = async (values) => {
    if (isEditing) {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        // status: null,
        status: "pending",
        enqagree_status: "true",
      };
      setLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/apartmentprdetailscreate`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
        fetchDetails();
        setLoading(false)
      } catch (error) {
        alert(error);
        setLoading(false)
      }
    } else {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        status: "pending",
        enqagree_status: "true",
      };
      setLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/apartmentprdetailscreate`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
        setEditDialog(false);
        fetchDetails();
        setLoading(false)
      } catch (error) {
        alert(error);
        setLoading(false)
      }
    }
  };

  const validationSchema = yup.object().shape({
    property_id: yup.string().required("Property ID is required"),
    type: yup.string().required("village type is required"),
    state: yup.string().required("State is required"),
    taluk: yup.string().required("Taluk is required"),
    district: yup.string().required("District is required"),
    village: yup.string().required("Village is required"),
    pincode: yup.string().required("Pincode is required"),
    sro: yup.string().required("SRO is required"),
    project_name: yup.string().required("Project name is required"),
    approval_no: yup.string().required("Approval number is required"),
    rera_no: yup.string().required("RERA number is required"),
    total_land_extent: yup.string().required("Total land extent is required"),
    no_of_flats: yup.string().required("Number of flats is required"),
    total_floors: yup.string().required("Total floors is required"),
    no_of_car_parking: yup.string().required("Car parking count is required"),
    built_up_area: yup.string().required("Built-up area is required"),
    common_area: yup.string().required("Common area is required"),
    super_built_up_area: yup
      .string()
      .required("Super built-up area is required"),
    uds: yup.string().required("UDS is required"),
    no_of_bhk: yup.string().required("Number of BHK is required"),
    price_per_sqft: yup.string().required("Price per Sq.Ft. is required"),
    apartment_cost: yup.string().required("Apartment cost is required"),
    // car_parking_cost: yup.string().required("Car parking cost is required"),
    total_apartment_cost: yup
      .string()
      .required("Total apartment cost is required"),
    file: yup.mixed().required("File is required !!"),
  });
  const formik = useFormik({
    initialValues: {
      property_id: `PROP${1000 + eid}`,
      type: "",
      state: "",
      taluk: "",
      district: "",
      village: "",
      pincode: "",
      ward: "",
      block: "",
      sro: "",
      project_name: "",
      approval_no: "",
      rera_no: "",
      total_land_extent: "",
      no_of_flats: "",
      total_floors: "",
      no_of_car_parking: "",
      built_up_area: "",
      common_area: "",
      super_built_up_area: "",
      uds: "",
      no_of_bhk: "",
      price_per_sqft: "",
      apartment_cost: "",
      car_parking_cost: "",
      total_apartment_cost: "",
      file: "",
      status: "pending",
    },
    validationSchema,
    onSubmit,
  });
  useEffect(() => {
    const landarea = parseFloat(formik.values.total_land_extent) || 0;
    const priceper = parseFloat(formik.values.price_per_sqft) || 0;
    const villa_cost = landarea * priceper;
    formik.setFieldValue("apartment_cost", villa_cost || "");
  }, [formik.values.total_land_extent, formik.values.price_per_sqft]);

  useEffect(() => {
    const housecost = parseFloat(formik.values.apartment_cost) || 0;
    const parkingcost = parseFloat(formik.values.car_parking_cost) || 0;
    const total = housecost + parkingcost;
    formik.setFieldValue("total_apartment_cost", total || "");
  }, [formik.values.apartment_cost, formik.values.car_parking_cost]);


  const createFetch = () => {
    setNewDialog(true)
    formik.setFieldValue("price_per_sqft", enquiryDoumentData?.price_per_unit);
    formik.setFieldValue("id", prDetails[0]?.id);
    formik.setFieldValue("property_id", prDetails[0]?.property_id);
    formik.setFieldValue("type", prDetails[0]?.village_type);
    formik.setFieldValue("state", prDetails[0]?.state);
    formik.setFieldValue("taluk", prDetails[0]?.taluk);
    formik.setFieldValue("district", prDetails[0]?.district);
    formik.setFieldValue("village", prDetails[0]?.village);
    formik.setFieldValue("pincode", prDetails[0]?.pincode);
    formik.setFieldValue("ward", prDetails[0]?.ward);
    formik.setFieldValue("block", prDetails[0]?.block);
    formik.setFieldValue("sro", prDetails[0]?.sro);
    formik.setFieldValue("project_name", prDetails[0]?.project_name);
    formik.setFieldValue("approval_no", prDetails[0]?.approval_no);
    formik.setFieldValue("rera_no", prDetails[0]?.rera_no);
    formik.setFieldValue("total_land_extent", prDetails[0]?.total_land_extent);
    formik.setFieldValue("no_of_flats", prDetails[0]?.no_of_flats);
    formik.setFieldValue("total_floors", prDetails[0]?.total_floors);
    formik.setFieldValue("no_of_car_parking", prDetails[0]?.no_of_car_parking);
    formik.setFieldValue("built_up_area", prDetails[0]?.built_up_area);
    formik.setFieldValue("common_area", prDetails[0]?.common_area);
    formik.setFieldValue("super_built_up_area", prDetails[0]?.super_built_up_area);
    formik.setFieldValue("uds", prDetails[0]?.uds);
    formik.setFieldValue("no_of_bhk", prDetails[0]?.no_of_bhk);
    // formik.setFieldValue("price_per_sqft", prDetails[0]?.price_per_sqft);
    formik.setFieldValue("apartment_cost", prDetails[0]?.apartment_cost);
    formik.setFieldValue("car_parking_cost", prDetails[0]?.car_parking_cost);
    formik.setFieldValue("total_apartment_cost", prDetails[0]?.total_apartment_cost);
  }
  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-3">
          <div className="card shadow border-0 p-4">
            <div className="  justify-content-between mb-3">
              <h6>Land Owner Agreement </h6>
              <hr />
            </div>
            {prDetails[0]?.status === null ? (
              <div className="d-flex justify-content-center">
                <button
                  className="btn1"
                  // onClick={() => {
                  //   setNewDialog(true);
                  //   formik.setFieldValue(
                  //     "price_per_sqft",
                  //     enquiryDoumentData?.price_per_unit
                  //   );
                  // }}
                  onClick={createFetch}>
                  +Create Agreement
                </button>
              </div>
            ) : (
              <DataTable
                persistTableHead={true}
                columns={columns}
                data={prDetails}
                customStyles={customStyle}
                fixedHeader
              />
            )}
          </div>
        </div>
      </div>
      <Dialog
        visible={newDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row mt-4">
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    PropertyId
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="property_id"
                    id="property_id"
                    className="form-control"
                    value={formik.values.property_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />

                  {formik.errors.property_id && formik.touched.property_id ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.property_id}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Village Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    name="type"
                    id="type"
                    className="form-select"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option>Select Village Type </option>
                    <option value="Natham village">Natham Village</option>
                    <option value="Rural village">Rural Village</option>
                    <option value="Town village">Town Village</option>
                  </select>

                  {formik.errors.type && formik.touched.type ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.type}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    State
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="state"
                    id="state"
                    className="form-select"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select State</option>
                    {StateData?.map((item) => (
                      <option value={item.id}>{item.state_name} </option>
                    ))}
                  </select> */}
                  <GeneralState
                    value={formik.values.state}
                    onChange={(value) => {
                      formik.setFieldValue("state", value);
                      formik.setFieldValue("district", "");
                      formik.setFieldValue("taluk", "");
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("state", true)}
                  />
                  {formik.errors.state && formik.touched.state ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.state}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    District
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="district"
                    id="district"
                    className="form-select"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  //  disabled={prDetails[0]?.district}
                  >
                    <option value="">Select district</option>
                    {DistrictData?.filter(
                      (district) => district.state_type === formik.values.state
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.district}{" "}
                      </option>
                    ))}
                  </select> */}
                  <GeneralDistrict
                    stateId={formik.values.state}
                    value={formik.values.district}
                    onChange={(value) => {
                      formik.setFieldValue("district", value);
                      formik.setFieldValue("taluk", "");
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("district", true)}
                  />
                  {formik.errors.district && formik.touched.district ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.district}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Taluk
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="taluk"
                    id="taluk"
                    className="form-select"
                    value={formik.values.taluk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  //  disabled={prDetails[0]?.taluk}
                  >
                    <option value="">Select Taluk</option>
                    {talukData
                      ?.filter(
                        (taluk) =>
                          taluk.taluk_district === formik.values.district
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {" "}
                          {item.taluk_name}{" "}
                        </option>
                      ))}
                  </select> */}
                  <GeneralTalukDropdown
                    districtId={formik.values.district}
                    value={formik.values.taluk}
                    onChange={(value) => {
                      formik.setFieldValue("taluk", value);
                      formik.setFieldValue("village", "");
                    }}
                    onBlur={() => formik.setFieldTouched("taluk", true)}
                  />
                  {formik.errors.taluk && formik.touched.taluk ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.taluk}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    {formik.values.type === "Town village" ? "Town" : "Village"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="village"
                    id="village"
                    className="form-select"
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  //  disabled={prDetails[0]?.village}
                  >
                    <option value="">Select Village</option>
                    {VillageData?.filter(
                      (vill) => vill.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.village_name}{" "}
                      </option>
                    ))}
                  </select> */}
                  <GeneralVillageDropdown
                    talukId={formik.values.taluk}
                    value={formik.values.village}
                    onChange={(value) => formik.setFieldValue("village", value)}
                    onBlur={() => formik.setFieldTouched("village", true)}
                  />
                  {formik.errors.village && formik.touched.village ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.village}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {formik.values.type === "Town village" && (
              <>
                <div className="col-md-6 mb-3 ">
                  <div className="row">
                    <div className="col-4 mb-3 ">
                      <label htmlFor="projectname" className="form-label">
                        Ward
                      </label>
                    </div>
                    <div className="col-8 mb-3 ">
                      <input
                        name="ward"
                        id="ward"
                        className="form-control"
                        placeholder="Enter ward...."
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3 ">
                  <div className="row">
                    <div className="col-4 mb-3 ">
                      <label htmlFor="projectname" className="form-label">
                        Block
                      </label>
                    </div>
                    <div className="col-8 mb-3 ">
                      <input
                        name="block"
                        id="block"
                        className="form-control"
                        placeholder="Enter block...."
                        value={formik.values.block}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Sro
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    type="text"
                    className="form-select"
                    name="sro"
                    value={formik.values.sro}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select SRO</option>
                    {sroData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}{" "}
                      </option>
                    ))}
                  </select> */}
                  <GeneralSroDropdown
                    value={formik.values.sro}
                    onChange={(value) => {
                      formik.setFieldValue("sro", value);
                    }}
                    onBlur={() => formik.setFieldTouched("sro", true)}
                  />
                  {formik.errors.sro && formik.touched.sro ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.sro}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    Pincode
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  {/* <select
                    name="pincode"
                    id="pincode"
                    className="form-select"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Pincode</option>
                    {pincodeData
                      ?.filter(
                        (pin) => pin.pin_village === formik.values.village
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {" "}
                          {item.pincode}{" "}
                        </option>
                      ))}
                  </select> */}
                  <GeneralPincodeDropdown
                    villageId={formik.values.village}
                    value={formik.values.pincode}
                    onChange={(value) => formik.setFieldValue("pincode", value)}
                    onBlur={() => formik.setFieldTouched("pincode", true)}
                  />
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {[
              { name: "project_name", label: "Project Name" },
              { name: "approval_no", label: "Approval No" },
              { name: "rera_no", label: "RERA No" },
              { name: "no_of_flats", label: "No. of Flats" },
              { name: "total_floors", label: "Total Floors" },
              { name: "no_of_car_parking", label: "No. of Car Parking" },
              { name: "built_up_area", label: "Built-up Area" },
              { name: "common_area", label: "Common Area" },
              { name: "super_built_up_area", label: "Super Built-up Area" },
              { name: "uds", label: "UDS" },
              { name: "no_of_bhk", label: "No. of BHK" },
              { name: "total_land_extent", label: "Total land extent (Units)" },
              { name: "price_per_sqft", label: "Price per unit" },
              { name: "apartment_cost", label: "Apartment Cost" },
              { name: "car_parking_cost", label: "Car Parking Cost" },
              { name: "total_apartment_cost", label: "Total aparment cost" },
            ].map((field) => (
              <div className="col-md-6 mb-3" key={field.name}>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                  </div>
                  <div className="col-8 mb-3">
                    <input
                      type={
                        field.name === "car_parking_cost" ? "number" : "text"
                      }
                      className="form-control"
                      name={field.name}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors[field.name] &&
                      formik.touched[field.name] && (
                        <h6 style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors[field.name]}
                        </h6>
                      )}
                  </div>
                </div>
              </div>
            ))}

            <hr />
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    File
                  </label>
                </div>
                <div className="col-7 mb-3 ">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    // value={formik.values.file}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.file && formik.touched.file ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.file}
                    </p>
                  ) : null}
                </div>
                {url && (
                  <div className="col-1">
                    <button
                      type="button"
                      className="btn1"
                      onClick={viewDocument}
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="text-end gap-3">
              {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") && (
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      {loading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="55"
                          color="#ffffff"
                          radius="18"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            justifyContent: "center",
                            fontSize: "12px",
                          }}
                          wrapperClass=""
                        />
                      ) : (
                        "Save "
                      )}
                    </Button>
                  </>
                )}
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default LandOwnerDraftAP;
