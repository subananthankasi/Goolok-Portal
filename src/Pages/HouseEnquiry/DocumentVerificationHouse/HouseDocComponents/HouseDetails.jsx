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

const HouseDetails = ({ data }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const dispatch = useDispatch();

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
      housetype: "",
      no_floors: "",
      door_facing: "",
      no_bedrooms: "",
      no_bathrooms: "",
      no_balcony: "",
      carparking: "",
    },
    validationSchema: yup.object().shape({
      housetype:
        data?.property === "Villa"
          ? yup.string().required("House type is required !!")
          : yup.string().notRequired(),
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

      no_balcony: yup
        .number()
        .typeError("No. of balconies must be a number")
        .required("No of balcony is required !!"),
      carparking: yup.string().required("Car parking is required !!"),
    }),
    onSubmit,
  });


  useEffect(() => {
    if (prDetails && Object.keys(prDetails).length > 0) {
      formik.setFieldValue("housetype", prDetails.housetype || "");
      formik.setFieldValue("no_floors", prDetails.no_floors || "");
      formik.setFieldValue("door_facing", prDetails.door_facing || "");
      formik.setFieldValue("no_bedrooms", prDetails.no_bedrooms || "");
      formik.setFieldValue("no_bathrooms", prDetails.no_bathrooms || "");
      formik.setFieldValue("no_balcony", prDetails.no_balcony || "");
      formik.setFieldValue("carparking", prDetails.carparking || "");
      formik.setFieldValue("id", prDetails.id || "");
    }
  }, [prDetails]);

  return (
    <div className="p-2">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="row mt-4">
          {data?.property === "Villa" && (
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
                    House Type
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="housetype"
                    placeholder="Enter house type..."
                    value={formik.values.housetype}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.housetype && formik.touched.housetype ? (
                    <h6 style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.housetype}
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
                  No of Balcony
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="no_balcony"
                  placeholder="Enter no of balcony..."
                  value={formik.values.no_balcony}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.no_balcony && formik.touched.no_balcony ? (
                  <h6 style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.no_balcony}
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
                   {prDetails? "Update" : "Submit"}
                  </Button>
                </>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HouseDetails;
