import  { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchState } from "../../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import Common from "../../../../common/Common";
import GeneralState from "../../../../Utils/Dropdown/GeneralState";
import GeneralDistrict from "../../../../Utils/Dropdown/GeneralDistrict";
import GeneralTalukDropdown from "../../../../Utils/Dropdown/GeneralTalukDropdown";
import GeneralVillageDropdown from "../../../../Utils/Dropdown/GeneralVillageDropdown";

const PattaDetailsHouse = ({ data, setStep }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { classification } = Common();

  useEffect(() => {
    dispatch(fetchState());
    dispatch(fetchDistrict());
    dispatch(fetchTaluk());
    dispatch(fetchVillage());
    fetchPatta();
  }, [dispatch, data]);

  const fetchPatta = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquirypatta/${data.id}`
      );
      setPattaData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatta();
  }, [data]);

  const [pattaData, setPattaData] = useState([]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      eid: data.eid,
      id: data.id,
    };
    // setIsLoading(true)
    try {
      await axios.post(`${API_BASE_URL}/enquirypatta`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Toast({ message: "Successfully Submited", type: "success" });
      // setIsLoading(false);
      fetchPatta();
      setTimeout(() => {
        setStep(2);
      }, 2000);
    } catch (error) {
      alert(error);
    } finally {
      fetchPatta();
      // setIsLoading(false)
    }
  };
  const formik = useFormik({
    initialValues: {
      type: "",
      pattano: "",
      pattaname: "",
      father_name: "",
      date: "",
      state: "",
      district: "",
      taluk: "",
      village: "",
      classification: "",
      ward: "",
      block: "",
    },
    validationSchema: yup.object().shape({
      pattano: yup.string().required("pattano is required !!"),
      pattaname: yup.string().required("pattaname is required !!"),
      father_name: yup.string().required("father_name is required !!"),
      date: yup.string().required("date is required !!"),
      state: yup.string().required("state is required !!"),
      district: yup.string().required("district is required !!"),
      taluk: yup.string().required("taluk is required !!"),
      village: yup.string().required("village is required !!"),
      classification: yup.string().required("classification is required !!"),
    }),
    onSubmit,
  });

  useEffect(() => {
    if (pattaData && Object.keys(pattaData).length > 0) {
      formik.setFieldValue("type", pattaData.patta_type);
      formik.setFieldValue("pattano", pattaData.pattano);
      formik.setFieldValue("pattaname", pattaData.pattaname);
      formik.setFieldValue("father_name", pattaData.father_name);
      formik.setFieldValue("date", pattaData.date);
      formik.setFieldValue("state", pattaData.state);
      formik.setFieldValue("district", pattaData.district);
      formik.setFieldValue("taluk", pattaData.taluk);
      formik.setFieldValue("village", pattaData.village);
      formik.setFieldValue("classification", pattaData.classification);
      formik.setFieldValue("block", pattaData.block);
      formik.setFieldValue("ward", pattaData.ward);
      formik.setFieldValue("pid", pattaData.pid);
      formik.setFieldValue("id", pattaData.id);
    }
  }, [pattaData]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="row mt-4">
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
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
                  <option value="">Select Type </option>
                  <option value="Rural_patta"> Rural Patta</option>
                  <option value="Natham_patta"> Natham Patta </option>
                  <option value="Town_patta">Town Patta</option>
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
                <label htmlFor="lastName" className="form-label">
                  Patta no
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="pattano"
                  placeholder="Enter Patta No..."
                  value={formik.values.pattano}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.pattano && formik.touched.pattano ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.pattano}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  Patta name
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  name="pattaname"
                  placeholder="Enter Patta Name..."
                  value={formik.values.pattaname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.pattaname && formik.touched.pattaname ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.pattaname}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  Father Name / Care of
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="father_name"
                  placeholder="Enter Father Name / Care of"
                  value={formik.values.father_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.father_name && formik.touched.father_name ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.father_name}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  State
                </label>
              </div>
              <div className="col-8 mb-3 ">
                {/* <select
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
                </select> */}
                <GeneralState
                  value={formik.values.state}
                  onChange={(value) => {
                    formik.setFieldValue("state", value);
                    formik.setFieldValue("district", "");
                    formik.setFieldValue("taluk", "");
                    formik.setFieldValue("village", "");
                  }}
                  onBlur={() => formik.setFieldTouched("state", true)}
                />
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
                <label htmlFor="lastName" className="form-label">
                  District
                </label>
              </div>
              <div className="col-8 mb-3 ">
                {/* <select
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
                </select> */}
                <GeneralDistrict
                  stateId={formik.values.state}
                  value={formik.values.district}
                  onChange={(value) => {
                    formik.setFieldValue("district", value);
                    formik.setFieldValue("taluk", "");
                    formik.setFieldValue("village", "");
                  }}
                  onBlur={() => formik.setFieldTouched("district", true)}
                />
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
                <label htmlFor="lastName" className="form-label">
                  Taluk
                </label>
              </div>
              <div className="col-8 mb-3 ">
                {/* <select
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
                      (taluk) => taluk.taluk_district === formik.values.district
                    )
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.taluk_name}{" "}
                      </option>
                    ))}
                </select> */}
                <GeneralTalukDropdown
                  districtId={formik.values.district}
                  value={formik.values.taluk}
                  onChange={(value) => {
                    formik.setFieldValue("taluk", value);
                    formik.setFieldValue("village", "");
                  }}
                  onBlur={() => formik.setFieldTouched("taluk", true)}
                />
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
                <label htmlFor="lastName" className="form-label">
                  {formik.values.type === "Town_patta"
                    ? "Town"
                    : "Revenue village "}
                </label>
              </div>
              <div className="col-8 mb-3 ">
                {/* <select
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
                </select> */}
                <GeneralVillageDropdown
                  talukId={formik.values.taluk}
                  value={formik.values.village}
                  onChange={(value) => formik.setFieldValue("village", value)}
                  onBlur={() => formik.setFieldTouched("village", true)}
                />
                {formik.errors.village && formik.touched.village ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.village}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 ">
            <div className="row">
              <div className="col-4 mb-3 ">
                <label htmlFor="lastName" className="form-label">
                  Patta date
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <DatePicker
                  placement="topRight"
                  name="date"
                  value={
                    formik.values.date
                      ? dayjs(formik.values.date, "YYYY-MM-DD")
                      : null
                  }
                  onChange={(date) => {
                    formik.setFieldValue(
                      "date",
                      date ? date?.format("YYYY-MM-DD") : ""
                    );
                  }}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  disabledDate={(current) => current && current > dayjs()}
                  onBlur={formik.handleBlur}
                />
                {/* <DatePicker
                  selected={
                    formik.values.date ? new Date(formik.values.date) : null
                  }
                  onChange={(date) => {
                    const formattedDate = date
                      ? date.toISOString().split("T")[0]
                      : "";
                    formik.setFieldValue("date", formattedDate);
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a Date"
                  className="form-control w-100"
                  style={{ width: "100%" }}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  maxDate={new Date()}
                /> */}
                {formik.errors.date && formik.touched.date ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.date}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          {formik.values.type === "Town_patta" && (
            <>
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      Ward
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="ward"
                      placeholder="Enter Ward ..."
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
                    <label htmlFor="lastName" className="form-label">
                      Block
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="block"
                      placeholder="Enter block ..."
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
                <label htmlFor="lastName" className="form-label">
                  Land Classification
                </label>
              </div>
              <div className="col-8 mb-3 ">
                <Select
                  placeholder="Select Classification"
                  style={{ width: "100%" }}
                  options={classification}
                  value={formik.values.classification}
                  onChange={(value) =>
                    formik.setFieldValue("classification", value)
                  }
                  onBlur={formik.handleBlur}
                // onChange={(value) => {
                //   handlePattaChange({
                //     target: {
                //       name: "classification",
                //       value: value,
                //     },
                //   });
                // }}
                />
                {/* <input
                  type="text"
                  className="form-control"
                  name="classification"
                  placeholder="Enter Classification..."
                  value={formik.values.classification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> */}
                {formik.errors.classification &&
                  formik.touched.classification ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.classification}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="text-end">
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
                    Next
                  </Button>
                </>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PattaDetailsHouse;
