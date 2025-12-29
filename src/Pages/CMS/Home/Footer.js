import { useFormik } from "formik";
import React from "react";

import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button, TagPicker } from "rsuite";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL, { base_url, IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
// import { ThreeDots } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import AddIcon from "@mui/icons-material/Add";

const Footer = () => {
  const navigate = useNavigate();

  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);
  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [taluk, setTaluk] = useState([]);
  const [village, setVillage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchcoupon, setFetchcoupon] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "150px",
    },

    {
      name: "About",
      selector: (row) => row.about,
      sortable: true,
      width: "150px",
    },
    {
      name: "Properties",
      selector: (row) => row.property_tag_names,
      //   selector: (row) => row.property_tag.join(", "),
      // selector: (row) => {
      //     try {
      //         const tags = JSON.parse(row.property_tag_names);
      //         return tags.join(", ");
      //     } catch {
      //         return "";
      //     }
      // },
      sortable: true,
      width: "150px",
    },
    {
      name: "New Project",
      selector: (row) => row.new_project_tag_names,
      sortable: true,
      width: "150px",
    },
    {
      name: "Social Media Icons",
      selector: (row) => {
        try {
          const socials = JSON.parse(row.social);
          return socials.map((s) => s.social_icon).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "180px",
    },
    {
      name: "Link",
      selector: (row) => {
        try {
          const socials = JSON.parse(row.social);
          return socials.map((s) => s.social_link).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "DisClaimer",
      selector: (row) => row.disclaimer,
      sortable: true,
      width: "150px",
    },
    {
      name: "Move Network",
      selector: (row) => {
        try {
          const networks = JSON.parse(row.network);
          return networks.map((n) => n.netwok).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Text/Link",
      selector: (row) => {
        try {
          const networks = JSON.parse(row.network);
          return networks.map((n) => n.network_link).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row);
            }}
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => {
              setDeleteconfirmmodal(true);
              setSelectedRowId(row.id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setNewDialog(true);
    formik.setFieldValue("id", row.id || "");
    formik.setFieldValue("about", row.about || "");
    formik.setFieldValue("disclaimer", row.disclaimer || "");
    formik.setFieldValue("status", row.status || "");
    formik.setFieldValue("property_category", row.property_category || "");
    formik.setFieldValue(
      "new_project_category",
      row.new_project_category || ""
    );
    try {
      formik.setFieldValue(
        "property_tag",
        row.property_tag ? JSON.parse(row.property_tag) : []
      );
    } catch {
      formik.setFieldValue("property_tag", []);
    }

    try {
      formik.setFieldValue(
        "new_project_tag",
        row.new_project_tag ? JSON.parse(row.new_project_tag) : ""
      );
    } catch {
      formik.setFieldValue("new_project_tag", "");
    }

    try {
      const socials = row.social ? JSON.parse(row.social) : [];
      formik.setFieldValue(
        "social_icon",
        socials.map((s) => s.social_icon) || [""]
      );
      formik.setFieldValue(
        "social_link",
        socials.map((s) => s.social_link) || [""]
      );
    } catch {
      formik.setFieldValue("social_icon", [""]);
      formik.setFieldValue("social_link", [""]);
    }

    try {
      const networks = row.network ? JSON.parse(row.network) : [];
      formik.setFieldValue("netwok", networks.map((n) => n.netwok) || [""]);
      formik.setFieldValue(
        "network_link",
        networks.map((n) => n.network_link) || [""]
      );
    } catch {
      formik.setFieldValue("netwok", [""]);
      formik.setFieldValue("network_link", [""]);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/footerviewall`);
      setFetchbanner(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchstates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/state`);
      setState(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchstates();
  }, []);

  const fetchDistrict = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/district`);
      setDistrict(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchDistrict();
  }, []);

  const fetchTaluk = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/taluk`);
      setTaluk(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchTaluk();
  }, []);

  const fetchVillage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/village`);
      setVillage(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchVillage();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/footer`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Toast({ message: "Successfully Created", type: "success" });
      setNewDialog(false);
      await fetchRoles();
      formik.resetForm();
    } catch (error) {
      Toast({ message: "Error while creating banner", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      about: "",
      property_category: "",
      property_tag: [],
      new_project_category: "",
      new_project_tag: [],
      social_icon: ["Instagram", "Twitter", "Youtube", "FaceBook"],
      social_link: ["", "", "", ""],
      netwok: [""],
      network_link: [""],
      disclaimer: "",
      status: "",
    },
    // validationSchema: yup.object().shape({
    //     about: yup.string().required("about is required!"),
    //     property_tag: yup.string().required("property_tag is required"),
    //     new_project_tag: yup.string().required("new_project_tag is required!"),
    //     social_icon: yup.string().required("social_icon is required!"),
    //     social_link: yup.string().required("social_link is required!"),
    //     netwok: yup.string().required("netwok is required!"),
    //     network_link: yup.string().required("network_link is required!"),
    //     disclaimer: yup.string().required("disclaimer is required!"),
    //     status: yup.string().required("status is required!"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/footer/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleteconfirmmodal(false);
    }
  };

  const getPropertyTagData = (category) => {
    switch (category) {
      case "state":
        return state?.map((s) => ({ label: s.state_name, value: s.id })) || [];
      case "district":
        return district?.map((d) => ({ label: d.district, value: d.id })) || [];
      case "taluk":
        return taluk?.map((t) => ({ label: t.taluk_name, value: t.id })) || [];
      case "village":
        return (
          village?.map((v) => ({ label: v.village_name, value: v.id })) || []
        );
      default:
        return [];
    }
  };

  // const newProjectTagData =
  //     formik.values.new_project_tag === "state"
  //         ? state.map((item) => ({ label: item.state_name, value: item.id }))
  //         : formik.values.new_project_tag === "distric"
  //             ? district.map((item) => ({ label: item.district_name, value: item.id }))
  //             : formik.values.new_project_tag === "talk"
  //                 ? taluk.map((item) => ({ label: item.taluk_name, value: item.id }))
  //                 : formik.values.new_project_tag === "village"
  //                     ? village.map((item) => ({ label: item.village_name, value: item.id }))
  //                     : [];

  const getnewPropertyTagData = (category) => {
    switch (category) {
      case "state":
        return state?.map((s) => ({ label: s.state_name, value: s.id })) || [];
      case "district":
        return district?.map((d) => ({ label: d.district, value: d.id })) || [];
      case "taluk":
        return taluk?.map((t) => ({ label: t.taluk_name, value: t.id })) || [];
      case "village":
        return (
          village?.map((v) => ({ label: v.village_name, value: v.id })) || []
        );
      default:
        return [];
    }
  };

  const handleAdd = () => {
    formik.setFieldValue("social_icon", [...formik.values.social_icon, ""]);
    formik.setFieldValue("social_link", [...formik.values.social_link, ""]);
  };

  const handleDeleteIndex = (index) => {
    const updatedIcons = formik.values.social_icon.filter(
      (_, i) => i !== index
    );
    const updatedLinks = formik.values.social_link.filter(
      (_, i) => i !== index
    );

    formik.setFieldValue("social_icon", updatedIcons);
    formik.setFieldValue("social_link", updatedLinks);
  };

  const handleAddNetwork = () => {
    formik.setFieldValue("netwok", [...formik.values.netwok, ""]);
    formik.setFieldValue("network_link", [...formik.values.network_link, ""]);
  };

  const handleDeleteNetwork = (index) => {
    const updatedNet = formik.values.netwok.filter((_, i) => i !== index);
    const updatedLink = formik.values.network_link.filter(
      (_, i) => i !== index
    );

    formik.setFieldValue("netwok", updatedNet);
    formik.setFieldValue("network_link", updatedLink);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">Footer View Table</h4>
                {fetchbanner.length === 0 && (
                  <button
                    type="button"
                    className="btn1"
                    onClick={() => {
                      setNewDialog(true);
                    }}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="col-lg-12  mb-4">
                <DataTable
                  columns={columns}
                  data={fetchbanner}
                  customStyles={customStyle}
                  pagination
                  persistTableHead={true}
                  fixedHeader
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        size={"50rem"}
        open={newDialog}
        onClose={() => {
          setNewDialog(false);
          formik.resetForm();
          setPreviewImage(null);
        }}
      >
        <Modal.Header>
          <Modal.Title>Footer </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-12 mb-3 ">
                <label htmlFor="about" className="form-label">
                  ABOUT
                </label>
                <textarea
                  name="about"
                  className="form-control"
                  placeholder="Text ABOUT..."
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.about && formik.touched.about && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.about}
                  </p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Select Location</label>
                <div className="d-flex gap-4">
                  {["state", "district", "taluk", "village"].map((cat) => (
                    <div className="form-check" key={cat}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="property_category"
                        id={cat}
                        value={cat}
                        checked={formik.values.property_category === cat}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        htmlFor={cat}
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
                {formik.touched.property_category &&
                  formik.errors.property_category && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.property_category}
                    </p>
                  )}
              </div>

              <div className="col-md-6 mb-3 mt-4">
                {/* {loading ? (
                                    <div>Loading...</div>
                                ) : ( */}
                <TagPicker
                  data={getPropertyTagData(formik.values.property_category)}
                  style={{ width: 280 }}
                  menuStyle={{ width: 200 }}
                  value={formik.values.property_tag}
                  onChange={(value) =>
                    formik.setFieldValue("property_tag", value)
                  }
                  onBlur={() => formik.setFieldTouched("property_tag", true)}
                  // disabled={!formik.values.property_category}
                  placeholder="Select tags"
                />
                {/* )} */}
                {formik.touched.property_tag && formik.errors.property_tag && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_tag}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="new_project_tag" className=" form-label">
                  Select Location
                </label>
                <div className="col-md-9 d-flex gap-4">
                  {["state", "distric", "talk", "village"].map((loc) => (
                    <div className="form-check" key={loc}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="new_project_category"
                        id={loc}
                        value={loc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.new_project_category === loc}
                      />
                      <label className="form-check-label" htmlFor={loc}>
                        {loc.charAt(0).toUpperCase() + loc.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>

                {formik.touched.new_project_category &&
                  formik.errors.new_project_category && (
                    <div className="offset-md-3 col-md-9">
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.new_project_category}
                      </p>
                    </div>
                  )}
              </div>

              <div className="col-md-6 mb-3 mt-4">
                {/* {loading ? (
                                    <div>Loading...</div>
                                ) : ( */}
                <TagPicker
                  // data={newProjectTagData}
                  data={getnewPropertyTagData(
                    formik.values.new_project_category
                  )}
                  style={{ width: 280 }}
                  menuStyle={{ width: 200 }}
                  value={formik.values.new_project_tag}
                  onChange={(value) =>
                    formik.setFieldValue("new_project_tag", value)
                  }
                  onBlur={() => formik.setFieldTouched("new_project_tag", true)}
                  // name="new_project_tag"
                />
                {/* )} */}

                {formik.errors.new_project_tag &&
                  formik.touched.new_project_tag && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.new_project_tag}
                    </p>
                  )}
              </div>
            </div>

            <div className="row">
              {/* <div className="col-md-12 mb-3">
                                <label className="form-label">Social Media Links</label>

                                {formik.values.social_icon.map((_, index) => (
                                    <div key={index} className="row mb-2 align-items-center">

                                     
                                        <div className="col-md-4">
                                            <input
                                                type="text"
                                                name={`social_icon[${index}]`}
                                                className="form-control"
                                                placeholder="Enter Social Icon"
                                                value={formik.values.social_icon[index]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.social_icon?.[index] &&
                                                formik.touched.social_icon?.[index] && (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {formik.errors.social_icon[index]}
                                                    </p>
                                                )}
                                        </div>

                                     

                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                name={`social_link[${index}]`}
                                                className="form-control"
                                                placeholder="Enter Social Link"
                                                value={formik.values.social_link[index]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.social_link?.[index] &&
                                                formik.touched.social_link?.[index] && (
                                                    <p style={{ color: "red", fontSize: "12px" }}>
                                                        {formik.errors.social_link[index]}
                                                    </p>
                                                )}
                                        </div>

                                       
                                        <div className="col-md-3 d-flex gap-2">
                                            {index !== 0 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDeleteIndex(index)}
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            )}
                                            {index === formik.values.social_icon.length - 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success"
                                                    onClick={handleAdd}
                                                >
                                                    <AddIcon />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div> */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Social Media Links</label>

                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={formik.values.social_icon[0]}
                    disabled
                  />
                  <input
                    type="text"
                    name="social_link[0]"
                    className="form-control"
                    placeholder="Enter Instagram link"
                    value={formik.values.social_link[0]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={formik.values.social_icon[1]}
                    disabled
                  />
                  <input
                    type="text"
                    name="social_link[1]"
                    className="form-control"
                    placeholder="Enter Twitter link"
                    value={formik.values.social_link[1]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={formik.values.social_icon[2]}
                    disabled
                  />
                  <input
                    type="text"
                    name="social_link[2]"
                    className="form-control"
                    placeholder="Enter Youtube link"
                    value={formik.values.social_link[2]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={formik.values.social_icon[3]}
                    disabled
                  />
                  <input
                    type="text"
                    name="social_link[3]"
                    className="form-control"
                    placeholder="Enter FaceBook link"
                    value={formik.values.social_link[3]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              {/* Disclaimer field */}
              <div className="col-md-12 mb-3">
                <label htmlFor="disclaimer" className="form-label">
                  Disclaimer
                </label>
                <textarea
                  name="disclaimer"
                  className="form-control"
                  placeholder="Enter Disclaimer..."
                  value={formik.values.disclaimer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.disclaimer && formik.touched.disclaimer && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.disclaimer}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Move Network</label>

                {formik.values.netwok.map((_, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    {/* Network Name */}
                    <div className="col-md-4">
                      <input
                        type="text"
                        name={`netwok[${index}]`}
                        className="form-control"
                        placeholder="Enter Move Network"
                        value={formik.values.netwok[index]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.netwok?.[index] &&
                        formik.touched.netwok?.[index] && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.netwok[index]}
                          </p>
                        )}
                    </div>

                    {/* Network Link */}
                    <div className="col-md-5">
                      <input
                        type="text"
                        name={`network_link[${index}]`}
                        className="form-control"
                        placeholder="Enter Text/Link"
                        value={formik.values.network_link[index]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.network_link?.[index] &&
                        formik.touched.network_link?.[index] && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.network_link[index]}
                          </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="col-md-3 d-flex gap-2">
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteNetwork(index)}
                        >
                          <DeleteIcon />
                        </button>
                      )}
                      {index === formik.values.netwok.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          onClick={handleAddNetwork}
                        >
                          <AddIcon />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-select w-50"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Select Status --</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {formik.errors.status && formik.touched.status && (
                  <small className="text-danger">{formik.errors.status}</small>
                )}
              </div>
            </div>

            <div className=" d-flex gap-2 justify-content-end">
              <Button
                color="blue"
                appearance="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>

              <Button
                color="red"
                appearance="ghost"
                onClick={() => {
                  formik.resetForm();
                  setPreviewImage(null);
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Dialog
        header="Confirm Deleted "
        visible={deleteconfirmmodal}
        position="top"
        style={{ width: "30vw" }}
        onHide={() => {
          if (!deleteconfirmmodal) return;
          setDeleteconfirmmodal(false);
        }}
      >
        <div className=" form-group">
          <p>Do you want to delete this record?</p>
        </div>
        <div className="d-flex p-3 justify-content-end mt-3">
          <Stack direction="row" spacing={2}>
            <MuiButton
              variant="outlined"
              color="error"
              onClick={() => handleConfirmClosedelete()}
            >
              {" "}
              No{" "}
            </MuiButton>
            &nbsp;
          </Stack>
          <MuiButton
            variant="contained"
            color="success"
            onClick={() => handleconfirmopendelete(setSelectedRowId)}
          >
            Yes{" "}
          </MuiButton>
        </div>
      </Dialog>
    </>
  );
};

export default Footer;
