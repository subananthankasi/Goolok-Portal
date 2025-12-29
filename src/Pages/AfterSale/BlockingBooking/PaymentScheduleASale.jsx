import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { FaCheckCircle, FaClock } from "react-icons/fa";
const PaymentScheduleASale = ({ decryId }) => {
  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Payment Name",
      selector: (row) => row.payment_name,
      sortable: true,
      width: "190px",
    },
    {
      name: "Emi Amount",
      selector: (row) => `₹ ${row.emi_amount}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Emi Date",
      selector: (row) => row.emi_date,
      sortable: true,
    },
    {
      name: "Paid amount",
      selector: (row) =>
        row.paid_amount != null ? `₹ ${row.paid_amount}` : "-",
      sortable: true,
    },
    {
      name: "Balance amount",
      selector: (row) =>
        row.emi_balance != null ? `₹ ${row.emi_balance}` : "-",
      sortable: true,
    },
    {
      name: "Payment Status",
      cell: (row) => {
        let bgColor = "";
        let icon = null;
        let textColor = "#fff";

        if (row.status === "Paid") {
          bgColor = "linear-gradient(135deg, #28a745, #218838)";
          icon = <FaCheckCircle style={{ marginRight: "6px" }} />;
        } else if (row.status === "Pending") {
          bgColor = "linear-gradient(135deg, #f39c12, #e67e22)";
          icon = <FaClock style={{ marginRight: "6px" }} />;
        } else {
          bgColor = "linear-gradient(135deg, #6c757d, #495057)";
        }

        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              color: textColor,
              background: bgColor,
              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              minWidth: "100px",
              justifyContent: "center",
            }}
          >
            {icon}
            {row.status}
          </span>
        );
      },
      sortable: true,
    },
  ];

  const [scheduleDetails, setScheduleDetails] = useState([]);
  const fetchPaymentDetails = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/bookingschedule/${decryId}`
      );
      setScheduleDetails(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  return (
    <div className="col-12 mt-4 mb-4">
      <div className="card shadow border-0">
        <div className="card shadow border-0 p-4">
          <h6> Payments schedule</h6>
          <hr />

          <DataTable
            persistTableHead={true}
            columns={columns}
            data={scheduleDetails}
            customStyles={customStyle}
            pagination
            // selectableRows
            fixedHeader
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentScheduleASale;
