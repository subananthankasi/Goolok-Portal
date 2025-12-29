import React, { useEffect, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import customStyle from "../../../Utils/tableStyle";
import AdvanceEdit from "./advanceEdit";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { DateFormatcustom } from "../../../Utils/DateFormatcustom";
import CustomLoder from "../../../Components/customLoader/CustomLoder";

function Advance() {
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Update Date",
      selector: (row) => DateFormatcustom(row.updated_at),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
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
            className="btn  btn-outline-info me-1 edit"
            data-tooltip-id="edit"
            onClick={() => {
              handleEdit(row);
              openModal();
            }}
          >
            <EditIcon />
          </button>
        </div>
      ),
    },
  ];

  // get data
  const [advanceData, setAdvanceData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/advance`);
      setAdvanceData(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // edit and delete

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["sno", "status", "unit", "createdat"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(advanceData, filterText, searchColumns);
  /////////////////////////////////////

  // editing modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdvanceEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
        fetchData={fetchData}
      />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Advance amount report</h4>
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
                      progressPending={loading}
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
    </>
  );
}

export default Advance;
