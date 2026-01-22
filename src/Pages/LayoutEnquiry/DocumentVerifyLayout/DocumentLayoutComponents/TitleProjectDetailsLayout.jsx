import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";

const TitleProjectDetailsLayout = ({ data }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const [prDetails, setPrDetails] = useState([]);
  const fetchDetails = async (eid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/layoutprdetail/${eid}`);
      setPrDetails(response.data?.[0] || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      fetchDetails(data.eid);
    }
  }, [data]);

  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      enqid: data.eid,
    };
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/layoutenquirydeed/add`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Submited", type: "success" });
      setIsLoading(false);
      setPrDetails();
    } catch (error) {
      alert(error);
    } finally {
      fetchDetails(data.eid);
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      projectname: "",
      developer_name: "",
      approvaltype: "",
      approvalno: "",
      rerano: "",
      project_size: "",
      total_units: "",
      total_saleable_units: "",
      saleable_sqft: "",
    },
    validationSchema: yup.object().shape({
      projectname: yup.string().required("project name is required !!"),
      developer_name: yup.string().required("developer name is required !!"),
      approvaltype: yup.string().required("Approval type is required"),
      approvalno: yup.string().required("Approval number is required"),
      rerano:
        data?.property === "Approved"
          ? yup.string().required("RERA number is required")
          : yup.string().notRequired(),

      project_size: yup.string().required("project size is required"),
      total_units: yup.string().required("total units is required"),
      total_saleable_units: yup
        .string()
        .required("tota saleable units is required"),
      saleable_sqft: yup.string().required("saleable sqft is required"),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (prDetails && Object.keys(prDetails).length > 0) {
      formik.setFieldValue("projectname", prDetails.project_name || "");
      formik.setFieldValue("developer_name", prDetails.developer_name || "");
      formik.setFieldValue("approvaltype", prDetails.approval_type || "");
      formik.setFieldValue("approvalno", prDetails.approval_no || "");
      formik.setFieldValue("rerano", prDetails.rera_no || "");
      formik.setFieldValue("project_size", prDetails.project_size || "");
      formik.setFieldValue("total_units", prDetails.total_units || "");
      formik.setFieldValue("total_saleable_units", prDetails.total_saleable_units || "");
      formik.setFieldValue("saleable_sqft", prDetails.saleable_sqft || "");
      formik.setFieldValue("id", prDetails.id || "");
    }
  }, [prDetails]);

  return (
    <div className="p-2">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="row mt-4">
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="projectname" className="form-label">
                  Project Name
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
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="projectname" className="form-label">
                  Developer name
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="developer_name"
                  placeholder="Enter developer name..."
                  value={formik.values.developer_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.developer_name &&
                formik.touched.developer_name ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.developer_name}
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
                  name="approvalno"
                  placeholder="Enter approval no..."
                  value={formik.values.approvalno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.approvalno && formik.touched.approvalno ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.approvalno}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          {data?.property === "Approved" && (
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
          )}
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                 Project size (area in unit)
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="project_size"
                  placeholder="Enter project size..."
                  value={formik.values.project_size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.project_size && formik.touched.project_size ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.project_size}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                 Total no of units
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="total_units"
                  placeholder="Enter total units..."
                  value={formik.values.total_units}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.total_units && formik.touched.total_units ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_units}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                 Total saleable no of units
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="total_saleable_units"
                  placeholder="Enter total saleable units..."
                  value={formik.values.total_saleable_units}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.total_saleable_units &&
                formik.touched.total_saleable_units ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_saleable_units}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  Saleable units total sqft
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="saleable_sqft"
                  placeholder="Enter saleable sqft..."
                  value={formik.values.saleable_sqft}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.saleable_sqft && formik.touched.saleable_sqft ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.saleable_sqft}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          <div className="text-end gap-3 mb-3">
            {staffid.Login === "staff" &&
              (data.status === "pending" || data.status === "verify") && (
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
  );
};

export default TitleProjectDetailsLayout;
