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
import SectionTitle from "../../CMS/Home/SectionTitle";

const Coupons = () => {
  const [newDialog, setNewDialog] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const [postLoading, setPostLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const { cleanText } = Common();
  const [titlemodal, setTitlemodal] = useState(false);
  const [plotData, setPlotData] = useState([]);
  const [blockData, setBlockData] = useState([])
  const [floorData, setFloorData] = useState([])
  const [flatData, setFlatData] = useState([])
  const [plotLoading, setPlotLoading] = useState(false);
  const [categoryType, setCategoryType] = useState("")

  const propertyType = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );
  console.log("categoryType", categoryType)
  console.log("blockData", blockData)
  console.log("categoryType", categoryType)
  console.log("categoryTypecondition", categoryType.toLowerCase() === "layout")
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
      width: "190px",
    },

    {
      name: "Applicable Property Name",
      width: "250px",
      cell: (row) => {
        const name = Array.isArray(row.applicable_property_names)
          ? row.applicable_property_names
          : [];

        if (!name.length) return "-";

        const displayName = name.slice(0, 5);
        const remainingCount = name.length - 5;

        return (
          <div
            title={name.join(", ")}
            style={{
              maxWidth: "230px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {remainingCount > 0
              ? `${displayName.join(", ")} +${remainingCount} more`
              : name.join(", ")}
          </div>
        );
      },
    },
    {
      name: "Plot Numbers",
      width: "250px",
      cell: (row) => {
        const plots = Array.isArray(row.plot_numbers)
          ? row.plot_numbers
          : [];

        if (!plots.length) return "-";

        const displayPlots = plots.slice(0, 5);
        const remainingCount = plots.length - 5;

        return (
          <div
            title={plots.join(", ")}
            style={{
              maxWidth: "230px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {remainingCount > 0
              ? `${displayPlots.join(", ")} +${remainingCount} more`
              : plots.join(", ")}
          </div>
        );
      },
    },
    {
      name: "Block Number",
      selector: (row) => {
        if (!row.block_no) return "-";

        try {
          const blocks = JSON.parse(row.block_no);

          return Array.isArray(blocks)
            ? blocks.join(", ")
            : blocks;
        } catch (error) {
          return row.block_no;
        }
      },
      sortable: true,
      width: "170px",
    },
    {
      name: "Floor Numbers",
      selector: (row) => {
        if (!row.floor_no) return "-";

        try {
          const floors = JSON.parse(row.floor_no);

          return Array.isArray(floors)
            ? floors.join(", ")
            : floors;
        } catch (error) {
          return row.floor_no;
        }
      },
      sortable: true,
      width: "170px",
    },
    {
      name: "Flat Numbers",
      width: "250px",
      cell: (row) => {
        const flats = Array.isArray(row.flat_numbers)
          ? row.flat_numbers
          : [];

        if (!flats.length) return "-";

        const displayPlots = flats.slice(0, 5);
        const remainingCount = flats.length - 5;

        return (
          <div
            title={flats.join(", ")}
            style={{
              maxWidth: "230px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {remainingCount > 0
              ? `${displayPlots.join(", ")} +${remainingCount} more`
              : flats.join(", ")}
          </div>
        );
      },
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
      name: "Min Range",
      selector: (row) => row.min_range,
      sortable: true,
      width: "150px",
    },
    {
      name: "Max Range",
      selector: (row) => row.max_range,
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
    const applicablePropertyIds = row.applicable_property
      ? JSON.parse(row.applicable_property)
      : [];

    const selectedCategory = propertyType?.find(
      (item) => applicablePropertyIds.includes(item.id)
    );

    const selectedCategoryName = selectedCategory?.property_type || "";

    setCategoryType(selectedCategoryName);
    setNewDialog(true);

    formik.setValues({
      id: row.id || "",
      coupon_title: row.coupon_title || "",
      coupon_code: row.coupon_code || "",
      coupon_type: row.coupon_type || "",
      customer_type: row.customer_type || "",
      property_id: row.property_id ? JSON.parse(row.property_id) : [],
      applicable_property: applicablePropertyIds,
      plot_number: row.plot_no ? JSON.parse(row.plot_no) : [],
      block_no: row.block_no || "",
      floor_no: row.floor_no ? JSON.parse(row.floor_no) : [],
      flat_no: row.flat_no ? JSON.parse(row.flat_no) : [],
      discount_type: row.discount_type || "",
      discount_value: row.discount_value || "",
      max_qty: row.max_qty || "",
      from_date: row.from_date || "",
      to_date: row.to_date || "",
      min_range: row.min_range || "",
      max_range: row.max_range || "",
      days: row.days || "",
      attachment: row.attachment || "",
      discription: row.discription || "",
      status: row.status || "",
      old_image: row.image || "",
      old_attachment: row.attachment || "",
    });

    setPdfUrl(`${IMG_PATH}/coupons/document/${row.attachment}`);
    setImgUrl(`${IMG_PATH}/coupons/image/${row.image}`);

    const selectedPropertyId = row.property_id
      ? JSON.parse(row.property_id)?.[0]
      : null;

    if (selectedPropertyId) {
      fetchPlotDetails(
        selectedPropertyId,
        selectedCategoryName,
        row.block_no || "",
        row.floor_no ? JSON.parse(row.floor_no) : []
      );
    }
  };

  const [propId, setPropId] = useState([]);
  const fetchPropId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetchpropertyid`);
      setPropId(response.data);
    } catch (error) { }
  };

  const fetchPlotDetails = async (propertyId, propertyType, blockType = "", floorType = []) => {
    if (!propertyId || !propertyType) {
      setPlotData([]);
      return;
    }
    setPlotData([]);
    setBlockData([]);
    setFloorData([]);
    setFlatData([]);
    try {
      setPlotLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/couponpropertydetails/${propertyId}`,
        {
          headers: {
            "Gl-status": categoryType,
            "Level": blockType,
            "Pr-root": JSON.stringify(floorType),
          },
        }
      );

      setPlotData(response?.data.plots || []);
      setBlockData(response?.data.blocks || []);
      setFloorData(response?.data.floors || []);
      setFlatData(response?.data.flats || []);

    } catch (error) {
      console.error("Plot details error:", error);
      setPlotData([]);
    } finally {
      setPlotLoading(false);
    }
  };
  console.log("plotData", plotData)

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
    } catch (error) { }
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
    } catch (error) { }
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
      applicable_property: [],
      property_id: [],
      plot_number: [],
      block_no: "",
      floor_no: [],
      flat_no: [],
      discount_type: "",
      discount_value: "",
      max_qty: "",
      from_date: "",
      to_date: "",
      min_range: "",
      max_range: "",
      days: "",
      // image: "",
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
      min_range: yup
        .number()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        )
        .nullable()
        .typeError("Min value must be a number"),

      max_range: yup
        .number()
        .transform((value, originalValue) =>
          originalValue === "" ? null : value
        )
        .nullable()
        .typeError("Max value must be a number")
        .test(
          "max-greater",
          "Max value must be greater than or equal to Min value",
          function (value) {
            const { min_range } = this.parent;
            if (value == null || min_range == null) return true;
            return value >= min_range;
          }
        ),
      from_date: yup
        .date()
        .transform((value, originalValue) => new Date(originalValue))
        .required("From Date is required"),

      to_date: yup
        .date()
        .transform((value, originalValue) => new Date(originalValue))
        .required("To Date is required")
        .min(yup.ref("from_date"), "To Date cannot be before From Date"),
      // image: yup.mixed().required("Image is required"),
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

  const exclusiveCategories = ["layout", "apartment project"];
  const selectedCategoryIds = formik.values.applicable_property || [];
  const selectedCategoryNames = propertyType
    ?.filter((item) => selectedCategoryIds.includes(item.id))
    ?.map((item) => item.property_type?.toLowerCase());

  const data =
    formik.values.applicable_property?.length > 0
      ? propId
        ?.filter((item) =>
          formik.values.applicable_property.includes(item.property_type)
        )
        .map((item) => ({
          label: item.property_id,
          value: item.id,
        }))
      : propId?.map((item) => ({
        label: item.property_id,
        value: item.id,
      }));

  const isExclusiveProperty =
    selectedCategoryNames?.some((name) =>
      exclusiveCategories.includes(name)
    );

  const selectedPropertyIds = formik.values.property_id || [];

  const disabledPropertyIds =
    isExclusiveProperty && selectedPropertyIds.length > 0
      ? data
        ?.filter((item) => !selectedPropertyIds.includes(item.value))
        ?.map((item) => item.value)
      : [];


  // const propertyTypeData = propertyType?.map((item) => ({
  //   label: item.property_type,
  //   value: item.id,
  // }));
  const plotDataOption = plotData?.map((item) => ({
    label: item.plot_no,
    value: item.id,
  }));
  const floorDataOption = floorData?.map((item) => ({
    label: item,
    value: item,
  }));
  const flatDataOption = flatData?.map((item) => ({
    label: item.flat_no,
    value: item.id,
  }));
  console.log("floorDataOption", floorDataOption)
  console.log("floorData", floorData)







  const hasExclusiveCategory = selectedCategoryNames?.some((name) =>
    exclusiveCategories.includes(name)
  );

  const hasNormalCategory = selectedCategoryNames?.some(
    (name) => !exclusiveCategories.includes(name)
  );

  const propertyTypeData = propertyType?.map((item) => ({
    label: item.property_type,
    value: item.id,
  }));

  const disabledCategoryIds =
    propertyType
      ?.filter((item) => {
        const categoryName = item.property_type?.toLowerCase();
        const isExclusive = exclusiveCategories.includes(categoryName);
        const isSelected = selectedCategoryIds.includes(item.id);

        // Layout / Apartment Project selected
        // => மற்ற எல்லா categories disabled
        if (hasExclusiveCategory) {
          return !isSelected;
        }

        // Normal category selected
        // => Layout / Apartment Project disabled
        if (hasNormalCategory) {
          return isExclusive;
        }

        return false;
      })
      ?.map((item) => item.id) || [];


  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
    setImgUrl("");
    setPdfUrl("");
    setCategoryType("");
    setFlatData([]);
    setFloorData([]);
    setBlockData([]);
    setPlotData([]);
  }
  return (
    <>
      <SectionTitle
        visible={titlemodal}
        setVisible={setTitlemodal}
        section="coupons"
      />
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4 className="page_heading">Coupons Reports </h4>
                <div className="d-flex gap-2 ">
                  <button
                    type="button"
                    className="btn1"
                    onClick={() => {
                      setTitlemodal(true);
                    }}
                  >
                    Add Title
                  </button>
                  <button className="btn1" onClick={() => setNewDialog(true)}>
                    Add
                  </button>

                </div>
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
          // setNewDialog(false);
          // formik.resetForm();
          // setImgUrl("");
          // setPdfUrl("");
          hideDialog()
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

              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Customer Type
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
                  Property Type
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
                  <option value="service_request">Service Request</option>
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
                <TagPicker
                  data={propertyTypeData}
                  value={formik.values.applicable_property}
                  disabledItemValues={disabledCategoryIds}
                  onChange={(value) => {
                    formik.setFieldValue("applicable_property", value);
                    formik.setFieldValue("property_id", []);

                    formik.setFieldValue("plot_number", []);
                    formik.setFieldValue("block_no", "");
                    formik.setFieldValue("floor_no", []);
                    formik.setFieldValue("flat_no", []);

                    const selectedItems = propertyTypeData.filter((item) =>
                      value.includes(item.value)
                    );

                    setCategoryType(selectedItems?.[0]?.label || "");
                  }}
                  onBlur={() =>
                    formik.setFieldTouched("applicable_property", true)
                  }
                  style={{ width: "100%" }}
                  menuStyle={{ width: 280 }}
                  cleanable
                  searchable
                />
                {formik.errors.applicable_property &&
                  formik.touched.applicable_property && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.applicable_property}
                    </p>
                  )}
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label" htmlFor="inputState">
                  Select property
                </label>
                {/* <TagPicker
                  data={data}
                  style={{ width: 280 }}
                  menuStyle={{ width: 200 }}
                  value={formik.values.property_id}
                  onChange={(value) => {
                    formik.setFieldValue("property_id", value);

                    const selectedPropertyId = value?.[0];
                    const selectedPropertyType =
                      formik.values.applicable_property?.[0];

                    fetchPlotDetails(
                      selectedPropertyId,
                      selectedPropertyType
                    );

                    formik.setFieldValue("plot_number", []);
                  }}
                  onBlur={() => formik.setFieldTouched("property_id", true)}
                  name="property_id"
                /> */}
                <TagPicker
                  data={data}
                  disabledItemValues={disabledPropertyIds}
                  style={{ width: "100%" }}
                  menuStyle={{ width: 280 }}
                  value={formik.values.property_id}
                  onChange={(value) => {
                    let selectedValues = value;

                    // Layout / Apartment Project
                    // => only ONE property can be selected
                    if (isExclusiveProperty) {
                      selectedValues = value?.length
                        ? [value[value.length - 1]]
                        : [];
                    }

                    formik.setFieldValue(
                      "property_id",
                      selectedValues
                    );

                    // Selected property ID
                    const selectedPropertyId = selectedValues?.[0];

                    const selectedPropertyType =
                      formik.values.applicable_property?.[0];

                    fetchPlotDetails(
                      selectedPropertyId,
                      selectedPropertyType
                    );

                    // Reset dependent fields
                    formik.setFieldValue("plot_number", []);
                    formik.setFieldValue("block_no", "");
                    formik.setFieldValue("floor_no", []);
                    formik.setFieldValue("flat_no", []);
                  }}
                  onBlur={() =>
                    formik.setFieldTouched("property_id", true)
                  }
                  name="property_id"
                  cleanable
                  searchable
                />
                {formik.touched.property_id && formik.errors.property_id ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.property_id}
                  </p>
                ) : null}
              </div>


              {/* plot num */}
              {categoryType.toLowerCase() === "layout" && (
                <div className="mb-3 col-md-4">
                  <label className="form-label">
                    Select plot number
                  </label>

                  <TagPicker
                    data={plotDataOption}
                    style={{ width: "100%" }}
                    menuStyle={{ width: 280 }}
                    value={formik.values.plot_number}
                    onChange={(value) =>
                      formik.setFieldValue("plot_number", value)
                    }
                    onBlur={() =>
                      formik.setFieldTouched("plot_number", true)
                    }
                    placeholder={
                      plotLoading
                        ? "Loading plots..."
                        : "Select plot number"
                    }
                    disabled={plotLoading || plotData.length === 0}
                    cleanable
                    searchable
                  />

                  {formik.touched.plot_number &&
                    formik.errors.plot_number && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.plot_number}
                      </p>
                    )}
                </div>
              )}

              {categoryType.toLowerCase() === "apartment project" && (
                <>
                  <div className="mb-3 col-md-4">
                    <label className="form-label">
                      Select Block
                    </label>

                    <select
                      name="block_no"
                      className="form-select"
                      value={formik.values.block_no}
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        const selectedBlock = e.target.value;

                        formik.setFieldValue("block_no", selectedBlock);

                        // selected property id
                        const propertyId = formik.values.property_id?.[0];

                        // selected block-ஐ Gl-status-ஆ அனுப்பும்
                        fetchPlotDetails(
                          propertyId,
                          categoryType,
                          selectedBlock
                        );
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select ...</option>
                      {blockData?.map((item) => (
                        <option value={item} >{item} </option>
                      ))}
                    </select>

                    {formik.touched.block_no &&
                      formik.errors.block_no && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.block_no}
                        </p>
                      )}
                  </div>
                  <div className="mb-3 col-md-4">
                    <label className="form-label">
                      Select Floor
                    </label>

                    <TagPicker
                      data={floorDataOption}
                      style={{ width: "100%" }}
                      menuStyle={{ width: 280 }}
                      value={formik.values.floor_no}
                      // onChange={(value) =>
                      //   formik.setFieldValue("floor_no", value)
                      // }
                      onChange={(value) => {
                        formik.setFieldValue("floor_no", value);

                        const propertyId = formik.values.property_id?.[0];
                        const blockType = formik.values.block_no;

                        fetchPlotDetails(
                          propertyId,
                          categoryType,
                          blockType,
                          value
                        );
                      }}
                      onBlur={() =>
                        formik.setFieldTouched("floor_no", true)
                      }
                      placeholder={
                        plotLoading
                          ? "Loading floors..."
                          : "Select Floor number"
                      }
                      disabled={plotLoading}
                      cleanable
                      searchable
                    />

                    {formik.touched.floor_no &&
                      formik.errors.floor_no && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.floor_no}
                        </p>
                      )}
                  </div>
                  <div className="mb-3 col-md-4">
                    <label className="form-label">
                      Select Flat Number
                    </label>

                    <TagPicker
                      data={flatDataOption}
                      style={{ width: "100%" }}
                      menuStyle={{ width: 280 }}
                      value={formik.values.flat_no}
                      onChange={(value) =>
                        formik.setFieldValue("flat_no", value)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("flat_no", true)
                      }
                      placeholder={
                        plotLoading
                          ? "Loading flats..."
                          : "Select flat number"
                      }
                      disabled={plotLoading}
                      cleanable
                      searchable
                    />

                    {formik.touched.flat_no &&
                      formik.errors.flat_no && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {formik.errors.flat_no}
                        </p>
                      )}
                  </div>
                </>
              )}


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
                  Coupon Value
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

              <div className="col-md-4 mb-3 ">
                <label htmlFor="price_min_value" className="form-label">
                  Price Range
                </label>
                <div className="d-flex gap-2">
                  <div>
                    <input
                      name="min_range"
                      className="form-control"
                      placeholder="Enter min value"
                      value={formik.values.min_range}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.min_range && formik.touched.min_range && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.min_range}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="max_range"
                      className="form-control"
                      placeholder="Enter max value"
                      value={formik.values.max_range}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.max_range && formik.touched.max_range && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.max_range}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="mb-3 col-md-4">
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
