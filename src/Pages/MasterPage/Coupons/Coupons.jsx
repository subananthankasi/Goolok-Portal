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
import { DateFormatcustom } from "../../../Utils/DateFormatcustom";
import CollectionsIcon from "@mui/icons-material/Collections";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { ThreeDots } from "react-loader-spinner";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

const Coupons = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const [postLoading, setPostLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const { cleanText } = Common();

  const propertyType = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );
  const dispatch = useDispatch();

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
      name: "Coupon Code",
      selector: (row) => row.coupon_code,
      sortable: true,
      width: "150px",
    },
    {
      name: "Coupon Type",
      selector: (row) => row.coupon_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Customer Type",
      selector: (row) => row.customer_type,
      sortable: true,
      width: "170px",
    },
    {
      name: "Coupon Title",
      selector: (row) => row.coupon_title,
      sortable: true,
      width: "150px",
    },
    {
      name: "Property Name",
      selector: (row) => row.property_name,
      sortable: true,
      width: "170px",
    },
    {
      name: "Discount Type",
      selector: (row) => row.discount_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Discount Value",
      selector: (row) => row.discount_value,
      sortable: true,
      width: "150px",
    },
    {
      name: "Valid From",
      selector: (row) => DateFormatcustom(row.from_date),
      sortable: true,
      width: "150px",
    },
    {
      name: "Valid To",
      selector: (row) => DateFormatcustom(row.to_date),
      sortable: true,
      width: "150px",
    },
    {
      name: "Days",
      selector: (row) => row.days,
      sortable: true,
      width: "150px",
    },
    {
      name: "Image",
      cell: (row) => (
        <button
          className="btn "
          onClick={() =>
            window.open(`${IMG_PATH}/coupons/image/${row.image}`, "_blank")
          }
        >
          <CollectionsIcon sx={{ fontSize: 29, color: "#2f4f4f" }} />
        </button>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Attachment",
      cell: (row) =>
        row.attachment ? (
          <a
            href={`${IMG_PATH}/coupons/document/${row.attachment}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PictureAsPdfIcon sx={{ fontSize: 29, color: "red" }} />
          </a>
        ) : (
          "-"
        ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Max Qty",
      selector: (row) => row.max_qty,
      sortable: true,
      width: "150px",
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
  const columns1 = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Coupon Code",
      selector: (row) => row?.coupon_code,
      sortable: true,
      width: "150px",
    },
    {
      name: "Coupon Title",
      selector: (row) => row?.coupon_title,
      sortable: true,
      width: "150px",
    },
    {
      name: "Used By (User Name / Email / ID)",
      selector: (row) => row?.username,
      sortable: true,
      width: "280px",
    },
    {
      name: "Usage Date & Time",
      selector: (row) => row?.date_time,
      sortable: true,
      width: "190px",
    },
    {
      name: "Property Name / ID",
      selector: (row) => row?.property_name,
      sortable: true,
      width: "190px",
    },
    {
      name: "Discount Applied",
      selector: (row) => row?.disc_applied,
      sortable: true,
      width: "170px",
    },
    {
      name: "Order ID / Booking Ref",
      selector: (row) => row?.orderid,
      sortable: true,
      width: "210px",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      width: "150px",
    },
  ];
  const handleEdit = (row) => {
    setNewDialog(true);

    formik.setFieldValue("id", row.id || "");
    formik.setFieldValue("coupon_title", row.coupon_title || "");
    formik.setFieldValue("coupon_code", row.coupon_code || "");
    formik.setFieldValue("coupon_type", row.coupon_type || "");
    formik.setFieldValue("customer_type", row.customer_type || "");
    formik.setFieldValue("applicable_property", row.applicable_property || "");
    formik.setFieldValue(
      "property_id",
      row.property_id ? JSON.parse(row.property_id) : []
    );
    formik.setFieldValue("discount_type", row.discount_type || "");
    formik.setFieldValue("discount_value", row.discount_value || "");
    formik.setFieldValue("max_qty", row.max_qty || "");
    formik.setFieldValue("from_date", row.from_date || "");
    formik.setFieldValue("to_date", row.to_date || "");
    formik.setFieldValue("days", row.days || "");
    formik.setFieldValue("image", row.image || "");
    formik.setFieldValue("attachment", row.attachment || "");
    formik.setFieldValue("discription", row.discription || "");
    formik.setFieldValue("status", row.status || "");
    formik.setFieldValue("old_image", row.image || "");
    formik.setFieldValue("old_attachment", row.attachment || "");
    setPdfUrl(`${IMG_PATH}/coupons/document/${row.attachment}`);
    setImgUrl(`${IMG_PATH}/coupons/image/${row.image}`);
  };

  const [propId, setPropId] = useState([]);
  const fetchPropId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetchpropertyid`);
      setPropId(response.data);
    } catch (error) {}
  };
  const [getData, setGetData] = useState([]);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/couponsdeals`);
      setGetData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchUsedGifts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/couponused`);
      setUsedCoupons(response?.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPropId();
    fetchData();
    fetchUsedGifts();
  }, []);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/couponsdeals/${deleteId}`
      );
      fetchData();
      setDeleteDialog(false);
    } catch (error) {}
  };
  const onSubmit = async (values) => {
    setPostLoading(true);
    const newData = {
      ...values,
      coupon_code: cleanText(values.coupon_code),
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/couponsdeals`,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Toast({ message: "Successfully added", type: "success" });
      setNewDialog(false);
      fetchData();
      formik.resetForm();
      setImgUrl("");
      setPdfUrl("");
      setPostLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.messages;
      if (errorMessage?.coupon_code) {
        formik.setFieldError("coupon_code", errorMessage?.coupon_code);
      } else {
        Toast({ message: "Error to add! Try again", type: "error" });
      }
      setPostLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      coupon_title: "",
      coupon_code: "",
      coupon_type: "",
      customer_type: "",
      applicable_property: "",
      property_id: [],
      discount_type: "",
      discount_value: "",
      max_qty: "",
      from_date: "",
      to_date: "",
      days: "",
      image: "",
      discription: "",
      status: "",
    },
    validationSchema: yup.object().shape({
      coupon_title: yup.string().required("Coupon title is required"),
      coupon_code: yup.string().required("Coupon code is required"),
      coupon_type: yup.string().required("Coupon type is required"),
      customer_type: yup.string().required("Customer type is required"),
      // applicable_property: yup
      //   .string()
      //   .required("Applicable property is required"),
      property_id: yup
        .array()
        .min(1, "Select at least one property")
        .required("Required"),
      discount_type: yup.string().required("Discount type is required"),
      discount_value: yup
        .number()
        .typeError("must be a number")
        .required("Discount value is required"),
      max_qty: yup
        .number()
        .typeError("must be a number")
        .required("max qty  is required"),
      from_date: yup
        .date()
        .transform((value, originalValue) => new Date(originalValue))
        .required("From Date is required"),

      to_date: yup
        .date()
        .transform((value, originalValue) => new Date(originalValue))
        .required("To Date is required")
        .min(yup.ref("from_date"), "To Date cannot be before From Date"),
      image: yup.mixed().required("Image is required"),
      discription: yup.string().required("Description is required"),
      status: yup.string().required("status is required"),
    }),
    onSubmit,
  });

  useEffect(() => {
    const { from_date, to_date } = formik.values;

    if (from_date && to_date) {
      const start = new Date(from_date);
      const end = new Date(to_date);

      if (!isNaN(start) && !isNaN(end)) {
        const timeDiff = end.getTime() - start.getTime();

        if (timeDiff >= 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );

          let label = "";
          if (days > 0) label += `${days} day${days > 1 ? "s" : ""}`;
          if (hours > 0)
            label += `${label ? " " : ""}${hours} hour${hours > 1 ? "s" : ""}`;
          if (!label) label = "0 hours";

          formik.setFieldValue("days", label);
        } else {
          formik.setFieldValue("days", "Invalid range");
        }
      } else {
        formik.setFieldValue("days", "");
      }
    } else {
      formik.setFieldValue("days", "");
    }
  }, [formik.values.from_date, formik.values.to_date]);

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
                <h4 className="page_heading">Coupon View Table</h4>
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
              <AccordionTab header="Coupon used reports  ">
                <DataTable
                  columns={columns1}
                  // data={usedCoupons}
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
          setPdfUrl("");
        }}
      >
        <Modal.Header>
          <Modal.Title>Coupons </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="p-2"
          style={{ overflow: "scroll", overflowX: "hidden" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-4 mb-3 ">
                <label htmlFor="coupons" className="form-label">
                  Coupon Title
                </label>
                <input
                  name="coupon_title"
                  className="form-control"
                  placeholder="Enter Coupons Name"
                  value={formik.values.coupon_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.coupon_title && formik.touched.coupon_title && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.coupon_title}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3 ">
                <label htmlFor="coupons" className="form-label">
                  Coupon Code
                </label>
                <input
                  name="coupon_code"
                  className="form-control"
                  placeholder="Enter Coupons code"
                  value={formik.values.coupon_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.coupon_code && formik.touched.coupon_code && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.coupon_code}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3 ">
                <label htmlFor="coupons" className="form-label">
                  Max Qty
                </label>
                <input
                  name="max_qty"
                  className="form-control"
                  placeholder="Enter Max Qty"
                  value={formik.values.max_qty}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.max_qty && formik.touched.max_qty && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.max_qty}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Coupon Type
                </label>
                <select
                  name="coupon_type"
                  className="form-select"
                  value={formik.values.coupon_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select ...</option>
                  <option value="New">New</option>
                  <option value="Existing">Existing</option>
                  <option value="All">All</option>
                </select>
                {formik.errors.coupon_type && formik.touched.coupon_type && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.coupon_type}
                  </p>
                )}
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Customer type
                </label>
                <select
                  name="customer_type"
                  className="form-select"
                  value={formik.values.customer_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select ...</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </select>
                {formik.errors.customer_type &&
                  formik.touched.customer_type && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.customer_type}
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
              <div className="col-4 mb-3">
                <label htmlFor="" className=" form-label">
                  Discount Type
                </label>
                <div className="col-md-9 d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="discount_type"
                      id="flat"
                      value="flat"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.discount_type === "flat"}
                    />
                    <label className="form-check-label" htmlFor="flat">
                      Flat
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="discount_type"
                      id="percentage"
                      value="percentage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.discount_type === "percentage"}
                    />
                    <label className="form-check-label" htmlFor="percentage">
                      Percentage
                    </label>
                  </div>
                </div>
                {formik.touched.discount_type &&
                  formik.errors.discount_type && (
                    <div className="offset-md-3 col-md-9">
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.discount_type}
                      </p>
                    </div>
                  )}
              </div>
              <div className="col-md-4 mb-3 ">
                <label htmlFor="discount_value" className="form-label">
                  Discount Value
                </label>
                <input
                  name="discount_value"
                  className="form-control"
                  placeholder="Enter discount value"
                  value={formik.values.discount_value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.discount_value &&
                  formik.touched.discount_value && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.discount_value}
                    </p>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  From date
                </label>
                <input
                  type="datetime-local"
                  name="from_date"
                  className="form-control"
                  value={formik.values.from_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.from_date && formik.touched.from_date && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.from_date}
                  </p>
                )}
              </div>
              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  To date
                </label>
                <input
                  type="datetime-local"
                  name="to_date"
                  className="form-control"
                  value={formik.values.to_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.to_date && formik.touched.to_date && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.to_date}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3 ">
                <label htmlFor="days" className="form-label">
                  Days
                </label>
                <input
                  name="days"
                  className="form-control"
                  placeholder="Enter days"
                  value={formik.values.days}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.days && formik.touched.days && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.days}
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
              {/* <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Attachment
                </label>
                <input
                  type="file"
                  name="attachment"
                  className="form-control "
                  onChange={(event) => {
                    formik.setFieldValue("attachment", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.attachment && formik.touched.attachment && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.attachment}
                  </p>
                )}
                {pdfUrl && (
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <PictureAsPdfIcon
                      sx={{ fontSize: 29, color: "red", margin: "10px" }}
                    />
                  </a>
                )}
              </div> */}
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
            </div>
            <div className="row">
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

export default Coupons;
