import React, { forwardRef } from "react";
import logo from "../../../Assets/images/Goolok Final Logo.png";
import "./InvoiceDownload.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const InvoiceDownload = forwardRef(
  ({ invoiceData, calculateTotals, page }, contentRef) => {
    const thStyle = {
      border: "1px solid #ccc",
      padding: "10px",
      textAlign: "center",
      fontWeight: "600",
    };


    return (

      <div
        ref={contentRef}
        style={{
          background: "#fff",
          display: "none",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#333",
          padding: "30px",
          //   border: "1px solid #ccc",
          borderRadius: "8px",
          width: "793px",
          minHeight: "1123px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* ===== HEADER ===== */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={logo}
              alt="Goolok"
              style={{
                width: "160px",
                height: "60px",
                marginBottom: "10px",
              }}
            />
          </div>

          <h1
            style={{
              fontWeight: "800",
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#222",
            }}
          >
            INVOICE
          </h1>
        </header>
        <div className="d-flex align-items-center">
          <div
            style={{
              flex: 1,
              backgroundColor: "#000",
              height: "2px",
              border: "none",
              margin: 0,
              color: "#000",
            }}
          />
          <h6
            style={{
              margin: 0,
              fontWeight: "700",
              fontSize: "16px",
              color: "#000000ff",
              marginLeft: "10px",
              whiteSpace: "nowrap",
            }}
          >
            GOOLOK.COM
          </h6>
        </div>

        {/* ===== CUSTOMER DETAILS ===== */}
        {invoiceData?.map((item) => (
          <section
            key={item.invoice_id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
            className="mt-5"
          >
            <div>
              <h6 style={{ fontWeight: "500" }}>Invoice to :</h6>
              <p
                style={{
                  margin: " 0",
                  fontWeight: "700",
                  fontSize: "22px",
                }}
              >
                {item.customer}
              </p>
              <p style={{ margin: "4px 0" }} className="roboto_left">
                {item.mobile}
              </p>
              <p style={{ margin: "4px 0" }} className="roboto_left">
                {item.email_id}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "2px 0" }}>
                <b>Invoice no :</b> {item.invoice_id}
              </p>
              <p style={{ margin: "2px 0" }}>
                <b>Date:</b> {item.invoice_date}
              </p>
              <p style={{ margin: "2px 0" }}>
                <b>Payment Mode:</b> Online
              </p>
              <p style={{ margin: "2px 0" }}>
                <b>PropertyName:</b> Chennai
              </p>
            </div>
          </section>
        ))}

        {/* ===== LINE ITEMS ===== */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "14px",
          }}
          className="table-striped mb-2"
        >
          <thead style={{ background: "#000000ff", color: "white" }}>
            <tr>
              <th style={thStyle}>NO</th>
              <th style={thStyle}>QTY</th>
              <th style={thStyle}>DESCRIPTION</th>
              <th style={thStyle}>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((item, index) => (
              <React.Fragment key={index}>
                <tr
                  style={{
                    background: index % 2 === 0 ? "#e7e6e6ff" : "white",
                  }}
                >
                  <td className="p-2 text-center"> 1</td>
                  <td className="text-center">1</td>
                  <td className="text-center">{page === "paymentlegal" ? item.particular : "Advance payment "} </td>
                  <td className="text-center">₹ {item.amount} </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* ===== SUMMARY SECTION ===== */}
        <section>
          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
            className="mb-5"
          >
            <div style={{ width: "300px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
                className="roboto_left mt-4 "
              >
                <span>Sub Total :</span>
                <span>₹{calculateTotals().subtotal}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
                className="roboto_left"
              >
                <span>GST 0% :</span>
                <span></span>
              </div>
              <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  fontWeight: "500",
                  backgroundColor: "black",
                  color: "white",
                }}
                className="p-1 "
              >
                <span>TOTAL AMOUNT:</span>
                <span>₹{calculateTotals().total}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
                className="roboto_left"
              >
                <span>Received Amount:</span>
                <span>₹{calculateTotals().subtotal}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "50px",
                }}
                className="roboto_left"
              >
                <span>Balance Amount:</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PAYMENT DETAILS ===== */}
        <div>
          <div
            className="d-flex justify-content-between"
            style={{ marginBottom: "140px" }}
          >
            <div>
              <h6 style={{ fontWeight: "700", marginBottom: "10px" }}>
                PAYMENT METHOD :
              </h6>
              <p style={{ margin: "2px 0" }}>
                <b> Bank Name :</b> State Bank of India
              </p>
              <p style={{ margin: "2px 0" }}>
                <b> Account Number :</b> 123-456-7890
              </p>
            </div>
            <div>
              <h6 style={{ fontWeight: "700", marginBottom: "10px" }}>
                Term and Conditions :
              </h6>
              <p style={{ margin: "2px 0" }}>
                Please send payment within 30 days <br /> of receiving this
                invoice.
              </p>
            </div>
          </div>
        </div>
        {/* ===== FOOTER ===== */}
        <section
          style={{ textAlign: "center", marginTop: "40px" }}
          className="mt-5 mb-5"
        >
          <h5 style={{ fontWeight: "700", color: "#444" }}>
            Thank you for business with us!
          </h5>
        </section>
        <div style={{ margin: "20px 0", border: "1px solid #000000ff" }} />
        <div
          className="d-flex justify-content-between"
          style={{ bottom: "0" }}
        >
          <div className="d-flex align-items-center gap-2">
            <i
              class="fa-solid fa-phone-volume"
              style={{ fontSize: "26px" }}
            ></i>{" "}
            123-456-7890
          </div>
          <div className="d-flex align-items-center gap-2">
            <i
              className="fa-regular fa-envelope"
              style={{ fontSize: "26px" }}
            ></i>
            <a href="mailto:goolok@gmail.com?subject=Invoice%20Request&body=Hello%20Team,">
              goolok@gmail.com
            </a>
          </div>
        </div>
      </div>

    );
  }
);

export default InvoiceDownload;
