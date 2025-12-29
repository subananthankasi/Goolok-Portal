import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { Input, InputGroup } from "rsuite";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const CustomerMarketCom = ({ eid, marketid, status, subtype, pagetype }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [customerdata, setCustomerdata] = useState([]);
  const [newDialog, setNewDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setloading] = useState(0);
  const [getLoading, setGetLoading] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("loc", row.location);
    formik.setFieldValue("facing_width", row.facing_width);
    // formik.setFieldValue("road_width", row.road_width);
    const split = row.road_width.split("ft");
    formik.setFieldValue("road_width", split[0]);
    formik.setFieldValue("amenities", row.amenities);
    formik.setFieldValue("location_advantages", row.advantages);
    formik.setFieldValue("transportation_feasibility", row.feasibility);
    formik.setFieldValue("corner_property", row.corner_property);
    formik.setFieldValue("water_level", row.water_level);
    formik.setFieldValue("price_per_unit", row.unit);
    formik.setFieldValue("new_developments", row.developments);
    formik.setFieldValue("road_types", row.road_types);
    formik.setFieldValue("contact_no", row.contact);
    formik.setFieldValue("direction", row.direction);
    formik.setFieldValue("distance", row.distance);
    formik.setFieldValue("facing", row.facing);
    formik.setFieldValue("rumors", row.rumors);
    formik.setFieldValue("boundary", row.boundary);
    formik.setFieldValue("plotstone", row.plot_stone);
    formik.setFieldValue("developments", row.development);
    formik.setFieldValue("remark", row.remark);
    formik.setFieldValue("id", row.id);
  };
  const openDelete = (id) => {
    setDeleteDialog(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/customerprop/${deleteId}`);
      Toast({ message: "Successfully deleted", type: "success" });
      setDeleteDialog(false);
      formik.resetForm();
    } catch (error) {
      Toast({ message: "Error to delete! try again", type: "error" });
    } finally {
      fetchCustomerData();
    }
  };

  const customerColumns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "150px",
    },
    {
      name: "Lat & Long",
      selector: (row) => row.location,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road Facing Width",
      selector: (row) => row.facing_width,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road Width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "150px",
    },
    {
      name: "Amenities",
      selector: (row) => row.amenities,
      sortable: true,
      width: "150px",
    },
    {
      name: "Location Advantages",
      selector: (row) => row.advantages,
      sortable: true,
      width: "150px",
    },
    {
      name: "Transportation Feasibility",
      selector: (row) => row.feasibility,
      sortable: true,
      width: "150px",
    },
    {
      name: "Corner Property",
      selector: (row) => row.corner_property,
      sortable: true,
      width: "150px",
    },
    {
      name: "Water Level",
      selector: (row) => row.water_level,
      sortable: true,
      width: "150px",
    },
    {
      name: "Price per Unit",
      // selector: (row) => row.unit,
      selector: (row) =>
        `${row.unit} per ${enquiryDoumentData?.land_units} price`,
      sortable: true,
      width: "180px",
    },
    {
      name: "New Developments",
      selector: (row) => row.developments,
      sortable: true,
      width: "150px",
    },
    {
      name: "Contact No",
      selector: (row) => row.contact,
      sortable: true,
      width: "150px",
    },
    {
      name: "Direction",
      selector: (row) => row.direction,
      sortable: true,
      width: "150px",
    },
    {
      name: "Distance",
      selector: (row) => row.distance,
      sortable: true,
      width: "150px",
    },
    {
      name: "Facing",
      selector: (row) => row.facing,
      sortable: true,
      width: "150px",
    },
    {
      name: "Rumors",
      selector: (row) => row.rumors,
      sortable: true,
      width: "150px",
    },

    ...(subtype === "Land"
      ? [
        {
          name: "Boundary Wall",
          selector: (row) => row.boundary,
          sortable: true,
          width: "150px",
        },
        {
          name: "Road Type",
          selector: (row) => row.road_types,
          sortable: true,
          width: "150px",
        },
        {
          name: "Plot Stone",
          selector: (row) => row.plot_stone,
          sortable: true,
          width: "150px",
        },
        {
          name: "Project Development",
          selector: (row) => row.development,
          sortable: true,
          width: "150px",
        },
        {
          name: "Remarks",
          selector: (row) => row.remark,
          sortable: true,
          width: "150px",
        },
      ]
      : []),

    ...(staffid.logintype === "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-danger delete"
                data-tooltip-id="delete"
                onClick={() => openDelete(row.id)}
              >
                <DeleteIcon />
              </button>
              <button
                className="btn btn-outline-primary delete"
                data-tooltip-id="delete"
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

  const onSubmit = async (values) => {
    if (editing) {
      const payload = {
        ...values,
        marketid: marketid,
        road_width: `${values?.road_width}ft`,
      };
      setloading(2);
      try {
        await axios.post(`${API_BASE_URL}/customerprop`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Gl-Status": "customer",
          },
        });
        setEditDialog(false);
        setloading(0);
        fetchCustomerData();
        Toast({ message: "Successfully add", type: "success" });
        formik.resetForm();
      } catch (error) {
        Toast({ message: "Failed to add", type: "error" });
        setloading(0);
      }
    } else {
      const payload = {
        ...values,
        marketid: marketid,
        road_width: `${values?.road_width}ft`,
      };
      setloading(1);
      try {
        await axios.post(`${API_BASE_URL}/customerprop`, payload, {
          headers: {
            "Content-Type": "application/json",
            "Gl-Status": "customer",
          },
        });
        setloading(0);
        setNewDialog(false);
        fetchCustomerData();
        Toast({ message: "Successfully add", type: "success" });
        formik.resetForm();
      } catch (error) {
        Toast({ message: "Failed to add", type: "error" });
        setloading(0);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      loc: "",
      facing_width: "",
      road_width: "",
      amenities: "",
      location_advantages: "",
      transportation_feasibility: "",
      corner_property: "",
      water_level: "",
      price_per_unit: "",
      new_developments: "",
      road_types: "",
      contact_no: "",
      direction: "",
      distance: "",
      facing: "",
      rumors: "",
      boundary: "",
      developments: "",
      remark: "",
      plotstone: "",
      enqid: eid,
      staff_id: staffid.loginid,
      id: null,
    },
    // validationSchema: yup.object().shape({
    //   loc: yup
    //     .number()
    //     .typeError("loc must be a number !!")
    //     .required("loc is required !!"),
    //   facing_width: yup
    //     .string()
    //     .required("facing_width is required !!")
    //     .max(100),
    //   road_width: yup.string().required("road_width is required !!").max(100),
    //   amenities: yup
    //     .string()
    //     .required("amenities is required !!")
    //     .matches(
    //       /^[A-Za-z\s]+$/,
    //       "amenities must contain only letters and spaces"
    //     ),
    //   location_advantages: yup
    //     .string()
    //     .required("location_advantages is required !!")
    //     .matches(
    //       /^[A-Za-z\s]+$/,
    //       "location_advantages must contain only letters and spaces"
    //     ),
    //   transportation_feasibility: yup
    //     .string()
    //     .required("transportation_feasibility is required !!"),
    //   corner_property: yup
    //     .string()
    //     .required("corner_property is required !!")
    //     .matches(
    //       /^[A-Za-z\s]+$/,
    //       "corner_property must contain only letters and spaces"
    //     ),

    //   price_per_unit: yup.string().required("price_per_unit is required !!"),
    //   new_developments: yup
    //     .string()
    //     .required("new_developments is required !!")
    //     .matches(
    //       /^[A-Za-z\s]+$/,
    //       "new_developments must contain only letters and spaces"
    //     ),

    //   direction: yup
    //     .string()
    //     .required("direction is required !!")
    //     .matches(
    //       /^[A-Za-z\s]+$/,
    //       "direction must contain only letters and spaces"
    //     ),
    //   distance: yup.string().required("distance is required !!"),
    //   facing: yup
    //     .string()
    //     .required("facing is required !!")
    //     .matches(
    //       /^[A-Za-z\s]+$/,
    //       "facing must contain only letters and spaces"
    //     ),

    //   // no_carparking:
    //   //         data?.property === "Complex"
    //   //           ? yup.string().required("no of carparking is required !!")
    //   //           : yup.string().notRequired(),
    //   developments:
    //     subtype === "Land"
    //       ? yup.string().required("project developments is required !!")
    //       : yup.string().notRequired(),
    //   road_types:
    //     subtype === "Land"
    //       ? yup
    //           .string()
    //           .required("road types is required !!")
    //           .matches(
    //             /^[A-Za-z\s]+$/,
    //             "road_types must contain only letters and spaces"
    //           )
    //       : yup.string().notRequired(),
    //   remark:
    //     subtype === "Land"
    //       ? yup.string().required("remark is required !!")
    //       : yup.string().notRequired(),
    //   plotstone:
    //     subtype === "Land"
    //       ? yup.string().required("plot stone is required !!")
    //       : yup.string().notRequired(),
    //   boundary:
    //     subtype === "Land"
    //       ? yup.string().required("boundary wall is required !!")
    //       : yup.string().notRequired(),
    // }),
    onSubmit,
  });
  const fetchCustomerData = async () => {
    setGetLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${eid}`, {
        headers: {
          "Gl-Status": "customer",
        },
      });
      setCustomerdata(response.data);
      setGetLoading(false);
    } catch (error) {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [marketid]);

  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <button className="btn1" onClick={() => setDeleteDialog(false)}>
        No
      </button>
      <button className="btn1" onClick={handleDelete}>
        yes
      </button>
    </div>
  );

  return (
    <>
      <div className="d-flex justify-content-center mt-4 mb-3">
        {getLoading ? (
          <Spinner className="mt-auto" />
        ) : staffid.logintype == "staff" &&
          (status === "pending" || status === "complete") &&
          pagetype !== "reminder" &&
          customerdata.length === 0 ? (
          <a href="#0" onClick={() => setNewDialog(true)} className="btn1 me-2">
            + Add customer Property
          </a>
        ) : (
          <DataTable
            persistTableHead={true}
            columns={customerColumns}
            data={customerdata}
            customStyles={customStyle}
            fixedHeader
          />
        )}
      </div>

      {/* {customerdata.length > 0 && (
        <DataTable
          persistTableHead={true}
          columns={customerColumns}
          data={customerdata}
          customStyles={customStyle}
          fixedHeader
        />
      )} */}

      <Dialog
        visible={newDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add Customer Properties"
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            {/* Lat, Long */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="loc" className="form-label">
                    Lat & Long
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    name="loc"
                    value={formik.values.loc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.loc && formik.touched.loc ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.loc}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Facing Width */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing_width" className="form-label">
                    Road Facing Width
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="facing_width"
                    name="facing_width"
                    value={formik.values.facing_width}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // maxLength='100'
                  />
                  {formik.errors.facing_width && formik.touched.facing_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing_width}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Width */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="road_width" className="form-label">
                    Road Width
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <InputGroup>
                    <input
                      type="number"
                      className="form-control"
                      id="road_width"
                      name="road_width"
                      value={formik.values.road_width}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // maxLength='100'
                    />
                    <InputGroup.Addon>ft </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.road_width && formik.touched.road_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_width}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="amenities" className="form-label">
                    Amenities
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="amenities"
                    name="amenities"
                    value={formik.values.amenities}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.amenities && formik.touched.amenities ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.amenities}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Location Advantages */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="location_advantages" className="form-label">
                    Location Advantages
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="location_advantages"
                    name="location_advantages"
                    value={formik.values.location_advantages}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.location_advantages &&
                    formik.touched.location_advantages ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.location_advantages}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Transportation Feasibility */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label
                    htmlFor="transportation_feasibility"
                    className="form-label"
                  >
                    Transportation Feasibility
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="transportation_feasibility"
                    name="transportation_feasibility"
                    value={formik.values.transportation_feasibility}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.transportation_feasibility &&
                    formik.touched.transportation_feasibility ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.transportation_feasibility}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Corner Property */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="corner_property" className="form-label">
                    Corner Property
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="corner_property"
                    name="corner_property"
                    value={formik.values.corner_property}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.corner_property &&
                    formik.touched.corner_property ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.corner_property}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Water Level */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="water_level" className="form-label">
                    Water Level
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="water_level"
                    name="water_level"
                    value={formik.values.water_level}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength="1000"
                  />
                </div>
              </div>
            </div>

            {/* Price Per Unit */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="price_per_unit" className="form-label">
                    Price Per Unit
                  </label>
                </div>
                <div className="col-7 mb-3">
                  {/* <input
                    type="text"
                    className="form-control"
                    id="price_per_unit"
                    name="price_per_unit"
                    value={formik.values.price_per_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      id="price_per_unit"
                      name="price_per_unit"
                      value={formik.values.price_per_unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.price_per_unit &&
                    formik.touched.price_per_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.price_per_unit}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* New Developments */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="new_developments" className="form-label">
                    New Developments
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="new_developments"
                    name="new_developments"
                    value={formik.values.new_developments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.new_developments &&
                    formik.touched.new_developments ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.new_developments}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="contact_no" className="form-label">
                    Contact Number
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="contact_no"
                    name="contact_no"
                    value={formik.values.contact_no}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        formik.setFieldValue("contact_no", value);
                      }
                    }}
                    minLength={10}
                    maxLength={10}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Direction */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="direction" className="form-label">
                    Direction
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="direction"
                    name="direction"
                    value={formik.values.direction}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.direction && formik.touched.direction ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.direction}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="distance" className="form-label">
                    Distance
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="distance"
                    name="distance"
                    value={formik.values.distance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.distance && formik.touched.distance ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.distance}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Facing */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing" className="form-label">
                    Facing
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="facing"
                    name="facing"
                    value={formik.values.facing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.facing && formik.touched.facing ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Rumors */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Rumors
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="rumors"
                    name="rumors"
                    value={formik.values.rumors}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            {subtype === "Land" && (
              <>
                {/* Road Types */}
                <div className="col-md-12 col-lg-6 mb-3">
                  <div className="row">
                    <div className="col-4 mb-3">
                      <label htmlFor="road_types" className="form-label">
                        Road Types
                      </label>
                    </div>
                    <div className="col-7 mb-3">
                      <select
                        type="text"
                        className="form-select"
                        id="road_types"
                        name="road_types"
                        value={formik.values.road_types}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Type</option>
                        <option value="Mud">Mud</option>
                        <option value=" Black top road"> Black top road</option>
                      </select>
                      {formik.errors.road_types && formik.touched.road_types ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.road_types}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Boundary wall */}
                <div className="col-md-12 col-lg-6 mb-3">
                  <div className="row">
                    <div className="col-4 mb-3">
                      <label htmlFor="rumors" className="form-label">
                        Boundary Wall
                      </label>
                    </div>
                    <div className="col-7 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="boundary"
                        name="boundary"
                        value={formik.values.boundary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.boundary && formik.touched.boundary ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.boundary}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Plot Stone */}
                <div className="col-md-12 col-lg-6 mb-3">
                  <div className="row">
                    <div className="col-4 mb-3">
                      <label htmlFor="rumors" className="form-label">
                        Plot Stone
                      </label>
                    </div>
                    <div className="col-7 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="plotstone"
                        name="plotstone"
                        value={formik.values.plotstone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.plotstone && formik.touched.plotstone ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.plotstone}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Project development */}
                <div className="col-md-12 col-lg-6 mb-3">
                  <div className="row">
                    <div className="col-4 mb-3">
                      <label htmlFor="rumors" className="form-label">
                        Project development
                      </label>
                    </div>
                    <div className="col-7 mb-3">
                      <select
                        type="text"
                        className="form-select"
                        id="developments"
                        name="developments"
                        value={formik.values.developments}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Development </option>
                        <option value="Developed">Developed </option>
                        <option value="Undeveloped">Undeveloped </option>
                      </select>
                      {formik.errors.developments &&
                        formik.touched.developments ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.developments}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/*Remark */}
                <div className="col-md-12 col-lg-6 mb-3">
                  <div className="row">
                    <div className="col-4 mb-3">
                      <label htmlFor="rumors" className="form-label">
                        Remark
                      </label>
                    </div>
                    <div className="col-7 mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        id="remark"
                        name="remark"
                        value={formik.values.remark}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.remark && formik.touched.remark ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.remark}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn1"
              type="submit"
              onClick={() => setEditing(false)}
              disabled={loading === 1}
            >
              {loading === 1 ? "Submit..." : "Submit"}
            </button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Customer Properties"
        modal
        className="p-fluid"
        onHide={() => setEditDialog(false)}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            {/* Lat, Long */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="loc" className="form-label">
                    Lat & Long
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    name="loc"
                    value={formik.values.loc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.loc && formik.touched.loc ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.loc}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Facing Width */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing_width" className="form-label">
                    Road Facing Width
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="facing_width"
                    name="facing_width"
                    value={formik.values.facing_width}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // maxLength='100'
                  />
                  {formik.errors.facing_width && formik.touched.facing_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing_width}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Width */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="road_width" className="form-label">
                    Road Width
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <InputGroup>
                    <input
                      type="number"
                      className="form-control"
                      id="road_width"
                      name="road_width"
                      value={formik.values.road_width}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // maxLength='100'
                    />
                    <InputGroup.Addon>ft </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.road_width && formik.touched.road_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_width}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="amenities" className="form-label">
                    Amenities
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="amenities"
                    name="amenities"
                    value={formik.values.amenities}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.amenities && formik.touched.amenities ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.amenities}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Location Advantages */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="location_advantages" className="form-label">
                    Location Advantages
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="location_advantages"
                    name="location_advantages"
                    value={formik.values.location_advantages}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.location_advantages &&
                    formik.touched.location_advantages ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.location_advantages}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Transportation Feasibility */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label
                    htmlFor="transportation_feasibility"
                    className="form-label"
                  >
                    Transportation Feasibility
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="transportation_feasibility"
                    name="transportation_feasibility"
                    value={formik.values.transportation_feasibility}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.transportation_feasibility &&
                    formik.touched.transportation_feasibility ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.transportation_feasibility}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Corner Property */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="corner_property" className="form-label">
                    Corner Property
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="corner_property"
                    name="corner_property"
                    value={formik.values.corner_property}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.corner_property &&
                    formik.touched.corner_property ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.corner_property}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Water Level */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="water_level" className="form-label">
                    Water Level
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="water_level"
                    name="water_level"
                    value={formik.values.water_level}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength="1000"
                  />
                </div>
              </div>
            </div>

            {/* Price Per Unit */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="price_per_unit" className="form-label">
                    Price Per Unit
                  </label>
                </div>
                <div className="col-7 mb-3">
                  {/* <input
                    type="text"
                    className="form-control"
                    id="price_per_unit"
                    name="price_per_unit"
                    value={formik.values.price_per_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <InputGroup>
                    <input
                      type="text"
                      className="form-control"
                      id="price_per_unit"
                      name="price_per_unit"
                      value={formik.values.price_per_unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <InputGroup.Addon>
                      {enquiryDoumentData?.land_units}{" "}
                    </InputGroup.Addon>
                  </InputGroup>
                  {formik.errors.price_per_unit &&
                    formik.touched.price_per_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.price_per_unit}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* New Developments */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="new_developments" className="form-label">
                    New Developments
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="new_developments"
                    name="new_developments"
                    value={formik.values.new_developments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.new_developments &&
                    formik.touched.new_developments ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.new_developments}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Road Types */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="road_types" className="form-label">
                    Road Types
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <select
                    type="text"
                    className="form-select"
                    id="road_types"
                    name="road_types"
                    value={formik.values.road_types}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Type</option>
                    <option value="Mud">Mud</option>
                    <option value=" Black top road"> Black top road</option>
                  </select>
                  {formik.errors.road_types && formik.touched.road_types ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_types}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="contact_no" className="form-label">
                    Contact Number
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="contact_no"
                    name="contact_no"
                    value={formik.values.contact_no}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        formik.setFieldValue("contact_no", value);
                      }
                    }}
                    minLength={10}
                    maxLength={10}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Direction */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="direction" className="form-label">
                    Direction
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="direction"
                    name="direction"
                    value={formik.values.direction}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.direction && formik.touched.direction ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.direction}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="distance" className="form-label">
                    Distance
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="distance"
                    name="distance"
                    value={formik.values.distance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.distance && formik.touched.distance ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.distance}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Facing */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="facing" className="form-label">
                    Facing
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="facing"
                    name="facing"
                    value={formik.values.facing}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.facing && formik.touched.facing ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.facing}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Rumors */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Rumors
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="rumors"
                    name="rumors"
                    value={formik.values.rumors}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Boundary wall */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Boundary Wall
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="boundary"
                    name="boundary"
                    value={formik.values.boundary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.boundary && formik.touched.boundary ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.boundary}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Plot Stone */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Plot Stone
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="plotstone"
                    name="plotstone"
                    value={formik.values.plotstone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotstone && formik.touched.plotstone ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotstone}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Project development */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Project development
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <select
                    type="text"
                    className="form-select"
                    id="developments"
                    name="developments"
                    value={formik.values.developments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Development </option>
                    <option value="Developed">Developed </option>
                    <option value="Undeveloped">Undeveloped </option>
                  </select>
                  {formik.errors.developments && formik.touched.developments ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.developments}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/*Remark */}
            <div className="col-md-12 col-lg-6 mb-3">
              <div className="row">
                <div className="col-4 mb-3">
                  <label htmlFor="rumors" className="form-label">
                    Remark
                  </label>
                </div>
                <div className="col-7 mb-3">
                  <textarea
                    type="text"
                    className="form-control"
                    id="remark"
                    name="remark"
                    value={formik.values.remark}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.remark && formik.touched.remark ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.remark}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn1"
              type="submit"
              onClick={() => setEditing(true)}
              disabled={loading === 2}
            >
              {loading === 2 ? "Update..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteUnitsDialogFooter}
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row ?
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default CustomerMarketCom;
