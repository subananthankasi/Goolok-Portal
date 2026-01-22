import DataTable from "react-data-table-component";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API_BASE_URL from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";
import InvoiceDownload from "../../../Enquiry/Reusable/InvoiceDownload";
// import API_BASE_URL from "../../../../../Api/api";
// import customStyle from "../../../../../Utils/tableStyle";
// import InvoiceDownload from "../../../Reusable/InvoiceDownload";

export const InvoiceApart = ({ id, status }) => {
  const contentRef = useRef();
  const downloadPdf = () => {
    const input = contentRef.current;

    input.style.display = "block";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
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

      <InvoiceDownload
        ref={contentRef}
        invoiceData={invoiceData}
        calculateTotals={calculateTotals}
      />
    </>
  );
};
