import React, { useEffect, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropertyDocumentEdit from "./propertyDocumentEdit";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { DocumentvalidateFormData } from "./propertyDocumentsFormValidation";
import Toast from "../../../Utils/Toast";
import {
  addPropertyDocument,
  deletePropertyDocument,
  fetchPropertyDocument,
} from "../../../Redux/Actions/MasterPage/PropertyDocumentAction";
import { DeleteById } from "../../../Utils/DeleteById";
import customStyle from "../../../Utils/tableStyle";
import PropertyTypeDropDown from "../../../Utils/SelectDropDown/PropertyTypeDropDown";
import SubPropertyDropDown from "../../../Utils/SelectDropDown/SubPropertyDropDown";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";

function PropertyDocument() {
  // const PropertyDocumentData = useSelector(
  //   (state) => state.PropertyDocument.PropertyDocumentData
  // );
  const {
    isLoading,
    addLoading,
    deleteLoading,
    PropertyDocumentData,
  } = useSelector((state) => state.PropertyDocument);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyDocument());
  }, [dispatch]);

  // store a adding new data
  const [formData, setFormData] = useState({
    type: "",
    subproperty: " ",
    document: "",
    status: "Enable",
  });

  // dropdown set
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedSubProperty, setSelectedSubProperty] = useState(null);

  const handlePropertySelect = (data) => {
    setSelectedProperty(data);
    setSelectedSubProperty(null);
  };
  const handleSubPropertySelect = (data) => {
    setSelectedSubProperty(data);
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      type: selectedProperty ? selectedProperty.value : "",
      subproperty: selectedSubProperty ? selectedSubProperty.value : "",
    }));
  }, [selectedProperty, selectedSubProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // add

  const [errors, setErrors] = useState({});
  const { cleanText } = Common()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = DocumentvalidateFormData(formData);
    const payload = {
      ...formData,
      document: cleanText(formData.document),
    }
    if (validationResult.isValid) {

      const res = await dispatch(addPropertyDocument(payload), dispatch);
      if (res.success) {
        setSelectedProperty(null);
        setSelectedSubProperty(null);
        Toast({ message: "Added successfully", type: "success" });
        setErrors({});
        setFormData({ document: "", status: "Enable", type: "" });
      } else {
        setErrors(res?.error);
      }

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
      name: "Date",
      selector: (row) => row.createdat,
      sortable: true,
      wrap: true,
      width: "150px",
    },
    {
      name: "Property Type",
      selector: (row) => row.property_type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Sub Property",
      selector: (row) => row.subpro_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Document Name",
      selector: (row) => row.document,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.prop_status,
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
    "createdat",
    "subpro_name",
    "document",
    "prop_status",
    "property_type",
  ];

  // filter
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(
    PropertyDocumentData,
    filterText,
    searchColumns
  );
  /////////////////////////////////////

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // delete
  const handleDelete = (row) => {
    DeleteById(row.id, deletePropertyDocument, dispatch);
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
      <PropertyDocumentEdit
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
                  <h4 className="page_heading">Add Document Name</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label className="form-label" htmlFor="inputState">
                          Propert Type
                        </label>
                        <PropertyTypeDropDown
                          onSelect={handlePropertySelect}
                          selectedProperty={selectedProperty}
                        />
                        {errors.type && (
                          <div className="validation_msg">{errors.type}</div>
                        )}
                      </div>

                      <div className="col-md-12 mb-3 ">
                        <label className="form-label" htmlFor="inputState">
                          Sub Propert Type
                        </label>
                        <SubPropertyDropDown
                          onSelect={handleSubPropertySelect}
                          selectedSubProperty={selectedSubProperty}
                          filter={selectedProperty}
                        />
                        {errors.subproperty && (
                          <div className="validation_msg">
                            {errors.subproperty}
                          </div>
                        )}
                      </div>

                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Propert Document
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="document"
                          value={formData.document}
                          onChange={handleChange}
                        />
                        {errors.document && (
                          <div className="validation_msg">
                            {errors.document}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3 col-md-12">
                      <label className="form-label" htmlFor="inputState">
                        Status
                      </label>
                      <select
                        id="inputState"
                        className="form-select"
                        name="status"
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
                      <button
                        className="btn1 text-dark me-1"
                        type="button"
                        onClick={() => {
                          setFormData({ status: "Enable", document: " " });
                          setErrors("");
                          setSelectedProperty(null);
                          setSelectedSubProperty(null);
                        }}
                      >
                        Clear
                      </button>
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
                        data={PropertyDocumentData}
                        filename={"property_document.csv"}
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
                      progressPending={isLoading}
                      progressComponent={<CustomLoder />}
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

export default PropertyDocument;
