import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  ExcelExport,
  PdfExport,
  Sort,
  Page,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Toast from "../../../Utils/Toast";
import { encryptData } from "../../../Utils/encrypt";
import { Skeleton } from "primereact/skeleton";

const BookingTele = () => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [completeData, setCompleteData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [cancelRow, setCancelRow] = useState();
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/telebooking`
      ,{
          headers: {
            ...(staffid.Login === "admin" && { "Gl-Status": "admin" }),
          },
      });

      setCompleteData(
        response.data?.map((data, index) => ({
          ...data,
          sno: index + 1,
        }))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const data = useSelector((state) => state.completeContentData?.data?.[0]);

  useEffect(() => {
    if (data && typeof data === "object") {
      const updateData = [
        {
          ...data,
          sno: 1,
        },
      ];
      setCompleteData(updateData);
    } else {
      console.error("dataWaiting is not an object");
    }
  }, [data]);

  function handleVacant(props) {
    const buttonStyle = {
      backgroundColor: "#df3f4f",
      color: "white",
      border: "none",
      borderRadius: "3px",
      padding: "6px 16px",
      fontSize: "14px",
      fontWeight: "500",
      minWidth: "100px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    };

    const handleClick = (props) => {
      setVisible(true);
      setCancelRow(props);
    };
    return (
      <button onClick={() => handleClick(props)} style={buttonStyle}>
        Cancel
      </button>
    );
  }

  function bokkingId(props) {
    return (
      <Link
        to={`/telecalling_booking/${encryptData(props.enqid)}/${encryptData(props.id)}/${encryptData(props.status)}`}
        className="btn btn_pdf light btn-warning text-dark"
      >
        {props.booking_id}
      </Link>
    );
  }
  function StatusPopup(props) {
    return (
      <button className="btn highlight_button  light btn-success text-success">
        {props.status}
      </button>
    );
  }

  const handleCancelBooking = async () => {
    const payload = {
      vacantId: cancelRow.block_id,
      id: cancelRow.id,
    };
    try {
      await axios.post(`${API_BASE_URL}/cancelbooking`, payload);
      fetchData();
      setVisible(false);
      Toast({ message: "Succefully Move To vacant", type: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="section1">
        <div className=" container">
          <div className="row">
            <div className="col-12">
              <div className="card-body p-1">
                <h4 className="page_heading">Booking Reports</h4>
                {loading ? (
                  <div className="col-lg-12 mb-4 mt-4">
                    <Skeleton height="27rem" width="100%" className="mb-1 " />
                  </div>
                ) : (
                  <div className="col-lg-12 mb-4 mt-4">
                    <GridComponent
                      id="DefaultExport"
                      dataSource={completeData}
                      allowTextWrap={true}
                      ref={(grid) => (gridInstance = grid)}
                      toolbar={toolbarOptions}
                      allowExcelExport={true}
                      allowPdfExport={true}
                      allowSorting={true}
                      allowFiltering={true}
                      allowPaging={true}
                      filterSettings={filterSettings}
                      toolbarClick={toolbarClick.bind(this)}
                      height="350"
                    >
                      <ColumnsDirective>
                        <ColumnDirective
                          field="sno"
                          headerText="S.no"
                          textAlign="Center"
                          width="130"
                        />
                        <ColumnDirective
                          headerText="Booking No"
                          width="150"
                          textAlign="Center"
                          field="booking_id"
                          template={bokkingId}
                        />
                        <ColumnDirective
                          headerText="Cleared Date"
                          width="170"
                          field="cleared_date"
                        />
                        <ColumnDirective
                          headerText="Age"
                          width="150"
                          field="age"
                        />
                        <ColumnDirective
                          headerText="Property Title"
                          width="170"
                          field="propertyName"
                        />

                        <ColumnDirective
                          field="property_type"
                          headerText="Category "
                          width="170"
                        />
                        <ColumnDirective
                          headerText="Sub Category"
                          width="180"
                          field="subpro_name"
                        />
                        <ColumnDirective
                          headerText="Advance Amount"
                          width="180"
                          field="advance"
                        />
                        <ColumnDirective
                          headerText="Blocking Amount"
                          width="180"
                          field="blocking_amount"
                        />
                        <ColumnDirective
                          headerText="Pay Mode"
                          width="180"
                          field="pay_mode"
                        />
                        <ColumnDirective
                          headerText="Status "
                          width="180"
                          field="status"
                          template={StatusPopup}
                        />
                        {staffid.Login !=="admin" && (
                        <ColumnDirective
                          headerText="Move To Cancel"
                          width="150"
                          template={handleVacant}
                        />
                        )}
                      </ColumnsDirective>
                      <Inject
                        services={[
                          Toolbar,
                          ExcelExport,
                          PdfExport,
                          Sort,
                          Filter,
                          Page,
                        ]}
                      />
                    </GridComponent>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        header=" Confirmation"
        visible={visible}
        style={{ width: "34vw" }}
        onHide={() => {
          setVisible(false);
        }}
      >
        <div>
          <div className="confirmation-content">
            <ErrorOutlineIcon sx={{ fontSize: 24 }} />
            <span style={{ marginLeft: "10px" }}>
              Are you sure you want to cancel this booking..?
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3 gap-3">
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => handleCancelBooking()}
          >
            Yes
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default BookingTele;
