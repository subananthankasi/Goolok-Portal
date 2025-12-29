import React, { useEffect, useState } from "react";
import "../mastercss.css"; 
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropertyTypeEdit from "./propertyTypeEdit";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  addPropertyType,
  deletePropertyType,
  fetchPropertyType,
} from "../../../Redux/Actions/MasterPage/PropertyTypeAction";
import Toast from "../../../Utils/Toast";
import { validateFormData } from "./propertyTypeFormValidation";
import customStyle from "../../../Utils/tableStyle";

function PropertyType() {
  // get a property data from store 
  const propertyTypeData = useSelector(
    (state) => state.PropertyType.PropertyTypeData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyType());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    type: " ",
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);

    if (validationResult.isValid) {
      Toast({ message: "Added successfully", type: "success" });
      setErrors("");
      setFormData({ type: "",status:"Enable"});
      await dispatch(addPropertyType(formData)); 
    } else {
      setErrors(validationResult.errors);
    }
  };

  const columns = [
    {
      name: "S.no",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "date",
      selector: (row) => row.createdat,
      sortable: true,
    },
    {
      name: "Property Type",
      selector: (row) => row.property_type,
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

 

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = ["sno","status", "property_type", "createdat"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(propertyTypeData, filterText, searchColumns);
  /////////////////////////////////////

  const [editData, setEditData] = useState();

  const handleEdit = (row) => {
     setEditData(row);
  };

  const handleDelete = (row) => {
     const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        dispatch(deletePropertyType(row.id));
        Toast({ message: "Successfully Deleted", type: "error" });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

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
      {/* <Topbar /> */}
      <PropertyTypeEdit
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
                  <h4 className="page_heading">Add Property Type</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Property Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="type"
                          autocomplete="off"
                          value={formData.type}
                          onChange={handleChange}
                        />
                           {errors.type && <div className="validation_msg">{errors.type}</div>}
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
                      {errors.status && <div className="validation_msg">{errors.status}</div>}
                    </div>
                  
                    <div className="text-end py-3 px-3">
                      <a
                        href="javascript:void(0);"
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          setFormData({ type: "",status:"Enable"});
                          setErrors("");
                        }}
                      >
                        Clear
                      </a>
                      <button type="submit" className="btn1"> 
                        Add 
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
                        data={propertyTypeData}
                        filename={"property_type.csv"}
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

export default PropertyType;
