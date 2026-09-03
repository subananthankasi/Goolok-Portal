import { useFormik } from "formik";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Button } from "rsuite";
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

const HighReturnsProperties = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [fetchbanner, setFetchbanner] = useState([]);
  const [deleteconfirmmodal, setDeleteconfirmmodal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fetchcategorys, setFetchcategorys] = useState([]);
  const [fetchpropertyIds, setFetchpropertyIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviwUrl] = useState(null);
  const [titlemodal, setTitlemodal] = useState(false);

  const handlePreview = (row) => {
    setPreview(true);
    const url = `${IMG_PATH}/cms/highreturn/${row.image}`;
    setPreviwUrl(url);
  };
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.property_name,
      sortable: true,
    },
    {
      name: "Offer",
      selector: (row) => row.offer,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <div onClick={() => handlePreview(row)} style={{ cursor: "pointer" }}>
            <img
              src={`${IMG_PATH}/cms/highreturn/${row.image}`}
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
    formik.setFieldValue("category", row.category || "");
    formik.setFieldValue("offer", row.offer || "");
    formik.setFieldValue(
      "property_id",
      row.property_id ? JSON.parse(row.property_id) : [],
    );
    formik.setFieldValue("image", row.image || "");
    setPreviewImage(`${IMG_PATH}/cms/highreturn/${row.image}`);
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("theme", row.theme || "");
    formik.setFieldValue("status", row.status || "");
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/highreturnviewall`);
      setFetchbanner(response.data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchcategory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/property`);
      setFetchcategorys(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  const fetchpropertyId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetchpropertyid`);
      setFetchpropertyIds(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchpropertyId();
  }, []);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    values.theme = values.theme || "light";

    try {
      const response = await axios.post(`${API_BASE_URL}/highreturn`, values, {
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
    //    } catch (error) {
    //     Toast({ message: "Error while creating banner", type: "error" });
    // }
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      // offer: ["", "", ""],
      offer: "",
      image: "",
      status: "",
      property_id: [],
      theme: "light",
      // old_image:""
    },
    // validationSchema: yup.object().shape({
    //   image: yup.string().required("image is required!"),
    //   offer: yup.string().required("offer is required!"),
    //   category: yup.string().required("category is required!"),
    //   status: yup.string().required("Status is required"),
    // }),
    onSubmit,
  });
  const handleConfirmClosedelete = () => {
    setDeleteconfirmmodal(false);
  };
  const handleconfirmopendelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/highreturn/${selectedRowId}`);
      fetchRoles();
      Toast({ message: "Successfully Deleted", type: "success" });
    } catch (error) {
    } finally {
      setDeleteconfirmmodal(false);
    }
  };
  const data = formik.values.category
    ? fetchpropertyIds
        ?.filter((prId) => prId.property_type === formik.values.category)
        .map((item) => ({
          label: item.property_id,
          value: item.id,
        }))
    : fetchpropertyIds.map((item) => ({
        label: item.property_id,
        value: item.id,
      }));

  return (
    <>
      <SectionTitle
        visible={titlemodal}
        setVisible={setTitlemodal}
        section="highReturnsProperties"
      />
      <OpenPreviewImage
        preview={preview}
        setPreview={setPreview}
        url={previewUrl}
      />
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">
                  HighReturns Properties Reports
                </h4>
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
          <Modal.Title>HighReturns Properties </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3 col-md-10">
              <label className="form-label" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                className="form-select"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select ...</option>
                {fetchcategorys?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.property_type}
                  </option>
                ))}
              </select>
              {formik.errors.category && formik.touched.category && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* <div className="mb-3 col-md-4">
                            <label className="form-label" htmlFor="inputState">
                                Select property
                            </label>
                            <TagPicker
                                data={data}
                                style={{ width: 280 }}
                                menuStyle={{ width: 200 }}
                                value={formik.values.property_id}   
                                onChange={(value) => formik.setFieldValue("property_id", value)}
                                onBlur={() => formik.setFieldTouched("property_id", true)}
                                name="property_id"
                            />

                            {formik.touched.property_id && formik.errors.property_id ? (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.property_id}
                                </p>
                            ) : null}
                            </div> */}

            <div className="col-md-10 mb-3 ">
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

            {/* <div className="col-md-4 mb-3 d-flex gap-2 ">
                            <label htmlFor="offer" className="form-label">
                                Offer
                            </label>
                            <input
                                name="offer[0]"
                                value={formik.values.offer[0]}
                                onChange={formik.handleChange}
                            />
                            <input
                                name="offer[1]"
                                value={formik.values.offer[1]}
                                onChange={formik.handleChange}
                            />
                            <input
                                name="offer[2]"
                                value={formik.values.offer[2]}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.offer && formik.touched.offer && (
                                <p style={{ color: "red", fontSize: "12px" }}>
                                    {formik.errors.offer}
                                </p>
                            )}
                        </div> */}

            {/* <div className="mb-3">
                                                <label htmlFor="image" className="form-label">Banner Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control "
                                                    id="image"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        formik.setFieldValue("image", event.currentTarget.files[0]);
                                                    }}
                                                />
                                                {formik.errors.image && formik.touched.image && (
                                                    <small className="text-danger">{formik.errors.image}</small>
                                                )}
                                            </div> */}

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

export default HighReturnsProperties;
