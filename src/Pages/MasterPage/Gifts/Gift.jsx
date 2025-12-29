import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import customStyle from "../../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyType } from "../../../Redux/Actions/MasterPage/PropertyTypeAction";
import { TagPicker } from "rsuite";
import { Modal, Button } from "rsuite";
import { Accordion, AccordionTab } from "primereact/accordion";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import CollectionsIcon from "@mui/icons-material/Collections";
import { ThreeDots } from "react-loader-spinner";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

const Gift = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const [postLoading, setPostLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const propertyType = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );
  const dispatch = useDispatch();
  const { cleanText } = Common();

  useEffect(() => {
    dispatch(fetchPropertyType());
  }, [dispatch]);

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Gift Title",
      selector: (row) => row.gift_title,
      sortable: true,
      width: "150px",
    },
    {
      name: "Description",
      selector: (row) => row.discription,
      sortable: true,
      width: "150px",
    },
    {
      name: "Quantity",
      selector: (row) => row.total_qty,
      sortable: true,
      width: "170px",
    },
    {
      name: "Limit per customer",
      selector: (row) => row.limit_per_customer,
      sortable: true,
      width: "190px",
    },
    {
      name: "Property linked",
      selector: (row) => row.property_name ?? "-",
      sortable: true,
      width: "170px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Image",
      cell: (row) => (
        <button
          className="btn "
          onClick={() =>
            window.open(`${IMG_PATH}/gifts/${row.image}`, "_blank")
          }
        >
          <CollectionsIcon sx={{ fontSize: 29, color: "#2f4f4f" }} />
        </button>
      ),
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
              setDeleteDialog(true);
              setDeleteId(row.id);
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
    formik.setFieldValue("gift_title", row.gift_title || "");
    formik.setFieldValue("total_qty", row.total_qty || "");
    formik.setFieldValue("limit_per_customer", row.limit_per_customer || "");
    formik.setFieldValue("applicable_property", row.applicable_property || "");
    formik.setFieldValue(
      "property_id",
      row.property_id ? JSON.parse(row.property_id) : []
    );
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("discription", row.discription || "");
    formik.setFieldValue("status", row.status || "");
    formik.setFieldValue("old_image", row.image || "");
    setImgUrl(`${IMG_PATH}/gifts/${row.image}`);
  };

  const columns1 = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Customer name",
      selector: (row) => row.customer_name,
      sortable: true,
      width: "190px",
    },
    {
      name: "Mobile number ",
      selector: (row) => row.mobile,
      sortable: true,
      width: "190px",
    },
    {
      name: "Gift title",
      selector: (row) => row.gift_title,
      sortable: true,
      width: "180px",
    },
    {
      name: "Gift code",
      selector: (row) => row.gift_code,
      sortable: true,
      width: "170px",
    },
    {
      name: "Claimed date",
      selector: (row) => row.claimed_date,
      sortable: true,
      width: "180px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
  ];

  const [propId, setPropId] = useState([]);
  const fetchPropId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetchpropertyid`);
      setPropId(response.data);
    } catch (error) {}
  };

  const [getData, setGetData] = useState([]);
  const [usedGift, setUsedGift] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/giftdeals`);
      setGetData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchUsedGifts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/giftused`);
      setUsedGift(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchPropId();
    fetchData();
    fetchUsedGifts();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/giftdeals/${deleteId}`
      );
      fetchData();
      setDeleteDialog(false);
    } catch (error) {}
  };
  const onSubmit = async (values) => {
    const newData = {
      ...values,
      gift_title: cleanText(values.gift_title),
    };

    setPostLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/giftdeals`, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Toast({ message: "Successfully added", type: "success" });
      setNewDialog(false);
      fetchData();
      formik.resetForm();
      setImgUrl("");
      setPostLoading(false);
    } catch (error) {
      formik.setFieldError(
        "gift_title",
        error?.response?.data?.messages?.gift_title
      );
      // Toast({ message: "Error to add! Try again", type: "error" });
      setPostLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      gift_title: "",
      discription: "",
      applicable_property: "",
      property_id: [],
      total_qty: "",
      limit_per_customer: "",
      image: "",
      status: "",
    },
    validationSchema: yup.object().shape({
      gift_title: yup.string().required("gift title is required"),
      discription: yup.string().required("Description is required"),
      property_id: yup
        .array()
        .min(1, "Select at least one property")
        .required("Required"),
      total_qty: yup
        .number()
        .typeError("must be a number")
        .required("total qty  is required"),
      image: yup.mixed().required("Image is required"),
      limit_per_customer: yup
        .mixed()
        .required("limit per customer is required"),
      status: yup.string().required("status is required"),
    }),
    onSubmit,
  });

  const data = formik.values.applicable_property
    ? propId
        ?.filter(
          (prId) => prId.property_type === formik.values.applicable_property
        )
        .map((item) => ({
          label: item.property_id,
          value: item.id,
        }))
    : propId.map((item) => ({
        label: item.property_id,
        value: item.id,
      }));

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">Gifts </h4>
                <button className="btn1" onClick={() => setNewDialog(true)}>
                  Add
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="col-lg-12  mb-4">
                <DataTable
                  columns={columns}
                  data={getData}
                  customStyles={customStyle}
                  pagination
                  persistTableHead={true}
                  fixedHeader
                  progressPending={loading}
                  progressComponent={<CustomLoder />}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 mb-3">
            <Accordion>
              <AccordionTab header="Gift used reports  ">
                <DataTable
                  columns={columns1}
                  data={usedGift}
                  customStyles={customStyle}
                  pagination
                  persistTableHead={true}
                  fixedHeader
                />
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </section>
      <Modal
        backdrop={backdrop}
        size={"60rem"}
        keyboard={false}
        open={newDialog}
        onClose={() => {
          setNewDialog(false);
          formik.resetForm();
          setImgUrl("");
        }}
      >
        <Modal.Header>
          <Modal.Title>Gifts </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-2" style={{ overflow: "scroll" }}>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3 ">
                <label htmlFor="title" className="form-label">
                  Gift title
                </label>
                <input
                  name="gift_title"
                  className="form-control"
                  placeholder="Enter gift title"
                  value={formik.values.gift_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.gift_title && formik.touched.gift_title && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.gift_title}
                  </p>
                )}
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Discription
                </label>
                <textarea
                  name="discription"
                  className="form-control"
                  placeholder="Text here..."
                  value={formik.values.discription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.discription && formik.touched.discription && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.discription}
                  </p>
                )}
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Applicable property
                </label>
                <select
                  name="applicable_property"
                  className="form-select"
                  value={formik.values.applicable_property}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select...</option>
                  {propertyType?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.property_type}
                    </option>
                  ))}
                </select>
                {formik.errors.applicable_property &&
                  formik.touched.applicable_property && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.applicable_property}
                    </p>
                  )}
              </div>
            </div>

            <div className="row align-items-center">
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Select property
                </label>
                <TagPicker
                  data={data}
                  style={{ width: 280 }}
                  menuStyle={{ width: 200 }}
                  value={formik.values.property_id}
                  onChange={(value) =>
                    formik.setFieldValue("property_id", value)
                  }
                  onBlur={() => formik.setFieldTouched("property_id", true)}
                  name="property_id"
                />
                {formik.touched.property_id && formik.errors.property_id ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_id}
                  </p>
                ) : null}
              </div>
              <div className="col-md-4 mb-3 ">
                <label htmlFor="total_qty" className="form-label">
                  Total Qty
                </label>
                <input
                  name="total_qty"
                  className="form-control"
                  placeholder="Enter total Qty"
                  value={formik.values.total_qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.total_qty && formik.touched.total_qty && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_qty}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3 ">
                <label htmlFor="discount_value" className="form-label">
                  Limit Per Customer
                </label>
                <input
                  name="limit_per_customer"
                  className="form-control"
                  placeholder="Enter limit per customer..."
                  value={formik.values.limit_per_customer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.limit_per_customer &&
                  formik.touched.limit_per_customer && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.limit_per_customer}
                    </p>
                  )}
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.image && formik.touched.image && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.image}
                  </p>
                )}
                {imgUrl && (
                  <button
                    type="button"
                    className="btn "
                    onClick={() => window.open(imgUrl, "_blank")}
                  >
                    <CollectionsIcon sx={{ fontSize: 29, color: "#2f4f4f" }} />
                  </button>
                )}
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Status
                </label>
                <select
                  name="status"
                  className="form-select"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select ...</option>
                  <option value="Active">Active</option>
                  <option value="In Active">In Active</option>
                </select>
                {formik.errors.status && formik.touched.status && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.status}
                  </p>
                )}
              </div>
            </div>
            <div className=" d-flex gap-2 justify-content-end">
              <Button color="blue" appearance="primary" type="submit">
                {postLoading ? (
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="40"
                    color="#ffffff"
                    radius="18"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                    wrapperClass=""
                  />
                ) : (
                  "Save "
                )}
              </Button>
              <Button
                color="red"
                appearance="ghost"
                onClick={() => {
                  formik.resetForm();
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal
        backdrop={backdrop}
        size={"30rem"}
        keyboard={false}
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-2">
          <div>
            <h6>Are you sure you want to delete</h6>
          </div>
          <div className=" d-flex gap-2 justify-content-end">
            <Button
              color="blue"
              appearance="primary"
              type="button"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              color="red"
              appearance="ghost"
              onClick={() => {
                setDeleteDialog(false);
              }}
            >
              No
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Gift;
