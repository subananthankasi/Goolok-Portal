import React, { useState, useEffect } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SRODetailsEdit from "./SRODetailsEdit";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../Utils/Toast";
import { DeleteById } from "../../../Utils/DeleteById";
import {
  deleteSRODetails,
  fetchSRODetails,
} from "../../../Redux/Actions/MasterPage/SRODetailsAction";
import SRODetailsAdd from "./SRODetailsAdd";
import customStyle from "../../../Utils/tableStyle";
import CustomLoder from "../../../Components/customLoader/CustomLoder";

function SRODetails() {
  ///////Fetch Data from DB////////
  const SRODetailsData = useSelector(
    (state) => state.SRODetails.SRODetailsData
  );
  const isLoading = useSelector((state) => state.SRODetails.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSRODetails());
  }, [dispatch]);

  const handleDelete = (row) => {
    DeleteById(row.id, deleteSRODetails, dispatch);
  };

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
      wrap: true,
      width: "150px"
    },
    {
      name: "SRO Title",
      selector: (row) => row.sro_title,
      sortable: true,
      wrap: true,
      width: "170px"

    },
    {
      name: "SRO Name",
      selector: (row) => row.sro_name,
      sortable: true,
      wrap: true,
      width: "170px"

    },
    {
      name: "Sro ID",
      selector: (row) => row.sro_id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email ID",
      selector: (row) => row.sro_email,
      sortable: true,
      wrap: true,
      width: "200px"
    },

    {
      name: "Mobile Number",
      selector: (row) => row.sro_mobile,
      width: "200px",
      sortable: true,
    },
    {
      name: "Landline",
      selector: (row) => row.sro_landline,
      sortable: true,
      wrap: true,
      width: "180px",
    },
    {
      name: "Address",
      selector: (row) => row.sro_address,
      sortable: true,
      wrap: true,
      width: "200px",
    },
    {
      name: "State",
      selector: (row) => row.state_name,
      sortable: true,
      wrap: true,
      width: "150px",
    },
    {
      name: "District",
      selector: (row) => row.district,
      sortable: true,
      wrap: true,
      width: "150px",

    },
    {
      name: "Taluk",
      selector: (row) => row.taluk_name,
      sortable: true,
      wrap: true,
      width: "150px",

    },
    {
      name: "Village",
      selector: (row) => row.village_name,
      sortable: true,
      wrap: true,
      width: "150px",

    },

    {
      name: "Pincode",
      selector: (row) => row.pincode,
      sortable: true,
      width: "150px",

    },
    {
      name: "Geo Location",
      selector: (row) => row.sro_location,
      sortable: true,
      wrap: true,
      width: "200px",

    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            className="btn  btn-outline-info me-1 edit"
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
    "createdat",
    "sro_title",
    "sro_email",
    "sro_mobile",
    "sro_landline",
    "sro_address",
    "state_name",
    "district",
    "taluk_name",
    "village_name",
    "pincode",
    "sro_location",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(SRODetailsData, filterText, searchColumns);
  /////////////////////////////////////

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // add
  const [AddModalOpen, setAddModalOpen] = useState(false);
  const addopenModal = () => {
    setAddModalOpen(true);
  };
  const addcloseModal = () => {
    setAddModalOpen(false);
  };

  // edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SRODetailsEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
      />
      <SRODetailsAdd isOpen={AddModalOpen} closeModal={addcloseModal} />
      <section className="section">
        <div className="container">

          <div className="card">
            <div className="card-header">
              <div className="d-flex">
                <div>
                  <h4 className="page_heading">SRO Details</h4>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <button
                    className="btn1 me-3"
                    data-tooltip-id="add"
                    onClick={addopenModal}
                  >
                    <AddIcon />
                  </button>
                  <ExportButton
                    columns={columns}
                    data={filterdata}
                    filename={"SRODetails.csv"}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="col-12 mb-4">
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
        content="Add"
        style={{ fontSize: "10px" }}
      />
    </>
  );
}

export default SRODetails;
