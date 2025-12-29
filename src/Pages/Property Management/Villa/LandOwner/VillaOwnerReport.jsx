import React, { useState } from "react"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link } from 'react-router-dom';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ExportButton from "../../../../Utils/ExportButton";
import { SearchData } from "../../../../Utils/Search";
import customStyle from "../../../../Utils/tableStyle";

function VillaOwnerReport() {
  const percentage = 89;

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.slno,
      sortable: true,
      wrap: true, 
    },
    {
      name: "Date",
      selector: (row) => row.Date, 
      sortable: true,
      wrap: true, 
    },
    {
      name: "Project ID",
      cell: (row) => (
        <div className="d-flex">
          <Link to='/villa_owner_Agreement'
            className="btn btn_pdf light btn-warning text-dark" 
            onClick={() => {
              handleEdit(row); 
            }}
          >
             G24VLAO100
          </Link>
         
        </div>
      ),
      wrap: true,
      sortable: true, 
    },
    {
      name: "Completion %",
      cell: (row) => (
        <div className="d-flex">
          <div style={{ width: 40, height: 40 }}>
          <CircularProgressbar value={percentage} text={`${percentage}%`}
           styles={buildStyles({ 
            textSize: '26px', 
            pathColor: '#ffae42',
            textColor: 'black',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
           />;
          </div>
        </div>
      ), 
      sortable: true,
      wrap: true,
    },
    {
      name: "Project Name",
      selector: (row) => row.projectname,
      wrap: true,
      sortable: true,
    },
    {
        name: "Property Location",
        selector: (row) => row.location,
        wrap: true, 
        sortable: true,
      },
     
     
    {
      name: "Property Type",
      selector: (row) => row.propertytype, 
      sortable: true,
      wrap: true, 
    },  
  ];
 
  const data = [
    {
      slno: "1",
      Date:"06/06/2024",
      projectid: "1001",
      projectname: "Alpha A",
      location: "Aavadi",
      address: "Chengalpattu",
      city: "Aavadi",
      area: "Aavadi",
      state: "Tamilnadu",
      pincode: "05874545",
      propertytype: "DTCP Approval Plot",
      approvalby: "Kevin",
      relateddocument: "doc1, doc2",
      status: "Enable",
    },
    {
        slno: "2",
        Date:"06/06/2024",
        projectid: "1002",
        projectname: "Alpha B",
        location: "Ambattur",
        address: "Chengalpattu",
        city: "Aavadi",
        area: "Aavadi",
        state: "600008",
        pincode: "05874545",
        propertytype: "RERA Approval ",
        approvalby: "Babu",
        relateddocument: "doc1, doc2",
        status: "Enable",
    },
  ];
 

  // search function 
  const [filterText, setFilterText] = useState(''); 
  const searchColumns =['slno', 'projectid', 'projectname', 'location','address','city','area','state','pincode','propertytype','approvalby','relateddocument','status']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(data, filterText, searchColumns);
  /////////////////////////////////////

  const handleEdit = (row) => {
   };

 

  return (
    <>
       <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Villa Owner Agreement Report</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={filterdata} filename={'Land Owner_Report.csv'}/></div>
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
                      fixedHeader
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
     </>
  );
}

export default VillaOwnerReport;
