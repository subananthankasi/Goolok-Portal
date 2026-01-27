import { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import {
  ButtonGroup,
  Button,
  Whisper,
  Popover,
  Dropdown,
  IconButton,
} from "rsuite";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import API_BASE_URL from "../../../Api/api";
import { encryptData } from "../../../Utils/encrypt";
import ClosedProperty from "../../../Utils/ClosedProperty";
import InvoiceDownload from "../../Enquiry/Reusable/InvoiceDownload";

function PendingInvoicePlot() {
  const [loading, setLoading] = useState(true);
  const options = ["Progress", "Closed"];
  const [invoiceData, setInvoiceData] = useState([]);
  const [data, setData] = useState([]);

  const contentRef = useRef();

  const fetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoice`, {
        headers: {
          "Gl-status": "pending",
          "Pr-Root": "plot",
        },
      });
      const data = response?.data?.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

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


  const navigate = useNavigate();

  const handleRowSelect = (args) => {
    const rowData = args.data;
    navigate(
      `/plot_invoice/${encryptData(rowData.enqid)}/${encryptData(
        rowData.id
      )}/${encryptData(rowData.status)}`
    );
  };

  const downloadPdf = async (props) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/invoice/${props.enqid}`,
        {
          headers: {
            "Gl-status": props.status,
          },
        }
      );

      const data = response?.data?.map((item, index) => ({
        ...item,
        sno: index + 1,
      }));

      setInvoiceData(data);

      setTimeout(() => generatePdf(), 500);
    } catch (error) {
      console.error(error);
    }
  };

  const generatePdf = () => {
    const input = contentRef.current;
    if (!input) {
      console.error("contentRef is not available");
      return;
    }

    input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
      input.style.display = "none";
    });
  };
  const calculateTotals = () => {
    const subtotal = invoiceData?.reduce((acc, item) => {
      const chargesTotal = item.amount;

      return acc + (chargesTotal || 0);
    }, 0);

    const gst = subtotal * 0;
    // const total = subtotal + gst;
    const total = subtotal;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      subtotal: currencyFormatter.format(subtotal),
      gst: currencyFormatter.format(gst),
      total: currencyFormatter.format(total),
    };
  };

  const [action, setAction] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rowId, setRowId] = useState(null);
  const handleDelete = (id) => {
    setVisible(true);
    setRowId(id);
  };

  return (
    <>
      <ClosedProperty
        visible={visible}
        onHide={() => {
          setVisible(false);
          setAction(0);
        }}
        id={rowId}
        fetch={fetch}
      />
      <section className="section1">
        <div className=" ">
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
                <div className="">
                  <div className="card-body">
                    <h4 className="page_heading">Pending Invoice Report</h4>
                    <div className="col-lg-12 mb-4 mt-4">
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
                        allowPaging={true}
                        filterSettings={filterSettings}
                        toolbarClick={toolbarClick.bind(this)}
                        height="350"
                        rowSelected={handleRowSelect}
                      >
                        <ColumnsDirective>
                          <ColumnDirective
                            field="sno"
                            headerText="S.no"
                            width="150"
                          />
                          <ColumnDirective
                            headerText="Date"
                            width="150"
                            template={(props) => props.invoice_date}
                            field="invoice_date"
                          />
                          <ColumnDirective
                            field="customer"
                            headerText="Customer Name"
                            width="150"
                          />
                          <ColumnDirective
                            field="age"
                            headerText="Age"
                            width="150"
                            template={(props) => props.age}
                          />
                          <ColumnDirective
                            field="amount"
                            headerText="Amount"
                            width="150"
                          />
                          <ColumnDirective
                            field="status"
                            headerText="Status"
                            width="150"
                            template={(props) => (
                              <button
                                type="button"
                                className={`badge rounded-pill btnhover btn1 badge1 p-2 ${
                                  props.status === "success"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                                style={{ width: "60px" }}
                              >
                                {props.status}
                              </button>
                            )}
                          />
                          {/* <ColumnDirective
                            headerText="Download"
                            width="150"
                            template={(props) => (
                              <button
                                type="button"
                                className="btn btn-outline-primary delete"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  downloadPdf(props);
                                }}
                              >
                                <FileDownloadIcon />
                              </button>
                            )}
                          /> */}
                          <ColumnDirective
                            headerText="Status"
                            width="170"
                            template={(props) => (
                              <div>
                                <ButtonGroup>
                                  <Button
                                    appearance="primary"
                                    color="green"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {options[action]}
                                  </Button>
                                  <Whisper
                                    placement="bottomEnd"
                                    trigger="click"
                                    speaker={(
                                      { onClose, left, top, className },
                                      ref
                                    ) => {
                                      const handleSelect = (eventKey) => {
                                        setAction(eventKey);
                                        if (eventKey === 1) {
                                          handleDelete(props.enqid);
                                        }
                                        onClose();
                                      };
                                      return (
                                        <Popover
                                          ref={ref}
                                          className={className}
                                          style={{ left, top }}
                                          full
                                        >
                                          <Dropdown.Menu
                                            onSelect={(event, eventKey) =>
                                              handleSelect(event, eventKey)
                                            }
                                          >
                                            {options.map((item, index) => (
                                              <Dropdown.Item
                                                key={index}
                                                eventKey={index}
                                              >
                                                {item}
                                              </Dropdown.Item>
                                            ))}
                                          </Dropdown.Menu>
                                        </Popover>
                                      );
                                    }}
                                  >
                                    <IconButton
                                      appearance="primary"
                                      color="green"
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                      icon={<ArrowDownIcon />}
                                    />
                                  </Whisper>
                                </ButtonGroup>
                              </div>
                            )}
                          />
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
     
      <InvoiceDownload
        ref={contentRef}
        invoiceData={invoiceData}
        calculateTotals={calculateTotals}
      />
    </>
  );
}

export default PendingInvoicePlot;
