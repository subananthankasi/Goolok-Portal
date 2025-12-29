import React, { useEffect, useRef, useState } from "react";
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
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../../../Utils/encrypt";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import logo from "../../../Assets/images/Goolok Final Logo.png"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ClosedProperty from "../../../Utils/ClosedProperty";
import { ButtonGroup, Button, Whisper, Popover, Dropdown, IconButton } from 'rsuite';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import InvoiceDownload from "../Reusable/InvoiceDownload";


function PendingDocument() {


  const [loading, setLoading] = useState(true);
  const options = ['Progress', 'Closed'];
  const [invoiceData, setInvoiceData] = useState([])
  const [data, setData] = useState([])

  const contentRef = useRef();





  const fetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoice`, {
        headers: {
          "Gl-status": 'pending',
          "Pr-Root": "land",
        }
      });
      const data = response?.data?.map((item, index) => ({
        ...item, sno: index + 1
      }))
      setData(data)
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
    }
  }

  const link = linkui;

  function linkui(props) {
    return (
      <>
        <span className={`btn btn-info`} style={{ fontSize: "17px", fontWeight: "500" }}>Send</span>
      </>
    );
  }

  const navigate = useNavigate();


  const handleRowSelect = (args) => {
    const rowData = args.data;
    navigate(`/invoice_report/${encryptData(rowData.enqid)}/${encryptData(rowData.status)}`);
  };


  const downloadPdf = async (props) => {

    try {
      const response = await axios.get(`${API_BASE_URL}/invoice/${props.enqid}`, {
        headers: {
          "Gl-status": props.status,
        },
      });

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
      const chargesTotal = item.amount

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
  const [visible, setVisible] = useState(false)
  const [rowId, setRowId] = useState(null)
  const handleDelete = (id) => {

    setVisible(true)
    setRowId(id)
  }
  return (
    <>

      <ClosedProperty
        visible={visible}
        onHide={() => { setVisible(false); setAction(0) }}
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
                                className={`badge rounded-pill btnhover btn1 badge1 p-2 ${props.status === "success" ? "bg-success" : "bg-danger"
                                  }`}
                                style={{ width: "60px" }}
                              >
                                {props.status}
                              </button>
                            )}
                          />
                          <ColumnDirective
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
                          />
                          {/* <ColumnDirective
                            headerText="Status"
                            width="150"
                            template={(props) => (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDelete(props.enqid);
                                }}
                                style={{
                                  backgroundColor: "blue",
                                  color: "white",
                                  border: "none",
                                  padding: "5px 10px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                progress
                              </button>

                            )}
                          /> */}
                          <ColumnDirective
                            headerText="Status"
                            width="170"
                            template={(props) => (
                              <div >
                                <ButtonGroup>
                                  <Button appearance="primary" color="green" onClick={(e) => e.stopPropagation()}>
                                    {options[action]}
                                  </Button>
                                  <Whisper
                                    placement="bottomEnd"
                                    trigger="click"
                                    speaker={({ onClose, left, top, className }, ref) => {
                                      const handleSelect = (eventKey) => {
                                        setAction(eventKey);
                                        if (eventKey === 1) {
                                          handleDelete(props.enqid);
                                        }
                                        onClose();
                                      };
                                      return (
                                        <Popover ref={ref} className={className} style={{ left, top }} full>
                                          <Dropdown.Menu onSelect={(event, eventKey) => handleSelect(event, eventKey)}>
                                            {options.map((item, index) => (
                                              <Dropdown.Item key={index} eventKey={index}>
                                                {item}
                                              </Dropdown.Item>
                                            ))}
                                          </Dropdown.Menu>
                                        </Popover>
                                      );
                                    }}
                                  >
                                    <IconButton appearance="primary" color="green" onClick={(event) => event.stopPropagation()} icon={<ArrowDownIcon />} />
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
      {/* <article className="p-5" ref={contentRef} style={{ background: "#fff", display: "none" }} >
        <h1 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h1>
        <hr />
        <div className="d-flex justify-content-between ">
          <div className="mt-5 mb-5">
            <img src={logo} alt="goolok" style={{ width: "150px", height: "50px" }} />
            <nav className="header--logo mt-3">
              <div className="header--logo-text">Goolok Pvt ltd</div>
              <div className="logo--address">
                2nd Floor, 129, <br />
                <strong>Nungambakkam, Chennai, </strong>
                <br />
                <strong>Tamil Nadu 600034</strong>
              </div>
            </nav>
          </div>
          {invoiceData?.map((item) => {
            return (
              <div className="mt-5 mb-5">
                <p className="p-0 m-0"><b>Invoice no : </b> {item.invoice_id}  </p>
                <p className="p-0 m-0"><b> Name: </b> {item.customer}  </p>
                <p className="p-0 m-0"><b> Date:</b> {item.invoice_date} </p>
                <p className="p-0 m-0"><b>  Email:</b>{item.email_id} </p>
                <p className="p-0 m-0"><b>  Mobile:</b>{item.mobile} </p>

              </div>
            )
          })}

        </div>
        <section className="line-items  ">
          <table className="items--table w-100 mt-5 p-2 table-bordered">
            <thead className="p-2">
              <tr className="p-3">
                <th className="p-2 text-center">S.NO</th>
                <th className='text-center'>Qty</th>
                <th className='text-center'>Description</th>
                <th className='text-center'>Advance Payment</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.map((item, index) => (
                <>
                  <tr className="p-3">
                    <td className="p-2 text-center"> 1</td>
                    <td className='text-center'>1</td>
                    <td className='text-center'>Advance payment</td>
                    <td className='text-center'>₹ {item.amount} </td>
                  </tr>
                </>
              ))}

            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" className='text-end p-2'>Sub Total</td>
                <td colSpan="2" className='text-center'>{calculateTotals().subtotal} </td>
              </tr>
              <tr>
                <td colspan="3" className='text-end p-2'> GST(0%)</td>
                <td colSpan="2" className='text-center'>0.00 </td>
              </tr>
              <tr>
                <td colspan="3" className='text-end p-2' style={{ fontWeight: "600" }}>Total</td>
                <td colSpan="2" className='text-center' style={{ fontWeight: "600" }}>{calculateTotals().total} </td>
              </tr>

            </tfoot>
          </table>
          <div className="mt-5 mb-5 w-50">
            <h6 className="fw-bold">Terms & Conditions</h6>
            <p>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
          </div>
          <div className="mt-5">
            <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
          </div>
        </section>

      </article> */}
       <InvoiceDownload
              ref={contentRef}
              invoiceData={invoiceData}
              calculateTotals={calculateTotals}
            />
    </>
  );
}

export default PendingDocument;


