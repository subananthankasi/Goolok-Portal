import  { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";

const TitleProjectAP = ({ data }) => {

  const staffid = JSON.parse(localStorage.getItem("token"));


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
      project_status: "",
      approvalno: "",
      rerano: "",
      project_size: "",
      total_units: "",
      total_saleable_units: "",
      configurations: "",
      saleable_sqft: "",
      no_of_2bhk: "",
      no_of_3bhk: "",
      no_of_4bhk: "",
    },
    validationSchema: yup.object().shape({
      projectname: yup.string().required("project name is required !!"),
      developer_name: yup.string().required("developer name is required !!"),
      project_status: yup.string().required("project status is required"),
      approvalno: yup.string().required("Approval number is required"),
      rerano: yup.string().required("RERA number is required"),
      project_size: yup.string().required("project size is required"),
      total_units: yup.string().required("total units is required"),
      total_saleable_units: yup
        .string()
        .required("tota saleable units is required"),
      saleable_sqft: yup.string().required("saleable sqft is required"),
      configurations: yup.string().required("configurations is required"),
      no_of_2bhk: yup.string().required("no of 2bhk is required"),
      no_of_3bhk: yup.string().required("no of 3bhk is required"),
      no_of_4bhk: yup.string().required("no of 4bhk is required"),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (prDetails && Object.keys(prDetails).length > 0) {
      formik.setFieldValue("projectname", prDetails.project_name || "");
      formik.setFieldValue("developer_name", prDetails.developer_name || "");
      formik.setFieldValue("project_status", prDetails.project_status || "");
      formik.setFieldValue("approvalno", prDetails.approval_no || "");
      formik.setFieldValue("rerano", prDetails.rera_no || "");
      formik.setFieldValue("project_size", prDetails.project_size || "");
      formik.setFieldValue("total_units", prDetails.total_units || "");
      formik.setFieldValue("total_saleable_units", prDetails.total_saleable_units || "");
      formik.setFieldValue("saleable_sqft", prDetails.saleable_sqft || "");
      formik.setFieldValue("configurations", prDetails.configurations || "");
      formik.setFieldValue("no_of_2bhk", prDetails.no_of_2bhk || "");
      formik.setFieldValue("no_of_3bhk", prDetails.no_of_3bhk || "");
      formik.setFieldValue("no_of_4bhk", prDetails.no_of_4bhk || "");
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
                  Builder name
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
                <label htmlFor="projectname" className="form-label">
                 Project Status
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="project_status"
                  placeholder="Enter project status..."
                  value={formik.values.project_status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.project_status &&
                formik.touched.project_status ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.project_status}
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
                    Configurations
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="configurations"
                    placeholder="Enter configurations..."
                    value={formik.values.configurations}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.configurations && formik.touched.configurations ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.configurations}
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
           <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  No of 2bhk
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="number"
                  className="form-control"
                  name="no_of_2bhk"
                  placeholder="Enter no of 2bhk..."
                  value={formik.values.no_of_2bhk}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.no_of_2bhk && formik.touched.no_of_2bhk ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.no_of_2bhk}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  No of 3bk
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="number"
                  className="form-control"
                  name="no_of_3bhk"
                  placeholder="Enter no of 3bhk..."
                  value={formik.values.no_of_3bhk}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.no_of_3bhk && formik.touched.no_of_3bhk ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.no_of_3bhk}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                 No of 4bhk
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="number"
                  className="form-control"
                  name="no_of_4bhk"
                  placeholder="Enter no of 4bhk..."
                  value={formik.values.no_of_4bhk}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.no_of_4bhk && formik.touched.no_of_4bhk ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.no_of_4bhk}
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
                    {prDetails?.length === 0 ? "Submit" : "Update"}
                  </Button>
                </>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TitleProjectAP;
