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
import { IMG_PATH } from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import { Editor } from "primereact/editor";
import AddIcon from "@mui/icons-material/Add";
import API_BASE_URL from "../../../../Api/api";

const WhoWeAre = () => {
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
      name: "Images",
      cell: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return (
            <div className="d-flex flex-wrap gap-2">
              {answer.map((n, i) => (
                <img
                  key={i}
                  src={`${IMG_PATH}/cms_service/whoweare/${n.image}`}
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
      name: "Content",
      // selector: (row) => row.benifit_title,
      selector: (row) => {
        try {
          const answer = JSON.parse(row.alldata);
          return answer.map((n) => n.content).join(", ");
        } catch {
          return "";
        }
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "ButtonText",
      // selector: (row) => row.button_text,
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
      // selector: (row) => row.button_url,
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
      name: "PromotionImage",
      cell: (row) => {
        try {
          // Parse string → array
          const images =
            typeof row.slide_image === "string"
              ? JSON.parse(row.slide_image || "[]")
              : row.slide_image || [];

          if (!Array.isArray(images) || images.length === 0) {
            return <span className="text-muted">No image</span>;
          }

          return (
            <div className="d-flex flex-wrap gap-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`${IMG_PATH}/cms_service/whoweare/slide/${img}`}
                  alt={`Promotion ${i + 1}`}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </div>
          );
        } catch (err) {
          console.error("Invalid slide_image JSON:", row.slide_image, err);
          return <span className="text-muted">No image</span>;
        }
      },
      sortable: false,
      width: "250px",
    },

    {
      name: "Worktitle",
      selector: (row) => row.work_title,
      sortable: true,
      width: "150px",
    },
    {
      name: "work_description",
      selector: (row) => row.work_description.replace(/<[^>]+>/g, ""),
      sortable: true,
      width: "150px",
    },
    {
      name: "ButtonText",
      selector: (row) => row.btn_text,
      sortable: true,
      width: "150px",
    },
    {
      name: "ButtonUrl",
      selector: (row) => row.btn_url,
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

      formik.setFieldValue(
        "items",
        parsedData.map((item) => ({
          title: item.title || "",
          content: item.content || "",
          image: "", // new file if uploaded
          button_text: item.button_text || "",
          button_url: item.button_url || "",
          old_image: item.image || "",
          previewImage: item.image
            ? `${IMG_PATH}/cms_service/whoweare/${item.image}`
            : null,
        }))
      );

      formik.setFieldValue("id", row.id || "");
    } catch (err) {
      Toast({ message: "Unable to parse row data", type: "error" });
      formik.setFieldValue("items", []);
    }

    // Main fields
    formik.setFieldValue("btn_url", row.btn_url || "");
    formik.setFieldValue("btn_text", row.btn_text || "");
    formik.setFieldValue("work_description", row.work_description || "");
    formik.setFieldValue("work_title", row.work_title || "");
    formik.setFieldValue("status", row.status || "");

    try {
      const parsedSlides = row.slide_image ? JSON.parse(row.slide_image) : [];
      formik.setFieldValue(
        "slide_image",
        Array.isArray(parsedSlides) && parsedSlides.length > 0
          ? parsedSlides.map((img) => ({
              file: null,
              preview: `${IMG_PATH}/cms_service/whoweare/slide/${img}`,
            }))
          : [{ file: null, preview: null }]
      );
      formik.setFieldValue("old_slide_image", row.slide_image || "");
    } catch (err) {
      formik.setFieldValue("slide_image", [{ file: null, preview: null }]);
      formik.setFieldValue("old_slide_image", "");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/whoweare`);
      setFetchbanner(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/whoweare`, values, {
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
          content: "",
          title: "",
          image: "",
          button_text: "",
          button_url: "",
          old_image: "",
        },
      ],

      slide_image: [{ file: null, preview: null }],
      work_title: "",
      work_description: "",
      btn_text: "",
      btn_url: "",
      status: "",
      old_slide_image: "",
    },
    // validationSchema: yup.object().shape({
    //   image: yup.string().required("image is required!"),
    //   content: yup.string().required("content is required!"),
    //   title: yup.string().required("title is required!"),
    //   button_text: yup.string().required("button_text is required!"),
    //   button_url: yup.string().required("button_url is required!"),
    //   slide_image: yup.string().required("slide_image is required!"),

    //   work_title: yup.string().required("work_title is required!"),

    //   work_description: yup.string().required("work_description is required!"),
    //   btn_text: yup.string().required("btn_text is required!"),
    //   btn_url: yup.string().required("btn_url is required!"),
    //   status: yup.string().required("status is required"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/whoweare/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
    } finally {
      setDeleteconfirmmodal(false);
    }
  };

  const handleAddslideimage = () => {
    formik.setFieldValue("slide_image", [
      ...formik.values.slide_image,
      { file: null, preview: null },
    ]);
  };

  const handleDeleteslideimage = (index) => {
    const updated = formik.values.slide_image.filter((_, i) => i !== index);
    formik.setFieldValue("slide_image", updated);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">HowWeWork View Table</h4>
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
          <Modal.Title>HowWeWork </Modal.Title>
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
                  <div className="mb-3">
                    <label
                      htmlFor={`items.${index}.image`}
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
                      id={`items.${index}.image`}
                      name={`items.${index}.image`}
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        formik.setFieldValue(`items.${index}.image`, file);
                        if (file) {
                          formik.setFieldValue(
                            `items.${index}.previewImage`,
                            URL.createObjectURL(file)
                          );
                        }
                      }}
                    />
                    {formik.errors.items?.[index]?.image &&
                      formik.touched.items?.[index]?.image && (
                        <small className="text-danger">
                          {formik.errors.items[index].image}
                        </small>
                      )}
                  </div>

                  {/* Title */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.title`}
                        className="form-label"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name={`items.${index}.title`}
                        className="form-control"
                        placeholder="Enter title"
                        value={item.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.title &&
                        formik.touched.items?.[index]?.title && (
                          <small className="text-danger">
                            {formik.errors.items[index].title}
                          </small>
                        )}
                    </div>

                    {/* Content */}
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`items.${index}.content`}
                        className="form-label"
                      >
                        Content
                      </label>
                      <textarea
                        name={`items.${index}.content`}
                        className="form-control"
                        placeholder="Enter content..."
                        value={item.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.items?.[index]?.content &&
                        formik.touched.items?.[index]?.content && (
                          <p style={{ color: "red", fontSize: "12px" }}>
                            {formik.errors.items[index].content}
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
              <label className="form-label">Promotion Image</label>
              {(Array.isArray(formik.values.slide_image)
                ? formik.values.slide_image
                : []
              ).map((imgObj, index) => (
                <div
                  key={index}
                  className="d-flex align-items-start mb-3 gap-3"
                >
                  {imgObj.preview ? (
                    <div className="mb-2">
                      <img
                        src={imgObj.preview}
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
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        const updatedSlideImages = [
                          ...(Array.isArray(formik.values.slide_image)
                            ? formik.values.slide_image
                            : []),
                        ];
                        updatedSlideImages[index] = {
                          file,
                          preview: URL.createObjectURL(file),
                        };
                        formik.setFieldValue("slide_image", updatedSlideImages);
                      }
                    }}
                  />

                  {formik.errors.slide_image?.[index]?.file &&
                    formik.touched.slide_image?.[index]?.file && (
                      <small className="text-danger">
                        {formik.errors.slide_image[index].file}
                      </small>
                    )}

                  <div className="d-flex gap-2 mt-4">
                    {index !== 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteslideimage(index)}
                      >
                        <DeleteIcon />
                      </button>
                    )}
                    {index === formik.values.slide_image.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={handleAddslideimage}
                      >
                        <AddIcon />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className=" mb-3 ">
              <label htmlFor="work_title" className="form-label">
                {" "}
                WorkTitle{" "}
              </label>
              <input
                type="text"
                name="work_title"
                className="form-control"
                placeholder="Enter work_title"
                value={formik.values.work_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.work_title && formik.touched.work_title && (
                <small className="text-danger">
                  {formik.errors.work_title}
                </small>
              )}
            </div>

            <div className="col-12">
              <div className="mb-3">
                <div className="">
                  <label
                    htmlFor="work_description"
                    className="form-label text-muted"
                  >
                    Work Description
                  </label>

                  <Editor
                    id="work_description"
                    name="work_description"
                    value={formik.values.work_description}
                    onTextChange={(e) =>
                      formik.setFieldValue("work_description", e.htmlValue)
                    }
                    onBlur={formik.handleBlur}
                    style={{ height: "320px" }}
                  />
                  {formik.errors.work_description &&
                    formik.touched.work_description && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.work_description}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className=" mb-3 ">
              <label htmlFor="btn_text" className="form-label">
                {" "}
                ButtonText{" "}
              </label>
              <input
                type="text"
                name="btn_text"
                className="form-control"
                placeholder="Enter btn_text"
                value={formik.values.btn_text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.btn_text && formik.touched.btn_text && (
                <small className="text-danger">{formik.errors.btn_text}</small>
              )}
            </div>

            <div className=" mb-3 ">
              <label htmlFor="btn_url" className="form-label">
                {" "}
                ButtonUrl{" "}
              </label>
              <input
                type="text"
                name="btn_url"
                className="form-control"
                placeholder="Enter btn_url"
                value={formik.values.btn_url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.btn_url && formik.touched.btn_url && (
                <small className="text-danger">{formik.errors.btn_url}</small>
              )}
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

export default WhoWeAre;
