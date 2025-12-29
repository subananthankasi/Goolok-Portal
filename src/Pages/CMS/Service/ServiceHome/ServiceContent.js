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
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import { Editor } from "primereact/editor";
import { ThreeDots } from "react-loader-spinner";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";

const ServiceContent = () => {
  const navigate = useNavigate();

  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);

  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [fetchServicename, setFetchServicename] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Service",
      selector: (row) => row.service_title,
      sortable: true,
    },
    {
      name: "Offer",
      selector: (row) => row.offer,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
            src={`${IMG_PATH}/cms_service/servicecontent/${row.image}`}
            alt={row.title}
            style={{
              width: "100px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          <span className="text-muted">No image</span>
        ),
      wrap: true,
      sortable: false,
    },
    {
      name: "Benifit_Title",
      selector: (row) => row.benifit_title,
      sortable: true,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "OfferAmount",
      selector: (row) => row.off_amount,
      sortable: true,
    },
    {
      name: "ButtonText",
      selector: (row) => row.button_text,
      sortable: true,
    },
    //  {
    //     name: "ButtonUrl",
    //     selector: (row) => row.button_url,
    //     sortable: true,

    // },
    {
      name: "Howwork_Title",
      selector: (row) => row.howwork_title,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
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
    formik.setFieldValue("service_cms_id", row.service_cms_id || "");
    formik.setFieldValue("offer", row.offer || "");
    formik.setFieldValue("title", row.title || "");
    formik.setFieldValue("image", row.image || "");
    setPreviewImage(`${IMG_PATH}/cms_service/servicecontent/${row.image}`);
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("description", row.description || "");
    formik.setFieldValue("benifit_title", row.benifit_title || "");
    formik.setFieldValue("benifit_content", row.benifit_content || "");
    formik.setFieldValue("amount", row.amount || "");
    formik.setFieldValue("off_amount", row.off_amount || "");
    formik.setFieldValue("button_text", row.button_text || "");
    formik.setFieldValue("button_url", row.button_url || "");
    formik.setFieldValue("howwork_title", row.howwork_title || "");
    formik.setFieldValue("howwork_content", row.howwork_content || "");
    formik.setFieldValue("status", row.status || "");
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servicecontent`);
      setFetchbanner(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRolesServiceCreation = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/servicenameviewall`,
        {}
      );
      setFetchServicename(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchRolesServiceCreation();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/servicecontent`,
        values,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Toast({ message: "Successfully Created", type: "success" });
      setNewDialog(false);
      await fetchRoles();
      formik.resetForm();
      setPreviewImage(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.message ||
        "Error while creating banner";

      Toast({ message: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      service_cms_id: "",
      offer: "",
      title: "",
      image: "",
      description: "",
      benifit_title: "",
      benifit_content: "",
      amount: "",
      off_amount: "",
      button_text: "",
      button_url: "",
      howwork_title: "",
      howwork_content: "",
      status: "",
    },
    // validationSchema: yup.object().shape({
    //   image: yup.string().required("image is required!"),
    //   service_cms_id: yup.string().required("service_cms_id is required!"),
    //   offer: yup.string().required("offer is required!"),

    //   description: yup.string().required("description is required!"),
    //   benifit_title: yup.string().required("benifit_title is required!"),
    //   benifit_content: yup.string().required("benifit_content is required!"),
    //   howwork_title: yup.string().required("howwork_title is required!"),
    //   howwork_content: yup.string().required("howwork_content is required!"),
    //   amount: yup.string().required("amount is required!"),
    //   off_amount: yup.string().required("off_amount is required!"),
    //   button_text: yup.string().required("button_text is required!"),
    //   button_url: yup.string().required("button_url is required!"),
    //   status: yup.string().required("Status is required"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/servicecontent/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleteconfirmmodal(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">ServiceContent View Table</h4>
                <button
                  type="button"
                  className="btn1"
                  onClick={() => {
                    setNewDialog(true);
                  }}
                >
                  Add
                </button>
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
          <Modal.Title>ServiceContent </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="service_cms_id">
                service
              </label>
              <select
                name="service_cms_id"
                className="form-select"
                value={formik.values.service_cms_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select ...</option>
                {fetchServicename?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {formik.errors.service_cms_id &&
                formik.touched.service_cms_id && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.service_cms_id}
                  </p>
                )}
            </div>

            <div className=" mb-3 ">
              <label htmlFor="offer" className="form-label">
                {" "}
                Offer{" "}
              </label>
              <input
                type="text"
                name="offer"
                className="form-control"
                placeholder="Enter offer"
                value={formik.values.offer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.offer && formik.touched.offer && (
                <small className="text-danger">{formik.errors.offer}</small>
              )}
            </div>
            <div className=" mb-3 ">
              <label htmlFor="title" className="form-label">
                {" "}
                Title{" "}
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title && (
                <small className="text-danger">{formik.errors.title}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                {" "}
                Image
              </label>

              {previewImage && (
                <div className="mb-2">
                  <img
                    src={previewImage}
                    alt="preview"
                    style={{
                      width: "120px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              )}

              <input
                type="file"
                className="form-control w-50"
                id="image"
                name="image"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("image", file);
                  if (file) {
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              {formik.errors.image && formik.touched.image && (
                <small className="text-danger">{formik.errors.image}</small>
              )}
            </div>

            <div className="col-12">
              <div className="mb-3">
                <div className="">
                  <label
                    htmlFor="description"
                    className="form-label text-muted"
                  >
                    description
                  </label>

                  <Editor
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onTextChange={(e) =>
                      formik.setFieldValue("description", e.htmlValue)
                    }
                    onBlur={formik.handleBlur}
                    style={{ height: "320px" }}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className=" mb-3 ">
              <label htmlFor="benifit_title" className="form-label">
                {" "}
                BenifitTitle{" "}
              </label>
              <input
                type="text"
                name="benifit_title"
                className="form-control"
                placeholder="Enter benifit_title"
                value={formik.values.benifit_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.benifit_title && formik.touched.benifit_title && (
                <small className="text-danger">
                  {formik.errors.benifit_title}
                </small>
              )}
            </div>
            <div className="col-12">
              <div className="mb-3">
                <div className="">
                  <label
                    htmlFor="description"
                    className="form-label text-muted"
                  >
                    description
                  </label>

                  <Editor
                    id="benifit_content"
                    name="benifit_content"
                    value={formik.values.benifit_content}
                    onTextChange={(e) =>
                      formik.setFieldValue("benifit_content", e.htmlValue)
                    }
                    onBlur={formik.handleBlur}
                    style={{ height: "320px" }}
                  />
                  {formik.errors.benifit_content &&
                    formik.touched.benifit_content && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.benifit_content}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="d-flex gap-4 mt-4">
              <div className="col-md-5 mb-3 d-flex gap-2 ">
                <label htmlFor="amount" className="form-label">
                  {" "}
                  Offer Amount{" "}
                </label>
                <input
                  type="text"
                  name="amount"
                  className="form-control ms-3"
                  placeholder="Enter amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.amount && formik.touched.amount && (
                  <small className="text-danger">{formik.errors.amount}</small>
                )}
              </div>
              <div className="col-md-6 mb-3  d-flex gap-2 ">
                <label htmlFor="off_amount" className="form-label">
                  {" "}
                  Actual Amount{" "}
                </label>
                <input
                  type="text"
                  name="off_amount"
                  className="form-control ms-3"
                  placeholder="Enter off_amount"
                  value={formik.values.off_amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.off_amount && formik.touched.off_amount && (
                  <small className="text-danger">
                    {formik.errors.off_amount}
                  </small>
                )}
              </div>
            </div>

            <div className=" mb-3 ">
              <label htmlFor="button_text" className="form-label">
                {" "}
                ButtonText{" "}
              </label>
              <input
                type="text"
                name="button_text"
                className="form-control"
                placeholder="Enter button_text"
                value={formik.values.button_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.button_text && formik.touched.button_text && (
                <small className="text-danger">
                  {formik.errors.button_text}
                </small>
              )}
            </div>
            {/* <div className=" mb-3 ">
                            <label htmlFor="button_url"
                                className="form-label"> ButtonUrl </label>
                            <input
                                type="text"
                                name="button_url"
                                className="form-control"
                                placeholder="Enter button_url"
                                value={formik.values.button_url}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.button_url && formik.touched.button_url && (
                                <small className="text-danger">{formik.errors.button_url}</small>
                            )}
                        </div> */}

            <div className=" mb-3 ">
              <label htmlFor="howwork_title" className="form-label">
                {" "}
                HowworkTitle{" "}
              </label>
              <input
                type="text"
                name="howwork_title"
                className="form-control"
                placeholder="Enter howwork_title"
                value={formik.values.howwork_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.howwork_title && formik.touched.howwork_title && (
                <small className="text-danger">
                  {formik.errors.howwork_title}
                </small>
              )}
            </div>

            <div className="col-12 mb-3">
              <div className="">
                <label
                  htmlFor="howwork_content"
                  className="form-label text-muted"
                >
                  howwork_content
                </label>

                <Editor
                  id="howwork_content"
                  name="howwork_content"
                  value={formik.values.howwork_content}
                  onTextChange={(e) =>
                    formik.setFieldValue("howwork_content", e.htmlValue)
                  }
                  onBlur={formik.handleBlur}
                  style={{ height: "320px" }}
                />
                {formik.errors.howwork_content &&
                  formik.touched.howwork_content && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.howwork_content}
                    </p>
                  )}
              </div>
            </div>

            <div className="mb-3">
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

export default ServiceContent;
