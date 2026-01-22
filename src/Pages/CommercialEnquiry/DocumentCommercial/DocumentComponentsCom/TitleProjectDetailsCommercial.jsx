import  { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";

const TitleProjectDetailsCommercial = ({ data }) => {

  const staffid = JSON.parse(localStorage.getItem("token"));

  const [prDetails, setPrDetails] = useState([]);
  const fetchDetails = async (eid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/houseprdetail/${eid}`);
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
      await axios.post(`${API_BASE_URL}/houseenquirydeed/add`, payload, {
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

      land_area:
        data?.property !== "Land"
          ? yup.string().required("land area is required !!")
          : yup.string().notRequired(),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (prDetails && Object.keys(prDetails).length > 0) {
      formik.setFieldValue("plotno", prDetails.plot_no || "");
      formik.setFieldValue("approvaltype", prDetails.approval_type || "");
      formik.setFieldValue("aprovalno", prDetails.approval_no || "");
      formik.setFieldValue("rerano", prDetails.rera_no || "");
      formik.setFieldValue(
        "planning_permit_no",
        prDetails.planing_permit_no || ""
      );
      formik.setFieldValue(
        "building_permit_no",
        prDetails.building_permit_no || ""
      );
      formik.setFieldValue("built_up_area", prDetails.builtup_area || "");
      formik.setFieldValue("common_area", prDetails.common_area || "");
      formik.setFieldValue("supper_built_up_area", prDetails.super_area || "");
      formik.setFieldValue("uds", prDetails.uds_size || "");
      formik.setFieldValue("land_area", prDetails.land_area || "");
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
                <label htmlFor="lastName" className="form-label">
                  Plot No
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
                {formik.errors.built_up_area && formik.touched.built_up_area ? (
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
          {data?.property !== "Land" && (
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
          )}

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

export default TitleProjectDetailsCommercial;
