import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import {  useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "primereact/dialog";

const TicketClosingLawyerCom = ({ eid, id, status, subtype, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [editDialog, setEditDialog] = useState(false);
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Plot No",
      selector: (row) => row.plot_no,
      sortable: true,
    },
    {
      name: "Approval type",
      selector: (row) => row.approval_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Approval no",
      selector: (row) => row.approval_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "RERA No.",
      selector: (row) => row.rera_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "Planning Permit No",
      selector: (row) => row.planing_permit_no,
      sortable: true,
      width: "180px",
    },
    {
      name: "Building Permit No.",
      selector: (row) => row.building_permit_no,
      sortable: true,
      width: "180px",
    },
    {
      name: "Common Area (Units).",
      selector: (row) => row.common_area,
      sortable: true,
      width: "200px",
    },
    {
      name: "Super Built up area",
      selector: (row) => row.super_area,
      sortable: true,
      width: "200px",
    },
    {
      name: "UDS (Units)",
      selector: (row) => row.uds_size,
      sortable: true,
      width: "150px",
    },

    {
      name: "Door facing",
      selector: (row) => row.door_facing,
      sortable: true,
    },
    {
      name: "Land Area",
      selector: (row) => row.land_area,
      sortable: true,
    },
    {
      name: "Building type",
      selector: (row) => row.building_type ?? "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "No. of Floor",
      selector: (row) => row.no_floors,
      sortable: true,
      width: "170px",
    },
    {
      name: "No. of Shops",
      selector: (row) => row.no_shops,
      sortable: true,
      width: "170px",
    },

    ...(subtype === "Building"
      ? [
        {
          name: "Car Parking",
          selector: (row) => row.carparking,
          sortable: true,
          width: "170px",
        },
      ]
      : []),
    ...(subtype === "Complex"
      ? [
        {
          name: "No Of Parking",
          selector: (row) => row.no_carparking,
          sortable: true,
          width: "170px",
        },
        {
          name: "No. of Two Wheeler Parking",
          selector: (row) => row.no_twowheel,
          sortable: true,
          width: "170px",
        },
      ]
      : []),

    ...(staffid.Login == "staff" &&
      (status === "pending" || status === "complete") &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="edit"
                onClick={() => {
                  handleEdit(row);
                }}
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
    formik.setFieldValue("plotno", row.plot_no || "");
    formik.setFieldValue("approvaltype", row.approval_type || "");
    formik.setFieldValue("aprovalno", row.approval_no || "");
    formik.setFieldValue("rerano", row.rera_no || "");
    formik.setFieldValue("planning_permit_no", row.planing_permit_no || "");
    formik.setFieldValue("building_permit_no", row.building_permit_no || "");
    formik.setFieldValue("built_up_area", row.builtup_area || "");
    formik.setFieldValue("common_area", row.common_area || "");
    formik.setFieldValue("supper_built_up_area", row.super_area || "");
    formik.setFieldValue("uds", row.uds_size || "");
    formik.setFieldValue("no_floors", row.no_floors || "");
    formik.setFieldValue("land_area", row.land_area || "");
    formik.setFieldValue("door_facing", row.door_facing || "");
    formik.setFieldValue("building_type", row.building_type || "");
    formik.setFieldValue("carparking", row.carparking || "");
    formik.setFieldValue("no_carparking", row.no_carparking || "");
    formik.setFieldValue("no_twowheel", row.no_twowheel || "");
    formik.setFieldValue("no_shops", row.no_shops || "");
    formik.setFieldValue("id", row.id || "");
  };

  const [prDetails, setPrDetails] = useState([]);
  const fetchDetails = async (eid) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/houseenqdetails/${eid}`
      );
      setPrDetails(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (eid) {
      fetchDetails(eid);
    }
  }, [eid]);

  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: eid,
    };
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/ticketclosing/add`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Submited", type: "success" });
      setIsLoading(false);
      setEditDialog(false);
      setPrDetails();
    } catch (error) {
      alert(error);
    } finally {
      fetchDetails(eid);
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
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
      land_area: "",
      door_facing: "",
      building_type: "",
      no_floors: "",
      no_shops: "",
      carparking: "",
    },
    validationSchema: yup.object().shape({
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
      door_facing: yup.string().required("Door facing is required !!"),
      no_floors: yup
        .number()
        .typeError("No. of floors must be a number")
        .required("No floors is required !!"),
      no_shops: yup.string().required("no of shops is required"),
      carparking:
        subtype === "Building"
          ? yup.string().required("car parking is required !!")
          : yup.string().notRequired(),
      no_carparking:
        subtype === "Complex"
          ? yup.string().required("no of carparking is required !!")
          : yup.string().notRequired(),
      no_twowheel:
        subtype === "Complex"
          ? yup.string().required("no of two wheeler parking is required !!")
          : yup.string().notRequired(),
    }),
    onSubmit,
  });

  return (
    <>
      <div className="card shadow border-0 mt-3">
        <div className="card shadow border-0 p-4">
          <h6 className="text-start">Ticket Closing Input</h6>
          <hr />
          <DataTable
            persistTableHead={true}
            columns={column1}
            data={prDetails}
            customStyles={customStyle}
            fixedHeader
          />
        </div>
      </div>

      <Dialog
        visible={editDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
        }}
      >
        <div className="p-2">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="row mt-4">
              {subtype === "Villa" && (
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
                      {formik.errors.projectname &&
                        formik.touched.projectname ? (
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
                      {subtype === "Villa" ? "Villa No." : "Plot No"}
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
                    {formik.errors.approvaltype &&
                      formik.touched.approvaltype ? (
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
                      Land area
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
                      Building Type
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="building_type"
                      placeholder="Enter building type..."
                      value={formik.values.building_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.building_type &&
                      formik.touched.building_type ? (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.building_type}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      No of Floors
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
                      No of Shops
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="no_shops"
                      placeholder="Enter no of shops..."
                      value={formik.values.no_shops}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.no_shops && formik.touched.no_shops ? (
                      <h6 style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.no_shops}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              {subtype === "Building" && (
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
              )}
              {subtype === "Complex" && (
                <>
                  <div className="col-md-6 mb-3 ">
                    <div className="row">
                      <div className="col-4 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          No Of Car Parking
                        </label>
                      </div>
                      <div className="col-8 mb-3 ">
                        <input
                          type="text"
                          className="form-control"
                          name="no_carparking"
                          placeholder="Enter no car parking..."
                          value={formik.values.no_carparking}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.no_carparking &&
                          formik.touched.no_carparking ? (
                          <h6 style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.no_carparking}
                          </h6>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3 ">
                    <div className="row">
                      <div className="col-4 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          No. of Two Wheeler Parking
                        </label>
                      </div>
                      <div className="col-8 mb-3 ">
                        <input
                          type="text"
                          className="form-control"
                          name="no_twowheel"
                          placeholder="Enter no two wheel parking..."
                          value={formik.values.no_twowheel}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.no_twowheel &&
                          formik.touched.no_twowheel ? (
                          <h6 style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.no_twowheel}
                          </h6>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="text-end gap-3 mb-3">
                {staffid.Login === "staff" &&
                  (status === "pending" || status === "complete") && (
                    <>
                      <Button
                        variant="outlined"
                        type="button"
                        color="error"
                        className="me-2"
                        onClick={() => formik.resetForm()}
                      >
                        Clear
                      </Button>
                      <Button variant="contained" type="submit">
                        {prDetails ? "Update" : "Submit"}
                      </Button>
                    </>
                  )}
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default TicketClosingLawyerCom;
