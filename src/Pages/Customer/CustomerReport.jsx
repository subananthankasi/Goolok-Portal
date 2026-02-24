import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchData } from "../../Utils/Search";
import ExportButton from "../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  fetchCustomer,
} from "../../Redux/Actions/Customer/CustomerAction";
import customStyle from "../../Utils/tableStyle";
import Moment from "moment";
import { Link } from "react-router-dom";
import { DeleteById } from "../../Utils/DeleteById";

function CustomerReport() {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.Customer.customerData);
   useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => Moment(row.createdat).format("DD-MM-YYYY"),
      sortable: true,
      wrap: true,
      width: "130px",
    },

    {
      name: "Customer ID",
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/Customer_data_edit&view/${row.id}`}
            className="btn btn_pdf light btn-warning text-dark" 
          >
            {row.customer_id}
          </Link>
        </div>
      ),
      wrap: true,
      sortable: true,
    },
    
    {
      name: " Name",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "sex",
      selector: (row) => row.customer_sex,
      sortable: true,
    },
    {
      name: "dob",
      selector: (row) =>Moment(row.customer_dob).format("DD-MM-YYYY"),
      sortable: true,
      width: "130px",
    },

    {
      name: "mobile number",
      selector: (row) => row.customer_mobile,
      sortable: true,
      width: "130px",
    },
    {
      name: "address",
      selector: (row) => row.customer_address,
      sortable: true,
    },
    {
      name: "Complete %",
      selector: (row) => row.completion,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(row)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = [
    "sno",
    "createdat",
    "customer_id",
    "customer",
    "customer_sex",
    "customer_dob",
    "customer_mobile",
    "customer_address",
    "email",
    "address",
    "area",
    "city",
    "pincode",
    "state",
    "password",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(customerData, filterText, searchColumns);
  /////////////////////////////////////

 

  const handleDelete = (row) => { 
    DeleteById(row.id, deleteCustomer, dispatch);
  };

  return (
    <>
       <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Customer Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={filterdata}
                        filename={"Staff_Report.csv"}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="searchbar">
                      <input
                        type="text"
                        className="search"
                        onChange={handleFilter}
                        placeholder="..Search"
                      ></input>
                    </div>
                    <DataTable
                      columns={columns}
                      data={filterdata}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      persistTableHead={true}
                      fixedHeader
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReactTooltip
        id="edit"
        place="bottom"
        content="Edit"
        style={{ fontSize: "10px" }}
      />
      <ReactTooltip
        id="delete"
        place="bottom"
        content="Delete"
        style={{ fontSize: "10px" }}
      />
     </>
  );
}

export default CustomerReport;
