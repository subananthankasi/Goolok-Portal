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
import {  IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import { Editor } from "primereact/editor";
import { ThreeDots } from "react-loader-spinner";
import AddIcon from "@mui/icons-material/Add";
import API_BASE_URL from "../../../../Api/api";

const HowItsWork = () => {
  const navigate = useNavigate();

  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);

  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState([]);

  const [fetchServicename, setFetchServicename] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Tag Name",
      // selector: (row) => row.tag_name,
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.tag_name).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
    },
    {
      name: "Title",
      // selector: (row) => row.title,
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.title).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
    },
    {
      name: "Content",
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          // join all content, then remove HTML tags
          return answer
            .map((n) => n.content || "")
            .join(", ")
            .replace(/<[^>]+>/g, "");
        } catch {
          return "";
        }
      },
      sortable: true,
      wrap: true,
    },

    {
      name: "Image",
      cell: (row) => {
        try {
          const answer = JSON.parse(row.alldata || "[]");
          if (!Array.isArray(answer))
            return <span className="text-muted">Invalid data</span>;

          const images = answer.map((n) => n?.image).filter(Boolean);

          return images.length > 0 ? (
            <div className="d-flex flex-nowrap gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${IMG_PATH}/cms_service/howitwork/${img}`}
                  alt="How It Work"
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </div>
          ) : (
            <span className="text-muted">No image</span>
          );
        } catch (err) {
          console.error("Error parsing row.alldata:", err);
          return <span className="text-muted">Invalid data</span>;
        }
      },
      sortable: false,
      width: "220px",
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
            className="btn btn-outline-info me-1"
            onClick={() => handleEdit(row)}
          >
            <EditIcon />
          </button>
          <button
            className="btn btn-outline-danger"
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

  // const handleEdit = (row) => {

  //     setNewDialog(true);
  //     formik.setFieldValue("id", row.id || "");
  //     formik.setFieldValue("tag_name", row.tag_name || "");
  //     formik.setFieldValue("percentage", row.percentage || "");
  //     formik.setFieldValue("image", row.image || "");
  //     setPreviewImage(`${IMG_PATH}/cms_service/howitwork/${row.image}`);
  //     formik.setFieldValue("image", row.image || "");
  //     formik.setFieldValue("old_image", row.image || "");
  //     formik.setFieldValue("amount", row.amount || "");
  //     formik.setFieldValue("off_amount", row.off_amount || "");
  //     formik.setFieldValue("button_text", row.button_text || "");
  //     formik.setFieldValue("button_url", row.button_url || "");
  //     formik.setFieldValue("status", row.status || "");

  // };
  const handleEdit = (row) => {
    setNewDialog(true);

    try {
      const parsedData = row.alldata ? JSON.parse(row.alldata) : [];

      if (!Array.isArray(parsedData)) throw new Error("Invalid data format");

      // Set Formik items
      formik.setFieldValue(
        "items",
        parsedData.map((item) => ({
          tag_name: item.tag_name || "",
          title: item.title || "",
          content: item.content || "",
          image: item.image || "",
          old_image: item.image || "",
        }))
      );

      // Set preview images for each item
      const initialPreviews = parsedData.map((item) =>
        item.image ? `${IMG_PATH}/cms_service/howitwork/${item.image}` : null
      );
      setPreviewImage(initialPreviews);

      // Set row id
      formik.setFieldValue("id", row.id || "");
    } catch (err) {
      Toast({ message: "Unable to parse row data", type: "error" });
      formik.setFieldValue("items", []);
      setPreviewImage([]);
    }
    formik.setFieldValue("status", row.status || "");
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/howitworkviewall`);

      // setFetchbanner(response.data);
      setFetchbanner(response.data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/howitwork`, values, {
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
          tag_name: "",
          content: "",
          title: "",
          image: "",

          old_image: "",
        },
      ],
      status: "",
    },
    // validationSchema: yup.object().shape({
    //   tag_name: yup.string().required("tag_name is required!"),
    //   content: yup.string().required("content is required!"),
    //   title: yup.string().required("title is required!"),
    //   image: yup.string().required("image is required!"),

    //   status: yup.string().required("Status is required"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/howitwork/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
    } finally {
      setDeleteconfirmmodal(false);
    }
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
                <h4 className="page_heading">How it Work View Table</h4>
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
          <Modal.Title>How it Work </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div>
              {formik.values.items.map((item, index) => (
                <div key={index} className="  mb-3 ">
                  <div className="row ">
                    <div className="col-md-6 mb-3">
                      <label>Tag Name</label>
                      <input
                        type="text"
                        name={`items[${index}].tag_name`}
                        value={item.tag_name}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Title</label>
                      <input
                        type="text"
                        name={`items[${index}].title`}
                        value={item.title}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row">
                    {/* <div className="col-md-6 mb-3">
                                            <label>Status</label>
                                            <select
                                                name={`items[${index}].status`}
                                                value={item.status}
                                                onChange={formik.handleChange}
                                                className="form-select"
                                            >
                                                <option value="">-- Select Status --</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div> */}

                    {/* <div className="col-md-6 mb-3">
                                            <label>Image</label>
                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    formik.setFieldValue(`items[${index}].image`, e.target.files[0])
                                                }
                                                className="form-control"
                                            />
                                        </div> */}
                    <div className="mb-3">
                      {Array.isArray(previewImage) && previewImage[index] ? (
                        <img
                          src={previewImage[index]}
                          alt="preview"
                          style={{
                            width: "120px",
                            height: "90px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}

                      <input
                        type="file"
                        className="form-control w-50 mt-1"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];

                          // Update Formik value
                          const newItems = [...formik.values.items];
                          newItems[index].image = file;
                          formik.setFieldValue("items", newItems);

                          // Update preview safely
                          const newPreviews = Array.isArray(previewImage)
                            ? [...previewImage]
                            : [];
                          newPreviews[index] = file
                            ? URL.createObjectURL(file)
                            : null;
                          setPreviewImage(newPreviews);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Content</label>
                    <Editor
                      id={`items[${index}].content`}
                      name={`items[${index}].content`}
                      value={item.content}
                      onTextChange={(e) =>
                        formik.setFieldValue(
                          `items[${index}].content`,
                          e.htmlValue
                        )
                      }
                      onBlur={formik.handleBlur}
                      style={{ height: "220px" }}
                    />
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
                            { tag_name: "", content: "", title: "", image: "" },
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

export default HowItsWork;
