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

export const ProjectDetailsPricingAP = ({
  eid,
  id,
  status,
  pagetype,
  subtype,
}) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [newDialog, setNewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [getData, setGetData] = useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = getData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const onSubmit = async (values) => {
    const updateData = {
      details: values,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/shopunitcreate`,
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
      const response = await axios.get(`${API_BASE_URL}/viewshopunit/${eid}`);
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

  const formik = useFormik({
    initialValues: {
      enqid: eid,
      block_no: "",
      flat_no: "",
      floor_no: "",
      uds_sqft: "",
      no_bhk: "",
      builtup_area_sqft: "",
      facing_direction: "",
      //pricing
      basic_cost: "",
      car_parking_cost: "",
      amenities_cost: "",
      total_without_reg: "",
      corpus_amount: "",
      maintenance_amount: "",
      misc_charges: "",
      gst: "",
      assoc_total: "",
      registration_charges: "",
      documentation_charges: "",
      other_cost_total: "",
      total_without_registration: "",
      total_with_registration: "",
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

      builtup_area_sqft: yup
        .number()
        .typeError("Built‑up area must be numeric")
        .positive()
        .required("Built‑up area is required!"),

      facing_direction: yup.string().required("Facing direction is required!"),

      basic_cost: yup
        .number()
        .typeError("Basic cost must be a number")
        .positive("Basic cost must be positive")
        .required("Basic cost is required"),

      car_parking_cost: yup
        .number()
        .typeError("Car parking cost must be a number")
        .positive("Car parking cost must be positive")
        .required("Car parking cost is required"),

      amenities_cost: yup
        .number()
        .typeError("Amenities cost must be a number")
        .positive("Amenities cost must be positive")
        .required("Amenities cost is required"),

      total_without_reg: yup
        .number()
        .typeError("Total without registration must be a number")
        .positive("Total without registration must be positive")
        .required("Total without registration is required"),

      corpus_amount: yup
        .number()
        .typeError("Corpus amount must be a number")
        .positive("Corpus amount must be positive")
        .required("Corpus amount is required"),

      maintenance_amount: yup
        .number()
        .typeError("Maintenance amount must be a number")
        .positive("Maintenance amount must be positive")
        .required("Maintenance amount is required"),

      misc_charges: yup
        .number()
        .typeError("Miscellaneous charges must be a number")
        .positive("Miscellaneous charges must be positive")
        .required("Miscellaneous charges are required"),

      gst: yup
        .number()
        .typeError("GST must be a number")
        .positive("GST must be positive")
        .required("GST is required"),

      assoc_total: yup.number().required("Association total is required"),

      registration_charges: yup
        .number()
        .typeError("Registration charges must be a number")
        .positive("Registration charges must be positive")
        .required("Registration charges are required"),

      documentation_charges: yup
        .number()
        .typeError("Documentation charges must be a number")
        .positive("Documentation charges must be positive")
        .required("Documentation charges are required"),
      other_cost_total: yup
        .number()
        .required("Documentation charges are required"),

      total_without_registration: yup
        .number()
        .typeError("Total without registration must be a number")
        .positive("Total without registration must be positive")
        .required("Total without registration is required"),

      total_with_registration: yup
        .number()
        .typeError("Total with registration must be a number")
        .positive("Total with registration must be positive")
        .required("Total with registration is required"),
    }),

    onSubmit,
  });

  const handleDelete = (row) => {
    setDeleteDialog(true);
  };
  const DeleteRow = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteshopunit/${deleteId}`,
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
    formik.setFieldValue("id", data.id || null);
    formik.setFieldValue("block_no", data.block_no || "");
    formik.setFieldValue("flat_no", data.flat_no || "");
    formik.setFieldValue("floor_no", data.floor_no || "");
    formik.setFieldValue("uds_sqft", data.uds_sqft || "");
    formik.setFieldValue("no_bhk", data.no_bhk || "");
    formik.setFieldValue("builtup_area_sqft", data.builtup_area_sqft || "");
    formik.setFieldValue("facing_direction", data.facing_direction || "");
    formik.setFieldValue("basic_cost", data.basic_cost || "");
    formik.setFieldValue("car_parking_cost", data.car_parking_cost || "");
    formik.setFieldValue("amenities_cost", data.amenities_cost || "");
    formik.setFieldValue("total_without_reg", data.total_without_reg || "");
    formik.setFieldValue("corpus_amount", data.corpus_amount || "");
    formik.setFieldValue("maintenance_amount", data.maintenance_amount || "");
    formik.setFieldValue("misc_charges", data.misc_charges || "");
    formik.setFieldValue("gst", data.gst || "");
    formik.setFieldValue("assoc_total", data.assoc_total || "");
    formik.setFieldValue(
      "registration_charges",
      data.registration_charges || ""
    );
    formik.setFieldValue(
      "documentation_charges",
      data.documentation_charges || ""
    );
    formik.setFieldValue("other_cost_total", data.other_cost_total || "");
    formik.setFieldValue(
      "total_without_registration",
      data.total_without_registration || ""
    );
    formik.setFieldValue(
      "total_with_registration",
      data.total_with_registration || ""
    );
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
      parse(formik.values.car_parking_cost) +
      parse(formik.values.amenities_cost);

    formik.setFieldValue("total_without_reg", A_total.toFixed(2));

    const corpus = parse(formik.values.corpus_amount);
    const maintenance = parse(formik.values.maintenance_amount);
    const misc = parse(formik.values.misc_charges);

    const gstBase = corpus + maintenance + misc;
    const defaultGst = (gstBase * 0.18).toFixed(2);


    // if (!formik.values.gst_amount ) {
    formik.setFieldValue("gst", defaultGst);
    // }

    const gst = parse(formik.values.gst_amount);
    const b_total = corpus + maintenance + misc + gst;
    formik.setFieldValue("assoc_total", b_total.toFixed(2));

    const c_total =
      parse(formik.values.registration_charges) +
      parse(formik.values.documentation_charges);

    formik.setFieldValue("other_cost_total", c_total.toFixed(2));

    const totalplotcoset_AB =
      parse(formik.values.total_without_reg) + parse(formik.values.assoc_total);

    formik.setFieldValue(
      "total_without_registration",
      totalplotcoset_AB.toFixed(2)
    );
    const totalplotcoset_ABC =
      parse(formik.values.total_without_reg) +
      parse(formik.values.assoc_total) +
      parse(formik.values.other_cost_total);

    formik.setFieldValue(
      "total_with_registration",
      totalplotcoset_ABC.toFixed(2)
    );
  }, [
    formik.values.basic_cost,
    formik.values.car_parking_cost,
    formik.values.amenities_cost,
    formik.values.corpus_amount,
    formik.values.maintenance_amount,
    formik.values.misc_charges,
    formik.values.gst,
    formik.values.documentation_charges,
    formik.values.registration_charges,
    formik.values.other_cost_total,
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
                pagetype !== "reminder" && (
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
                  <HeaderCell>Block No.</HeaderCell>
                  <Cell dataKey="block_no" />
                </Column>

                <Column width={130} align="center">
                  <HeaderCell>Flat No.</HeaderCell>
                  <Cell dataKey="flat_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Floor No.</HeaderCell>
                  <Cell dataKey="floor_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>No. of BHK</HeaderCell>
                  <Cell dataKey="no_bhk" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>UDS in Sq.Ft.,</HeaderCell>
                  <Cell dataKey="uds_sqft" />
                </Column>
                <Column width={170} align="center">
                  <HeaderCell>Built-up Area in Sq.Ft.</HeaderCell>
                  <Cell dataKey="builtup_area_sqft" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Facing Direction</HeaderCell>
                  <Cell dataKey="facing_direction" />
                </Column>

                <ColumnGroup
                  header="Flat cost (Without Registration) A"
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
                    <HeaderCell>Car Parking Cost </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.car_parking_cost
                          ? `₹${rowData.car_parking_cost}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>Amenities cost </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.amenities_cost
                          ? `₹${rowData.amenities_cost}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={200}>
                    <HeaderCell>Total - Without Registration </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.total_without_reg
                          ? `₹${rowData.total_without_reg}`
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
                      {(rowData) =>
                        rowData.maintenance_amount
                          ? `₹${rowData.maintenance_amount}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={160}>
                    <HeaderCell>Miscellaneous charges </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.misc_charges ? `₹${rowData.misc_charges}` : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={130}>
                    <HeaderCell>GST(18%) </HeaderCell>
                    <Cell>
                      {(rowData) => (rowData.gst ? `₹${rowData.gst}` : "-")}
                    </Cell>
                  </Column>
                  <Column width={130}>
                    <HeaderCell>Total </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.assoc_total ? `₹${rowData.assoc_total}` : "-"
                      }
                    </Cell>
                  </Column>
                </ColumnGroup>

                <ColumnGroup
                  header="Registration & other cost  "
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={160} colSpan={2}>
                    <HeaderCell>Registration Charges</HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.registration_charges
                          ? `₹${rowData.registration_charges}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={170}>
                    <HeaderCell>Documentation charges </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.documentation_charges
                          ? `₹${rowData.documentation_charges}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                  <Column width={200}>
                    <HeaderCell>Total cost with Registration </HeaderCell>
                    <Cell>
                      {(rowData) =>
                        rowData.other_cost_total
                          ? `₹${rowData.other_cost_total}`
                          : "-"
                      }
                    </Cell>
                  </Column>
                </ColumnGroup>

                <ColumnGroup
                  header="Total Shop Cost "
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={160} colSpan={2}>
                    <HeaderCell>Without Registration</HeaderCell>
                    <Cell>
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
                    <Column width={100} fixed="right" align="center">
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
                          </div>
                        )}
                      </Cell>
                    </Column>
                  )}
              </Table>
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
                placeholder="Enter Flat No"
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
                type="text"
                name="floor_no"
                className="form-control"
                value={formik.values.floor_no}
                onChange={formik.handleChange}
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
              <label htmlFor="uds_sqft" className="form-label">
                No of BHK<span style={{ color: "red" }}>*</span>
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
            <h6>Flat cost (Without Registration) A</h6>
            <div className="form-group mt-2 col-6">
              <label htmlFor="basic_cost" className="form-label">
                Basic cost<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="basic_cost"
                type="number"
                name="basic_cost"
                className="form-control"
                value={formik.values.basic_cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter basic cost"
              />
              {formik.errors.basic_cost && formik.touched.basic_cost && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.basic_cost}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="car_parking_cost" className="form-label">
                Car Parking Cost<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="car_parking_cost"
                type="number"
                name="car_parking_cost"
                className="form-control"
                value={formik.values.car_parking_cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter car parking cost"
              />
              {formik.errors.car_parking_cost &&
                formik.touched.car_parking_cost && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.car_parking_cost}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="amenities_cost" className="form-label">
                Amenities Cost<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="amenities_cost"
                type="number"
                name="amenities_cost"
                className="form-control"
                value={formik.values.amenities_cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter amenities cost"
              />
              {formik.errors.amenities_cost &&
                formik.touched.amenities_cost && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.amenities_cost}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 mb-3 col-6">
              <label htmlFor="total_without_reg" className="form-label">
                Total Without Reg<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="total_without_reg"
                type="number"
                name="total_without_reg"
                className="form-control"
                value={formik.values.total_without_reg}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter total without registration"
                disabled
              />
              {formik.errors.total_without_reg &&
                formik.touched.total_without_reg && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_without_reg}
                  </p>
                )}
            </div>
            <hr />

            <h6>Development / Association Cost B</h6>
            <div className="form-group mt-2 col-6">
              <label htmlFor="corpus_amount" className="form-label">
                Corpus Amount<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="corpus_amount"
                type="number"
                name="corpus_amount"
                className="form-control"
                value={formik.values.corpus_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter corpus amount"
              />
              {formik.errors.corpus_amount && formik.touched.corpus_amount && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.corpus_amount}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="maintenance_amount" className="form-label">
                Maintenance Amount<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="maintenance_amount"
                type="number"
                name="maintenance_amount"
                className="form-control"
                value={formik.values.maintenance_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter maintenance amount"
              />
              {formik.errors.maintenance_amount &&
                formik.touched.maintenance_amount && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.maintenance_amount}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="misc_charges" className="form-label">
                Misc Charges<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="misc_charges"
                type="number"
                name="misc_charges"
                className="form-control"
                value={formik.values.misc_charges}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter miscellaneous charges"
              />
              {formik.errors.misc_charges && formik.touched.misc_charges && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.misc_charges}
                </p>
              )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="gst" className="form-label">
                GST(18%) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="gst"
                type="number"
                name="gst"
                className="form-control"
                value={formik.values.gst}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter GST amount"
              />
              {formik.errors.gst && formik.touched.gst && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.gst}
                </p>
              )}
            </div>

            <div className="form-group mt-2 mb-3 col-6">
              <label htmlFor="assoc_total" className="form-label">
                Total<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="assoc_total"
                type="number"
                name="assoc_total"
                className="form-control"
                value={formik.values.assoc_total}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter association total"
                disabled
              />
              {formik.errors.assoc_total && formik.touched.assoc_total && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.assoc_total}
                </p>
              )}
            </div>
            <hr />

            <h6>Registration & other cost C</h6>

            <div className="form-group mt-2 col-6">
              <label htmlFor="registration_charges" className="form-label">
                Registration Charges<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="registration_charges"
                type="number"
                name="registration_charges"
                className="form-control"
                value={formik.values.registration_charges}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter registration charges"
              />
              {formik.errors.registration_charges &&
                formik.touched.registration_charges && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.registration_charges}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 mb-3 col-6">
              <label htmlFor="documentation_charges" className="form-label">
                Documentation Charges<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="documentation_charges"
                type="number"
                name="documentation_charges"
                className="form-control"
                value={formik.values.documentation_charges}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter documentation charges"
              />
              {formik.errors.documentation_charges &&
                formik.touched.documentation_charges && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.documentation_charges}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 mb-3 col-6">
              <label htmlFor="other_cost_total" className="form-label">
                Total<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="other_cost_total"
                type="number"
                name="other_cost_total"
                className="form-control"
                value={formik.values.other_cost_total}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter other cost total"
                disabled
              />
              {formik.errors.other_cost_total &&
                formik.touched.other_cost_total && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.other_cost_total}
                  </p>
                )}
            </div>
            <hr />
            <h6>Total shop Cost </h6>
            <div className="form-group mt-2 col-6">
              <label
                htmlFor="total_without_registration"
                className="form-label"
              >
                Total Without Registration
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="total_without_registration"
                type="number"
                name="total_without_registration"
                className="form-control"
                value={formik.values.total_without_registration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter total without registration"
                disabled
              />
              {formik.errors.total_without_registration &&
                formik.touched.total_without_registration && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_without_registration}
                  </p>
                )}
            </div>

            <div className="form-group mt-2 col-6">
              <label htmlFor="total_with_registration" className="form-label">
                Total With Registration
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="total_with_registration"
                type="number"
                name="total_with_registration"
                className="form-control"
                value={formik.values.total_with_registration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter total with registration"
                disabled
              />
              {formik.errors.total_with_registration &&
                formik.touched.total_with_registration && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.total_with_registration}
                  </p>
                )}
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
