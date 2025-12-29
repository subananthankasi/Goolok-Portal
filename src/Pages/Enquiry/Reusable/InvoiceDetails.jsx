import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../Assets/images/Goolok Final Logo.png";
import InvoiceDownload from "./InvoiceDownload";

export const InvoiceDetails = ({ id, status }) => {
  const contentRef = useRef();

  const downloadPdf = () => {
    const input = contentRef.current;

    input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 209;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
    input.style.display = "none";
  };
  
  

  
  
  
  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Invoice Date",
      selector: (row) => row.invoice_date,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Download",
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-outline-primary delete"
            onClick={() => downloadPdf(row.id)}
          >
            <FileDownloadIcon />
          </button>
        </>
      ),
      sortable: true,
    },
    {
      name: "Payment status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 ${
              row.status == "success" ? "bg-success" : "bg-danger"
            }`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
    },
  ];

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

  const [loading, setLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/invoice/${id}`, {
          headers: {
            "Gl-status": status,
          },
        });
        const data = response?.data?.map((item, index) => ({
          ...item,
          sno: index + 1,
        }));
        setInvoiceData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetch();
  }, [status]);

  return (
    <>
      <div className="col-12 mt-4">
        {loading ? (
          " "
        ) : (
          <div className="card shadow border-0">
            <div className="card shadow border-0 p-4">
              <h6>Invoice & Payments</h6>
              <hr />

              <DataTable
                persistTableHead={true}
                columns={columns}
                data={invoiceData}
                customStyles={customStyle}
                pagination
                // selectableRows
                fixedHeader
              />
            </div>
          </div>
        )}
      </div>

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
};
