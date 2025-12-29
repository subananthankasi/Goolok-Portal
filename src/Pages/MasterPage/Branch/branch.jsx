import React, { useEffect, useState } from "react";
import "../mastercss.css";
import Footerbar from "../../../Components/footer/footer";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BranchEdit from "./branchEdit";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AddIcon from "@mui/icons-material/Add";
import customStyle from "../../../Utils/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBranch,
  fetchBranch,
} from "../../../Redux/Actions/MasterPage/BranchAction";
import { DeleteById } from "../../../Utils/DeleteById";
import BranchAdd from "./branchAdd";
import CustomLoder from "../../../Components/customLoader/CustomLoder";

function Branch() {
  const branchData = useSelector((state) => state.Branch.BranchData);
  const isLoading = useSelector((state) => state.Branch.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBranch());
  }, [dispatch]);

  // edit
  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // add
  const handleAdd = () => {
    setEditData(null);
  };

  const handleButtonClick = () => {
    openModal();
    handleAdd();
  };

  // delete
  const handleDelete = (row) => {
    DeleteById(row.id, deleteBranch, dispatch);
  };

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
      wrap: true,
    },
    {
      name: "Branch ID",
      selector: (row) => row.branchid,
      wrap: true,
      sortable: true,
    },
    {
      name: "Branch Name",
      selector: (row) => row.branch_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row) => row.short_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Village",
      selector: (row) => row.village_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Taluk",
      selector: (row) => row.taluk_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "District",
      selector: (row) => row.district,
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
      name: "Pincode",
      selector: (row) => row.pincode,
      wrap: true,
      sortable: true,
    },

    {
      name: "Contact Person",
      selector: (row) => row.contact_person,
      wrap: true,
      width: "200px",
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobile,
      width: "200px",
      sortable: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Geo Location",
      selector: (row) => row.geo_location,
      sortable: true,
      wrap: true,
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
            className="btn btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row);
              openModal();
            }}
          >
            <EditIcon />
          </button>
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
    "branchid",
    "branch_name",
    "short_name",
    "village_name",
    "district",
    "state_name",
    "branch_pincode",
    "contact_person",
    "mobile",
    "email",
    "geo_location",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(branchData, filterText, searchColumns);
  /////////////////////////////////////

  // add and edit in same modal
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openModalAdd = () => {
    setAddModalOpen(true);
  };
  const closeModalAdd = () => {
    setAddModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BranchEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
      />
      <BranchAdd isOpen={isAddModalOpen} closeModal={closeModalAdd} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <h4 className="page_heading">Branch Creation Report</h4>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <button
                        className="btn1 me-3"
                        data-tooltip-id="add"
                        onClick={openModalAdd}
                      >
                        <AddIcon />
                      </button>
                      <ExportButton
                        columns={columns}
                        data={branchData}
                        filename={"branch.csv"}
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
                      progressPending={isLoading}
                      progressComponent={<CustomLoder />}
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
      <ReactTooltip
        id="add"
        place="bottom"
        content="Branch Creation"
        style={{ fontSize: "10px" }}
      />
    </>
  );
}

export default Branch;
