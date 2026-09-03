import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import { Table, Pagination } from "rsuite";
import { useSelector } from "react-redux";
const { Column, ColumnGroup, HeaderCell, Cell } = Table;

export const ProjectDetailsLawyerAP = ({
  eid,
  id,
  status,
  pagetype,
  subtype,
  department //becuase this container also show pricing department and extra fields added
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));

  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [getData, setGetData] = useState([]);


  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );

  const [postLoading, setPostLoading] = useState(false)
  const onSubmit = async (values) => {
    setPostLoading(true)
    try {
      await axios.post(
        `${API_BASE_URL}/shopunitcreate`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      setNewDialog(false);
      setEditDialog(false);
      formik.resetForm();
      fetchDetails();
      setPostLoading(false)
    } catch (error) {
      const errorMessage = error.response?.data?.messages?.error
      Toast({ message: errorMessage, type: "error" });
      setPostLoading(false)
    }
  };
  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/viewshopunit/${eid}`);
      const data = response.data.map((data, index) => ({
        ...data,
        sno: index + 1,
      }));
      setGetData(data);
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const currencyRegex = /^\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/;

  const formik = useFormik({
    initialValues: {
      enqid: eid,
      block_no: "",
      flat_no: "",
      floor_no: "",
      uds_sqft: "",
      no_bhk: "",
      carpet_area_sqft: "",
      common_area_sqft: "",
      builtup_area_sqft: "",
      total_saleable_sqft: "",
      balcony: "",
      facing_direction: "",
      covered_car_parking: "",
      underground_car_parking: "",
      open_car_parking: "",


      basic_cost: "",
      development_charges_cost: "",
      infrastructure_cost: "",
      apartment_cost_A: "",
      corpus_amount: "",
      maintenance_amount: "",
      misc_charges: "",
      gst: "",
      assoc_total: "",
      registration_charges: "",
      documentation_charges: "",
      other_cost_total: "",
      total_without_registration: "",
      total_with_registration: ""
    },

    validationSchema: yup.object().shape({
      block_no: yup.string().required("Block No is required !!"),
      flat_no: yup.string().required("flat No is required!"),
      no_bhk: yup.string().required("No of bhk is required!"),
      floor_no: yup.string().required("Floor No is required!"),
      uds_sqft: yup
        .number()
        .typeError("UDS (sqft) must be numeric")
        .positive()
        .required("UDS (sqft) is required!"),

      carpet_area_sqft: yup
        .number()
        .typeError("Carpet area must be numeric")
        .positive()
        .required("Carpet area is required!"),

      common_area_sqft: yup
        .number()
        .typeError("Common area must be numeric")
        .positive()
        .required("Common area is required!"),

      builtup_area_sqft: yup
        .number()
        .typeError("Built‑up area must be numeric")
        .positive()
        .required("Built‑up area is required!"),
      total_saleable_sqft: yup
        .number()
        .typeError("Total Saleable area must be numeric")
        .positive()
        .required("Built‑up area is required!"),

      balcony: yup
        .number()
        .typeError("Balcony area must be numeric")
        .min(0)
        .required("Balcony area is required!"),

      facing_direction: yup.string().required("Facing direction is required!"),

      covered_car_parking: yup
        .number()
        .typeError("Covered car parking must be numeric")
        .min(0)
        .required("Covered car parking is required!"),

      underground_car_parking: yup
        .number()
        .typeError("Underground car parking must be numeric")
        .min(0)
        .required("Underground car parking is required!"),

      open_car_parking: yup
        .number()
        .typeError("Open car parking must be numeric")
        .min(0)
        .required("Open car parking is required!"),



      ...(department === "pricing" && {

        basic_cost: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("basic cost are required!"),
        development_charges_cost: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("development charges are required!"),
        infrastructure_cost: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("infrastructure cost are required!"),

        corpus_amount: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("corpus amount are required!"),
        maintenance_amount: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("maintenance amount are required!"),
        misc_charges: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("Miscellaneous charges are required!"),
        gst: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("gst amount are required!"),


        registration_charges: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("registration charges are required!"),
        documentation_charges: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("documentation charges are required!"),

        total_without_registration: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("without registration are required!"),
        total_with_registration: yup
          .string()
          .matches(
            currencyRegex,
            "Only numbers, commas, and decimal points are allowed"
          )
          .required("with registration are required!"),
      })
    }),

    onSubmit,
  });

  const handleDelete = (row) => {
    setDeleteDialog(true);
  };
  const DeleteRow = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/deleteshopunit/${deleteId}`,
        {}
      );
      Toast({ message: "Successfully Deleted", type: "success" });
      fetchDetails();
    } catch (error) {
    } finally {
      fetchDetails();
    }

    setDeleteDialog(false);
  };


  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
  };
  const [unitData, setUnitData] = useState([])

  const fetch = async (enqid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pricingperunit/${enqid}`);
      setUnitData(response.data);
    } catch (error) { }
  };
  useEffect(() => {
    if (eid) {
      fetch(eid);
    }
  }, [eid]);

  const handleEdit = (data) => {
    setNewDialog(true);
    formik.setFieldValue("id", data.id || null);
    formik.setFieldValue("price_per_unit", unitData[0]?.price_per_unit || null);
    formik.setFieldValue("block_no", data.block_no || "");
    formik.setFieldValue("flat_no", data.flat_no || "");
    formik.setFieldValue("no_bhk", data.no_bhk || "");
    formik.setFieldValue("floor_no", data.floor_no || "");
    formik.setFieldValue("uds_sqft", data.uds_sqft || "");
    formik.setFieldValue("carpet_area_sqft", data.carpet_area_sqft || "");
    formik.setFieldValue("common_area_sqft", data.common_area_sqft || "");
    formik.setFieldValue("builtup_area_sqft", data.builtup_area_sqft || "");
    formik.setFieldValue("total_saleable_sqft", data.total_saleable_sqft || "");
    formik.setFieldValue("balcony", data.balcony || "");
    formik.setFieldValue("facing_direction", data.facing_direction || "");
    formik.setFieldValue("covered_car_parking", data.covered_car_parking || "");
    formik.setFieldValue(
      "underground_car_parking",
      data.underground_car_parking || ""
    );
    formik.setFieldValue("open_car_parking", data.open_car_parking || "");
    formik.setFieldValue("basic_cost", data.basic_cost || "");
    formik.setFieldValue("development_charges_cost", data.development_charges_cost || "");
    formik.setFieldValue("infrastructure_cost", data.infrastructure_cost || "");
    formik.setFieldValue("apartment_cost_A", data.apartment_cost_A || "");
    formik.setFieldValue("corpus_amount", data.corpus_amount || "");
    formik.setFieldValue("maintenance_amount", data.maintenance_amount || "");
    formik.setFieldValue("misc_charges", data.misc_charges || "");
    formik.setFieldValue("gst", data.gst || "");
    formik.setFieldValue("assoc_total", data.assoc_total || "");
    formik.setFieldValue("registration_charges", data.registration_charges || "");
    formik.setFieldValue("documentation_charges", data.documentation_charges || "");
    formik.setFieldValue("other_cost_total", data.other_cost_total || "");
    formik.setFieldValue("total_without_registration", data.total_without_registration || "");
    formik.setFieldValue("total_with_registration", data.total_with_registration || "");
  };


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const heightMap = {
    1: 140,
    2: 190,
    3: 240,
    4: 290,
    5: 340,
    6: 390,
    7: 440,
    8: 490,
    9: 540,
    10: 570,
  };
  const tableHeight =
    getData?.length > 10
      ? 550
      : heightMap[getData?.length] || 140;

  const paginatedData = getData?.slice(
    (page - 1) * limit,
    page * limit
  );

  useEffect(() => {
    const parse = (val) => parseFloat(val?.toString().replace(/,/g, "")) || 0;
    const basic = parse(formik.values.price_per_unit) * parse(formik.values.total_saleable_sqft);
    formik.setFieldValue("basic_cost", basic.toFixed(2));

    const A_total =
      parse(formik.values.basic_cost) +
      parse(formik.values.development_charges_cost) +
      parse(formik.values.infrastructure_cost);

    formik.setFieldValue("apartment_cost_A", A_total.toFixed(2));

    const corpus = parse(formik.values.corpus_amount);
    const maintenance = parse(formik.values.maintenance_amount);
    const misc = parse(formik.values.misc_charges);


    const customRound = (value) => {
      const decimal = value - Math.floor(value);
      if (decimal >= 0.5) return Math.ceil(value);
      return Math.floor(value) - 1;
    };

    const gstBase = corpus + maintenance + misc;
    const gstRaw = gstBase * 0.18;
    let roundedGst = customRound(gstRaw);
    if (roundedGst < 0) roundedGst = 0;

    formik.setFieldValue("gst", roundedGst);

    const gst = parse(formik.values.gst);
    const b_total = corpus + maintenance + misc + gst;
    formik.setFieldValue("assoc_total", b_total.toFixed(2));

    const c_total =
      parse(formik.values.registration_charges) +
      parse(formik.values.documentation_charges);

    formik.setFieldValue("other_cost_total", c_total.toFixed(2));

    const totalApartmentcost_AB =
      parse(formik.values.apartment_cost_A) +
      parse(formik.values.assoc_total);

    formik.setFieldValue(
      "total_without_registration",
      totalApartmentcost_AB.toFixed(2)
    );
    const totalApartmentcost_ABC =
      parse(formik.values.apartment_cost_A) +
      parse(formik.values.assoc_total) +
      parse(formik.values.other_cost_total);

    formik.setFieldValue(
      "total_with_registration",
      totalApartmentcost_ABC.toFixed(2)
    );
  }, [
    formik.values.basic_cost,
    formik.values.price_per_unit,
    formik.values.total_saleable_sqft,
    formik.values.development_charges_cost,
    formik.values.infrastructure_cost,
    formik.values.corpus_amount,
    formik.values.maintenance_amount,
    formik.values.misc_charges,
    formik.values.gst,
    formik.values.documentation_charges,
    formik.values.registration_charges,
    formik.values.apartment_cost_A,
    formik.values.assoc_total,
    formik.values.total_with_registration,
    formik.values.total_without_registration,
  ]);
  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-4">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-center">Project Details</h6>
              {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") &&
                pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && department !== "pricing" && (
                  <button className="btn1" onClick={() => setNewDialog(true)}>
                    {" "}
                    Add{" "}
                  </button>
                )}
            </div>
            <hr />
            <div>
              <Table
                bordered
                cellBordered
                height={tableHeight}
                headerHeight={80}
                data={paginatedData}
                rowClassName={(rowData) => {
                  if (rowData?.status === "booking") {

                    return "booking-row";
                  }
                  return "";
                }}
              >
                <Column width={70} align="center">
                  <HeaderCell>S.No</HeaderCell>
                  <Cell dataKey="sno" />
                </Column>

                <Column width={130} align="center">
                  <HeaderCell>Block No.</HeaderCell>
                  <Cell dataKey="block_no" />
                </Column>

                <Column width={130} align="center">
                  <HeaderCell>Floor No.</HeaderCell>
                  <Cell dataKey="floor_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Flat No.</HeaderCell>
                  <Cell dataKey="flat_no" />
                </Column>

                <Column width={130} align="center">
                  <HeaderCell>UDS in Sq.Ft.,</HeaderCell>
                  <Cell dataKey="uds_sqft" />
                </Column>
                <Column width={150} align="center">
                  <HeaderCell>Carpet Area in Sq.Ft.,</HeaderCell>
                  <Cell dataKey="carpet_area_sqft" />
                </Column>
                <Column width={170} align="center">
                  <HeaderCell>Common Area in Sq.Ft.,</HeaderCell>
                  <Cell dataKey="common_area_sqft" />
                </Column>
                <Column width={170} align="center">
                  <HeaderCell>Built-up Area in Sq.Ft.</HeaderCell>
                  <Cell dataKey="builtup_area_sqft" />
                </Column>
                <Column width={170} align="center">
                  <HeaderCell>Total Saleable Sq.Ft.</HeaderCell>
                  <Cell dataKey="total_saleable_sqft" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>No Of BHK</HeaderCell>
                  <Cell dataKey="no_bhk" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Balcony</HeaderCell>
                  <Cell dataKey="balcony" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Facing Direction</HeaderCell>
                  <Cell dataKey="facing_direction" />
                </Column>
                <ColumnGroup
                  header="Car Parking"
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={170} colSpan={2}>
                    <HeaderCell>Coverd car parking</HeaderCell>
                    <Cell dataKey="covered_car_parking" />
                  </Column>
                  <Column width={180}>
                    <HeaderCell>Underground car parking </HeaderCell>
                    <Cell dataKey="underground_car_parking" />
                  </Column>
                  <Column width={170}>
                    <HeaderCell>Open car parking </HeaderCell>
                    <Cell dataKey="open_car_parking" />
                  </Column>
                </ColumnGroup>
                {department === "pricing" && (<>
                  <ColumnGroup
                    header="Apartment Cost (Without Registration) - A"
                    align="center"
                    style={{ fontSize: "26px" }}
                  >
                    <Column width={130} colSpan={2}>
                      <HeaderCell>Basic cost </HeaderCell>
                      <Cell>{(rowData) => `₹ ${rowData.basic_cost ?? "0"} `}</Cell>
                    </Column>
                    <Column width={160}>
                      <HeaderCell>Development charges </HeaderCell>
                      {/* <Cell dataKey="development_charges" /> */}
                      <Cell>{(rowData) => `₹ ${rowData.development_charges_cost ?? "0"}`}</Cell>
                    </Column>
                    <Column width={160}>
                      <HeaderCell>Infrastructure cost </HeaderCell>
                      {/* <Cell dataKey="infrastructure_cost" /> */}
                      <Cell>{(rowData) => `₹${rowData.infrastructure_cost ?? "0"}`}</Cell>
                    </Column>
                    <Column width={130}>
                      <HeaderCell>Total </HeaderCell>
                      {/* <Cell dataKey="plot_cost_total" /> */}
                      <Cell>{(rowData) => `₹${rowData.apartment_cost_A ?? "0"}`}</Cell>

                    </Column>
                  </ColumnGroup>
                  <ColumnGroup
                    header="Development / Association Cost - B"
                    align="center"
                    style={{ fontSize: "26px" }}
                  >
                    <Column width={130} colSpan={2}>
                      <HeaderCell>Corpus Amount</HeaderCell>
                      {/* <Cell dataKey="corpus_amount" /> */}
                      <Cell>{(rowData) => `₹${rowData.corpus_amount ?? "0"}`}</Cell>
                    </Column>
                    <Column width={160}>
                      <HeaderCell>Maintenance Amount </HeaderCell>
                      {/* <Cell dataKey="maintenance_amount" /> */}
                      <Cell>{(rowData) => `₹${rowData.maintenance_amount ?? "0"}`}</Cell>

                    </Column>
                    <Column width={160}>
                      <HeaderCell>Miscellaneous charges </HeaderCell>
                      {/* <Cell dataKey="misc_charges" /> */}
                      <Cell>{(rowData) => `₹${rowData.misc_charges ?? "0"}`}</Cell>

                    </Column>
                    <Column width={130}>
                      <HeaderCell>GST </HeaderCell>
                      {/* <Cell dataKey="gst_amount" /> */}
                      <Cell>{(rowData) => `₹${rowData.gst ?? "0"}`}</Cell>

                    </Column>
                    <Column width={130}>
                      <HeaderCell>Total </HeaderCell>
                      {/* <Cell dataKey="association_cost_total" /> */}
                      <Cell>{(rowData) => `₹${rowData.assoc_total ?? "0"}`}</Cell>

                    </Column>
                  </ColumnGroup>
                  <ColumnGroup
                    header="Registration & other cost - C"
                    align="center"
                    style={{ fontSize: "26px" }}
                  >
                    <Column width={160} colSpan={2}>
                      <HeaderCell>Registration Charges</HeaderCell>
                      {/* <Cell dataKey="registration_charges" /> */}
                      <Cell>{(rowData) => `₹${rowData.registration_charges ?? "0"}`}</Cell>

                    </Column>
                    <Column width={170}>
                      <HeaderCell>Documentation charges </HeaderCell>
                      {/* <Cell dataKey="documentation_charges" /> */}
                      <Cell>{(rowData) => `₹${rowData.documentation_charges ?? "0"}`}</Cell>

                    </Column>
                    <Column width={130}>
                      <HeaderCell>Total </HeaderCell>
                      {/* <Cell dataKey="registration_total" /> */}
                      <Cell>{(rowData) => `₹${rowData.other_cost_total ?? "0"}`}</Cell>

                    </Column>
                  </ColumnGroup>
                  <ColumnGroup
                    header="Total Plot Cost "
                    align="center"
                    style={{ fontSize: "26px" }}
                  >
                    <Column width={160} colSpan={2}>
                      <HeaderCell>Without Registration</HeaderCell>
                      {/* <Cell dataKey="total_without_registration" /> */}
                      <Cell>{(rowData) => `₹${rowData.total_without_registration ?? "0"}`}</Cell>

                    </Column>
                    <Column width={160}>
                      <HeaderCell>With Registration </HeaderCell>
                      {/* <Cell dataKey="total_with_registration" /> */}
                      <Cell>{(rowData) => `₹${rowData.total_with_registration ?? "0"}`}</Cell>

                    </Column>
                  </ColumnGroup>
                </>)}


                {staffid.Login === "staff" &&
                  (status === "pending" || status === "complete") &&
                  pagetype !== "reminder" &&
                  enquiryDoumentData?.status !== "booking" && (
                    <Column width={100} fixed="right" align="center">
                      <HeaderCell>Action</HeaderCell>

                      <Cell>
                        {(rowData) => {
                          const isBooking = rowData?.status === "booking";
                          const isPricing = department === "pricing";

                          if (isBooking) {
                            return (
                              <span className="badge bg-success">
                                Booking
                              </span>
                            );
                          }

                          return (
                            <div className="d-flex">
                              {/* Edit */}
                              <button
                                className="btn btn-outline-info me-1 edit"
                                data-tooltip-id="edit"
                                onClick={() => handleEdit(rowData)}
                              >
                                <EditIcon />
                              </button>

                              {/* Delete - pricing department-la hide */}
                              {!isPricing && (
                                <button
                                  className="btn btn-outline-danger delete"
                                  data-tooltip-id="delete"
                                  onClick={() => {
                                    handleDelete(rowData);
                                    setDeleteId(rowData.id);
                                  }}
                                >
                                  <DeleteIcon />
                                </button>
                              )}
                            </div>
                          );
                        }}
                      </Cell>
                    </Column>
                  )}
              </Table>
              <div style={{ padding: 20 }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={["total", "-", "pager"]}
                  total={getData.length}
                  limitOptions={[10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={newDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header=" Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="block_no" className="form-label">
                Block No<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="block_no"
                type="text"
                name="block_no"
                className="form-control"
                value={formik.values.block_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Block No"
              />
              {formik.errors.block_no && formik.touched.block_no && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.block_no}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="shop_no" className="form-label">
                Flat No<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="flat_no"
                type="text"
                name="flat_no"
                className="form-control"
                value={formik.values.flat_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Shop No"
              />
              {formik.errors.flat_no && formik.touched.flat_no && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.flat_no}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="floor_no" className="form-label">
                Floor No<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="floor_no"
                type="number"
                name="floor_no"
                className="form-control"
                value={formik.values.floor_no}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only positive numbers and 0
                  if (value === "" || /^\d+$/.test(value)) {
                    formik.setFieldValue("floor_no", value);
                  }
                }}
                onBlur={formik.handleBlur}
                placeholder="Enter Floor No"
              />
              {formik.errors.floor_no && formik.touched.floor_no && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.floor_no}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="uds_sqft" className="form-label">
                UDS Sqft<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="uds_sqft"
                type="text"
                name="uds_sqft"
                className="form-control"
                value={formik.values.uds_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter UDS Sqft"
              />
              {formik.errors.uds_sqft && formik.touched.uds_sqft && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.uds_sqft}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="carpet_area_sqft" className="form-label">
                Carpet Area Sqft<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="carpet_area_sqft"
                type="text"
                name="carpet_area_sqft"
                className="form-control"
                value={formik.values.carpet_area_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Carpet Area"
              />
              {formik.errors.carpet_area_sqft &&
                formik.touched.carpet_area_sqft && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.carpet_area_sqft}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="common_area_sqft" className="form-label">
                Common Area Sqft<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="common_area_sqft"
                type="text"
                name="common_area_sqft"
                className="form-control"
                value={formik.values.common_area_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Common Area"
              />
              {formik.errors.common_area_sqft &&
                formik.touched.common_area_sqft && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.common_area_sqft}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="builtup_area_sqft" className="form-label">
                Built-up Area Sqft<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="builtup_area_sqft"
                type="text"
                name="builtup_area_sqft"
                className="form-control"
                value={formik.values.builtup_area_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Built-up Area"
              />
              {formik.errors.builtup_area_sqft &&
                formik.touched.builtup_area_sqft && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.builtup_area_sqft}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="builtup_area_sqft" className="form-label">
                Total Saleable Sqft<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="total_saleable_sqft"
                type="text"
                name="total_saleable_sqft"
                className="form-control"
                value={formik.values.total_saleable_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Total Saleable Sqft.."
              />
              {formik.errors.total_saleable_sqft &&
                formik.touched.total_saleable_sqft && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_saleable_sqft}
                  </p>
                )}
            </div>


            <div className="form-group mt-2 col-6">
              <label htmlFor="balcony" className="form-label">
                No Of Bhk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="no_bhk"
                type="text"
                name="no_bhk"
                className="form-control"
                value={formik.values.no_bhk}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter no of bhk"
              />
              {formik.errors.no_bhk && formik.touched.no_bhk && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.no_bhk}
                </p>
              )}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="balcony" className="form-label">
                Balcony (sqft)<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="balcony"
                type="text"
                name="balcony"
                className="form-control"
                value={formik.values.balcony}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Balcony Area"
              />
              {formik.errors.balcony && formik.touched.balcony && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.balcony}
                </p>
              )}
            </div>

            <div className="form-group mt-2 mb-3 col-6">
              <label htmlFor="facing_direction" className="form-label">
                Facing Direction<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="facing_direction"
                type="text"
                name="facing_direction"
                className="form-control"
                value={formik.values.facing_direction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Facing Direction"
              />
              {formik.errors.facing_direction &&
                formik.touched.facing_direction && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.facing_direction}
                  </p>
                )}
            </div>
            <hr />
            <h6>Car Parking</h6>
            <div className="form-group mt-2 col-6">
              <label htmlFor="covered_car_parking" className="form-label">
                Covered Car Parking<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="covered_car_parking"
                type="number"
                name="covered_car_parking"
                className="form-control"
                value={formik.values.covered_car_parking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Covered Car Parking Count"
              />
              {formik.errors.covered_car_parking &&
                formik.touched.covered_car_parking && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.covered_car_parking}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="underground_car_parking" className="form-label">
                Underground Car Parking<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="underground_car_parking"
                type="number"
                name="underground_car_parking"
                className="form-control"
                value={formik.values.underground_car_parking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Underground Car Parking Count"
              />
              {formik.errors.underground_car_parking &&
                formik.touched.underground_car_parking && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.underground_car_parking}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="open_car_parking" className="form-label">
                Open Car Parking<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="open_car_parking"
                type="number"
                name="open_car_parking"
                className="form-control"
                value={formik.values.open_car_parking}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Open Car Parking Count"
              />
              {formik.errors.open_car_parking &&
                formik.touched.open_car_parking && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.open_car_parking}
                  </p>
                )}
            </div>
          </div>
          {department === "pricing" && (
            <div>
              <hr />
              <div className="d-flex justify-content-start">
                <h6>
                  <b> Apartment cost (Without Registration) - A </b>{" "}
                </h6>
              </div>
              <div className="row">
                
                <div className="form-group mt-2 col-6">
                  <label htmlFor="north" className="form-label">
                    {" "}
                    Price Per Unit
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="price_per_unit"
                    type="text"
                    name="price_per_unit"
                    className="form-control"
                    value={formik.values.price_per_unit || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter price per unit cost..."
                    disabled
                  />

                </div>

                <div className="form-group mt-2 col-6">
                  <label htmlFor="north" className="form-label">
                    {" "}
                    Basic cost (price per unit * Total Saleable Sqft)
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="basic_cost"
                    type="text"
                    name="basic_cost"
                    className="form-control"
                    value={formik.values.basic_cost || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter basic cost..."
                    disabled
                  />
                  {formik.touched.basic_cost && formik.errors.basic_cost && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.basic_cost}
                    </p>
                  )}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Development charges
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="development_charges_cost"
                    type="text"
                    name="development_charges_cost"
                    className="form-control"
                    value={formik.values.development_charges_cost || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter development charges"
                  />
                  {formik.touched.development_charges_cost &&
                    formik.errors.development_charges_cost && (
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.development_charges_cost}
                      </p>
                    )}
                </div>


                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Infrastructure cost
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="infrastructure_cost"
                    type="text"
                    name="infrastructure_cost"
                    className="form-control "
                    value={formik.values.infrastructure_cost || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter infrastructure cost"
                  />

                  {formik.errors.infrastructure_cost &&
                    formik.touched.infrastructure_cost ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.infrastructure_cost}
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    Total
                  </label>
                  <input
                    id="apartment_cost_A"
                    type="text"
                    name="apartment_cost_A"
                    className="form-control "
                    value={formik.values.apartment_cost_A || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Total.."
                    disabled
                  />

                  {formik.errors.apartment_cost_A &&
                    formik.touched.apartment_cost_A ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.apartment_cost_A}
                    </p>
                  ) : null}
                </div>
              </div>

              <hr />
              <div className="d-flex justify-content-start">
                <h6>
                  {" "}
                  <b> Development / Association Cost - B </b>{" "}
                </h6>
              </div>
              <div className="row">
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Corpus Amount
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="corpus_amount"
                    type="text"
                    name="corpus_amount"
                    className="form-control "
                    value={formik.values.corpus_amount || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter corpus amount.."
                  />

                  {formik.errors.corpus_amount && formik.touched.corpus_amount ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.corpus_amount}
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Maintenance Amount
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="maintenance_amount"
                    type="text"
                    name="maintenance_amount"
                    className="form-control "
                    value={formik.values.maintenance_amount || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter maintenance amount..."
                  />

                  {formik.errors.maintenance_amount &&
                    formik.touched.maintenance_amount ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.maintenance_amount}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Miscellaneous charges
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="misc_charges"
                    type="text"
                    name="misc_charges"
                    className="form-control "
                    value={formik.values.misc_charges || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Miscellaneous charges... "
                  />
                  {formik.errors.misc_charges && formik.touched.misc_charges ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.misc_charges}
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    GST (18 %)
                  </label>
                  <input
                    id="gst"
                    type="text"
                    name="gst"
                    className="form-control "
                    value={formik.values.gst || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter gst amount..."
                    disabled
                  />

                  {formik.errors.gst && formik.touched.gst ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.gst}
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    Total
                  </label>
                  <input
                    id="assoc_total"
                    type="text"
                    name="assoc_total"
                    className="form-control "
                    value={formik.values.assoc_total || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Total.."
                    disabled
                  />

                  {formik.errors.assoc_total &&
                    formik.touched.assoc_total ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.assoc_total}
                    </p>
                  ) : null}
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-start">
                <h6>
                  {" "}
                  <b> Registration & other cost - C </b>{" "}
                </h6>
              </div>
              <div className="row">
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Registration Charges
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="registration_charges"
                    type="text"
                    name="registration_charges"
                    className="form-control "
                    value={formik.values.registration_charges || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter registration charges.."
                  />

                  {formik.errors.registration_charges &&
                    formik.touched.registration_charges ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.registration_charges}
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Documentation charges
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="documentation_charges"
                    type="text"
                    name="documentation_charges"
                    className="form-control "
                    value={formik.values.documentation_charges || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter documentation charges..."
                  />

                  {formik.errors.documentation_charges &&
                    formik.touched.documentation_charges ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.documentation_charges}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    Total
                  </label>
                  <input
                    id="other_cost_total"
                    type="text"
                    name="other_cost_total"
                    className="form-control "
                    value={formik.values.other_cost_total || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Total.."
                    disabled
                  />

                  {formik.errors.other_cost_total &&
                    formik.touched.other_cost_total ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.other_cost_total}
                    </p>
                  ) : null}
                </div>
              </div>
              <hr />

              <div className="d-flex justify-content-start">
                <h6>
                  {" "}
                  <b> Total Apartment Cost </b>{" "}
                </h6>
              </div>
              <div className="row">
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    Without Registration (A+B)
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="total_without_registration"
                    type="text"
                    name="total_without_registration"
                    className="form-control "
                    value={formik.values.total_without_registration || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter total.."
                    disabled
                  />

                  {formik.errors.total_without_registration &&
                    formik.touched.total_without_registration ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_without_registration}
                    </p>
                  ) : null}
                </div>
                <div className="form-group mt-2 col-6">
                  <label htmlFor="period" className="form-label">
                    {" "}
                    With Registration (A+B+C)
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="total_with_registration"
                    type="text"
                    name="total_with_registration"
                    className="form-control "
                    value={formik.values.total_with_registration || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter total..."
                    disabled
                  />

                  {formik.errors.total_with_registration &&
                    formik.touched.total_with_registration ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.total_with_registration}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn1 me-2"
              type="submit"
              disabled={postLoading}
            >
              {postLoading ? "Processing..." : "Save"}
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the selected row
          </span>
        </div>

        <div className="d-flex justify-content-end mt-3 gap-3">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(false)}
          >
            No
          </Button>
          <Button variant="contained" onClick={DeleteRow}>
            Yes
          </Button>
        </div>
      </Dialog>
    </>
  );
};
