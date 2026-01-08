import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewStaffEdit from "../NewStaff/newstaffEdit";
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux';
import { deleteStaff, fetchStaff } from "../../../Redux/Actions/MasterPage/Staff";
import customStyle from "../../../Utils/tableStyle";
import { DeleteById } from "../../../Utils/DeleteById";

function StaffReport() {

  const staffdata = useSelector(state => state.staff.staff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);


  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createdat,
      sortable: true,
      width: "150px"
    },
    {
      name: "Staff ID",
      selector: (row) => row.staff_id,
      sortable: true,
    },
    {
      name: "Staff Name",
      selector: (row) => row.staff_name,
      sortable: true,
      width: "170px",

    },
    {
      name: "Group Type",
      selector: (row) => row.group_name,
      sortable: true,
      width: "170px",

    },
    {
      name: "Branch",
      selector: (row) => row.branch_name,
      sortable: true,
      wrap: "true",
      width: "170px",
    },
    {
      name: "Adhaar Number",
      selector: (row) => row.staff_aadhaar,
      width: "200px",
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.staff_mobile,
      width: "200px",
      sortable: true,
    },

    {
      name: "Email ID",
      selector: (row) => row.staff_email,
      sortable: true,
      wrap: true,
      width: "200px",

    },
    {
      name: "Address",
      selector: (row) => row.staff_address,
      sortable: true,
    },

    {
      name: "State",
      selector: (row) => row.state_name,
      sortable: true,
    },


    {
      name: "District",
      selector: (row) => row.district,
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
      sortable: true,
    },

    {
      name: "Password",
      selector: (row) => row.staff_password,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn btn-outline-info me-1 edit" data-tooltip-id="edit"
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


  // edit 

  const [editData, setEditData] = useState()
  const handleEdit = (row) => {
    setEditData(row)
  };

  // delete
  const handleDelete = (row) => {
    DeleteById(row.id, deleteStaff, dispatch)
  };





  // search function 
  const [filterText, setFilterText] = useState('');
  const searchColumns = ['sno', 'createdat', 'staff_id', 'staff_name', 'group_name', 'branch_name', 'staff_aadhaar', 'staff_mobile', 'staff_email', 'staff_address', 'state_name', 'district', 'taluk_name', 'village_name', 'pincode', 'staff_password', 'status']
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(staffdata, filterText, searchColumns);
  /////////////////////////////////////




  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      <NewStaffEdit isOpen={isModalOpen} closeModal={closeModal} editData={editData} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Staff Report</h4>
                    <div style={{ marginLeft: 'auto' }}><ExportButton columns={columns} data={staffdata} filename={'Staff_Report.csv'} /></div>
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
      <ReactTooltip id="edit" place="bottom" content="Edit" style={{ fontSize: "10px" }} />
      <ReactTooltip id="delete" place="bottom" content="Delete" style={{ fontSize: "10px" }} />
    </>
  );
}

export default StaffReport;
