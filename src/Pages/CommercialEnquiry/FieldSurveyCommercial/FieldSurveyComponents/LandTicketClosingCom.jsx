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
import { useSelector } from "react-redux";
const { Column, ColumnGroup, HeaderCell, Cell } = Table;

export const LandTicketClosingCom = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
   const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const [newDialog, setNewDialog] = useState(false); 
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [getData, setGetData] = useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

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

  const formik = useFormik({
    initialValues: {
      survey_no: "",
      phase_no: "",
      plot_no: "",
      extent_sqft: "",
      facing_direction: "",
      road_width: "",
      dimension_north: "",
      dimension_south: "",
      dimension_east: "",
      dimension_west: "",
      boundry_north: "",
      boundry_south: "",
      boundry_east: "",
      boundry_west: "",
      others: "",
      verification_status: "",
      dispute: "",
      next_followup_date: "",
      remarks: "",
      enqid: eid,
      id: null,
    },
    validationSchema: yup.object().shape({
      survey_no: yup.string().required("Survey No is required!"),
      phase_no: yup.string().required("Phase No is required!"),
      plot_no: yup.string().required("Plot No is required!"),
      extent_sqft: yup.string().required("Extent (sqft) is required!"),
      facing_direction: yup.string().required("Facing direction is required!"),
      road_width: yup.string().required("Road width is required!"),
      dimension_north: yup.string().required("North dimension is required!"),
      dimension_south: yup.string().required("South dimension is required!"),
      dimension_east: yup.string().required("East dimension is required!"),
      dimension_west: yup.string().required("West dimension is required!"),
      boundry_north: yup.string().required("North boundary is required!"),
      boundry_south: yup.string().required("South boundary is required!"),
      boundry_east: yup.string().required("East boundary is required!"),
      boundry_west: yup.string().required("West boundary is required!"),
      others: yup.string().required("Others field is required!"),
      verification_status: yup
        .string()
        .required("Verification status is required!"),
      dispute: yup.string().required("Dispute field is required!"),
      next_followup_date: yup
        .string()
        .required("Next follow-up date is required!"),
      remarks: yup.string().required("Remarks are required!"),
    }),

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
    formik.setFieldValue("dimension_north", data.dimension_north || "");
    formik.setFieldValue("dimension_south", data.dimension_south || "");
    formik.setFieldValue("dimension_east", data.dimension_east || "");
    formik.setFieldValue("dimension_west", data.dimension_west || "");
    formik.setFieldValue("boundry_north", data.boundary_north || "");
    formik.setFieldValue("boundry_south", data.boundary_south || "");
    formik.setFieldValue("boundry_east", data.boundary_east || "");
    formik.setFieldValue("boundry_west", data.boundary_west || "");
    formik.setFieldValue("others", data.other_sides || "");
    formik.setFieldValue("verification_status", data.verification_status || "");
    formik.setFieldValue("dispute", data.dispute || "");
    formik.setFieldValue("next_followup_date", data.next_followup_date || "");
    formik.setFieldValue("remarks", data.remarks || "");
    formik.setFieldValue("id", data.id || null);
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
              <h6 className="text-center">Ticket Closing Details</h6>
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
                <ColumnGroup
                  header="Dimension"
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={130} colSpan={2}>
                    <HeaderCell>North</HeaderCell>
                    <Cell dataKey="dimension_north" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell>South </HeaderCell>
                    <Cell dataKey="dimension_south" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell>East </HeaderCell>
                    <Cell dataKey="dimension_east" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell>West </HeaderCell>
                    <Cell dataKey="dimension_west" />
                  </Column>
                </ColumnGroup>
                <ColumnGroup
                  header="Boundary"
                  align="center"
                  style={{ fontSize: "26px" }}
                >
                  <Column width={130} colSpan={2}>
                    <HeaderCell>North</HeaderCell>
                    <Cell dataKey="boundary_north" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell>South </HeaderCell>
                    <Cell dataKey="boundary_south" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell>East </HeaderCell>
                    <Cell dataKey="boundary_east" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell>West </HeaderCell>
                    <Cell dataKey="boundary_west" />
                  </Column>
                </ColumnGroup>

                <Column width={200}>
                  <HeaderCell>Remarks</HeaderCell>
                  <Cell dataKey="remarks" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Other Sides </HeaderCell>
                  <Cell dataKey="other_sides" />
                </Column>
                <Column width={200}>
                  <HeaderCell>Verification status </HeaderCell>
                  <Cell dataKey="verification_status" />
                </Column>
                <Column width={200}>
                  <HeaderCell>Dispute </HeaderCell>
                  <Cell dataKey="dispute" />
                </Column>
                <Column width={200}>
                  <HeaderCell>Next followup date </HeaderCell>
                  <Cell dataKey="next_followup_date" />
                </Column>
                {staffid.Login === "staff" &&
                  (status === "pending" || status === "complete") &&
                  pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" &&(
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
