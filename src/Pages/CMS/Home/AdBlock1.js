import { useFormik } from "formik";
import React from "react";

import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable from "react-data-table-component";
import { Modal, Button } from "rsuite";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";

const AdBlock1 = () => {
  const navigate = useNavigate();

  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);
  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fetchpropertyIds, setFetchpropertyIds] = useState([]);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "propertyId",
      selector: (row) => row.propertyid,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
            src={`${IMG_PATH}/cms/banners/${row.image}`}
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
      name: "URL",
      selector: (row) => row.url,
      sortable: true,
    },
     {
      name: "Device",
      selector: (row) => row.device,
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
    formik.setFieldValue("image", row.image || "");
    setPreviewImage(`${IMG_PATH}/cms/banners/${row.image}`);
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("url", row.url || "");
    formik.setFieldValue("property_id", row.property_id || "");

    formik.setFieldValue("status", row.status || "");
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/homeimagesviewall`, {
        headers: {
          "Gl-status": "adblock1",
        },
      });
      setFetchbanner(response.data.data || []);
    } catch (error) {
    
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchpropertyId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetchpropertyid`);
      setFetchpropertyIds(response.data);
    } catch (error) {
    
    }
  };

  useEffect(() => {
    fetchpropertyId();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/homeimages`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Toast({ message: "Successfully Created", type: "success" });
      formik.resetForm();
      setNewDialog(false);
      setPreviewImage(null);
      fetchRoles();
    } catch (error) {
      Toast({ message: "Error while creating banner", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "adblock1",
      device:"web",
      url: "",
      old_image: "",
      property_id: "",
      status: "",
    },
    validationSchema: yup.object().shape({
      image: yup.string().required("image is required!"),
       url: yup.string().when("device", {
           is: "web",
           then: (schema) => schema.required("URL is required!"),
           otherwise: (schema) => schema.notRequired(),
         }),
     
         // Conditional validation for property_id
         property_id: yup.string().when("device", {
           is: "app",
           then: (schema) => schema.required("Property ID is required!"),
           otherwise: (schema) => schema.notRequired(),
         }),
      
      status: yup.string().required("Status is required"),
    }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/homeimages/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
    
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
                <h4 className="page_heading">Adblock11111 View Table</h4>
                <button className="btn1" onClick={() => setNewDialog(true)}>
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
        size={"40rem"}
        keyboard={false}
        open={newDialog}
        onClose={() => {
          setNewDialog(false);
          formik.resetForm();
          setPreviewImage(null);
        }}
      >
        <Modal.Header>
          <Modal.Title>Addblock-1 </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>

              <div className="col-md-8 d-flex gap-5 mb-3">
              {/* Web option */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="device"
                  id="webOption"
                  value="web"
                  checked={formik.values.device === "web"}
                  onChange={formik.handleChange}
                />
                <label
                  className="form-check-label text-capitalize"
                  htmlFor="webOption"
                >
                  Web
                </label>
              </div>

              {/* App option */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="device"
                  id="appOption"
                  value="app"
                  checked={formik.values.device === "app"}
                  onChange={formik.handleChange}
                />
                <label
                  className="form-check-label text-capitalize"
                  htmlFor="appOption"
                >
                  App
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Banner Image <span className="mx-1">{formik.values.device === "web" ? "(1920x160)" : "(1440x220)"}    </span>
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

            {formik.values.device === "app" && (

            <div className="mb-3 col-md-4">
              <label className="form-label" htmlFor="inputState">
                App property selection
              </label>
              <select
                name="property_id"
                className="form-select"
                value={formik.values.property_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select ...</option>
                {fetchpropertyIds?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.property_id}
                  </option>
                ))}
              </select>

              {formik.touched.property_id && formik.errors.property_id ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.property_id}
                </p>
              ) : null}
            </div>
            )}
              {formik.values.device === "web" &&(
            <div className="col-md-12 mb-3  ">
              <label htmlFor="url" className="form-label">
                {" "}
                Web URL Property Selection{" "}
              </label>
              <input
                type="text"
                name="url"
                className="form-control"
                placeholder="Enter url"
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.url && formik.touched.url && (
                <small className="text-danger">{formik.errors.url}</small>
              )}
            </div>
              )}

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select "
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

export default AdBlock1;
