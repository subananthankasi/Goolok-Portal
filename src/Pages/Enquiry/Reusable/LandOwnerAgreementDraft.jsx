import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import Spinner from "react-bootstrap/Spinner";
import { DateFormatcustom } from "../../../Utils/DateFormatcustom";
import { AgeCalculate } from "../../../Utils/AgeCalculate";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DistrictDropDown, {
  useDistrictOptions,
} from "../../../Utils/SelectDropDown/DistrictDropDown";
import StateDropDown, {
  useStateOptions,
} from "../../../Utils/SelectDropDown/StateDropDown";
import TalukDropDown, {
  useTalukOptions,
} from "../../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown, {
  useVillageOptions,
} from "../../../Utils/SelectDropDown/VillageDropDown";
import PincodeDropDown, {
  usePincodeOptions,
} from "../../../Utils/SelectDropDown/PincodeDropDown";
import { Input, InputGroup } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { fetchState } from "../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../Redux/Actions/MasterPage/TalukAction";
import { fetchPincode } from "../../../Redux/Actions/MasterPage/PincodeAction";
import { fetchVillage } from "../../../Redux/Actions/MasterPage/VillageAction";

export const LandOwnerAgreementDraft = ({ eid, id, status, pagetype }) => {
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
  const [visible, setVisible] = useState(false);

  // fetch data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProposalData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirylandowner/${eid}`
      );
      setData(response.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposalData();
  }, []);

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const [agreedata, setAgreedata] = useState([]);
  const fetchAgreeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agreedata/${eid}`, {
        headers: {
          "Gl-Status": "customer",
        },
      });
      setAgreedata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgreeData();
  }, []);


  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => DateFormatcustom(row.created_at),
      sortable: true,
    },
    {
      name: "Property ID",
      selector: (row) => row.property_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Age",
      selector: (row) => AgeCalculate(row.created_at),
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state_name,
      sortable: true,
    },
    {
      name: "District",
      selector: (row) => row.district_name,
      sortable: true,
    },
    {
      name: "Taluk",
      selector: (row) => row.taluk_name,
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
    ...(data[0]?.patta_type === "Town_patta" &&
    data[0]?.subpro_name !== "Agricultural Land"
      ? [
          {
            name: "Ward",
            selector: (row) => row.ward,
            sortable: true,
          },
          {
            name: "Block",
            selector: (row) => row.block,
            sortable: true,
          },
        ]
      : []),
    {
      name: "SRO",
      selector: (row) => row.sro_title,
      sortable: true,
    },
    {
      name: "Land classification",
      selector: (row) => row.classification,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total Extent in units",
      selector: (row) => `${row.units} / ${enquiryDoumentData?.land_units} `,
      sortable: true,
      width: "150px",
    },
    {
      name: "Per unit price ",
      selector: (row) => row.price,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total land cost",
      selector: (row) => row.total_cost,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road frontage",
      selector: (row) => row.road_frontage,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road facing",
      selector: (row) => row.road_facing,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "150px",
    },
    {
      name: "Boundary wall",
      selector: (row) => row.boundary_wall,
      sortable: true,
      width: "150px",
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
      width: "170px",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 ${
              row.status == "pending" ? "bg-danger" : "bg-success"
            }`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Signed date",
      width: "170px",
      selector: (row) => row.signed_date,
      sortable: true,
    },

    ...(staffid.logintype == "staff" &&
    (status === "pending" || status === "complete") &&
    pagetype !== "reminder" &&
    data[0]?.status !== "signed"
      ? [
          {
            name: "Edit",
            cell: (row) => (
              <div className="d-flex">
                <button
                  className="btn btn-outline-info me-1 edit"
                  data-tooltip-id="delete"
                  //   onClick={() => {
                  //     setIsModalEdit(true);
                  //     setEditData(row);
                  //   }}
                >
                  <EditIcon />
                </button>
              </div>
            ),
            sortable: true,
          },
        ]
      : []),
  ];

  const onSubmit = () => {};
  const formik = useFormik({
    initialValues: {
      project_id: "",
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      classification: "",
      total_units: "",
      price_acre: "",
      total_cost: "",
      road_frontage: "",
      road_facing: "",
      road_width: "",
      boundary_wall: "",
      sro: "",
      file: "",
      ward: "",
      block: "",
    },
    validationSchema: yup.object().shape({
      //   project_id: yup.string().required("Project ID is required !!"),
      state: yup.string().required("State is required !!"),
      district: yup.string().required("District is required !!"),
      taluk: yup.string().required("Taluk is required !!"),
      village: yup.string().required("Village is required !!"),
      pincode: yup.string().required("Pincode is required !!"),
      classification: yup.string().required("Classification is required !!"),
      total_units: yup
        .number()
        .typeError("Total units must be a number")
        .positive("Must be greater than 0")
        .required("Total units are required !!"),
      price_acre: yup
        .number()
        .typeError("Price per acre must be a number")
        .positive("Must be greater than 0")
        .required("Price per acre is required !!"),
      total_cost: yup
        .number()
        .typeError("Total cost must be a number")
        .positive("Must be greater than 0")
        .required("Total cost is required !!"),
      road_frontage: yup.string().required("Road frontage is required !!"),
      road_facing: yup.string().required("Road facing is required !!"),
      road_width: yup
        .number()
        .typeError("Road width must be a number")
        .positive("Must be greater than 0")
        .required("Road width is required !!"),
      boundary_wall: yup.string().required("Boundary wall info is required !!"),
      sro: yup.string().required("SRO is required !!"),
      file: yup
        .mixed()
        .required("File upload is required !!")
        .test("fileSize", "File too large ..only 5MB allowed", (value) =>
          value ? value.size <= 5 * 1024 * 1024 : true
        ),
      // ward: yup.string().required("Ward is required !!"),
      // block: yup.string().required("Block is required !!"),
    }),
    onSubmit,
  });
  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="col-12 mt-4">
          <div className="card shadow border-0 mb-4">
            <div className="card shadow border-0 p-4">
              <div className="d-flex justify-content-between">
                <h6>newwwwwwwwwww</h6>
              </div>

              <hr />

              {data.length == "0" && staffid.logintype == "staff" ? (
                <div className="container" style={{ maxWidth: "350px" }}>
                  <div className="p-4 text-center">
                    <a
                      href="#0"
                      onClick={() => setVisible(true)}
                      className="btn1"
                    >
                      + create new
                    </a>
                  </div>
                </div>
              ) : (
                <DataTable
                  persistTableHead={true}
                  columns={columns}
                  data={data}
                  customStyles={customStyle}
                  fixedHeader
                />
              )}
            </div>
          </div>
        </div>
      )}
      <Dialog
        visible={visible}
        style={{ width: "64rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setVisible(false);
          //   formik.resetForm();
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
            {/* state */}
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
            {/* District */}
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
            {/* Taluk */}
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

            {/* Village */}
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
            {/* Pincode */}
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

            {/* Sro */}
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
            {/* Ward */}
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

            {/* Block */}
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
            {/* Land classification */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Land classification
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="classification"
                    placeholder="Enter land classification...."
                    value={formik.values.classification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.classification &&
                  formik.touched.classification ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.classification}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            {/*  total units*/}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total extent in units :
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      name="total_units"
                      placeholder="Enter total in unit..."
                      value={formik.values.total_units}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.total_units && formik.touched.total_units ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_units}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            {/*  Price per unit */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Price per unit
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      name="price_acre"
                      placeholder="Enter price per unit..."
                      value={formik.values.price_acre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.price_acre && formik.touched.price_acre ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.price_acre}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            {/*  Total land cost */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total land cost (Exclusive of documentation & registration
                    cost)
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
            {/*  Road frontage */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road frontage
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
                  {formik.errors.road_frontage &&
                  formik.touched.road_frontage ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_frontage}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            {/*  Road facing */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road facing
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="road_facing"
                    placeholder="Enter road facing..."
                    value={formik.values.road_facing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.road_facing && formik.touched.road_facing ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_facing}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>

            {/*  Road width */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road width
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
            {/*  Boundary wall */}
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Boundary wall
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="boundary_wall"
                    placeholder="Enter boundary wall..."
                    value={formik.values.boundary_wall}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.boundary_wall &&
                  formik.touched.boundary_wall ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.boundary_wall}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <hr />
            {/*   File */}
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
                      //   onClick={viewDocument}
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
                      onClick={() => setIsEditing(true)}
                    >
                      Update
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

const LandOwnerAgreementModal = ({ isOpen, closeModal, eid, id, fetch }) => {
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    project_id: "",
    state: "",
    district: "",
    taluk: "",
    village: "",
    pincode: "",
    classification: "",
    total_units: "",
    price_acre: "",
    total_cost: "",
    road_frontage: "",
    road_facing: "",
    road_width: "",
    boundary_wall: "",
    sro: "",
    file: "",
    ward: "",
    block: "",
  });

  // set dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setSelectedPincode(null);
  };
  const handlePincodeSelect = (pincode) => {
    setSelectedPincode(pincode);
  };

  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();
  const pincodeDropDown = usePincodeOptions();

  const [agreedata, setAgreedata] = useState([]);
  const fetchAgreeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agreedata/${eid}`, {
        headers: {
          "Gl-Status": "customer",
        },
      });
      setAgreedata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgreeData();
  }, []);
  useEffect(() => {
    if (agreedata && stateDropDown.length) {
      const stateOption = stateDropDown.find(
        (option) => option.value === agreedata[0]?.state
      );

      if (
        (!selectedState && stateOption) ||
        (selectedState && selectedState.value !== stateOption?.value)
      ) {
        setSelectedState(stateOption || null);
      }
    }
  }, [agreedata, stateDropDown]);

  useEffect(() => {
    if (agreedata && districtDropDown.length) {
      const districtOption = districtDropDown.find(
        (option) => option.value === agreedata[0]?.district
      );

      if (
        (!selectedDistrict && districtOption) ||
        (selectedDistrict && selectedDistrict.value !== districtOption?.value)
      ) {
        setSelectedDistrict(districtOption || null);
      }
    }
  }, [agreedata, districtDropDown]);

  useEffect(() => {
    if (agreedata && talukDropDown.length) {
      const talukOption = talukDropDown.find(
        (option) => option.value === agreedata[0]?.taluk
      );

      if (
        (!selectedTaluk && talukOption) ||
        (selectedTaluk && selectedTaluk.value !== talukOption?.value)
      ) {
        setSelectedTaluk(talukOption || null);
      }
    }
  }, [agreedata, talukDropDown]);

  useEffect(() => {
    if (agreedata && villageDropDown.length) {
      const villageOption = villageDropDown.find(
        (option) => option.value === agreedata[0]?.village
      );

      if (
        (!selectedVillage && villageOption) ||
        (selectedVillage && selectedVillage.value !== villageOption?.value)
      ) {
        setSelectedVillage(villageOption || null);
      }
    }
  }, [agreedata, villageDropDown]);

  useEffect(() => {
    if (agreedata && pincodeDropDown.length) {
      const pinCodeOption = pincodeDropDown.find(
        (option) => option.value === agreedata[0]?.village
      );

      if (
        (!selectedPincode && pinCodeOption) ||
        (selectedPincode && selectedPincode.value !== pinCodeOption?.value)
      ) {
        setSelectedPincode(pinCodeOption || null);
      }
    }
  }, [agreedata, pincodeDropDown]);

  useEffect(() => {
    if (isOpen) {
      const price_acre = agreedata ? agreedata[0]?.priceUnit : "";
      const total_units = agreedata ? agreedata[0]?.extent : 0;
      setFormData({
        ...formData,
        enqid: eid,
        project_id: `PROP${1000 + eid}`,
        file: file,
        agreeid: id,
        state: selectedState ? selectedState.value : "",
        district: selectedDistrict ? selectedDistrict.value : "",
        taluk: selectedTaluk ? selectedTaluk.value : "",
        village: selectedVillage ? selectedVillage.value : "",
        pincode: selectedPincode ? selectedPincode.value : "",
        road_frontage: agreedata ? agreedata[0]?.road_frontage : "",
        road_facing: agreedata ? agreedata[0]?.facing_width : "",
        road_width: agreedata ? agreedata[0]?.road_width : "",
        boundary_wall: agreedata ? agreedata[0]?.boundary : "",
        sro: agreedata ? agreedata[0]?.sro : "",
        classification: agreedata ? agreedata[0]?.classification : "",
        // price_acre: agreedata ? agreedata[0].priceUnit : "",
        // total_units: agreedata ? agreedata[0].extent : "",
        price_acre,
        total_units,
        total_cost: price_acre * total_units || "",
        ward: agreedata ? agreedata[0].ward : "",
        block: agreedata ? agreedata[0].block : "",
      });
    }
  }, [
    isOpen,
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
    file,
    id,
  ]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "price_acre" || name === "total_units") {
        const price = Number(
          name === "price_acre" ? value : updatedData.price_acre
        );
        const units = Number(
          name === "total_units" ? value : updatedData.total_units
        );

        updatedData.total_cost = price && units ? price * units : "";
      }

      return updatedData;
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: null }));
    } else {
      setFile(null);
      setErrors((prev) => ({
        ...prev,
        file: "Only PDF files are allowed.",
      }));
    }
  };

  const [sroData, setSroData] = useState([]);

  const fetchSro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/srodetails`);
      setSroData(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSro();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, file, setErrors)) return;
    setloading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/enquirylandowner`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Toast({ message: "Added successfully", type: "success" });
    } catch (error) {
      Toast({ message: "Error to add...Try again!", type: "error" });
    } finally {
      setloading(false);
      fetch();
      closeModal();
      handleClear();
    }
  };

  // Handle Clear button
  const handleClear = () => {
    setFile(null);
    setErrors({});
    fileInputRef.current.value = "";
    setFormData({
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      classification: "",
      total_units: "",
      price_acre: "",
      total_cost: "",
      road_frontage: "",
      road_facing: "",
      road_width: "",
      boundary_wall: "",
      sro: "",
      file: "",
    });
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">
                Land owner agreement draft
              </h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  handleClear();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Property ID :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={formData.project_id}
                          disabled
                        />
                        {errors.proposedPrice && (
                          <div className="validation_msg">
                            {errors.proposedPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">State :</label>
                      </div>
                      <div className="col-7">
                        <StateDropDown
                          onSelect={handleStateSelect}
                          selectedState={selectedState}
                          isDisabled={true}
                        />
                        {errors.state && (
                          <div className="validation_msg">{errors.state}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">District :</label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="pattaname"
                          value={formData.district}
                          disabled
                        /> */}
                        <DistrictDropDown
                          onSelect={handleDistrictSelect}
                          selectedDistrict={selectedDistrict}
                          filter={selectedState}
                          isDisabled={true}
                        />
                        {errors.district && (
                          <div className="validation_msg">
                            {errors.district}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Taluk :</label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="pattaname"
                          value={formData.taluk}
                          disabled
                        /> */}
                        <TalukDropDown
                          onSelect={handleTalukSelect}
                          selectedTaluk={selectedTaluk}
                          filter={selectedDistrict}
                          isDisabled={true}
                        />
                        {errors.taluk && (
                          <div className="validation_msg">{errors.taluk}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Village :</label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="pattaname"
                          value={formData.village}
                          disabled
                        /> */}
                        <VillageDropDown
                          onSelect={handleVillageSelect}
                          selectedVillage={selectedVillage}
                          filter={selectedTaluk}
                          // isDisabled={true}
                        />
                        {errors.village && (
                          <div className="validation_msg">{errors.village}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-6 mb-3">
                      <div className="row">
                        <div className="col-5">
                          <label className="form-label">
                          SRO :
                          </label>
                        </div>
                        <div className="col-7">
                          <input
                            type="text"
                            className="form-control" 
                            name="classification"
                            value={formData.classification}
                            onChange={handleChange}
                          />
                          {errors.classification && (
                            <div className="validation_msg">{errors.classification}</div>
                          )}
                        </div>
                      </div>
                    </div>  */}

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Pincode :</label>
                      </div>
                      <div className="col-7">
                        <PincodeDropDown
                          onSelect={handlePincodeSelect}
                          selectedPincode={selectedPincode}
                          filter={selectedVillage}
                          // isDisabled={true}
                        />
                        {errors.pincode && (
                          <div className="validation_msg">{errors.pincode}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {agreedata[0]?.patta_type === "Town_patta" &&
                    agreedata[0]?.subpro_name !== "Agricultural Land" && (
                      <>
                        <div className="col-6 mb-3">
                          <div className="row">
                            <div className="col-5">
                              <label className="form-label">Ward :</label>
                            </div>
                            <div className="col-7">
                              <input
                                type="text"
                                className="form-control"
                                name="ward"
                                value={formData.ward}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <div className="row">
                            <div className="col-5">
                              <label className="form-label">Block :</label>
                            </div>
                            <div className="col-7">
                              <input
                                type="text"
                                className="form-control"
                                name="block"
                                value={formData.block}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">SRO :</label>
                      </div>
                      <div className="col-7">
                        <select
                          type="text"
                          className="form-select"
                          name="sro"
                          value={formData.sro}
                          // onChange={handleChange}
                          disabled
                        >
                          <option>Select SRO </option>
                          {sroData?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {" "}
                              {item.sro_title}{" "}
                            </option>
                          ))}
                        </select>
                        {errors.sro && (
                          <div className="validation_msg">{errors.sro}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Land classification :
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="classification"
                          value={formData.classification}
                          // onChange={handleChange}
                          disabled
                        />
                        {/* {errors.classification && (
                          <div className="validation_msg">{errors.classification}</div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total Extent in units :
                        </label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="total_units"
                          value={formData.total_units}
                          // onChange={handleChange}
                          // onKeyPress={(event) => {
                          //   const regex = /^[0-9]*$/;
                          //   if (!regex.test(event.key)) {
                          //     event.preventDefault();
                          //   }
                          // }}
                          disabled
                        /> */}
                        <InputGroup>
                          <input
                            type="text"
                            className="form-control"
                            name="total_units"
                            value={formData.total_units}
                            // onChange={handleChange}
                            // onKeyPress={(event) => {
                            //   const regex = /^[0-9]*$/;
                            //   if (!regex.test(event.key)) {
                            //     event.preventDefault();
                            //   }
                            // }}
                            disabled
                          />
                          <InputGroup.Addon>
                            {enquiryDoumentData?.land_units}{" "}
                          </InputGroup.Addon>
                        </InputGroup>
                        {errors.total_units && (
                          <div className="validation_msg">
                            {errors.total_units}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Price per unit :</label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="price_acre"
                          value={formData.price_acre}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          disabled = {agreedata[0]?.priceUnit ? true : false}
                        /> */}
                        <InputGroup>
                          <input
                            type="text"
                            className="form-control"
                            name="price_acre"
                            value={formData.price_acre}
                            onChange={handleChange}
                            onKeyPress={(event) => {
                              const regex = /^[0-9]*$/;
                              if (!regex.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            disabled={agreedata[0]?.priceUnit ? true : false}
                          />
                          <InputGroup.Addon>
                            {enquiryDoumentData?.land_units}
                          </InputGroup.Addon>
                        </InputGroup>
                        {/* {errors.price_acre && (
                          <div className="validation_msg">{errors.price_acre}</div>
                        )} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total land cost{" "}
                          <small>
                            (Exclusive of documentation & registration cost)
                          </small>
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="total_cost"
                          value={formData.total_cost}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          disabled
                        />
                        {errors.total_cost && (
                          <div className="validation_msg">
                            {errors.total_cost}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total land cost <small>(Exclusive of documentation & registration cost)</small>
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="total_cost"
                          value={formData.total_cost}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        {errors.total_cost && (
                          <div className="validation_msg">{errors.total_cost}</div>
                        )}
                      </div>
                    </div>
                  </div> */}

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Road frontage :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="road_frontage"
                          value={formData.road_frontage}
                          // onChange={handleChange}
                          disabled
                        />
                        {/* {errors.road_frontage && (
                          <div className="validation_msg">{errors.road_frontage}</div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Road facing :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="road_facing"
                          value={formData.road_facing}
                          // onChange={handleChange}
                          disabled
                        />
                        {/* {errors.road_facing && (
                          <div className="validation_msg">{errors.road_facing}</div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Road width :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="road_width"
                          value={formData.road_width}
                          // onChange={handleChange}
                          disabled
                        />
                        {/* {errors.road_width && (
                          <div className="validation_msg">{errors.road_width}</div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Boundary wall :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="boundary_wall"
                          value={formData.boundary_wall}
                          // onChange={handleChange}
                          disabled
                        />
                        {/* {errors.boundary_wall && (
                          <div className="validation_msg">{errors.boundary_wall}</div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className="page_subheading">Agreement draft</h4>
                  <hr />
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="row align-items-center">
                        <div className="col-5">
                          <label className="form-label">File :</label>
                        </div>
                        <div className="col-7">
                          <input
                            type="file"
                            className="form-control"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                          {errors.file && (
                            <div className="validation_msg">{errors.file}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <button
                    className="btn1 me-1"
                    type="button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button className="btn1" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">wait...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LandOwnerAgreementModalEdit = ({
  isOpen,
  closeModal,
  editData,
  eid,
  fetch,
  id,
}) => {
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    project_id: "",
    state: "",
    district: "",
    taluk: "",
    village: "",
    pincode: "",
    classification: "",
    total_units: "",
    price_acre: "",
    total_cost: "",
    road_frontage: "",
    road_facing: "",
    road_width: "",
    boundary_wall: "",
    sro: "",
    file: "",
    ward: "",
    block: "",
  });

  const [sroData, setSroData] = useState([]);

  const fetchSro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/srodetails`);
      setSroData(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSro();
  }, []);
  // set dropdown

  const stateDropDown = useStateOptions();
  const districtDropDown = useDistrictOptions();
  const talukDropDown = useTalukOptions();
  const villageDropDown = useVillageOptions();
  const pincodeDropDown = usePincodeOptions();

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
    setSelectedPincode(null);
  };
  const handlePincodeSelect = (pincode) => {
    setSelectedPincode(pincode);
  };

  useEffect(() => {
    if (editData && isOpen) {
      const price_acre = editData ? editData?.price : "";
      const total_units = editData ? editData?.units : 0;
      setFormData({
        ...formData,
        id: editData.id,
        project_id: editData.property_id,
        classification: editData.classification,
        // total_units: editData.units,
        // price_acre: editData.price,
        price_acre,
        total_units,
        total_cost: price_acre * total_units || "",
        // total_cost: editData.total_cost,
        road_frontage: editData?.road_frontage,
        road_facing: editData?.road_facing,
        road_width: editData?.road_width,
        boundary_wall: editData?.boundary_wall,
        ward: editData?.ward,
        block: editData?.block,
        sro: editData?.sro,
        oldfile: editData?.agreement_file,
        enqid: editData?.enqid,
        agreeid: id,
      });
    }
  }, [editData, isOpen]);

  useEffect(() => {
    setFormData({
      ...formData,
      state: selectedState ? selectedState.value : "",
      district: selectedDistrict ? selectedDistrict.value : "",
      taluk: selectedTaluk ? selectedTaluk.value : "",
      village: selectedVillage ? selectedVillage.value : "",
      pincode: selectedPincode ? selectedPincode.value : "",
      file: file,
    });
  }, [
    selectedState,
    selectedDistrict,
    selectedTaluk,
    selectedVillage,
    selectedPincode,
    file,
  ]);

  useEffect(() => {
    if (isOpen && editData) {
      const defaultOptionState = stateDropDown.find(
        (option) => option.value === editData.state
      );
      setSelectedState(defaultOptionState);

      const defaultOptionDistrict = districtDropDown.find(
        (option) => option.value === editData.district
      );
      setSelectedDistrict(defaultOptionDistrict);

      const defaultOptionTaluk = talukDropDown.find(
        (option) => option.value === editData.taluk
      );
      setSelectedTaluk(defaultOptionTaluk);

      const defaultOptionVillage = villageDropDown.find(
        (option) => option.value === editData.village
      );
      setSelectedVillage(defaultOptionVillage);

      const defaultOptionPincodew = pincodeDropDown.find(
        (option) => option.value === editData.pincode
      );
      setSelectedPincode(defaultOptionPincodew);
    }
  }, [isOpen]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "price_acre" || name === "total_units") {
        const price = Number(
          name === "price_acre" ? value : updatedData.price_acre
        );
        const units = Number(
          name === "total_units" ? value : updatedData.total_units
        );

        updatedData.total_cost = price && units ? price * units : "";
      }

      return updatedData;
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: null }));
    } else {
      setFile(null);
      setErrors((prev) => ({
        ...prev,
        file: "Only PDF files are allowed.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, file, setErrors)) return;

    setloading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/enquirylandowner`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Toast({ message: "Added successfully", type: "success" });
    } catch (error) {
      Toast({ message: "Error to add...Try again!", type: "error" });
    } finally {
      setloading(false);
      fetch();
      closeModal();
      handleClear();
    }
  };

  // Handle Clear button
  const handleClear = () => {
    setFile(null);
    setErrors({});
    fileInputRef.current.value = "";
    setFormData({
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      classification: "",
      total_units: "",
      price_acre: "",
      total_cost: "",
      road_frontage: "",
      road_facing: "",
      road_width: "",
      boundary_wall: "",
      file: "",
      ward: "",
      block: "",
    });
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setSelectedPincode(null);
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">
                Land owner agreement draft
              </h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  handleClear();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Property ID :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={formData.project_id}
                          disabled
                        />
                        {errors.proposedPrice && (
                          <div className="validation_msg">
                            {errors.proposedPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">State :</label>
                      </div>
                      <div className="col-7">
                        <StateDropDown
                          onSelect={handleStateSelect}
                          selectedState={selectedState}
                        />
                        {errors.state && (
                          <div className="validation_msg">{errors.state}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">District :</label>
                      </div>
                      <div className="col-7">
                        <DistrictDropDown
                          onSelect={handleDistrictSelect}
                          selectedDistrict={selectedDistrict}
                          filter={selectedState}
                        />
                        {errors.district && (
                          <div className="validation_msg">
                            {errors.district}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Taluk :</label>
                      </div>
                      <div className="col-7">
                        <TalukDropDown
                          onSelect={handleTalukSelect}
                          selectedTaluk={selectedTaluk}
                          filter={selectedDistrict}
                        />
                        {errors.taluk && (
                          <div className="validation_msg">{errors.taluk}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Village :</label>
                      </div>
                      <div className="col-7">
                        <VillageDropDown
                          onSelect={handleVillageSelect}
                          selectedVillage={selectedVillage}
                          filter={selectedTaluk}
                        />
                        {errors.village && (
                          <div className="validation_msg">{errors.village}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Pincode :</label>
                      </div>
                      <div className="col-7">
                        <PincodeDropDown
                          onSelect={handlePincodeSelect}
                          selectedPincode={selectedPincode}
                          filter={selectedVillage}
                        />
                        {/* {errors.pincode && (
                          <div className="validation_msg">{errors.pincode}</div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  {editData?.patta_type === "Town_patta" &&
                    editData?.subpro_name !== "Agricultural Land" && (
                      <>
                        <div className="col-6 mb-3">
                          <div className="row">
                            <div className="col-5">
                              <label className="form-label">Ward :</label>
                            </div>
                            <div className="col-7">
                              <input
                                type="text"
                                className="form-control"
                                name="ward"
                                value={formData.ward}
                                onChange={handleChange}
                                // disabled
                              />
                              {/* {errors.boundary_wall && (
                          <div className="validation_msg">{errors.boundary_wall}</div>
                        )} */}
                            </div>
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <div className="row">
                            <div className="col-5">
                              <label className="form-label">Block :</label>
                            </div>
                            <div className="col-7">
                              <input
                                type="text"
                                className="form-control"
                                name="block"
                                value={formData.block}
                                onChange={handleChange}
                                // disabled
                              />
                              {/* {errors.boundary_wall && (
                          <div className="validation_msg">{errors.boundary_wall}</div>
                        )} */}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Land classification :
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="classification"
                          value={formData.classification}
                          onChange={handleChange}
                        />
                        {errors.classification && (
                          <div className="validation_msg">
                            {errors.classification}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total Extent in units :
                        </label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="total_units"
                          value={formData.total_units}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        /> */}
                        <InputGroup>
                          <input
                            type="text"
                            className="form-control"
                            name="total_units"
                            value={formData.total_units}
                            onChange={handleChange}
                            onKeyPress={(event) => {
                              const regex = /^[0-9]*$/;
                              if (!regex.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <InputGroup.Addon>
                            {enquiryDoumentData?.land_units}{" "}
                          </InputGroup.Addon>
                        </InputGroup>
                        {errors.total_units && (
                          <div className="validation_msg">
                            {errors.total_units}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Price per unit :</label>
                      </div>
                      <div className="col-7">
                        {/* <input
                          type="text"
                          className="form-control"
                          name="price_acre"
                          value={formData.price_acre}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        /> */}
                        <InputGroup>
                          <input
                            type="text"
                            className="form-control"
                            name="price_acre"
                            value={formData.price_acre}
                            onChange={handleChange}
                            onKeyPress={(event) => {
                              const regex = /^[0-9]*$/;
                              if (!regex.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                          <InputGroup.Addon>
                            {enquiryDoumentData?.land_units}{" "}
                          </InputGroup.Addon>
                        </InputGroup>
                        {errors.price_acre && (
                          <div className="validation_msg">
                            {errors.price_acre}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total land cost{" "}
                          <small>
                            (Exclusive of documentation & registration cost)
                          </small>
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="total_cost"
                          value={formData.total_cost}
                          onChange={handleChange}
                          onKeyPress={(event) => {
                            const regex = /^[0-9]*$/;
                            if (!regex.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          disabled
                        />
                        {errors.total_cost && (
                          <div className="validation_msg">
                            {errors.total_cost}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Road frontage :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="road_frontage"
                          value={formData.road_frontage}
                          onChange={handleChange}
                        />
                        {errors.road_frontage && (
                          <div className="validation_msg">
                            {errors.road_frontage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Road facing :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="road_facing"
                          value={formData.road_facing}
                          onChange={handleChange}
                        />
                        {errors.road_facing && (
                          <div className="validation_msg">
                            {errors.road_facing}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Road width :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="road_width"
                          value={formData.road_width}
                          onChange={handleChange}
                        />
                        {errors.road_width && (
                          <div className="validation_msg">
                            {errors.road_width}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">Boundary wall :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          name="boundary_wall"
                          value={formData.boundary_wall}
                          onChange={handleChange}
                        />
                        {errors.boundary_wall && (
                          <div className="validation_msg">
                            {errors.boundary_wall}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">SRO :</label>
                      </div>
                      <div className="col-7">
                        <select
                          type="text"
                          className="form-select"
                          name="sro"
                          value={formData.sro}
                          onChange={handleChange}
                        >
                          <option>Select SRO </option>
                          {sroData?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {" "}
                              {item.sro_title}{" "}
                            </option>
                          ))}
                        </select>
                        {errors.sro && (
                          <div className="validation_msg">{errors.sro}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className="page_subheading">Agreement draft</h4>
                  <hr />
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="row align-items-center">
                        <div className="col-5">
                          <label className="form-label">File :</label>
                        </div>
                        <div className="col-7">
                          <div className="d-flex">
                            <input
                              type="file"
                              className="form-control"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                            />
                            <a
                              href={`${IMG_PATH}/enquiry/agreement/${editData.agreement_file}`}
                              class="btn btn-warning ms-1 text-end"
                              download="download"
                              target="_blank"
                            >
                              <RemoveRedEyeIcon />
                            </a>
                          </div>
                          {errors.file && (
                            <div className="validation_msg">{errors.file}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <button
                    className="btn1 me-1"
                    type="button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button className="btn1" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">wait...</span>
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const validateForm = (formData, file, setErrors) => {
  const newErrors = {};

  if (!file && !formData.oldfile) {
    newErrors.file = "Please upload a file.";
  }
  if (file) {
    if (file.type !== "application/pdf") {
      newErrors.file = "Only PDF files are allowed.";
    }
  }

  // if (!formData.project_id || formData.project_id.trim() === "") {
  //   newErrors.project_id = "Project ID is required.";
  // }

  // if (!formData.state || formData.state.trim() === "") {
  //   newErrors.state = "State is required.";
  // }
  // if (!formData.district || formData.district.trim() === "") {
  //   newErrors.district = "District is required.";
  // }

  // if (!formData.taluk || formData.taluk.trim() === "") {
  //   newErrors.taluk = "Taluk is required.";
  // }

  // if (!formData.village || formData.village.trim() === "") {
  //   newErrors.village = "Village is required.";
  // }

  // if (!formData.pincode) {
  //   newErrors.pincode = "Valid pincode is required.";
  // }

  // if (!formData.classification || formData.classification.trim() === "") {
  //   newErrors.classification = "Land classification is required.";
  // }

  // if (!formData.price_acre || isNaN(formData.price_acre)) {
  //   newErrors.price_acre = "Price per acre must be a number.";
  // }

  // if (!formData.total_cost || isNaN(formData.total_cost)) {
  //   newErrors.total_cost = "Total cost must be a number.";
  // }

  // if (!formData.total_units || isNaN(formData.total_units)) {
  //   newErrors.total_units = "Total units must be a number.";
  // }

  // if (!formData.road_facing || formData.road_facing.trim() === "") {
  //   newErrors.road_facing = "Road facing information is required.";
  // }

  // if (!formData.road_frontage || formData.road_frontage.trim() === "") {
  //   newErrors.road_frontage = "Road frontage information is required.";
  // }

  // if (!formData.road_width || formData.road_width.trim() === "") {
  //   newErrors.road_width = "Road width is required.";
  // }

  // if (!formData.boundary_wall || formData.boundary_wall.trim() === "") {
  //   newErrors.boundary_wall = "Boundary wall information is required.";
  // }
  // if (!formData.sro || formData.sro.trim() === "") {
  //   newErrors.sro = "  sro is required.";
  // }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
