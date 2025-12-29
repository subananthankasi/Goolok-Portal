import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  ExcelExport,
  PdfExport,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Spinner from "react-bootstrap/Spinner";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useDispatch } from "react-redux";
import { projectVerifyThunk } from "../../../Redux/Actions/ProjectThunk/ProjectThunk";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "../../../Utils/Toast";
import { projectStatusThunk } from "../../../Redux/Actions/ProjectThunk/ProjectStatusThunk";
import { encryptData } from "../../../Utils/encrypt";
import { ThreeDots } from "react-loader-spinner";


const VerifyProperty = () => {
  const { eid, id, status } = useParams();

  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [enqId, setEnqId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
  let gridInstance;

  function toolbarClick(args) {
    switch (args.item.id) {
      case "DefaultExport_pdfexport":
        gridInstance.pdfExport();
        break;
      case "DefaultExport_excelexport":
        gridInstance.excelExport();
        break;
      case "DefaultExport_csvexport":
        gridInstance.csvExport();
        break;
      default:
        break;
    }
  }


  const onSubmit = async (values) => {
    setLoading(true)
    const payload = {
      ...values,
      id: enqId.id,
      shortform: enqId.shortform,
    };
    try {
      await axios.post(`${API_BASE_URL}/enquiryreport/status`, payload);
      fetchData();
      setLoading(false)
      setTimeout(() => {
        dispatch(projectStatusThunk());
      }, 2000);
      setVisible(false);
      Toast({ message: "Succefully Updated", type: "success" });
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      remark: "",
      amount: "",
    },
    validationSchema: yup.object().shape({
      status: yup.string().required("status  is required!!"),
      remark: yup.string().required("remark is required!!"),
      // amount: yup.string().required("blocking amount is required!!"),
      amount: yup
        .string()
        .test(
          "required-if-live",
          "Blocking amount is required!!",
          function (value) {
            if (this.parent.status === "live") {
              return !!value;
            }
            return true;
          }
        )
        .test(
          "numbers-only-if-live",
          "Only numbers are allowed",
          function (value) {
            if (this.parent.status === "live") {
              return /^[0-9]+$/.test(value || "");
            }
            return true;
          }
        ),
    }),
    onSubmit,
  });

  function gridUrlTemplate(props) {

    return (
      <Link
        to={`/view_details/${encryptData(props.id)}/${encryptData(
          props.subpro_name
        )}/${encryptData(props.property_type)}`}
        className="btn btn_pdf light btn-warning text-dark"
      >
        {props.property_id}
      </Link>
    );
  }

  const renderStatusButton = (props) => {
    return (
      <button
        className="btn btn_pdf btn-outline-danger"
        data-tooltip-id="status"
        onClick={() => {
          setVisible(true);
          setEnqId(props);
        }}
      >
        <KeyboardDoubleArrowRightIcon /> Pending
      </button>
    );
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enquiryreport/new`, {
        headers: {
          "Gl-Status": "pending",
          Level: "sale",
        },
      });
      SetData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const finalData = data?.map((item, index) => {
    return {
      ...item,
      sno: (index + 1).toString(),
    };
  });

  const ProjectID = gridUrlTemplate;
  const statusPopup = renderStatusButton;

  const [visible, setVisible] = useState(false);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            {loading ? (
              <div
                style={{
                  height: "32vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spinner className="mt-auto" />
              </div>
            ) : (
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="page_heading">Verify Property</h4>
                    <div className="col-lg-12  mb-4 mt-4">
                      <GridComponent
                        id="DefaultExport"
                        dataSource={data}
                        allowTextWrap={true}
                        ref={(grid) => (gridInstance = grid)}
                        toolbar={toolbarOptions}
                        allowExcelExport={true}
                        allowPdfExport={true}
                        allowSorting={true}
                        allowFiltering={true}
                        filterSettings={filterSettings}
                        toolbarClick={toolbarClick.bind(this)}
                        height="350"
                      >
                        <ColumnsDirective>
                          <ColumnDirective
                            field="sno"
                            headerText="S.no"
                            width="150"
                            template={(props) =>
                              data.findIndex((d) => d.id === props.id) + 1
                            }
                          />
                          <ColumnDirective
                            field="property_id"
                            headerText="Project ID"
                            width="150"
                            template={ProjectID}
                          />
                          <ColumnDirective
                            field="created_at"
                            headerText="Date"
                            width="150"
                          />

                          <ColumnDirective
                            field="customer"
                            headerText="Property Owner"
                            width="150"
                          />
                          <ColumnDirective
                            field="property_type"
                            headerText="Property Type"
                            width="150"
                          />
                          <ColumnDirective
                            field="subpro_name"
                            headerText="Sub Property Type"
                            width="150"
                          />
                          <ColumnDirective
                            field="mobile"
                            headerText="Mobile"
                            width="150"
                          />
                          <ColumnDirective
                            headerText="Status"
                            width="150"
                            template={statusPopup}
                          />
                        </ColumnsDirective>
                        <Inject
                          services={[
                            Toolbar,
                            ExcelExport,
                            PdfExport,
                            Sort,
                            Filter,
                          ]}
                        />
                      </GridComponent>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Dialog
        header="Verify Confirmation"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => {
          setVisible(false);
          formik.resetForm();
        }}
      >
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <div>
            <p style={{ fontWeight: "600" }}>
              <ErrorOutlineIcon sx={{ fontSize: 25 }} /> Please fill below
              fields before submiting
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="taken" className="form-label">
              Select Status :
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value=""> Select status </option>
              <option value="live"> Live </option>
              <option value="closed"> Closed </option>
              <option value="cancel"> Cancel </option>
            </select>
            {formik.errors.status && formik.touched.status ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.status}
              </p>
            ) : null}
          </div>
          {formik.values.status === "live" && (
            <div className="form-group mt-1">
              <label htmlFor="remark" className="form-label">
                Blocking Amount :
              </label>
              <input
                name="amount"
                id="amount"
                className="form-control"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter amounts...."
              />
              {formik.errors.amount && formik.touched.amount ? (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.amount}
                </p>
              ) : null}
            </div>
          )}
          <div className="form-group mt-1">
            <label htmlFor="remark" className="form-label">
              Remark :
            </label>
            <textarea
              name="remark"
              id="remark"
              className="form-control"
              value={formik.values.remark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter remarks...."
            ></textarea>
            {formik.errors.remark && formik.touched.remark ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.remark}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-end mt-3 gap-3">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setVisible(false);
                formik.resetForm();
              }}

            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="12"
                  width="60"
                  color="#ffffff"
                  radius="18"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                  wrapperClass=""
                />
              ) : (
                "SUbmit"
              )}

            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default VerifyProperty;
