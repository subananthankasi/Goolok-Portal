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
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ServiceBlogs = () => {
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
      name: "Name",
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.name).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
    },
    {
      name: "Images",
      cell: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return (
            <div className="d-flex flex-wrap gap-2">
              {answer.map((n, i) => (
                <img
                  key={i}
                  src={`${IMG_PATH}/cms_service/serviceblog/${n.blog_image}`}
                  alt={n.title}
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </div>
          );
        } catch {
          return <span className="text-muted">No image</span>;
        }
      },
      sortable: false,
      width: "250px",
    },

    {
      name: "Date",
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.date).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "ButtonText",
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.button_text).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "ButtonUrl",
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.button_url).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "DesCription",
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.description).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },

    {
      name: "BlogImage",
      cell: (row) =>
        row.image ? (
          <img
            src={`${IMG_PATH}/cms_service/serviceblog/${row.image}`}
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
      sortable: false,
      width: "250px",
    },

    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "150px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "150px",
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

    try {
      const parsedData = row.alldata ? JSON.parse(row.alldata) : [];

      if (!Array.isArray(parsedData)) throw new Error("Invalid data format");

      // Set Formik items including previewImage for each blog
      formik.setFieldValue(
        "items",
        parsedData.map((item) => ({
          name: item.name || "",
          date: item.date || "",
          content: item.content || "",
          blog_image: "", // will hold file if uploaded
          blog_description: item.description || "",
          button_text: item.button_text || "",
          button_url: item.button_url || "",
          blog_old_image: item.blog_image || "",
          previewImage: item.blog_image
            ? `${IMG_PATH}/cms_service/serviceblog/${item.blog_image}`
            : null,
        }))
      );

      // Set row id
      formik.setFieldValue("id", row.id || "");
    } catch (err) {
      Toast({ message: "Unable to parse row data", type: "error" });
      formik.setFieldValue("items", []);
    }

    // Main (single) blog fields
    formik.setFieldValue("button_text", row.button_text || "");
    formik.setFieldValue("button_url", row.button_url || "");
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("title", row.title || "");
    formik.setFieldValue("description", row.description || "");
    formik.setFieldValue("status", row.status || "");

    // preview for single blog image
    setPreviewImage(
      row.image ? `${IMG_PATH}/cms_service/serviceblog/${row.image}` : null
    );
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/serviceblog`);
      setFetchbanner(response.data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/serviceblog`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      items: [
        {
          name: "",
          date: "",
          blog_image: "",
          blog_description: "",
          button_text: "",
          button_url: "",
          blog_old_image: "",
        },
      ],
      image: "",
      title: "",
      description: "",
      old_image: "",
      status: "",
    },
    // validationSchema: yup.object().shape({
    //   name: yup.string().required("name is required!"),
    //   date: yup.string().required("date is required!"),
    //   blog_image: yup.string().required("blog_image is required!"),
    //   blog_description: yup.string().required("blog_description is required!"),
    //   btn_text: yup.string().required("btn_text is required!"),
    //   btn_url: yup.string().required("btn_url is required!"),
    //   image: yup.string().required("image is required!"),
    //   description: yup.string().required("description is required!"),
    //   old_image: yup.string().required("old_image is required!"),
    //   title: yup.string().required("title is required!"),
    //   status: yup.string().required("status is required"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/serviceblog/${selectedRowId}`);
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
                <h4 className="page_heading">ServiceBlogs View Table</h4>
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
          <Modal.Title>ServiceBlogs </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div>
              {formik.values.items.map((item, index) => (
                <div key={index} className="mb-3">
                  {/* Image Upload */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.blog_image`}
                        className="form-label"
                      >
                        Image
                      </label>

                      {item.previewImage ? (
                        <div className="mb-2">
                          <img
                            src={item.previewImage}
                            alt="preview"
                            style={{
                              width: "120px",
                              height: "90px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-muted">No image</span>
                      )}

                      <input
                        type="file"
                        className="form-control w-50"
                        id={`items.${index}.blog_image`}
                        name={`items.${index}.blog_image`}
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          formik.setFieldValue(
                            `items.${index}.blog_image`,
                            file
                          );
                          if (file) {
                            formik.setFieldValue(
                              `items.${index}.previewImage`,
                              URL.createObjectURL(file)
                            );
                          }
                        }}
                      />
                      {formik.errors.items?.[index]?.blog_image &&
                        formik.touched.items?.[index]?.blog_image && (
                          <small className="text-danger">
                            {formik.errors.items[index].blog_image}
                          </small>
                        )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.blog_description`}
                        className="form-label"
                      >
                        Description
                      </label>
                      <textarea
                        name={`items.${index}.blog_description`}
                        className="form-control"
                        placeholder="Enter blog_description..."
                        value={item.blog_description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.blog_description &&
                        formik.touched.items?.[index]?.blog_description && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.items[index].blog_description}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.name`}
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name={`items.${index}.name`}
                        className="form-control"
                        placeholder="Enter name"
                        value={item.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.name &&
                        formik.touched.items?.[index]?.name && (
                          <small className="text-danger">
                            {formik.errors.items[index].name}
                          </small>
                        )}
                    </div>

                    {/* Date */}
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.date`}
                        className="form-label"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name={`items.${index}.date`}
                        className="form-control"
                        placeholder="Enter date"
                        value={item.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.date &&
                        formik.touched.items?.[index]?.date && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.items[index].date}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Button Fields */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.button_text`}
                        className="form-label"
                      >
                        Button Text
                      </label>
                      <input
                        type="text"
                        name={`items.${index}.button_text`}
                        className="form-control"
                        placeholder="Enter button text"
                        value={item.button_text}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.button_text &&
                        formik.touched.items?.[index]?.button_text && (
                          <small className="text-danger">
                            {formik.errors.items[index].button_text}
                          </small>
                        )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.button_url`}
                        className="form-label"
                      >
                        Button URL
                      </label>
                      <input
                        type="text"
                        name={`items.${index}.button_url`}
                        className="form-control"
                        placeholder="Enter button URL"
                        value={item.button_url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.button_url &&
                        formik.touched.items?.[index]?.button_url && (
                          <small className="text-danger">
                            {formik.errors.items[index].button_url}
                          </small>
                        )}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    {index > 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => {
                          const newItems = [...formik.values.items];
                          newItems.splice(index, 1);
                          formik.setFieldValue("items", newItems);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    )}
                    {index === formik.values.items.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() =>
                          formik.setFieldValue("items", [
                            ...formik.values.items,
                            {
                              content: "",
                              title: "",
                              image: "",
                              button_text: "",
                              button_url: "",
                            },
                          ])
                        }
                      >
                        <AddIcon />
                      </button>
                    )}
                  </div>
                </div>
              ))}
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

            <div className=" mb-3 ">
              <label htmlFor="title" className="form-label">
                {" "}
                title{" "}
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

            <div className="col-12">
              <div className="mb-3">
                <div className="">
                  <label
                    htmlFor="description"
                    className="form-label text-muted"
                  >
                    {" "}
                    Description
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

export default ServiceBlogs;
