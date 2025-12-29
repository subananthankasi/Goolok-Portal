import React, { useState } from "react";
import customStyle from "../../Utils/tableStyle";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import FollowUp from "./FollowUp";
import FollowUpView from "./FollowUpView";
import VisibilityIcon from '@mui/icons-material/Visibility';

function InvoiceNotification() {
  const navigate = useNavigate();

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Invoice Date",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.name,
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
      name: "Payment status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 bg-success`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
    },
  ];

  const data = [
    {
      created_at: "2024-01-15",
      name: "Alice Brown",
      age: 29,
      amount: 12000,
      status: "Unpaid",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const openModalView = () => {
    setIsModalOpenView(true);
  };
  const closeModalView = () => {
    setIsModalOpenView(false);
  };

  return (
    <>
      <FollowUp isOpen={isModalOpen} closeModal={closeModal} />
      <FollowUpView isOpen={isModalOpenView} closeModal={closeModalView}/> 

      <div className="col-12 mt-4">
        <div className="card shadow border-0 p-4">
          <div className="d-flex justify-content-between">
            <h6>Invoice & Payments</h6>
            <div className="ms-2">
              <a
                href="#0"
                onClick={()=>openModal()}
                className="btn1 me-2"
              >
                + Follow up
              </a>
              <a
                href="#0"
                onClick={()=>openModalView()}
                className="btn1 me-2"
              >
              <VisibilityIcon />
                </a>
            </div>
          </div>
          <hr />

          <DataTable
            persistTableHead={true}
            columns={columns}
            data={data}
            customStyles={customStyle}
            pagination
            // selectableRows
            fixedHeader
          />
        </div>
      </div>
    </>
  );
}

export default InvoiceNotification;
