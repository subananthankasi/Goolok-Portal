import  { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import { fetchSubPropertyType } from "../../../Redux/Actions/SubPropertyAction";
import { fetchPropertyType } from "../../../Redux/Actions/PropertyTypeAction";
import { fetchSRODetails } from "../../../Redux/Actions/MasterPage/SRODetailsAction";
import { fetchState } from "../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../Redux/Actions/MasterPage/VillageAction";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";

const tableStyle = {
  width: "70%",
  margin: "20px auto",
  border: "1px solid #000",
};

const highlightStyle = {
  backgroundColor: "#9ccddc",
  fontWeight: "bold",
};

const cellStyle = {
  border: "1px solid #000",
  padding: "8px",
};

const RegTikcketDetailsTele = ({
  eid,
  id,
  status,
  shortform,
  bookingid,
  pagetype,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [editing, setEditing] = useState(false);
  const [newDialog, setNewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const property = useSelector((state) => state.PropertyType.PropertyTypeData);
  const subproperty = useSelector(
    (state) => state.SubPropertyType.SubPropertyTypeData
  );
  const SRODetailsData = useSelector(
    (state) => state.SRODetails.SRODetailsData
  );
  const StateNameData = useSelector((state) => state.State.StateNameData);
  const districtData = useSelector((state) => state.District.districtData);
  const TalukData = useSelector((state) => state.Taluk.TalukData);
  const VillageData = useSelector((state) => state.Village.villageData);

  useEffect(() => {
    dispatch(fetchSubPropertyType());
    dispatch(fetchPropertyType());
    dispatch(fetchSRODetails());
    dispatch(fetchState());
    dispatch(fetchDistrict());
    dispatch(fetchTaluk());
    dispatch(fetchVillage());
  }, [dispatch]);

  const handleDeleteOpen = (row) => {
    setDeleteDialog(true);
    setdeleteId(row.id);
  };
  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/confirmation/${deleteId}`
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetch();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = () => {
    setEditDialog(true);
    if (Object.keys(registerData).length > 0) {
      formik.setFieldValue("category", registerData.category);
      formik.setFieldValue("subcategory", registerData.sub_category);
      formik.setFieldValue("state", registerData.state);
      formik.setFieldValue("district", registerData.district);
      formik.setFieldValue("taluk", registerData.taluk);
      formik.setFieldValue("village", registerData.village);
      formik.setFieldValue("sro", registerData.sro);
      formik.setFieldValue("property_type", registerData.property_type);
      formik.setFieldValue("extent_unit", registerData.extent_units);
      formik.setFieldValue("id", registerData.id);
    }
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
      bid: bookingid,
      shortform: shortform,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/ticketbooking`,
        payload
      );
      fetch();
      if (editing) {
        Toast({ message: "Successfully Updated", type: "success" });
        setEditDialog(false);
      } else {
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
      }
      formik.resetForm();
    } catch (error) {
      Toast({ message: "Failed to save", type: "error" });
    }
  };
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ticketbooking/${bookingid}/edit`
      );
      setRegisterData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      category: "",
      subcategory: "",
      state: "",
      district: "",
      taluk: "",
      village: "",
      sro: "",
      property_type: "",
      extent_unit: "",
    },
    validationSchema: yup.object().shape({
      category: yup.string().required("category is required !!"),
      subcategory: yup.string().required("subcategory is required !!"),
      state: yup.string().required("state is required !!"),
      district: yup.string().required("district is required !!"),
      taluk: yup.string().required("taluk is required !!"),
      village: yup.string().required("village is required !!"),
      sro: yup.string().required("sro is required !!"),
      property_type: yup.string().required("property type is required !!"),
      extent_unit: yup.string().required("extent in unit is required !!"),
    }),
    onSubmit,
  });

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6> Registration Ticket </h6>
              {Object.keys(registerData).length > 0 &&
                staffid.logintype == "staff" &&
                (status === "complete" || status === "pending") &&
                pagetype !== "reminder" && (
                  <div className="d-flex gap-2">
                    <button className="editButton" onClick={handleEdit}>
                      {" "}
                      <EditIcon />
                    </button>
                  </div>
                )}
            </div>
            <hr />
            {loading ? (
              <div className="d-flex justify-content-center mt-5">
                <ThreeCircles
                  visible={true}
                  height="50"
                  width="50"
                  color="#2f4f4f"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : Object.keys(registerData).length === 0 ? (
              <div className="d-flex justify-content-center">
                {staffid.logintype == "staff" &&
                  (status === "complete" || status === "pending") &&
                  pagetype !== "reminder" && (
                    <div className="">
                      <a
                        href="#"
                        onClick={() => setNewDialog(true)}
                        className="btn1 me-2"
                      >
                        + Create Ticket
                      </a>
                    </div>
                  )}
              </div>
            ) : (
              <table className="table table-bordered" style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      Registration ID
                    </td>
                    <td style={cellStyle}>{registerData?.reg_id} </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      Category{" "}
                    </td>
                    <td style={cellStyle}>{registerData?.categoryname} </td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      Sub Category
                    </td>
                    <td style={cellStyle}> {registerData?.subpro_name}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>State </td>
                    <td style={cellStyle}> {registerData?.stateName}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      District{" "}
                    </td>
                    <td style={cellStyle}> {registerData?.districtName}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>Taluk</td>
                    <td style={cellStyle}> {registerData?.talukName}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      Village{" "}
                    </td>
                    <td style={cellStyle}> {registerData?.villageName}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}> Sro</td>
                    <td style={cellStyle}> {registerData?.sro_title}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      Property Type{" "}
                    </td>
                    <td style={cellStyle}> {registerData?.property_type}</td>
                  </tr>
                  <tr>
                    <td style={{ ...cellStyle, ...highlightStyle }}>
                      Extent In Unit{" "}
                    </td>
                    <td style={cellStyle}> {registerData?.extent_units}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "52rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Create Registration Ticket"
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-6">
              <div className="form-group mt-1">
                <label className="form-label">
                  Category:<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="category"
                  id="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="">Select Category</option>
                  {property &&
                    property.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.property_type}
                      </option>
                    ))}
                </select>
                {formik.errors.category && formik.touched.category ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.category}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Sub Category :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="subcategory"
                  id="subcategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subcategory}
                  disabled={!formik.values.category}
                >
                  <option value="">Select Sub Category</option>
                  {subproperty ? (
                    subproperty
                      ?.filter(
                        (item) => item.property === formik.values.category
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.subproperty}
                        </option>
                      ))
                  ) : (
                    <option value="">No Sub Category Available</option>
                  )}
                </select>
                {formik.errors.subcategory && formik.touched.subcategory ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.subcategory}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Property Type :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="property_type"
                  id="property_type"
                  placeholder="Enter property type ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.property_type}
                />
                {formik.errors.property_type && formik.touched.property_type ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_type}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Extent in Units :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="extent_unit"
                  id="extent_unit"
                  placeholder="Enter extent in unit ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.extent_unit}
                />
                {formik.errors.extent_unit && formik.touched.extent_unit ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.extent_unit}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sro :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="sro"
                  id="sro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sro}
                >
                  <option value="">Select Sro</option>
                  {SRODetailsData &&
                    SRODetailsData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}
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
            <div className="col-6">
              <div className="form-group mt-1">
                <label className="form-label">
                  State :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="state"
                  id="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                >
                  <option value="">Select State</option>
                  {StateNameData &&
                    StateNameData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.state_name}
                      </option>
                    ))}
                </select>
                {formik.errors.state && formik.touched.state ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.state}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  District :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="district"
                  id="district"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.district}
                  disabled={!formik.values.state}
                >
                  <option value="">Select District</option>
                  {districtData ? (
                    districtData
                      ?.filter(
                        (item) => item.state_type === formik.values.state
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.district}
                        </option>
                      ))
                  ) : (
                    <option value="">No district Available</option>
                  )}
                </select>
                {formik.errors.district && formik.touched.district ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.district}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Taluk :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="taluk"
                  id="taluk"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taluk}
                  disabled={!formik.values.district}
                >
                  <option value="">Select Taluk</option>
                  {TalukData ? (
                    TalukData?.filter(
                      (item) => item.taluk_district === formik.values.district
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.taluk_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select>
                {formik.errors.taluk && formik.touched.taluk ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.taluk}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Village :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="village"
                  id="village"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.village}
                  disabled={!formik.values.taluk}
                >
                  <option value="">Select Village</option>
                  {VillageData ? (
                    VillageData?.filter(
                      (item) => item.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.village_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select>
                {formik.errors.village && formik.touched.village ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.village}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(false)}
            >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "52rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-6">
              <div className="form-group mt-1">
                <label className="form-label">
                  Category:<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="category"
                  id="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="">Select Category</option>
                  {property &&
                    property.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.property_type}
                      </option>
                    ))}
                </select>
                {formik.errors.category && formik.touched.category ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.category}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Sub Category :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="subcategory"
                  id="subcategory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subcategory}
                  disabled={!formik.values.category}
                >
                  <option value="">Select Sub Category</option>
                  {subproperty ? (
                    subproperty
                      ?.filter(
                        (item) => item.property === formik.values.category
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.subproperty}
                        </option>
                      ))
                  ) : (
                    <option value="">No Sub Category Available</option>
                  )}
                </select>
                {formik.errors.subcategory && formik.touched.subcategory ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.subcategory}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Property Type :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="property_type"
                  id="property_type"
                  placeholder="Enter property type ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.property_type}
                />
                {formik.errors.property_type && formik.touched.property_type ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_type}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  {" "}
                  Extent in Units :<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="extent_unit"
                  id="extent_unit"
                  placeholder="Enter extent in unit ..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.extent_unit}
                />
                {formik.errors.extent_unit && formik.touched.extent_unit ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.extent_unit}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2">
                <label className="form-label">
                  Sro :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="sro"
                  id="sro"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sro}
                >
                  <option value="">Select Sro</option>
                  {SRODetailsData &&
                    SRODetailsData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.sro_title}
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
            <div className="col-6">
              <div className="form-group mt-1">
                <label className="form-label">
                  State :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="state"
                  id="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                >
                  <option value="">Select State</option>
                  {StateNameData &&
                    StateNameData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.state_name}
                      </option>
                    ))}
                </select>
                {formik.errors.state && formik.touched.state ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.state}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  District :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="district"
                  id="district"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.district}
                  disabled={!formik.values.state}
                >
                  <option value="">Select District</option>
                  {districtData ? (
                    districtData
                      ?.filter(
                        (item) => item.state_type === formik.values.state
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.district}
                        </option>
                      ))
                  ) : (
                    <option value="">No district Available</option>
                  )}
                </select>
                {formik.errors.district && formik.touched.district ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.district}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Taluk :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="taluk"
                  id="taluk"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taluk}
                  disabled={!formik.values.district}
                >
                  <option value="">Select Taluk</option>
                  {TalukData ? (
                    TalukData?.filter(
                      (item) => item.taluk_district === formik.values.district
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.taluk_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select>
                {formik.errors.taluk && formik.touched.taluk ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.taluk}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-1">
                <label className="form-label">
                  Village :<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <select
                  type="text"
                  className="form-select"
                  name="village"
                  id="village"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.village}
                  disabled={!formik.values.taluk}
                >
                  <option value="">Select Village</option>
                  {VillageData ? (
                    VillageData?.filter(
                      (item) => item.village_taluk === formik.values.taluk
                    ).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.village_name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Taluk Available</option>
                  )}
                </select>
                {formik.errors.village && formik.touched.village ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.village}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="contained"
              type="submit"
              onClick={() => setEditing(true)}
            >
              Update
            </Button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row
          </span>
        </div>

        <div className="d-flex justify-content-end mt-3 gap-3">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(false)}
          >
            No
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default RegTikcketDetailsTele;
