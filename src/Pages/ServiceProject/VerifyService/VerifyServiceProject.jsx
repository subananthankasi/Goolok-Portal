import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import {
  projectServiceVerifyThunk,
} from "../../../Redux/Actions/ProjectThunk/ProjectThunk";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "../../../Utils/Toast";
import {
  ServiceProjectStatusThunk,
} from "../../../Redux/Actions/ProjectThunk/ProjectStatusThunk";

const VerifyServiceProject = () => {
  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enqId, setEnqId] = useState("");
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/enquiryreport/new`, {
        headers: {
          "Gl-Status": "pending",
          Level: "service",
        },
      });
      SetData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

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
    }
  }

  const submitLoading = useSelector(
    (state) => state.projectVerifyService?.loading
  );

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      id: enqId,
    };

    try {
      await dispatch(projectServiceVerifyThunk(payload)).unwrap();
      await fetchData();
      setTimeout(() => {
        dispatch(ServiceProjectStatusThunk());
      }, 2000);
      formik.resetForm();
      setVisible(false);
      Toast({ message: "Successfully Updated", type: "success" });
    } catch (error) {
      console.error("Error in onSubmit:", error);
      Toast({ message: "Something went wrong!", type: "error" });
    }
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      remark: "",
    },
    validationSchema: yup.object().shape({
      status: yup.string().required("status  is required!!"),
      remark: yup.string().required("remark is required!!"),
    }),
    onSubmit,
  });

  function gridUrlTemplate(props) {
    return (
      <Link
        to={`/service_project_details/${props.id}/${props.userid}/${props.status}/${props.service_cat}`}
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
          setEnqId(props.id);
        }}
      >
        <KeyboardDoubleArrowRightIcon /> Pending
      </button>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);


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
                    <h4 className="page_heading"> Verify Service</h4>
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
                            field="subpro_name"
                            headerText="Property Type"
                            width="150"
                          />
                          <ColumnDirective
                            field="service_cat"
                            headerText="Service"
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
        closable={!submitLoading}
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
              <option value="live"> Completed </option>
              <option value="closed"> Closed </option>
            </select>
            {formik.errors.status && formik.touched.status ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.status}
              </p>
            ) : null}
          </div>
          <div className="form-group">
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
            {!submitLoading && (
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
            )}
            <Button variant="contained" type="submit" disabled={submitLoading}>
              {submitLoading ? "Processing..." : "Submit"}
            </Button>
          </div>

          {submitLoading && (
            <p
              className="text-center mt-3"
              style={{
                color: "green",
                fontSize: "13px",
                fontFamily: "poppins",
              }}
            >
              {" "}
              Please wait while processing...!
            </p>
          )}
        </form>
      </Dialog>
    </>
  );
};

export default VerifyServiceProject;
