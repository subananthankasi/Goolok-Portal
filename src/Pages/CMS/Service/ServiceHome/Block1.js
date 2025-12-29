import { useFormik } from "formik";
import React from "react";

import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button } from "rsuite";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { base_url, IMG_PATH } from '../../../Api/api';
// import Toast from '../../../Utils/Toast';
// import customStyle from "../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import { ThreeDots } from "react-loader-spinner";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";

const Block1 = () => {
  const navigate = useNavigate();

  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);

  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.block_title,
      sortable: true,
      width: "180px",
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
            src={`${IMG_PATH}/cms_service/blocksection/${row.image}`}
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
      width: "150px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "180px",
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
    formik.setFieldValue("block_title", row.block_title || "");

    formik.setFieldValue("image", row.image || "");
    setPreviewImage(`${IMG_PATH}/cms_service/blocksection/${row.image}`);
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("description", row.description || "");
    formik.setFieldValue("status", row.status || "");
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocksectionviewall`, {
        headers: {
          "Gl-status": "service_block1",
        },
      });
      setFetchbanner(response.data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/blocksection`,
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
      Toast({ message: "Error while creating banner", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      block_title: "",
      image: "",
      description: "",
      title: "service_block1",
      status: "",
      old_image: "",
    },
    validationSchema: yup.object().shape({
      image: yup.string().required("image is required!"),
      status: yup.string().required("Status is required"),
      block_title: yup.string().required("block_title is required"),
      description: yup.string().required("description is required"),
    }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/blocksection/${selectedRowId}`);
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
                <h4 className="page_heading">Service block1 View Table</h4>
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
        size={"40rem"}
        open={newDialog}
        onClose={() => {
          setNewDialog(false);
          formik.resetForm();
          setPreviewImage(null);
        }}
      >
        <Modal.Header>
          <Modal.Title> Service block1 Banner Image </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
           
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Banner Image
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

            <div className="col-md-12 mb-3 ">
              <label htmlFor="block_title" className="form-label">
                {" "}
                Title{" "}
              </label>
              <input
                type="text"
                name="block_title"
                className="form-control"
                placeholder="Enter block_title"
                value={formik.values.block_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.block_title && formik.touched.block_title && (
                <small className="text-danger">
                  {formik.errors.block_title}
                </small>
              )}
            </div>

            <div className="col-md-12 mb-3">
              <label htmlFor="description" className="form-label">
                Discribtion
              </label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Enter description..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.description}
                </p>
              )}
            </div>
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

export default Block1;
