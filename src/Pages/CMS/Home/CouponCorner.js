import { useFormik } from "formik";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button, TagPicker } from "rsuite";
import DataTable from "react-data-table-component";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { Dialog } from "primereact/dialog";
import Stack from "@mui/material/Stack";
import MuiButton from "@mui/material/Button";
import OpenPreviewImage from "../../../Utils/OpenPreviewImage";
import { Switch } from "antd";
import SectionTitle from "./SectionTitle";

const CouponCorner = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);
  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fetchcoupon, setFetchcoupon] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviwUrl] = useState(null);
  const [titlemodal, setTitlemodal] = useState(false);

  const handlePreview = (row) => {
    setPreview(true);
    const url = `${IMG_PATH}/cms/couponcorner/${row.image}`;
    setPreviwUrl(url);
  };

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },

    // {
    //   name: "Coupon",
    //   selector: (row) => row.coupon_name,
    //   sortable: true,
    // },
    {
      name: "Screen Size",
      selector: (row) => row.screen_size ?? "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <div onClick={() => handlePreview(row)} style={{ cursor: "pointer" }}>
            <img
              src={`${IMG_PATH}/cms/couponcorner/${row.image}`}
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
    },
    {
      name: "Link",
      selector: (row) => row.link,
      sortable: true,
    },
    {
      name: "Theme",
      selector: (row) => row.theme,
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
    formik.setFieldValue("coupon", row.coupon ? JSON.parse(row.coupon) : []);
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("screen_size", row.screen_size || "");
    formik.setFieldValue("link", row.link || "");
    setPreviewImage(`${IMG_PATH}/cms/couponcorner/${row.image}`);
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("theme", row.theme || "");
    formik.setFieldValue("status", row.status || "");
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/couponcornerviewall`);
      setFetchbanner(response.data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchcouponsdeals = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/couponsdeals`);
      setFetchcoupon(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchcouponsdeals();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    values.theme = values.theme || "light";
    try {
      const response = await axios.post(
        `${API_BASE_URL}/couponcorner`,
        values,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      Toast({ message: "Successfully Created", type: "success" });
      setNewDialog(false);
      await fetchRoles();
      formik.resetForm();
      setPreviewImage(null);
    } catch (error) {
      console.log("error", error.response);
      Toast({ message: error.response?.data?.message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      // coupon: [],
      image: "",
      link: "",
      status: "",
      theme: "light",
      screen_size: "",
    },
    // validationSchema: yup.object().shape({
    //   image: yup.string().required("image is required!"),
    //   link: yup.string().required("url is link!"),
    //   status: yup.string().required("Status is required"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/couponcorner/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
    } finally {
      setDeleteconfirmmodal(false);
    }
  };

  const data = fetchcoupon?.map((item) => ({
    label: item.coupon_code,
    value: item.id,
  }));
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
          320: { width: 320, height: 70 },
          375: { width: 375, height: 70 },
          425: { width: 425, height: 70 },
          768: { width: 768, height: 80 },
          1024: { width: 1024, height: 90 },
        };

        // Desktop:
        // Width should be 1024px or above
        // Height should be exactly 365px
        if (screenSize === "desktop") {
          const isValid = image.width >= 1024 && image.height === 120;

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
          image.width === required.width && image.height === required.height;

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
      <OpenPreviewImage
        preview={preview}
        setPreview={setPreview}
        url={previewUrl}
      />
      <SectionTitle
        visible={titlemodal}
        setVisible={setTitlemodal}
        section="CouponsCorner"
      />
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">Coupons Corner Reports</h4>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn1"
                    onClick={() => {
                      setTitlemodal(true);
                    }}
                  >
                    Add Title
                  </button>
                  {/* {fetchbanner.length === 0 && ( */}
                  <button
                    type="button"
                    className="btn1"
                    onClick={() => {
                      setNewDialog(true);
                    }}
                  >
                    Add
                  </button>
                  {/* )} */}
                </div>
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
        size={"30rem"}
        open={newDialog}
        onClose={() => {
          setNewDialog(false);
          formik.resetForm();
          setPreviewImage(null);
        }}
      >
        <Modal.Header>
          <Modal.Title>Coupons Corner </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-2">
          <form onSubmit={formik.handleSubmit}>
            {/* <div className="mb-3 col-md-4">
              <label className="form-label" htmlFor="inputState">
                Select Coupon
              </label>
              <TagPicker
                data={data}
                style={{ width: 280 }}
                menuStyle={{ width: 200 }}
                value={formik.values.coupon}
                onChange={(value) => formik.setFieldValue("coupon", value)}
                onBlur={() => formik.setFieldTouched("coupon", true)}
                name="coupon"
              />

              {formik.touched.coupon && formik.errors.coupon ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.coupon}
                </p>
              ) : null}
            </div> */}

            <div className="mt-2 mb-2">
              <label htmlFor="" className="form-label">
                Select Screen size:{" "}
              </label>
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
                      selectedSize,
                    );
                    if (!isValid) {
                      formik.setFieldValue("image", "");
                      setPreviewImage(null);
                    }
                  }
                }}
              >
                <option value="">--Select Screen Size--</option>
                <option value="320">320 x 300px - Small Mobile</option>
                <option value="375">375 x 300px - Mobile</option>
                <option value="425">425 x 300px - Large Mobile</option>
                <option value="768">768 x 300px - Tablet</option>
                <option value="1024">1024 x 365px - Small Desktop</option>
                <option value="desktop">Desktop (1024 x 365px or above)</option>
              </select>
              {formik.errors.screen_size && formik.touched.screen_size && (
                <small className="text-danger">
                  {formik.errors.screen_size}
                </small>
              )}
            </div>

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
                    formik.values.screen_size,
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
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                URL
              </label>
              <input
                id="url"
                name="link"
                className="form-control"
                placeholder="Enter url ..."
                value={formik.values.link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.errors.link && formik.touched.link && (
                <small className="text-danger">{formik.errors.link}</small>
              )}
            </div>
            <div>
              <label htmlFor="mx-1" className="form-label mx-1">
                Dark Theme :
              </label>
              <Switch
                checked={formik.values.theme === "dark"}
                onChange={(checked) => {
                  formik.setFieldValue("theme", checked ? "dark" : "light");
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
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

export default CouponCorner;
