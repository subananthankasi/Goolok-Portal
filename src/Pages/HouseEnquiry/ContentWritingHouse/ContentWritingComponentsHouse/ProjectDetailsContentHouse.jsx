import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

const ProjectDetailsContentHouse = ({ eid, id, status, sub_property, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prDetails, setPrDetails] = useState([]);
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

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Property ID",
      selector: (row) => row.property_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Village Type",
      cell: (row) => row.village_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "State",
      cell: (row) => row.state_name,
      sortable: true,
    },
    { name: "District", selector: (row) => row.district_name, sortable: true },
    { name: "Taluk", selector: (row) => row.taluk_name, sortable: true },
    { name: "Village", selector: (row) => row.village_name, sortable: true },
    { name: "SRO", selector: (row) => row.sro_title, sortable: true },
    { name: "Pincode", selector: (row) => row.pincode_name, sortable: true },
    ...(sub_property === "Villa"
      ? [
        {
          name: "Project Name",
          selector: (row) => row.projectname,
          sortable: true,
          width: "150px",
        },
      ]
      : []),

    {
      name: " Plot No.",
      selector: (row) => row.plotno,
      sortable: true,
      width: "150px",
    },
    {
      name: "Approval Type",
      selector: (row) => row.approvaltype,
      sortable: true,
      width: "150px",
    },
    {
      name: "Approval No",
      selector: (row) => row.aprovalno,
      sortable: true,
      width: "150px",
    },

    {
      name: "RERA No.",
      selector: (row) => row.rerano,
      sortable: true,
      width: "150px",
    },
    {
      name: "Planning Permit No.",
      selector: (row) => row.planning_permit_no,
      sortable: true,
      width: "190px",
    },
    {
      name: "Building Permit No.",
      selector: (row) => row.building_permit_no,
      sortable: true,
      width: "190px",
    },

    {
      name: "No of BHK",
      selector: (row) => row.no_bhk,
      sortable: true,
      width: "150px",
    },
    {
      name: "No. of Bedrooms",
      selector: (row) => row.no_bedrooms,
      sortable: true,
      width: "180px",
    },
    {
      name: "No. of Bathrooms",
      selector: (row) => row.no_bathrooms,
      sortable: true,
      width: "180px",
    },
    {
      name: "No. of Floors",
      selector: (row) => row.no_floors,
      sortable: true,
      width: "180px",
    },

    {
      name: "Built up area (Units)",
      selector: (row) => row.built_up_area,
      sortable: true,
      width: "190px",
    },
    {
      name: "Common Area (Units)",
      selector: (row) => row.common_area,
      sortable: true,
      width: "200px",
    },
    {
      name: "Super Built up area (Saleable Area) (Units)",
      selector: (row) => row.supper_built_up_area,
      sortable: true,
      width: "250px",
    },
    {
      name: "UDS (Units)",
      selector: (row) => row.uds,
      sortable: true,
      width: "150px",
    },
    {
      name: "Land Area",
      selector: (row) => row.land_area,
      sortable: true,
      width: "150px",
    },
    {
      name: "Facing",
      selector: (row) => row.door_facing,
      sortable: true,
      width: "150px",
    },
    {
      name: "Car Parking",
      selector: (row) => row.carparking,
      sortable: true,
      width: "150px",
    },

    {
      name: "Price per Sq.Ft.,",
      selector: (row) => row.price_per_sqft,
      sortable: true,
      width: "170px",
    },
    {
      name: "Villa Cost",
      selector: (row) => row.villa_cost,
      sortable: true,
      width: "150px",
    },
    {
      name: "Car Parking Cost",
      selector: (row) => row.car_parking_cost,
      sortable: true,
      width: "200px",
    },
    {
      name: "Total House cost",
      selector: (row) => row.total_cost,
      sortable: true,
      width: "200px",
    },
    {
      name: "Road frontage",
      selector: (row) => row.road_frontage,
      sortable: true,
      width: "200px",
    },
    {
      name: "Road width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "200px",
    },
    {
      name: "Corner Property",
      selector: (row) => row.corner_property,
      sortable: true,
      width: "200px",
    },

    ...((status === "pending" || status === "complete") &&
      staffid.Login === "staff" &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
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
    setEditDialog(true);
    formik.setFieldValue("property_id", row.property_id);
    formik.setFieldValue("type", row.village_type);
    formik.setFieldValue("state", row.state);
    formik.setFieldValue("district", row.district);
    formik.setFieldValue("village", row.village);
    formik.setFieldValue("taluk", row.taluk);
    formik.setFieldValue("pincode", row.pincode);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("ward", row.ward);
    formik.setFieldValue("block", row.block);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("projectname", row.projectname || "");
    formik.setFieldValue("plotno", row.plotno || "");
    formik.setFieldValue("approvaltype", row.approvaltype || "");
    formik.setFieldValue("aprovalno", row.aprovalno || "");
    formik.setFieldValue("rerano", row.rerano || "");
    formik.setFieldValue("planning_permit_no", row.planning_permit_no || "");
    formik.setFieldValue("building_permit_no", row.building_permit_no || "");
    formik.setFieldValue("built_up_area", row.built_up_area || "");
    formik.setFieldValue("common_area", row.common_area || "");
    formik.setFieldValue(
      "supper_built_up_area",
      row.supper_built_up_area || ""
    );
    formik.setFieldValue("uds", row.uds || "");
    formik.setFieldValue("no_floors", row.no_floors || "");
    formik.setFieldValue("door_facing", row.door_facing || "");
    formik.setFieldValue("no_bedrooms", row.no_bedrooms || "");
    formik.setFieldValue("no_bathrooms", row.no_bathrooms || "");
    formik.setFieldValue("land_area", row.land_area || "");
    formik.setFieldValue("carparking", row.carparking || "");
    formik.setFieldValue("no_bhk", row.no_bhk || "");
    formik.setFieldValue("price_per_sqft", row.price_per_sqft || "");
    formik.setFieldValue("villa_cost", row.villa_cost || "");
    formik.setFieldValue("car_parking_cost", row.car_parking_cost || "");
    formik.setFieldValue("total_cost", row.total_cost || "");
    formik.setFieldValue("road_frontage", row.road_frontage || "");
    formik.setFieldValue("road_width", row.road_width || "");
    formik.setFieldValue("corner_property", row.corner_property || "");
    formik.setFieldValue("file", row.document);
    formik.setFieldValue("oldfile", row.document);
    setUrl(row.document);

    formik.setFieldValue("id", row.id);
  };
  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/houseagreement/${eid}`,
        {}
      );
      setPrDetails(response.data);
    } catch (error) { }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const [postLoding, setPostLoading] = useState(false)
  const onSubmit = async (values) => {
    if (isEditing) {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        // status: null,
        status: "pending",
      };
      setPostLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/houseagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
        fetchDetails();
        setPostLoading(false)
      } catch (error) {
        alert(error);
        setPostLoading(false)
      }
    } else {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
      };
      setPostLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/houseagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
        // setEditDialog(false)
        fetchDetails();
        setPostLoading(false)
      } catch (error) {
        alert(error);
        setPostLoading(false)
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      property_id: `PROP${1000 + eid}`,
      type: "",
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      ward: "",
      block: "",
      sro: "",
      projectname: "",
      plotno: "",
      approvaltype: "",
      aprovalno: "",
      rerano: "",
      planning_permit_no: "",
      building_permit_no: "",
      built_up_area: "",
      common_area: "",
      supper_built_up_area: "",
      uds: "",
      no_floors: "",
      door_facing: "",
      no_bedrooms: "",
      no_bathrooms: "",
      land_area: "",
      carparking: "",
      no_bhk: "",
      price_per_sqft: "",
      villa_cost: "",
      car_parking_cost: "",
      total_cost: "",
      file: "",
      status: "pending",
      road_frontage: "",
      road_width: "",
      corner_property: "",
    },
    validationSchema: yup.object().shape({
      type: yup.string().required("village type is required !!"),
      state: yup.string().required("state is required !!"),
      district: yup.string().required("district is required !!"),
      taluk: yup.string().required("taluk is required !!"),
      village: yup.string().required("village is required !!"),
      sro: yup.string().required("sro is required !!"),
      pincode: yup.string().required("pincode is required !!"),
      projectname:
        sub_property === "Villa"
          ? yup.string().required("project name is required !!")
          : yup.string().notRequired(),
      plotno: yup.string().required("Plot number is required"),
      approvaltype: yup.string().required("Approval type is required"),
      aprovalno: yup.string().required("Approval number is required"),
      rerano: yup.string().required("RERA number is required"),
      planning_permit_no: yup
        .string()
        .required("Planning permit number is required"),
      building_permit_no: yup
        .string()
        .required("Building permit number is required"),
      built_up_area: yup
        .number()
        .typeError("Built-up area must be a number")
        .required("Built-up area is required")
        .positive("Built-up area must be positive"),
      common_area: yup
        .number()
        .typeError("Common area must be a number")
        .required("Common area is required")
        .min(0, "Common area cannot be negative"),
      supper_built_up_area: yup
        .number()
        .typeError("Super built-up area must be a number")
        .required("Super built-up area is required")
        .min(0, "Super built-up area cannot be negative"),
      uds: yup.string().required("UDS is required"),
      no_floors: yup
        .number()
        .typeError("No. of floors must be a number")
        .required("No floors is required !!"),
      door_facing: yup.string().required("Door facing is required !!"),
      no_bedrooms: yup
        .number()
        .typeError("No. of bedrooms must be a number")
        .required("No of bedrooms is required !!"),
      no_bathrooms: yup
        .number()
        .typeError("No. of bathrooms must be a number")
        .required("No of bathrooms is required !!"),

      land_area: yup.string().required("No of balcony is required !!"),
      carparking: yup.string().required("Car parking is required !!"),
      no_bhk: yup.string().required("no of bhk is required !!"),
      road_frontage: yup.string().required("road frontage is required !!"),
      road_width: yup.string().required("road width is required !!"),
      corner_property: yup.string().required("corner property is required !!"),
    }),
    onSubmit,
  });


  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-3">
          <div className="card shadow border-0 p-4">
            <div className="  justify-content-between mb-3">
              <h6>Project Details </h6>

              <hr />
            </div>
            {prDetails?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <button className="btn1" onClick={() => setNewDialog(true)}>
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
                  <select
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
                  </select>
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
                  <select
                    name="district"
                    id="district"
                    className="form-select"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  </select>
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
                  <select
                    name="taluk"
                    id="taluk"
                    className="form-select"
                    value={formik.values.taluk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  </select>
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
                  <select
                    name="village"
                    id="village"
                    className="form-select"
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  </select>
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
                  <select
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
                  </select>
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
                  <select
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
                  </select>
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {sub_property === "Villa" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="projectname" className="form-label">
                      Project Name / Villa Name
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="projectname"
                      placeholder="Enter project name..."
                      value={formik.values.projectname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.projectname && formik.touched.projectname ? (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.projectname}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    {sub_property === "Villa" ? "Villa No." : "Plot No"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="plotno"
                    placeholder="Enter aproval no..."
                    value={formik.values.plotno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotno && formik.touched.plotno ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotno}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Approval Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    type="select"
                    className="form-select"
                    name="approvaltype"
                    placeholder="enter approvaltype..."
                    value={formik.values.approvaltype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Type</option>
                    <option value="CMDA">CMDA</option>
                    <option value="DTCP">DTCP</option>
                    <option value=" Local body approved">
                      {" "}
                      Local body approved
                    </option>
                  </select>
                  {formik.errors.approvaltype && formik.touched.approvaltype ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.approvaltype}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Approval No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="Enter aproval no..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    RERA No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="rerano"
                    placeholder="Enter rera no..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rerano && formik.touched.rerano ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Planning Permit No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="planning_permit_no"
                    placeholder="Enter planning permit no..."
                    value={formik.values.planning_permit_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.planning_permit_no &&
                    formik.touched.planning_permit_no ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.planning_permit_no}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Building Permit No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="building_permit_no"
                    placeholder="Enter building permit no..."
                    value={formik.values.building_permit_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.building_permit_no &&
                    formik.touched.building_permit_no ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.building_permit_no}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Built Up Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="built_up_area"
                    placeholder="Enter built up area..."
                    value={formik.values.built_up_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.built_up_area &&
                    formik.touched.built_up_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.built_up_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Common Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="common_area"
                    placeholder="Enter common area..."
                    value={formik.values.common_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.common_area && formik.touched.common_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.common_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Supper Built Up Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="supper_built_up_area"
                    placeholder="Enter supper built up area..."
                    value={formik.values.supper_built_up_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.supper_built_up_area &&
                    formik.touched.supper_built_up_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.supper_built_up_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Uds
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="uds"
                    placeholder="Enter uds..."
                    value={formik.values.uds}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.uds && formik.touched.uds ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.uds}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No Of Floors
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_floors"
                    placeholder="Enter no of floors..."
                    value={formik.values.no_floors}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_floors && formik.touched.no_floors ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_floors}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Door Facing
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="door_facing"
                    placeholder="Enter door facing..."
                    value={formik.values.door_facing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.door_facing && formik.touched.door_facing ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.door_facing}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No. of Bedrooms
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_bedrooms"
                    placeholder="Enter no of bedrooms..."
                    value={formik.values.no_bedrooms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_bedrooms && formik.touched.no_bedrooms ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_bedrooms}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No of Bathrooms
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_bathrooms"
                    placeholder="Enter no of bathrooms..."
                    value={formik.values.no_bathrooms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_bathrooms && formik.touched.no_bathrooms ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_bathrooms}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Land Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="land_area"
                    placeholder="Enter land area..."
                    value={formik.values.land_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.land_area && formik.touched.land_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.land_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Car Parking
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="carparking"
                    placeholder="Enter car parking..."
                    value={formik.values.carparking}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.carparking && formik.touched.carparking ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.carparking}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No of Bhk
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_bhk"
                    placeholder="Enter no of bhk..."
                    value={formik.values.no_bhk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_bhk && formik.touched.no_bhk ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_bhk}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Price per Sq.Ft.,
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="price_per_sqft"
                    placeholder="Enter price per Sq.Ft.,..."
                    value={formik.values.price_per_sqft}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.price_per_sqft &&
                    formik.touched.price_per_sqft ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.price_per_sqft}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Villa Cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="villa_cost"
                    placeholder="Enter villa cost..."
                    value={formik.values.villa_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.villa_cost && formik.touched.villa_cost ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.villa_cost}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Car Parking Cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="car_parking_cost"
                    placeholder="Enter car parking cost..."
                    value={formik.values.car_parking_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.car_parking_cost &&
                    formik.touched.car_parking_cost ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.car_parking_cost}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total aparment cost (Exclusive of documentation &
                    registration cost)
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="total_cost"
                    placeholder="Enter total cost..."
                    value={formik.values.total_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.total_cost && formik.touched.total_cost ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_cost}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <hr />
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    File
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
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
                      disabled={postLoding}
                    >
                      {postLoding ? "Processing..." : "Save"}
                    </Button>
                  </>
                )}
            </div>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
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
                  <select
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
                  </select>
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
                  <select
                    name="district"
                    id="district"
                    className="form-select"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  </select>
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
                  <select
                    name="taluk"
                    id="taluk"
                    className="form-select"
                    value={formik.values.taluk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  </select>
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
                  <select
                    name="village"
                    id="village"
                    className="form-select"
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  </select>
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
                  <select
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
                  </select>
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
                  <select
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
                  </select>
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {sub_property === "Villa" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="projectname" className="form-label">
                      Project Name / Villa Name
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="projectname"
                      placeholder="Enter project name..."
                      value={formik.values.projectname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.projectname && formik.touched.projectname ? (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.projectname}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    {sub_property === "Villa" ? "Villa No." : "Plot No"}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="plotno"
                    placeholder="Enter aproval no..."
                    value={formik.values.plotno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotno && formik.touched.plotno ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotno}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Approval Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <select
                    type="select"
                    className="form-select"
                    name="approvaltype"
                    placeholder="enter approvaltype..."
                    value={formik.values.approvaltype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Type</option>
                    <option value="CMDA">CMDA</option>
                    <option value="DTCP">DTCP</option>
                    <option value=" Local body approved">
                      {" "}
                      Local body approved
                    </option>
                  </select>
                  {formik.errors.approvaltype && formik.touched.approvaltype ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.approvaltype}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Approval No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="Enter aproval no..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    RERA No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="rerano"
                    placeholder="Enter rera no..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rerano && formik.touched.rerano ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Planning Permit No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="planning_permit_no"
                    placeholder="Enter planning permit no..."
                    value={formik.values.planning_permit_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.planning_permit_no &&
                    formik.touched.planning_permit_no ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.planning_permit_no}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Building Permit No
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="building_permit_no"
                    placeholder="Enter building permit no..."
                    value={formik.values.building_permit_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.building_permit_no &&
                    formik.touched.building_permit_no ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.building_permit_no}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Built Up Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="built_up_area"
                    placeholder="Enter built up area..."
                    value={formik.values.built_up_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.built_up_area &&
                    formik.touched.built_up_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.built_up_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Common Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="common_area"
                    placeholder="Enter common area..."
                    value={formik.values.common_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.common_area && formik.touched.common_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.common_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Supper Built Up Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="supper_built_up_area"
                    placeholder="Enter supper built up area..."
                    value={formik.values.supper_built_up_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.supper_built_up_area &&
                    formik.touched.supper_built_up_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.supper_built_up_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Uds
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="uds"
                    placeholder="Enter uds..."
                    value={formik.values.uds}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.uds && formik.touched.uds ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.uds}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No Of Floors
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_floors"
                    placeholder="Enter no of floors..."
                    value={formik.values.no_floors}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_floors && formik.touched.no_floors ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_floors}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Door Facing
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="door_facing"
                    placeholder="Enter door facing..."
                    value={formik.values.door_facing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.door_facing && formik.touched.door_facing ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.door_facing}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No. of Bedrooms
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_bedrooms"
                    placeholder="Enter no of bedrooms..."
                    value={formik.values.no_bedrooms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_bedrooms && formik.touched.no_bedrooms ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_bedrooms}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No of Bathrooms
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_bathrooms"
                    placeholder="Enter no of bathrooms..."
                    value={formik.values.no_bathrooms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_bathrooms && formik.touched.no_bathrooms ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_bathrooms}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Land Area
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="land_area"
                    placeholder="Enter land area..."
                    value={formik.values.land_area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.land_area && formik.touched.land_area ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.land_area}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Car Parking
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="carparking"
                    placeholder="Enter car parking..."
                    value={formik.values.carparking}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.carparking && formik.touched.carparking ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.carparking}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No of Bhk
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="no_bhk"
                    placeholder="Enter no of bhk..."
                    value={formik.values.no_bhk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.no_bhk && formik.touched.no_bhk ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_bhk}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Price per Sq.Ft.,
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="price_per_sqft"
                    placeholder="Enter price per Sq.Ft.,..."
                    value={formik.values.price_per_sqft}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.price_per_sqft &&
                    formik.touched.price_per_sqft ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.price_per_sqft}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Villa Cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="villa_cost"
                    placeholder="Enter villa cost..."
                    value={formik.values.villa_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.villa_cost && formik.touched.villa_cost ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.villa_cost}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Car Parking Cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="car_parking_cost"
                    placeholder="Enter car parking cost..."
                    value={formik.values.car_parking_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.car_parking_cost &&
                    formik.touched.car_parking_cost ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.car_parking_cost}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total aparment cost (Exclusive of documentation &
                    registration cost)
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="total_cost"
                    placeholder="Enter total cost..."
                    value={formik.values.total_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.total_cost && formik.touched.total_cost ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_cost}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road Frontage
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="road_frontage"
                    placeholder="Enter road frontage..."
                    value={formik.values.road_frontage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.road_frontage && formik.touched.road_frontage ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_frontage}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road Width
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="road_width"
                    placeholder="Enter road width..."
                    value={formik.values.road_width}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.road_width && formik.touched.road_width ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_width}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Corner Property
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="corner_property"
                    placeholder="Enter corner property..."
                    value={formik.values.corner_property}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.corner_property && formik.touched.corner_property ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.corner_property}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            <hr />
            {/* <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    File
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
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
              </div>
            </div> */}
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
                    <button type="button" className="btn1" onClick={viewDocument}>
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
                      onClick={() => setIsEditing(true)}
                      disabled={postLoding}
                    >
                      {postLoding ? "Processing..." : "Update"}
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

export default ProjectDetailsContentHouse;
