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

export const OtherProjectDetailsOwnerCom = ({
  eid,
  id,
  status,
  pagetype,
  subtype,
}) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));

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
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
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
      shop_no: "",
      floor_no: "",
      uds_sqft: "",
      carpet_area_sqft: "",
      common_area_sqft: "",
      builtup_area_sqft: "",
      balcony: "",
      facing_direction: "",
      covered_car_parking: "",
      underground_car_parking: "",
      open_car_parking: "",
      ownersettlementcost: "",
      rate_sqft: "",
    },

    validationSchema: yup.object().shape({
      block_no:
        subtype === "Complex"
          ? yup.string().required("Block No is required !!")
          : yup.string().notRequired(),
      shop_no: yup.string().required("Shop No is required!"),
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

      balcony: yup
        .number()
        .typeError("Balcony area must be numeric")
        .min(0)
        .required("Balcony area is required!"),

      facing_direction: yup.string().required("Facing direction is required!"),
      ownersettlementcost: yup
        .string()
        .required("ownersettlementcost is required!"),
      rate_sqft: yup.string().required("rate_sqft is required!"),

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
    formik.setFieldValue("shop_no", data.shop_no || "");
    formik.setFieldValue("floor_no", data.floor_no || "");
    formik.setFieldValue("uds_sqft", data.uds_sqft || "");
    formik.setFieldValue("carpet_area_sqft", data.carpet_area_sqft || "");
    formik.setFieldValue("common_area_sqft", data.common_area_sqft || "");
    formik.setFieldValue("builtup_area_sqft", data.builtup_area_sqft || "");
    formik.setFieldValue("balcony", data.balcony || "");
    formik.setFieldValue("facing_direction", data.facing_direction || "");
    formik.setFieldValue("covered_car_parking", data.covered_car_parking || "");
    formik.setFieldValue(
      "underground_car_parking",
      data.underground_car_parking || ""
    );
    formik.setFieldValue("open_car_parking", data.open_car_parking || "");
    formik.setFieldValue("rate_sqft", data.rate_sqft || "");
    formik.setFieldValue("ownersettlementcost", data.ownersettlementcost || "");
  };

  const heightMap = {
    1: 140,
    2: 190,
    3: 240,
    4: 290,
    5: 340,
  };


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
                {subtype === "Complex" && (
                  <Column width={130} align="center">
                    <HeaderCell>Block No.</HeaderCell>
                    <Cell dataKey="block_no" />
                  </Column>
                )}
                <Column width={130} align="center">
                  <HeaderCell>Shop No.</HeaderCell>
                  <Cell dataKey="shop_no" />
                </Column>
                <Column width={130} align="center">
                  <HeaderCell>Floor No.</HeaderCell>
                  <Cell dataKey="floor_no" />
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
                <Column width={130} align="center">
                  <HeaderCell>Rate per Sq.ft.,</HeaderCell>
                  <Cell dataKey="rate_sqft" />
                </Column>
                <Column width={170} align="center">
                  <HeaderCell>Owner Settlement Cost</HeaderCell>
                  <Cell dataKey="ownersettlementcost" />
                </Column>

                {staffid.Login === "staff" &&
                  (status === "pending" || status === "complete") &&
                  pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
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
            {subtype === "Complex" && (
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
            )}

            <div className="form-group mt-2 col-6">
              <label htmlFor="shop_no" className="form-label">
                Shop No<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="shop_no"
                type="text"
                name="shop_no"
                className="form-control"
                value={formik.values.shop_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Shop No"
              />
              {formik.errors.shop_no && formik.touched.shop_no && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.shop_no}
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

            <div className="form-group mt-2 mb-3 col-6">
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
            <hr />
            <div className="row">
              <div className="form-group mt-2 col-6">
                <label htmlFor="remark" className="form-label">
                  {" "}
                  Rate per Sq.ft.,
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="remarks"
                  type="text"
                  name="rate_sqft"
                  className="form-control "
                  value={formik.values.rate_sqft}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Rate per Sq.ft.,"
                />

                {formik.errors.rate_sqft && formik.touched.rate_sqft ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.rate_sqft}
                  </p>
                ) : null}
              </div>
              <div className="form-group mt-2 col-6">
                <label htmlFor="remark" className="form-label">
                  {" "}
                  Owner Settlement Cost
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="remarks"
                  type="text"
                  name="ownersettlementcost"
                  className="form-control "
                  value={formik.values.ownersettlementcost}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter Owner Settlement Cost"
                />

                {formik.errors.ownersettlementcost &&
                  formik.touched.ownersettlementcost ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.ownersettlementcost}
                  </p>
                ) : null}
              </div>
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
