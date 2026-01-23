import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";

const PaymentDetails = ({ bookingData, block_id }) => {

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Invoice ID",
      selector: (row) => row.invoice_id,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transaction_id,
      sortable: true,
      width: "190px",
    },
    {
      name: "Paid Date",
      selector: (row) => row.paid_date,
      sortable: true,
    },
    {
      name: "Paid Amount",
      selector: (row) => row.paid_amount,
      sortable: true,
    },

    {
      name: "Payment Mode",
      selector: (row) => row.payment_mode,
      sortable: true,
    },
  ];


  const [payDetails, setPayDetails] = useState([]);
  const fetchPaymentDetails = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/bookingschedule/${id}/edit`
      );
      setPayDetails(response.data);
    } catch (error) { }
  };


  useEffect(() => {
    fetchPaymentDetails(bookingData?.block_id);
  }, [bookingData?.block_id]);

  return (
    <div className="col-12 mt-4 mb-4">
      <div className="card shadow border-0">
        <div className="card shadow border-0 p-4">
          <h6> Payments Details</h6>
          <hr />

          <DataTable
            persistTableHead={true}
            columns={columns}
            data={payDetails}
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

export default PaymentDetails;
