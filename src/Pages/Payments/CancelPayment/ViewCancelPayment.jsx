import React, { useState } from "react"; 
import { SearchData } from "../../../Utils/Search";
import DataTable from "react-data-table-component";
import ExportButton from "../../../Utils/ExportButton";


const ViewCancelPayment = ({ isOpen, closeModal }) => {
    const columns = [
        {
          name: "S.no",
          selector: (row) => row.slno,
          sortable: true,
          wrap: true,
        },
        {
          name: "payment dates ",
          selector: (row) => row.paymentdates ,
          wrap: true,
          sortable: true,
        },
         
         
        {
          name: "Installments",
          selector: (row) => row.installments,
          wrap: true, 
          sortable: true,
        },
     
        {
            name: "Amount",
            selector: (row) => row.Amount, 
            sortable: true,
            wrap: true, 
        },  
        {
            name: "Paid On",
            selector: (row) => row.PaidOn, 
            sortable: true,
            wrap: true, 
        },  
     
      ];
      const customStyle = {
        headRow: {
          style: {
            backgroundColor: "#2f4f4f",
            color: "white", 
          },
        },
        headCells: {
          style: {
            fontSize: "15px",
            fontWeight: "600",
            textTransform: "capitalize",
          },
        },
        cells: {
          style: {
            fontSize: "14px",
          },
        },
      };

      
  const data = [
    {
        slno: "1",
        paymentdates: "2023-01-15",
        installments: "Installment 1",
        Amount: 1000,
        PaidOn: "2023-01-16",
      },
      {
        slno: "2",
        paymentdates: "2023-02-15",
        installments: "Installment 2",
        Amount: 1500,
        PaidOn: "2023-02-16",
      },
      {
        slno: "3",
        paymentdates: "2023-03-15",
        installments: "Installment 3",
        Amount: 2000,
        PaidOn: "2023-03-16",
      },
  ];
 

 // search function 
 const [filterText, setFilterText] = useState(''); 
 const searchColumns =['slno', 'projectid', 'projectname', 'approvalby']
 const handleFilter = (event) => {
   setFilterText(event.target.value);
 };
 const filterdata = SearchData(data, filterText, searchColumns);

  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="card-header ">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">Cancel Payment Details</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          </div>
          <div className="card-body p-3">
            <form>
            <div className="row">
                <div className="text-end d-flex ">
                  <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'CancelPayment.csv'}/></div>
                    <div className="searchbar">
                      <input
                        type="text"
                        className="search"
                        onChange={handleFilter}
                        placeholder="..Search"
                        ></input>
                    </div>
                </div>
                  <div>
                    <DataTable
                      columns={columns}
                      data={filterdata}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      fixedHeader
                    />
                  </div>  
          </div>
              <div className="text-end py-3 px-3">
               
                <button className="btn1">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCancelPayment;
