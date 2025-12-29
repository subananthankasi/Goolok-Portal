import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchPincode } from "../../../../Redux/Actions/MasterPage/PincodeAction";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import { fetchState } from "../../../../Redux/Actions/MasterPage/StateAction";
import { fetchDistrict } from "../../../../Redux/Actions/MasterPage/DistrictAction";
import { fetchTaluk } from "../../../../Redux/Actions/MasterPage/TalukAction";
import { fetchVillage } from "../../../../Redux/Actions/MasterPage/VillageAction";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";

const ProjectDetailsContentPlot = ({
  eid,
  id,
  status,
  sub_property,
  pagetype,
}) => {
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
  const [postLoading, setPostLoading] = useState(false)
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

  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const column = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "PropertyId",
      selector: (row) => row.property_id,
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
      name: "Sro",
      selector: (row) => row.sro_title,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode_name,
      sortable: true,
    },
    {
      name:
        sub_property === "UnApproved Plot"
          ? "Approval No."
          : sub_property === "CMDA"
            ? "CMDA Approval No"
            : sub_property === "DTCP"
              ? "DTCP Approval No"
              : "Approval No.",
      selector: (row) => row.aprovalno,
      sortable: true,
      width: "180px",
    },
    ...(sub_property === "UnApproved Plot"
      ? [
        {
          name: "Approval Type.",
          selector: (row) => row.approval_no,
          sortable: true,
          width: "170px",
        },
      ]
      : []),
    {
      name: "RERA No",
      selector: (row) => row.rera_no,
      sortable: true,
      width: "150px",
    },

    {
      name: "Project Name",
      selector: (row) => row.projectname,
      sortable: true,
      width: "150px",
    },
    {
      name: "Plot No",
      selector: (row) => row.plotno,
      sortable: true,
      width: "150px",
    },
    {
      name: "No of Plots",
      selector: (row) => row.no_ofplots,
      sortable: true,
      width: "150px",
    },
    {
      name: "Extent in units",
      selector: (row) => row.extent_units,
      sortable: true,
      width: "150px",
    },
    {
      name: "Price per Sq.ft.,",
      selector: (row) => row.sqft_price,
      sortable: true,
      width: "180px",
    },
    {
      name: "Total saleable plots cost",
      selector: (row) => row.total_saleable,
      sortable: true,
      width: "220px",
    },
    {
      name: "Plot Sizes",
      selector: (row) => row.plotsizes,
      sortable: true,
      width: "150px",
    },
    {
      name: "Road frontage",
      selector: (row) => row.roadfrontage,
      sortable: true,
      width: "160px",
    },
    {
      name: "Road width",
      selector: (row) => row.roadwidth,
      sortable: true,
      width: "150px",
    },
    {
      name: "Corner Property",
      selector: (row) => row.cornerproperty,
      sortable: true,
      width: "160px",
    },
    {
      name: "Boundary wall",
      selector: (row) => row.boundarywall,
      sortable: true,
      width: "160px",
    },

    ...((status === "pending" || status === "complete") &&
      staffid.Login == "staff" &&
      pagetype !== "reminder" && enquiryDoumentData?.status !== "booking"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="edit"
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

  const handleEdit = (row) => {
    setEditDialog(true);
    formik.setFieldValue("property_id", row.property_id);
    formik.setFieldValue("type", row.village_type);
    formik.setFieldValue("state", row.state);
    formik.setFieldValue("district", row.district);
    formik.setFieldValue("village", row.village);
    formik.setFieldValue("taluk", row.taluk);
    formik.setFieldValue("pincode", row.pincode);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("ward", row.ward);
    formik.setFieldValue("block", row.block);
    formik.setFieldValue("sro", row.sro);
    formik.setFieldValue("projectname", row.projectname);
    formik.setFieldValue("aprovalno", row.aprovalno);
    formik.setFieldValue("aprovaltype", row.aprovaltype);
    formik.setFieldValue("rerano", row.rera_no);
    formik.setFieldValue("plotno", row.plotno);
    formik.setFieldValue("priceper", row.sqft_price);
    formik.setFieldValue("extent_unit", row.extent_units);
    formik.setFieldValue("total_saleable", row.total_saleable);
    formik.setFieldValue("file", row.document);
    formik.setFieldValue("oldfile", row.document);
    formik.setFieldValue("no_ofplots", row.no_ofplots);
    formik.setFieldValue("plotsizes", row.plotsizes);
    formik.setFieldValue("roadfrontage", row.roadfrontage);
    formik.setFieldValue("roadwidth", row.roadwidth);
    formik.setFieldValue("cornerproperty", row.cornerproperty);
    formik.setFieldValue("boundarywall", row.boundarywall);

    setUrl(row.document);

    formik.setFieldValue("id", row.id);
  };
  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/plotagreement/${eid}`,
        {}
      );
      setPrDetails(response.data);
    } catch (error) { }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const onSubmit = async (values) => {
    if (isEditing) {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
        status: null,
      };
      setPostLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/plotagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Updated", type: "success" });
        // setNewDialog(false)
        setEditDialog(false);
        fetchDetails();
        setPostLoading(false)
      } catch (error) {
        alert(error);
        setPostLoading(false)
      }
    } else {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
      };
      setPostLoading(true)
      try {
        await axios.post(`${API_BASE_URL}/plotagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        formik.resetForm();
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
        // setEditDialog(false)
        fetchDetails();
        setPostLoading(false)
      } catch (error) {
        alert(error);
        setPostLoading(false)
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      property_id: `PROP${1000 + eid}`,
      type: "",
      state: "",
      district: "",
      taluk: "",
      village: "",
      pincode: "",
      ward: "",
      block: "",
      sro: "",
      projectname: "",
      aprovalno: "",
      aprovaltype: "",
      rerano: "",
      plotno: "",
      priceper: "",
      total_saleable: "",
      extent_unit: "",
      file: "",
      oldfile: "",
      status: "pending",
    },
    validationSchema: yup.object().shape({
      type: yup.string().required("village type is required !!"),
      state: yup.string().required("state is required !!"),
      district: yup.string().required("district is required !!"),
      taluk: yup.string().required("taluk is required !!"),
      village: yup.string().required("village is required !!"),
      sro: yup.string().required("sro is required !!"),
      pincode: yup.string().required("pincode is required !!"),
      projectname: yup.string().required("projectname is required !!"),
      aprovalno: yup.string().required("aprovalno is required !!"),
      rerano: yup.string().required("rerano is required !!"),
      plotno: yup.string().required("plot no is required !!"),
      priceper: yup.string().required("priceper is required !!"),
      total_saleable: yup.string().required("total saleable is required !!"),
      extent_unit: yup.string().required("extent in units is required !!"),

      // file: yup
      //     .mixed()
      //     .required("File is required !!")
      //     .test("fileExists", "File is required !!", value => {
      //         return value instanceof File || (Array.isArray(value) && value.length > 0);
      //     })
    }),
    onSubmit,
  });


  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-3">
          <div className="card shadow border-0 p-4">
            <div className="  justify-content-between mb-3">
              <h6>Project Details </h6>
              <hr />
            </div>
            {prDetails?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <button className="btn1" onClick={() => setNewDialog(true)}>
                  +Create Agreement
                </button>
              </div>
            ) : (
              <DataTable
                persistTableHead={true}
                columns={column}
                data={prDetails}
                customStyles={customStyle}
                pagination
                fixedHeader
              />
            )}
          </div>
        </div>
      </div>
      <Dialog
        visible={newDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setNewDialog(false);
          formik.resetForm();
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
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
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
                    <option>Select Village Type </option>
                    <option value="Natham village">Natham Village</option>
                    <option value="Rural village">Rural Village</option>
                    <option value="Town village">Town Village</option>
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
            {formik.values.type === "Town village" && (
              <>
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
              </>
            )}
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
                    placeholder="enter project name..."
                    value={formik.values.projectname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.projectname && formik.touched.projectname ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.projectname}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    {sub_property === "UnApproved Plot"
                      ? "Approval No."
                      : sub_property === "CMDA"
                        ? "CMDA Approval No"
                        : "DTCP Approval No."}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="enter aproval no..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {sub_property === "UnApproved Plot" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      Approval Type
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="aprovaltype"
                      placeholder="enter aproval type..."
                      value={formik.values.aprovaltype}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.aprovaltype && formik.touched.aprovaltype ? (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.aprovaltype}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
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
                    placeholder="enter rera no..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rerano && formik.touched.rerano ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Plot No.
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="plotno"
                    placeholder="Enter plot no ..."
                    value={formik.values.plotno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotno && formik.touched.plotno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Extent in units
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="extent_unit"
                    id="extent_unit"
                    className="form-control"
                    placeholder="Enter no of bhk ..."
                    type="number"
                    value={formik.values.extent_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.extent_unit && formik.touched.extent_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.extent_unit}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Price per Sq.ft.,
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="priceper"
                    id="priceper"
                    className="form-control"
                    placeholder="Enter price per Sq.ft., ..."
                    type="number"
                    value={formik.values.priceper}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.priceper && formik.touched.priceper ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.priceper}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total saleable plots cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="total_saleable"
                    id="total_saleable"
                    className="form-control"
                    placeholder="Enter total saleable plots cost ..."
                    type="number"
                    value={formik.values.total_saleable}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_saleable &&
                    formik.touched.total_saleable ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_saleable}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <hr />
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="carparking" className="form-label">
                    File
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    // value={formik.values.file}
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
              </div>
            </div>
            <div className="text-end gap-3">
              {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") && (
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setIsEditing(false)}
                      disabled={postLoading}
                    >
                      {postLoading ? "Processing..." : "Save"}
                    </Button>
                  </>
                )}
            </div>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "62rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Project Details "
        modal
        className="p-fluid"
        onHide={() => {
          setEditDialog(false);
          formik.resetForm();
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
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="projectname" className="form-label">
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
                    <option>Select Village Type </option>
                    <option value="Natham village">Natham Village</option>
                    <option value="Rural village">Rural Village</option>
                    <option value="Town village">Town Village</option>
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
            {formik.values.type === "Town village" && (
              <>
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
              </>
            )}
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
                    placeholder="enter project name..."
                    value={formik.values.projectname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.projectname && formik.touched.projectname ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.projectname}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    {sub_property === "UnApproved Plot"
                      ? "Approval No."
                      : sub_property === "CMDA"
                        ? "CMDA Approval No"
                        : "DTCP Approval No."}
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="aprovalno"
                    placeholder="enter aproval no..."
                    value={formik.values.aprovalno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.aprovalno && formik.touched.aprovalno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {sub_property === "UnApproved Plot" && (
              <div className="col-md-6 mb-3 ">
                <div className="row">
                  <div className="col-4 mb-3 ">
                    <label htmlFor="lastName" className="form-label">
                      Approval Type
                    </label>
                  </div>
                  <div className="col-8 mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      name="aprovaltype"
                      placeholder="enter aproval type..."
                      value={formik.values.aprovaltype}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
            )}
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
                    placeholder="enter rera no..."
                    value={formik.values.rerano}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rerano && formik.touched.rerano ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.rerano}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Plot No.
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="plotno"
                    placeholder="Enter plot no ..."
                    value={formik.values.plotno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.plotno && formik.touched.plotno ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotno}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    No of Plots
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="no_ofplots"
                    id="no_ofplots"
                    className="form-control"
                    placeholder="Enter no of Plots ..."
                    type="text"
                    value={formik.values.no_ofplots}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.no_ofplots && formik.touched.no_ofplots ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.no_ofplots}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Extent in units
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="extent_unit"
                    id="extent_unit"
                    className="form-control"
                    placeholder="Enter no of bhk ..."
                    type="number"
                    value={formik.values.extent_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.extent_unit && formik.touched.extent_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.extent_unit}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Price per Sq.ft.,
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="priceper"
                    id="priceper"
                    className="form-control"
                    placeholder="Enter price per Sq.ft., ..."
                    type="number"
                    value={formik.values.priceper}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.priceper && formik.touched.priceper ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.priceper}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total saleable plots cost
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="total_saleable"
                    id="total_saleable"
                    className="form-control"
                    placeholder="Enter total saleable plots cost ..."
                    type="number"
                    value={formik.values.total_saleable}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_saleable &&
                    formik.touched.total_saleable ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_saleable}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Plot Sizes
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="plotsizes"
                    id="plotsizes"
                    className="form-control"
                    placeholder="Enter Plot sizes ..."
                    type="text"
                    value={formik.values.plotsizes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.plotsizes && formik.touched.plotsizes ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plotsizes}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road frontage
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="roadfrontage"
                    id="roadfrontage"
                    className="form-control"
                    placeholder="Enter road frontage ..."
                    type="text"
                    value={formik.values.roadfrontage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.roadfrontage && formik.touched.roadfrontage ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.roadfrontage}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Road width
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="roadwidth"
                    id="roadwidth"
                    className="form-control"
                    placeholder="Enter road width ..."
                    type="text"
                    value={formik.values.roadwidth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.roadwidth && formik.touched.roadwidth ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.roadwidth}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Corner Property
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="cornerproperty"
                    id="cornerproperty"
                    className="form-control"
                    placeholder="Enter corner property ..."
                    type="text"
                    value={formik.values.cornerproperty}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.cornerproperty &&
                    formik.touched.cornerproperty ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.cornerproperty}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Boundary wall
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="boundarywall"
                    id="boundarywall"
                    className="form-control"
                    placeholder="Enter boundary wall ..."
                    type="text"
                    value={formik.values.boundarywall}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.boundarywall && formik.touched.boundarywall ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.boundarywall}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {/* <hr />
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
                    <button className="btn1" onClick={viewDocument}>
                      <RemoveRedEyeIcon />{" "}
                    </button>
                  </div>
                )}
              </div>
            </div> */}

            <div className="text-end gap-3">
              {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") && (
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => setIsEditing(true)}
                      disabled={postLoading}
                    >
                      {postLoading ? "Processing..." : "Update"}
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

export default ProjectDetailsContentPlot;
