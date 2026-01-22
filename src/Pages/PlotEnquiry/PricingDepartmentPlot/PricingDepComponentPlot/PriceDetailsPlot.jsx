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
import { Table } from "rsuite";
const { Column, ColumnGroup, HeaderCell, Cell } = Table;

export const PriceDetailsPlot = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState(false);
  const [getData, setGetData] = useState([]);

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addplotdetails`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
    } catch (error) {
      console.error(error);
    } finally {
      fetchDetails();
    }
    setNewDialog(false);
    formik.resetForm();
  };
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/showplotdetails/${eid}`
      );
      const data = response.data.map((data, index) => ({
        ...data,
        sno: index + 1,
      }));
      setGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const currencyRegex = /^\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/;

  const validationSchema = yup.object().shape({
    survey_no: yup.string().required("Survey No is required!"),
    phase_no: yup.string().required("Phase No is required!"),
    plot_no: yup.string().required("Plot No is required!"),
    extent_sqft: yup.string().required("Extent (sqft) is required!"),
    facing_direction: yup.string().required("Facing direction is required!"),
    road_width: yup.string().required("Road width is required!"),
    plot_type: yup.string().required("Plot Type is required!"),
    remarks: yup.string().required("Remarks are required!"),
    basic_cost: yup
      .string()
      .matches(
        currencyRegex,
        "Only numbers, commas, and decimal points are allowed"
      )
      .required("basic cost are required!"),
    development_charges: yup
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
    // plot_cost_total: yup
    //   .string()
    //   .matches(
    //     currencyRegex,
    //     "Only numbers, commas, and decimal points are allowed"
    //   )
    //   .required("plot cost total are required!"),
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
    gst_amount: yup
      .string()
      .matches(
        currencyRegex,
        "Only numbers, commas, and decimal points are allowed"
      )
      .required("gst amount are required!"),
    // association_cost_total: yup
    //   .string()
    //   .matches(
    //     currencyRegex,
    //     "Only numbers, commas, and decimal points are allowed"
    //   )
    //   .required("association cost total are required!"),

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
    // registration_total: yup
    //   .string()
    //   .matches(
    //     currencyRegex,
    //     "Only numbers, commas, and decimal points are allowed"
    //   )
    //   .required("registration total are required!"),
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
  });

  const formik = useFormik({
    initialValues: {
      survey_no: "",
      phase_no: "",
      plot_no: "",
      extent_sqft: "",
      facing_direction: "",
      road_width: "",
      remarks: "",
      plot_type: "",
      basic_cost: "",
      development_charges: "",
      infrastructure_cost: "",
      plot_cost_total: "",
      corpus_amount: "",
      maintenance_amount: "",
      misc_charges: "",
      gst_amount: "",
      association_cost_total: "",
      registration_charges: "",
      documentation_charges: "",
      registration_total: "",
      total_without_registration: "",
      total_with_registration: "",
      enqid: eid,
      id: null,
    },
    validationSchema,
    onSubmit,
  });

  const handleDelete = (row) => {
    setDeleteDialog(true);
  };
  const DeleteRow = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteplotdetails/${deleteId}`,
        {}
      );
      Toast({ message: "Successfully Deleted", type: "success" });
      fetchDetails();
    } catch (error) {
      console.error(error);
    } finally {
      fetchDetails();
    }

    setDeleteDialog(false);
  };

  const deleteUnitsDialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button
        variant="outlined"
        color="error"
        onClick={() => setDeleteDialog(false)}
      >
        No
      </Button>
      <Button variant="contained" color="success" onClick={DeleteRow}>
        Yes
      </Button>
    </div>
  );
  const hideDialog = () => {
    setNewDialog(false);
    formik.resetForm();
  };
  const editHide = () => {
    setEditDialog(false);
    formik.resetForm();
  };

  const handleEdit = (data) => {
    setNewDialog(true);
    formik.setFieldValue("survey_no", data.survey_no || "");
    formik.setFieldValue("phase_no", data.phase_no || "");
    formik.setFieldValue("plot_no", data.plot_no || "");
    formik.setFieldValue("extent_sqft", data.extent_sqft || "");
    formik.setFieldValue("facing_direction", data.facing_direction || "");
    formik.setFieldValue("road_width", data.road_width || "");
    formik.setFieldValue("remarks", data.remarks || "");
    formik.setFieldValue("plot_type", data.plot_type || "");
    formik.setFieldValue("basic_cost", data.basic_cost || null);
    formik.setFieldValue(
      "development_charges",
      data.development_charges || null
    );
    formik.setFieldValue(
      "infrastructure_cost",
      data.infrastructure_cost || null
    );
    formik.setFieldValue("plot_cost_total", data.plot_cost_total || null);
    formik.setFieldValue("corpus_amount", data.corpus_amount || null);
    formik.setFieldValue("maintenance_amount", data.maintenance_amount || null);
    formik.setFieldValue("misc_charges", data.misc_charges || null);
    formik.setFieldValue("gst_amount", data.gst_amount || null);
    formik.setFieldValue(
      "association_cost_total",
      data.association_cost_total || null
    );
    formik.setFieldValue(
      "registration_charges",
      data.registration_charges || null
    );
    formik.setFieldValue(
      "documentation_charges",
      data.documentation_charges || null
    );
    formik.setFieldValue(
      "total_without_registration",
      data.total_without_registration || null
    );
    formik.setFieldValue(
      "total_with_registration",
      data.total_with_registration || null
    );
    formik.setFieldValue("registration_total", data.registration_total || null);
    formik.setFieldValue("id", data.id || null);
  };

  const heightMap = {
    1: 140,
    2: 190,
    3: 240,
    4: 290,
    5: 340,
  };

  useEffect(() => {
    const parse = (val) => parseFloat(val?.toString().replace(/,/g, "")) || 0;

    const A_total =
      parse(formik.values.basic_cost) +
      parse(formik.values.development_charges) +
      parse(formik.values.infrastructure_cost);

    formik.setFieldValue("plot_cost_total", A_total.toFixed(2));

    const corpus = parse(formik.values.corpus_amount);
    const maintenance = parse(formik.values.maintenance_amount);
    const misc = parse(formik.values.misc_charges);

    const gstBase = corpus + maintenance + misc;
    const defaultGst = (gstBase * 0.18).toFixed(2);

    // if (!formik.values.gst_amount ) {
    formik.setFieldValue("gst_amount", defaultGst);
    // }

    const gst = parse(formik.values.gst_amount);
    const b_total = corpus + maintenance + misc + gst;
    formik.setFieldValue("association_cost_total", b_total.toFixed(2));

    const c_total =
      parse(formik.values.registration_charges) +
      parse(formik.values.documentation_charges);

    formik.setFieldValue("registration_total", c_total.toFixed(2));

    const totalplotcoset_AB =
      parse(formik.values.plot_cost_total) +
      parse(formik.values.association_cost_total);

    formik.setFieldValue(
      "total_without_registration",
      totalplotcoset_AB.toFixed(2)
    );
    const totalplotcoset_ABC =
      parse(formik.values.plot_cost_total) +
      parse(formik.values.association_cost_total) +
      parse(formik.values.registration_total);

    formik.setFieldValue(
      "total_with_registration",
      totalplotcoset_ABC.toFixed(2)
    );
  }, [
    formik.values.basic_cost,
    formik.values.development_charges,
    formik.values.infrastructure_cost,
    formik.values.corpus_amount,
    formik.values.maintenance_amount,
    formik.values.misc_charges,
    formik.values.gst_amount,
    formik.values.documentation_charges,
    formik.values.registration_charges,
    formik.values.plot_cost_total,
    formik.values.association_cost_total,
    formik.values.total_with_registration,
    formik.values.total_without_registration,
  ]);

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0 mb-4">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-center">Price Details</h6>
              {/* {staffid.Login === "staff" &&
                (status === "pending" || status === "complete") &&
                pagetype !== "reminder" && (
                  <button className="btn1" onClick={() => setNewDialog(true)}>
                    {" "}
                    Add{" "}
                  </button>
                )} */}
            </div>
            <hr />
            <div>
              <Table
                bordered
                cellBordered
                // height={320}
                height={heightMap[getData?.length] || 140}
                headerHeight={80}
                data={getData}
              >
                <Column width={70} align="center">
                  <HeaderCell>S.No</HeaderCell>
                  <Cell dataKey="sno" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Phase No</HeaderCell>
                  <Cell dataKey="phase_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Plot No</HeaderCell>
                  <Cell dataKey="plot_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Extent in Sq.Ft</HeaderCell>
                  <Cell dataKey="extent_sqft" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Survey No</HeaderCell>
                  <Cell dataKey="survey_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Facing Direction</HeaderCell>
                  <Cell dataKey="facing_direction" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Road Width</HeaderCell>
                  <Cell dataKey="road_width" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Plot Type</HeaderCell>
                  <Cell dataKey="plot_type" />
                </Column>
                <Column width={200}>
                  <HeaderCell>Remarks</HeaderCell>
                  <Cell dataKey="remarks" />
                </Column>
                <ColumnGroup
                  header="Plot cost (Without Registration) - A"
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={130} colSpan={2}>
                    <HeaderCell>Basic cost </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.basic_cost ? `₹${rowData.basic_cost}` : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>Development charges </HeaderCell>
                    {/* <Cell dataKey="development_charges" /> */}
                    <Cell>
                      {(rowData) =>
                        rowData.development_charges
                          ? `₹${rowData.development_charges}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>Infrastructure cost </HeaderCell>
                    {/* <Cell dataKey="infrastructure_cost" /> */}
                    <Cell>
                      {(rowData) =>
                        rowData.infrastructure_cost
                          ? `₹${rowData.infrastructure_cost}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={130}>
                    <HeaderCell>Total </HeaderCell>
                    {/* <Cell dataKey="plot_cost_total" /> */}
                    <Cell>
                      {/* {(rowData) => `₹${rowData.plot_cost_total}`} */}
                      {(rowData) =>
                        rowData.plot_cost_total
                          ? `₹${rowData.plot_cost_total}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                </ColumnGroup>
                <ColumnGroup
                  header="Development / Association Cost - B"
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={130} colSpan={2}>
                    <HeaderCell>Corpus Amount</HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.corpus_amount}`} */}
                      {(rowData) =>
                        rowData.corpus_amount
                          ? `₹${rowData.corpus_amount}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>Maintenance Amount </HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.maintenance_amount}`} */}
                      {(rowData) =>
                        rowData.maintenance_amount
                          ? `₹${rowData.maintenance_amount}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>Miscellaneous charges </HeaderCell>
                    {/* <Cell>{(rowData) => `₹${rowData.misc_charges}`}</Cell> */}
                    <Cell>
                      {(rowData) =>
                        rowData.misc_charges ? `₹${rowData.misc_charges}` : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={130}>
                    <HeaderCell>GST </HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.gst_amount}`} */}
                      {(rowData) =>
                        rowData.gst_amount ? `₹${rowData.gst_amount}` : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={130}>
                    <HeaderCell>Total </HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.association_cost_total}`} */}
                      {(rowData) =>
                        rowData.association_cost_total
                          ? `₹${rowData.association_cost_total}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                </ColumnGroup>
                <ColumnGroup
                  header="Registration & other cost - C"
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={160} colSpan={2}>
                    <HeaderCell>Registration Charges</HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.registration_charges}`} */}
                      {(rowData) =>
                        rowData.registration_charges
                          ? `₹${rowData.registration_charges}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={170}>
                    <HeaderCell>Documentation charges </HeaderCell>
                    {/* <Cell dataKey="documentation_charges" /> */}
                    <Cell>
                      {(rowData) => `₹${rowData.documentation_charges}`}
                      {(rowData) =>
                        rowData.documentation_charges
                          ? `₹${rowData.documentation_charges}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={130}>
                    <HeaderCell>Total </HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.registration_total}`} */}
                      {(rowData) =>
                        rowData.registration_total
                          ? `₹${rowData.registration_total}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                </ColumnGroup>
                <ColumnGroup
                  header="Total Plot Cost "
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={160} colSpan={2}>
                    <HeaderCell>Without Registration</HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.total_without_registration}`} */}
                      {(rowData) =>
                        rowData.total_without_registration
                          ? `₹${rowData.total_without_registration}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>With Registration </HeaderCell>
                    <Cell>
                      {/* {(rowData) => `₹${rowData.total_with_registration}`} */}
                      {(rowData) =>
                        rowData.total_with_registration
                          ? `₹${rowData.total_with_registration}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                </ColumnGroup>

                {staffid.Login === "staff" &&
                  (status === "pending" || status === "complete") &&
                  pagetype !== "reminder" && (
                    <Column width={80} fixed="right" align="center">
                      <HeaderCell>Action</HeaderCell>
                      <Cell>
                        {(rowData) => (
                          <div className="d-flex">
                            <button
                              className="btn btn-outline-info me-1 edit"
                              data-tooltip-id="edit"
                              onClick={() => handleEdit(rowData)}
                            >
                              <EditIcon />
                            </button>
                            {/* <button
                              className="btn btn-outline-danger delete"
                              data-tooltip-id="delete"
                              onClick={() => {
                                handleDelete(rowData);
                                setDeleteId(rowData.id);
                              }}
                            >
                              <DeleteIcon />
                            </button> */}
                          </div>
                        )}
                      </Cell>
                    </Column>
                  )}
              </Table>
              {/* <div style={{ padding: 20 }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={["total", "-", "limit", "|", "pager", "skip"]}
                  total={getData.length}
                  limitOptions={[10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={newDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Plot  Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="surveyno" className="form-label">
                {" "}
                Phase No
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="phase_no"
                type="text"
                name="phase_no"
                className="form-control"
                value={formik.values.phase_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Phase No"
              />

              {formik.errors.phase_no && formik.touched.phase_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.phase_no}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="subdivision" className="form-label">
                Plot No <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="plot_no"
                type="text"
                name="plot_no"
                className="form-control"
                placeholder="Enter Plot No"
                value={formik.values.plot_no}
                onChange={formik.handleChange}
              />
              {formik.errors.plot_no && formik.touched.plot_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.plot_no}
                </p>
              ) : null}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="extent" className="form-label">
                {" "}
                Survey No
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="survey_no"
                type="text"
                name="survey_no"
                className="form-control"
                value={formik.values.survey_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Survey No.,"
              />

              {formik.errors.survey_no && formik.touched.survey_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.survey_no}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="extent" className="form-label">
                {" "}
                Extent in Sq.Ft.,
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="extent_sqft"
                type="text"
                name="extent_sqft"
                className="form-control"
                value={formik.values.extent_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Extent in Sq.Ft.,"
              />

              {formik.errors.extent_sqft && formik.touched.extent_sqft ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.extent_sqft}
                </p>
              ) : null}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="direction" className="form-label">
                Facing Direction <span style={{ color: "red" }}>*</span>
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
              formik.touched.facing_direction ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.facing_direction}
                </p>
              ) : null}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="remark" className="form-label">
                {" "}
                Road Width
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="road_width"
                type="text"
                name="road_width"
                className="form-control "
                value={formik.values.road_width}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter road width"
              />

              {formik.errors.road_width && formik.touched.road_width ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.road_width}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="remark" className="form-label">
                {" "}
                Plot Type
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="road_width"
                type="text"
                name="plot_type"
                className="form-select "
                value={formik.values.plot_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select</option>
                <option value="Corner">Corner</option>
                <option value="Not Corner">Not Corner</option>
              </select>

              {formik.errors.plot_type && formik.touched.plot_type ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.plot_type}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="remark" className="form-label">
                {" "}
                Remark
                <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="remarks"
                type="text"
                name="remarks"
                className="form-control "
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Remark"
              />

              {formik.errors.remarks && formik.touched.remarks ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.remarks}
                </p>
              ) : null}
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-start">
            <h6>
              <b> Plot cost (Without Registration) - A </b>{" "}
            </h6>
          </div>
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="north" className="form-label">
                {" "}
                Basic cost
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
                id="development_charges"
                type="text"
                name="development_charges"
                className="form-control"
                value={formik.values.development_charges || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter development charges"
              />
              {formik.touched.development_charges &&
                formik.errors.development_charges && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.development_charges}
                  </p>
                )}
            </div>
          </div>
          <div className="row">
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
                id="plot_cost_total"
                type="text"
                name="plot_cost_total"
                className="form-control "
                value={formik.values.plot_cost_total || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Total.."
                disabled
              />

              {formik.errors.plot_cost_total &&
              formik.touched.plot_cost_total ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.plot_cost_total}
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
                id="gst_amount"
                type="text"
                name="gst_amount"
                className="form-control "
                value={formik.values.gst_amount || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter gst amount..."
                disabled
              />

              {formik.errors.gst_amount && formik.touched.gst_amount ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.gst_amount}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                Total
              </label>
              <input
                id="association_cost_total"
                type="text"
                name="association_cost_total"
                className="form-control "
                value={formik.values.association_cost_total || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Total.."
                disabled
              />

              {formik.errors.association_cost_total &&
              formik.touched.association_cost_total ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.association_cost_total}
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
                id="registration_total"
                type="text"
                name="registration_total"
                className="form-control "
                value={formik.values.registration_total || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Total.."
                disabled
              />

              {formik.errors.registration_total &&
              formik.touched.registration_total ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.registration_total}
                </p>
              ) : null}
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-start">
            <h6>
              {" "}
              <b> Total Plot Cost </b>{" "}
            </h6>
          </div>
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                Without Registration
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
                With Registration
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

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={editDialog}
        style={{ width: "55rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Update Plot  Details"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="surveyno" className="form-label">
                {" "}
                Phase No
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="phase_no"
                type="text"
                name="phase_no"
                className="form-control"
                value={formik.values.phase_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Phase No"
              />

              {formik.errors.phase_no && formik.touched.phase_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.phase_no}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="subdivision" className="form-label">
                Plot No <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="plot_no"
                type="text"
                name="plot_no"
                className="form-control"
                placeholder="Enter Plot No"
                value={formik.values.plot_no}
                onChange={formik.handleChange}
              />
              {formik.errors.plot_no && formik.touched.plot_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.plot_no}
                </p>
              ) : null}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="extent" className="form-label">
                {" "}
                Survey No
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="survey_no"
                type="text"
                name="survey_no"
                className="form-control"
                value={formik.values.survey_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Survey No.,"
              />

              {formik.errors.survey_no && formik.touched.survey_no ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.survey_no}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="extent" className="form-label">
                {" "}
                Extent in Sq.Ft.,
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="extent_sqft"
                type="text"
                name="extent_sqft"
                className="form-control"
                value={formik.values.extent_sqft}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Extent in Sq.Ft.,"
              />

              {formik.errors.extent_sqft && formik.touched.extent_sqft ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.extent_sqft}
                </p>
              ) : null}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="direction" className="form-label">
                Facing Direction <span style={{ color: "red" }}>*</span>
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
              formik.touched.facing_direction ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.facing_direction}
                </p>
              ) : null}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="remark" className="form-label">
                {" "}
                Road Width
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="road_width"
                type="text"
                name="road_width"
                className="form-control "
                value={formik.values.road_width}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter road width"
              />

              {formik.errors.road_width && formik.touched.road_width ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.road_width}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="remark" className="form-label">
                Plot Type
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="road_width"
                type="text"
                name="road_width"
                className="form-control "
                value={formik.values.road_width}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter road width"
              />

              {formik.errors.road_width && formik.touched.road_width ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.road_width}
                </p>
              ) : null}
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-start">
            <h6>Dimension</h6>
          </div>
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="north" className="form-label">
                {" "}
                North
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="north"
                type="text"
                name="dimension_north"
                className="form-control"
                value={formik.values.dimension_north || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter dimension north"
              />
              {formik.touched.dimension_north &&
                formik.errors.dimension_north && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.dimension_north}
                  </p>
                )}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                South
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="south"
                type="text"
                name="dimension_south"
                className="form-control"
                value={formik.values.dimension_south || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter dimension south"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                East
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="dimension_east"
                type="text"
                name="dimension_east"
                className="form-control "
                value={formik.values.dimension_east || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter dimension East"
              />

              {formik.errors.dimension_east && formik.touched.dimension_east ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dimension_east}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                West
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="days"
                type="text"
                name="dimension_west"
                className="form-control "
                value={formik.values.dimension_west || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter dimenstion west"
              />

              {formik.errors.dimension_west && formik.touched.dimension_west ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dimension_west}
                </p>
              ) : null}
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-start">
            <h6>Boundary</h6>
          </div>
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                North
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="days"
                type="text"
                name="boundry_north"
                className="form-control "
                value={formik.values.boundry_north || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter boundary north"
              />

              {formik.errors.boundry_north && formik.touched.boundry_north ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.boundry_north}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                South
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="days"
                type="text"
                name="boundry_south"
                className="form-control "
                value={formik.values.boundry_south || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter boundary south"
              />

              {formik.errors.boundry_south && formik.touched.boundry_south ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.boundry_south}
                </p>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                East
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="days"
                type="text"
                name="boundry_east"
                className="form-control "
                value={formik.values.boundry_east || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter boundary East"
              />
              {formik.errors.boundry_east && formik.touched.boundry_east ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.boundry_east}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                West
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="boundry_west"
                type="text"
                name="boundry_west"
                className="form-control "
                value={formik.values.boundry_west || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter boundary west"
              />

              {formik.errors.boundry_west && formik.touched.boundry_west ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.boundry_west}
                </p>
              ) : null}
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                Others
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="others"
                type="text"
                name="others"
                className="form-control "
                value={formik.values.others || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Others"
              />
              {formik.errors.others && formik.touched.others ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.others}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                Verification Status
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="verification_status"
                type="text"
                name="verification_status"
                className="form-control "
                value={formik.values.verification_status || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Verification Status"
              />
              {formik.errors.verification_status &&
              formik.touched.verification_status ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.verification_status}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                Dispute
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="dispute"
                type="text"
                name="dispute"
                className="form-control "
                value={formik.values.dispute || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Dispute"
              />
              {formik.errors.dispute && formik.touched.dispute ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.dispute}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="period" className="form-label">
                {" "}
                Next Followup Date
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="next_followup_date"
                type="date"
                name="next_followup_date"
                className="form-control "
                value={formik.values.next_followup_date || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.next_followup_date &&
              formik.touched.next_followup_date ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.next_followup_date}
                </p>
              ) : null}
            </div>
            <div className="form-group mt-2 col-6">
              <label htmlFor="remark" className="form-label">
                {" "}
                Remark
                <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="remarks"
                type="text"
                name="remarks"
                className="form-control "
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Remark"
              />

              {formik.errors.remarks && formik.touched.remarks ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.remarks}
                </p>
              ) : null}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
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
