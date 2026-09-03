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
import API_BASE_URL, { base_url, IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import OpenPreviewImage from "../../../Utils/OpenPreviewImage";
import { Switch } from 'antd';

const PromotionBanner = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);
  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchpropertyIds, setFetchpropertyIds] = useState([]);
  const [preview, setPreview] = useState(false)
  const [previewUrl, setPreviwUrl] = useState(null)

  const handlePreview = (row) => {
    setPreview(true)
    const url = `${IMG_PATH}/cms/banners/${row.image}`
    setPreviwUrl(url)
  }
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "120px"
    },
    {
      name: "propertyId",
      selector: (row) => row.propertyid ?? "-",
      sortable: true,
      width: "150px"
    },

    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <div onClick={() => handlePreview(row)} style={{ cursor: "pointer" }}>
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
          </div>
        ) : (
          <span className="text-muted">No image</span>
        ),
      wrap: true,
      sortable: false,
      width: "150px"
    },
    {
      name: "URL",
      selector: (row) => row.url,
      sortable: true,
      width: "240px"
    },
    {
      name: "Device",
      selector: (row) => row.device,
      sortable: true,
      width: "150px"
    },
    {
      name: "Screen Size",
      selector: (row) => row.screen_size ?? "-",
      sortable: true,
      width: "150px"
    },
    {
      name: "Theme",
      selector: (row) => row.theme,
      sortable: true,
      width: "150px"
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px"
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
      width: "150px"
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
    formik.setFieldValue("screen_size", row.screen_size || "");
    formik.setFieldValue("theme", row.theme || "");
    formik.setFieldValue("status", row.status || "");
  };

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

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/homeimagesviewall`, {
        headers: {
          "Gl-status": "promotion_banner",
        },
      });
      setFetchbanner(response.data.data || []);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    values.theme = values.theme || "light";
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
      title: "promotion_banner",
      url: "",
      device: "web",
      property_id: "",
      status: "",
      old_image: "",
      theme: "light",
      screen_size: ""
    },
    validationSchema: yup.object().shape({
      image: yup.string().required("image is required!"),
      url: yup.string().when("device", {
        is: "web",
        then: (schema) => schema.required("URL is required!"),
        otherwise: (schema) => schema.notRequired(),
      }),
      screen_size: yup.string().when("device", {
        is: "web",
        then: (schema) => schema.required("screen size is required!"),
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

  const validateImageDimensions = (file, screenSize) => {
    return new Promise((resolve) => {
      if (!file || !screenSize) {
        resolve(true);
        return;
      }

      const image = new Image();
      const objectUrl = URL.createObjectURL(file);

      image.onload = () => {
        const dimensions = {
          "320": { width: 320, height: 300 },
          "375": { width: 375, height: 300 },
          "425": { width: 425, height: 300 },
          "768": { width: 768, height: 300 },
          "1024": { width: 1024, height: 365 },
        };

        // Desktop:
        // Width should be 1024px or above
        // Height should be exactly 365px
        if (screenSize === "desktop") {
          const isValid =
            image.width >= 1024 &&
            image.height === 365;

          if (isValid) {
            resolve(true);
          } else {
            Toast({
              message: `Invalid image size! Required: 1024px or above x 365px, but uploaded image is ${image.width} x ${image.height} px.`,
              type: "error",
            });

            resolve(false);
          }

          URL.revokeObjectURL(objectUrl);
          return;
        }

        const required = dimensions[screenSize];

        // If screen size is not available in dimensions
        if (!required) {
          resolve(true);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        // Exact width & height validation
        const isValid =
          image.width === required.width &&
          image.height === required.height;

        if (isValid) {
          resolve(true);
        } else {
          Toast({
            message: `Invalid image size! Required: ${required.width} x ${required.height} px, but uploaded image is ${image.width} x ${image.height} px.`,
            type: "error",
          });

          resolve(false);
        }

        URL.revokeObjectURL(objectUrl);
      };

      image.onerror = () => {
        Toast({
          message: "Unable to read the image. Please upload a valid image.",
          type: "error",
        });

        URL.revokeObjectURL(objectUrl);
        resolve(false);
      };

      image.src = objectUrl;
    });
  };
  return (
    <>
      <OpenPreviewImage preview={preview} setPreview={setPreview} url={previewUrl} />
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">Promotion Banner Reports</h4>
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
        size={"34rem"}
        open={newDialog}
        onClose={() => {
          setNewDialog(false);
          formik.resetForm();
          setPreviewImage(null);
        }}
      >
        <Modal.Header>
          <Modal.Title>Promotion Banner</Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"

        >
          <form onSubmit={formik.handleSubmit}>
            <div className=" d-flex gap-5 mb-3">
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
              <div>
                <label htmlFor="mx-1" className="form-label mx-1">Dark Theme :</label>
                <Switch
                  checked={formik.values.theme === "dark"}
                  onChange={(checked) => {
                    formik.setFieldValue("theme", checked ? "dark" : "light");
                  }}
                />
              </div>
            </div>
            {formik.values.device === "web" && (
              <div className="mt-2 mb-2">
                <label htmlFor="" className="form-label">Select Screen size: </label>
                <select
                  name="screen_size"
                  className="form-select"
                  value={formik.values.screen_size}
                  // onChange={formik.handleChange}
                  onChange={async (event) => {
                    const selectedSize = event.target.value;
                    formik.setFieldValue("screen_size", selectedSize);
                    // if already selected image 
                    const file = formik.values.image;
                    if (file && selectedSize) {
                      const isValid = await validateImageDimensions(
                        file,
                        selectedSize
                      );
                      if (!isValid) {
                        formik.setFieldValue("image", "");
                        setPreviewImage(null);
                      }
                    }
                  }}
                >
                  <option value="">--Select Screen Size--</option>
                  <option value="320">320 x 300 px - Small Mobile</option>
                  <option value="375">375 x 300 px - Mobile</option>
                  <option value="425">425 x 300 px - Large Mobile</option>
                  <option value="768">768 x 300 px - Tablet</option>
                  <option value="1024">1024 x 365 px - Small Desktop</option>
                  <option value="desktop">  Desktop (Above 1024 x 365 px )</option>
                </select>
                {formik.errors.screen_size && formik.touched.screen_size && (
                  <small className="text-danger">{formik.errors.screen_size}</small>
                )}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Banner Image <span className="mx-1">{formik.values.device === "app" && "(1440x732)"}    </span>
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
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                // onChange={(event) => {
                //   const file = event.currentTarget.files[0];
                //   formik.setFieldValue("image", file);
                //   if (file) {
                //     setPreviewImage(URL.createObjectURL(file));
                //   }
                // }}
                onChange={async (event) => {
                  const file = event.currentTarget.files[0];

                  if (!file) return;

                  if (!formik.values.screen_size) {
                    Toast({
                      message: "Please select screen size first.",
                      type: "error",
                    });
                    event.target.value = "";
                    return;
                  }

                  // .....Check image dimensions
                  const isValid = await validateImageDimensions(
                    file,
                    formik.values.screen_size
                  );

                  if (!isValid) {
                    //.... Invalid image clear the file input and formik value
                    event.target.value = "";
                    formik.setFieldValue("image", "");
                    setPreviewImage(null);
                    return;
                  }
                  // ....Valid image
                  formik.setFieldValue("image", file);
                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
              {formik.errors.image && formik.touched.image && (
                <small className="text-danger">{formik.errors.image}</small>
              )}
            </div>
            {formik.values.device === "app" && (
              <div className="mb-3">
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
            {formik.values.device === "web" && (
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

export default PromotionBanner;
