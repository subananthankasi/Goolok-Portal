import React, { useEffect, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import UnitEdit from "./unitEdit";
import { validateFormData } from "./validation";
import {
  addUnit,
  deleteUnit,
  fetchUnit,
} from "../../../Redux/Actions/MasterPage/UnitAction";
import { useDispatch, useSelector } from "react-redux";
import { DeleteById } from "../../../Utils/DeleteById";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

function Unit() {
  const dispatch = useDispatch();
  const unitData = useSelector((state) => state.Unit.Unit);
  const isLoading = useSelector((state) => state.Unit.isLoading);
  const addLoading = useSelector((state) => state.Unit.addLoading);

  useEffect(() => {
    dispatch(fetchUnit());
  }, []);

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "date",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
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

  const [formData, setFormData] = useState({
    unit: "",
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  ///Validation/////
  const { cleanText } = Common()
  const [errors, seterrors] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    const payload = {
      ...formData,
      unit: cleanText(formData.unit),
    }
    if (validationResult.isValid) {
      const res = await dispatch(addUnit(payload));
      if (res.success) {
        seterrors("");
        setFormData({ unit: "", status: "Enable" });
      } else {
        seterrors(res?.error);
      }

    } else {
      seterrors(validationResult.errors);
    }
  };

  // edit and delete

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  const handleDelete = (row) => {
    DeleteById(row.id, deleteUnit, dispatch);
  };

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["sno", "status", "unit", "createdat"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(unitData, filterText, searchColumns);
  /////////////////////////////////////

  // editing modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    seterrors("")
  };

  return (
    <>
      <UnitEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add Unit</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Unit
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="unit"
                          autocomplete="off"
                          value={formData.unit}
                          onChange={handleChange}
                        />
                        {errors.unit && (
                          <div className="validation_msg">{errors.unit}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputState">
                        Status
                      </label>
                      <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Enable">Enable</option>
                        <option value="Disable">Disable</option>
                      </select>
                      {errors.status && (
                        <div className="validation_msg">{errors.status}</div>
                      )}
                    </div>

                    <div className="text-end py-3 px-3">
                      <a
                        href="javascript:void(0);"
                        className="btn1 text-dark me-1"
                      >
                        Clear
                      </a>
                      <button
                        type="submit"
                        className="btn1"
                        disabled={addLoading}
                      >
                        {addLoading ? "Processing..." : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={unitData}
                        filename={"Unit.csv"}
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
    </>
  );
}

export default Unit;
