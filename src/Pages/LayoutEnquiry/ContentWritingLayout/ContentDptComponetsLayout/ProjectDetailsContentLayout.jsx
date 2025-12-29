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

const ProjectDetailsContentLayout = ({
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
  const [sroData, setSroData] = useState([]);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

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
    ...(prDetails?.some((row) => row.ward)
      ? [
        {
          name: "Ward",
          selector: (row) => row.ward,
          sortable: true,
        },
      ]
      : []),
    ...(prDetails?.some((row) => row.block)
      ? [
        {
          name: "Block",
          selector: (row) => row.block,
          sortable: true,
        },
      ]
      : []),
    {
      name: "Land classification",
      selector: (row) => row.land_classification,
      sortable: true,
      width: "150px",
    },

    {
      name: "Approval No.",
      selector: (row) => row.aprovalno,
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
      name: "RERA No.",
      selector: (row) => row.rera_no,
      sortable: true,
      width: "150px",
    },
    {
      name: "Overall project extent in units",
      selector: (row) => row.overall_extent_unit,
      sortable: true,
      width: "180px",
    },
    {
      name: "Total No. of plots in project",
      selector: (row) => row.no_ofplots_project,
      sortable: true,
      width: "210px",
    },
    {
      name: "Total no. of saleable plots",
      selector: (row) => row.total_seleable_plots,
      sortable: true,
      width: "210px",
    },
    {
      name: "Saleable plots extent in units",
      selector: (row) => row.saleable_extent_unit,
      sortable: true,
      width: "210px",
    },
    {
      name: "Price per Sq.ft.,",
      selector: (row) => row.sqft_price,
      sortable: true,
      width: "210px",
    },
    {
      name: "Total saleable plots cost",
      selector: (row) => row.total_seleable_cost,
      sortable: true,
      width: "210px",
    },
    {
      name: "Plot Sizes Start from",
      selector: (row) => row.plot_sizes_from,
      sortable: true,
      width: "210px",
    },
    {
      name: "Road frontage",
      selector: (row) => row.road_frontage,
      sortable: true,
      width: "210px",
    },
    {
      name: "Road width",
      selector: (row) => row.road_width,
      sortable: true,
      width: "210px",
    },
    {
      name: "Corner Property",
      selector: (row) => row.corner_property,
      sortable: true,
      width: "210px",
    },
    {
      name: "Boundary wall",
      selector: (row) => row.boundary_wall,
      sortable: true,
      width: "210px",
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
    formik.setFieldValue("land_classification", row.land_classification);
    formik.setFieldValue("overall_extent_unit", row.overall_extent_unit);
    formik.setFieldValue("total_plots_project", row.no_ofplots_project);
    formik.setFieldValue("total_seleable_plots", row.total_seleable_plots);
    formik.setFieldValue("seleable_plots_units", row.saleable_extent_unit);
    formik.setFieldValue("total_seleable_cost", row.total_seleable_cost);
    formik.setFieldValue("rerano", row.rera_no);
    formik.setFieldValue("plotno", row.plotno);
    formik.setFieldValue("priceper", row.sqft_price);
    formik.setFieldValue("extent_unit", row.extent_units);
    formik.setFieldValue("total_saleable", row.total_saleable);
    formik.setFieldValue("plot_sizes_from", row.plot_sizes_from);
    formik.setFieldValue("road_frontage", row.road_frontage);
    formik.setFieldValue("road_width", row.road_width);
    formik.setFieldValue("corner_property", row.corner_property);
    formik.setFieldValue("boundary_wall", row.boundary_wall);
    formik.setFieldValue("file", row.document);
    formik.setFieldValue("oldfile", row.document);

    //   priceper: "",
    //   total_seleable_cost: "",
    //   file: "",
    //   oldfile: "",
    setUrl(row.document);

    formik.setFieldValue("id", row.id);
  };
  const viewDocument = () => {
    window.open(`${IMG_PATH}/enquiry/agreement/${url}`, "_blank");
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/layoutagreement/${eid}`,
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
      try {
        await axios.post(`${API_BASE_URL}/layoutagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Updated", type: "success" });
        // setNewDialog(false)
        setEditDialog(false);
        fetchDetails();
      } catch (error) {
        alert(error);
      }
    } else {
      const payload = {
        ...values,
        enqid: eid,
        agreeid: id,
      };
      try {
        await axios.post(`${API_BASE_URL}/layoutagreement`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        formik.resetForm();
        Toast({ message: "Successfully Submited", type: "success" });
        setNewDialog(false);
        // setEditDialog(false)
        fetchDetails();
      } catch (error) {
        alert(error);
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
      land_classification: "",
      aprovalno: "",
      rerano: "",
      projectname: "",
      overall_extent_unit: "",
      total_plots_project: "",
      total_seleable_plots: "",
      seleable_plots_units: "",
      priceper: "",
      total_seleable_cost: "",
      plot_sizes_from: "",
      road_frontage: "",
      road_width: "",
      corner_property: "",
      boundary_wall: "",
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
      land_classification: yup
        .string()
        .required("land classification is required !!"),
      overall_extent_unit: yup
        .string()
        .required("overall extent unit is required !!"),
      total_plots_project: yup
        .string()
        .required("total plots project is required !!"),
      total_seleable_plots: yup
        .string()
        .required("total seleable plots is required !!"),
      seleable_plots_units: yup
        .string()
        .required("seleable plots units is required !!"),
      seleable_plots_units: yup
        .string()
        .required("seleable plots units is required !!"),
      priceper: yup.string().required("priceper is required !!"),
      total_seleable_cost: yup
        .string()
        .required("total seleable cost is required !!"),
    }),
    onSubmit,
  });

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-3">
          <div className="card shadow border-0 p-4">
            <div className="  justify-content-between mb-3">
              <h6>Agreement </h6>
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
                    Land Classification
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="land_classification"
                    placeholder="Enter land classification..."
                    value={formik.values.land_classification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.land_classification &&
                    formik.touched.land_classification ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.land_classification}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Approval No.
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
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </p>
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
                    Overall project extent in units
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="overall_extent_unit"
                    placeholder="Enter overall extent unit ..."
                    value={formik.values.overall_extent_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.overall_extent_unit &&
                    formik.touched.overall_extent_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.overall_extent_unit}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total No. of plots in project
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="total_plots_project"
                    id="total_plots_project"
                    className="form-control"
                    placeholder="Enter total plots project ..."
                    type="number"
                    value={formik.values.total_plots_project}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_plots_project &&
                    formik.touched.total_plots_project ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_plots_project}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total no. of saleable plots
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="total_seleable_plots"
                    id="total_seleable_plots"
                    className="form-control"
                    placeholder="Enter total seleable plots ..."
                    type="number"
                    value={formik.values.total_seleable_plots}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_seleable_plots &&
                    formik.touched.total_seleable_plots ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_seleable_plots}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Saleable plots extent in units
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="seleable_plots_units"
                    id="seleable_plots_units"
                    className="form-control"
                    placeholder="Enter seleable_plots_units ..."
                    type="number"
                    value={formik.values.seleable_plots_units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.seleable_plots_units &&
                    formik.touched.seleable_plots_units ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.seleable_plots_units}
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
                    name="total_seleable_cost"
                    id="total_seleable_cost"
                    className="form-control"
                    placeholder="Enter total saleable plots cost ..."
                    type="number"
                    value={formik.values.total_seleable_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_seleable_cost &&
                    formik.touched.total_seleable_cost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_seleable_cost}
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
                    >
                      Save
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
                    Land Classification
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="land_classification"
                    placeholder="Enter land classification..."
                    value={formik.values.land_classification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.land_classification &&
                    formik.touched.land_classification ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.land_classification}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Approval No.
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
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.aprovalno}
                    </p>
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
                    Overall project extent in units
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    name="overall_extent_unit"
                    placeholder="Enter overall extent unit ..."
                    value={formik.values.overall_extent_unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.overall_extent_unit &&
                    formik.touched.overall_extent_unit ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.overall_extent_unit}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total No. of plots in project
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="total_plots_project"
                    id="total_plots_project"
                    className="form-control"
                    placeholder="Enter total plots project ..."
                    type="number"
                    value={formik.values.total_plots_project}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_plots_project &&
                    formik.touched.total_plots_project ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_plots_project}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Total no. of saleable plots
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="total_seleable_plots"
                    id="total_seleable_plots"
                    className="form-control"
                    placeholder="Enter total seleable plots ..."
                    type="number"
                    value={formik.values.total_seleable_plots}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_seleable_plots &&
                    formik.touched.total_seleable_plots ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_seleable_plots}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Saleable plots extent in units
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="seleable_plots_units"
                    id="seleable_plots_units"
                    className="form-control"
                    placeholder="Enter seleable_plots_units ..."
                    type="number"
                    value={formik.values.seleable_plots_units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.seleable_plots_units &&
                    formik.touched.seleable_plots_units ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.seleable_plots_units}
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
                    name="total_seleable_cost"
                    id="total_seleable_cost"
                    className="form-control"
                    placeholder="Enter total saleable plots cost ..."
                    type="number"
                    value={formik.values.total_seleable_cost}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.total_seleable_cost &&
                    formik.touched.total_seleable_cost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_seleable_cost}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Plot Sizes Start from
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="plot_sizes_from"
                    id="plot_sizes_from"
                    className="form-control"
                    placeholder="Enter plot sizes from ..."
                    type="number"
                    value={formik.values.plot_sizes_from}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.plot_sizes_from &&
                    formik.touched.plot_sizes_from ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.plot_sizes_from}
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
                    name="road_frontage"
                    id="road_frontage"
                    className="form-control"
                    placeholder="Enter road frontage ..."
                    type="text"
                    value={formik.values.road_frontage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.road_frontage &&
                    formik.touched.road_frontage ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_frontage}
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
                    name="road_width"
                    id="road_width"
                    className="form-control"
                    placeholder="Enter road width ..."
                    type="text"
                    value={formik.values.road_width}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.road_width && formik.touched.road_width ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.road_width}
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
                    name="corner_property"
                    id="corner_property"
                    className="form-control"
                    placeholder="Enter corner property ..."
                    type="text"
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
            <div className="col-md-6 mb-3 ">
              <div className="row">
                <div className="col-4 mb-3 ">
                  <label htmlFor="lastName" className="form-label">
                    Boundary wall
                  </label>
                </div>
                <div className="col-8 mb-3 ">
                  <input
                    name="boundary_wall"
                    id="boundary_wall"
                    className="form-control"
                    placeholder="Enter boundary wall ..."
                    type="text"
                    value={formik.values.boundary_wall}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.boundary_wall &&
                    formik.touched.boundary_wall ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.boundary_wall}
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
                      onClick={() => setIsEditing(true)}
                    >
                      Update
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

export default ProjectDetailsContentLayout;
