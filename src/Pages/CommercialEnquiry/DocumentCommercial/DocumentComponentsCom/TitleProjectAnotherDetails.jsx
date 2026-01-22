import  { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";

const TitleProjectAnotherDetails = ({ data }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [prDetails, setPrDetails] = useState([]);
  const fetchDetails = async (eid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/villadetail/${eid}`);
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
      await axios.post(`${API_BASE_URL}/villaenquirydeed/add`, payload, {
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
      building_type: "",
      no_floors: "",
      door_facing: "",
      no_shops: "",
      carparking: "",
      no_carparking: "",
      no_twowheel: "",
    },
    validationSchema: yup.object().shape({
      building_type: yup.string().required("building type is required !!"),
      no_floors: yup
        .number()
        .typeError("No. of floors must be a number")
        .required("No floors is required !!"),
      door_facing: yup.string().required("Door facing is required !!"),
      no_shops: yup
        .number()
        .typeError("No. of shops must be a number")
        .required("No of shops is required !!"),
      carparking:
        data?.property === "Building"
          ? yup.string().required("car parking is required !!")
          : yup.string().notRequired(),
      no_carparking:
        data?.property === "Complex"
          ? yup.string().required("no of carparking is required !!")
          : yup.string().notRequired(),
      no_twowheel:
        data?.property === "Complex"
          ? yup.string().required("no of two wheeler parking is required !!")
          : yup.string().notRequired(),
    }),
    onSubmit,
  });
  useEffect(() => {
    if (prDetails && Object.keys(prDetails).length > 0) {
      formik.setFieldValue("building_type", prDetails.building_type || "");
      formik.setFieldValue("no_floors", prDetails.no_floors || "");
      formik.setFieldValue("door_facing", prDetails.door_facing || "");
      formik.setFieldValue("no_shops", prDetails.no_shops || "");
      formik.setFieldValue("no_carparking", prDetails.no_carparking || "");
      formik.setFieldValue("no_twowheel", prDetails.no_twowheel || "");
      formik.setFieldValue("carparking", prDetails.carparking || "");
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
                {formik.errors.building_type && formik.touched.building_type ? (
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
                  No. of Shops
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="no_shops"
                  placeholder="Enter no shops..."
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
          {data?.property === "Building" && (
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
           {data?.property === "Complex" && (
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                 No of Car Parking
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="no_carparking"
                  placeholder="Enter no of car parking..."
                  value={formik.values.no_carparking}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.no_carparking && formik.touched.no_carparking ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.no_carparking}
                  </h6>
                ) : null}
              </div>
            </div>
          </div>
          )}
             {data?.property === "Complex" && (
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
                  placeholder="Enter no of two wheeler parking..."
                  value={formik.values.no_twowheel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.no_twowheel && formik.touched.no_twowheel ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.no_twowheel}
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
                    {prDetails?.id ? "Update" : "Submit"}
                  </Button>
                </>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TitleProjectAnotherDetails;
