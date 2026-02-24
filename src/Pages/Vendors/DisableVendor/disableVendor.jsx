import React, { useEffect, useState } from "react";  
 import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; 
import NewVendorEdit from "../NewVendors/newVendorEdit";
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { deleteVendor, fetchVendor } from "../../../Redux/Actions/MasterPage/VendorAction";
import customStyle from "../../../Utils/tableStyle";
import { DeleteById } from "../../../Utils/DeleteById";

function DisableVendor() {
  
  const dispatch = useDispatch()
  // get vendor data from store 
  const vendorData = useSelector((state) => state.vendor.vendorData)
  useEffect(()=>{
    dispatch(fetchVendor())
  },[dispatch])

  const disableVendor = vendorData.filter((data) => data.status === "Disable")
 



// edit data 
const [editData,setEditData] = useState()
const handleEdit = (row) => {
   setEditData(row)
};

const handleDelete = (row) => {
   DeleteById(row.id, deleteVendor, dispatch); 
};


 
const columns = [
  {
    name: "S.no",
    selector: (row) => row.sno,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.created_at,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Vendor ID",
    selector: (row) => row.vendor_id,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Mode",
    selector: (row) => row.in_status,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Vendor Name",
    selector: (row) => row.username,
    wrap: true, 
    sortable: true,
  }, 
  {
    name: "Adhaar Number",
    selector: (row) => row.vendor_aadhaar,
    wrap: true, 
    sortable: true,
    width: "200px",
  },
  {
    name: "Phone Number",
    selector: (row) => row.mobile,
    wrap: true, 
    sortable: true,
    width: "200px", 
  },

  {
    name: "Email ID",
    selector: (row) => row.vendor_email,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.vendor_address,
    wrap: true, 
    sortable: true, 
  },

  {
    name: "State",
    selector: (row) => row.state_name,
  wrap: true, 
  sortable: true,
  },
  {
    name: "District",
    selector: (row) => row.district,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Taluk",
    selector: (row) => row.taluk_name,
    sortable: true,
    wrap: true,
  },
  {
    name: "Village",
    selector: (row) => row.village_name,
    sortable: true,
    wrap: true,
  }, 
  {
    name: "Pincode",
    selector: (row) => row.pincode,
    wrap: true, 
    sortable: true,
  },
  
    {
      name: "Status",
      selector: (row) => row.current_status,
      wrap: true, 
      sortable: true,
    },
    
  {
    name: "Actions",
    cell: (row) => (
      <div className="d-flex">
      <button
        className="btn  btn-outline-info me-1 edit"  data-tooltip-id="edit"
        onClick={() => {
          handleEdit(row);
          openModal();
        }}
      >
        <EditIcon />
      </button>
      <button className="btn btn-outline-danger delete" data-tooltip-id="delete" onClick={() => handleDelete(row)}>
        <DeleteIcon />
      </button>
    </div>
    ),
  },
];
 
  // search function 
  const [filterText, setFilterText] = useState(''); 
  const searchColumns =['sno', 'createdat', 'vendor_id', 'vendor_name','vendor_aadhaar','vendor_mobile','vendor_email','vendor_address','state_name','district','taluk_name','village_name','village_name','pincode','status']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(disableVendor, filterText, searchColumns);
  /////////////////////////////////////



  // edit modal open 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <> 
      <NewVendorEdit isOpen={isModalOpen} closeModal={closeModal} editData={editData}/>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <div className="d-flex">
                  <h4 className="page_heading">Disable Vendor Report</h4>
                   <div style={{marginLeft:'auto'}}><ExportButton columns={columns} data={disableVendor} filename={'Vendor_Report.csv'}/></div>
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
      <ReactTooltip  id="edit" place="bottom" content="Edit" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="delete" place="bottom" content="Delete" style={{ fontSize: "10px"}} />
     </>
  );
}

export default DisableVendor;
