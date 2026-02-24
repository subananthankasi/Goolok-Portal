import React, { useEffect, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../Utils/Toast";
import customStyle from "../../../Utils/tableStyle";
import { validateFormData, validateFormDataUpdate } from "./Validation";
import { DeleteById } from "../../../Utils/DeleteById";
import LawyerDocInputEdit from "./LawyerDocInputEdit";
import { fetchDoc } from "../../../Redux/Actions/MasterPage/LawyerDocumentAction";
import {
  addlawDocInput,
  deleteLawDocInput,
  fetchDocInput,
  updateLawDocInput,
} from "../../../Redux/Actions/MasterPage/LawyerDocumentInputAction";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import { Dialog } from "primereact/dialog";

function LawyerDocInput() {
  const dispatch = useDispatch();
  const LawyerDocument = useSelector((state) => state.LawyerDocument.lawyerDoc);
  const isLoading = useSelector((state) => state.LawyerDocumentInput.isLoading);
  const updateLoading = useSelector(
    (state) => state.LawyerDocumentInput.updateLoading
  );
  const { cleanText } = Common();
  const [visible, setVisible] = useState(false)


  const addLoading = useSelector(
    (state) => state.LawyerDocumentInput.addLoading
  );
  const deleteLoading = useSelector(
    (state) => state.LawyerDocumentInput.deleteLoading
  );

  useEffect(() => {
    dispatch(fetchDoc());
  }, [dispatch]);

  // select dropdown set
  const options = LawyerDocument?.map((data) => ({
    value: data.id,
    label: data.document,
  }));
  const [selectedData, setSelectedData] = useState(null);
  const handleSelect = (data) => {
    setSelectedData(data);
    setErrors((prev) => ({
      ...prev,
      document: "",
    }));
  };

  // get document input names
  const DocumentInputName = useSelector(
    (state) => state.LawyerDocumentInput.lawyerDocInput
  );
  useEffect(() => {
    dispatch(fetchDocInput());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    document: " ",
    subname: " ",
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      document: selectedData ? selectedData.value : "",
    }));
  }, [selectedData]);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormData(formData);
    if (validationResult.isValid) {
      const newData = {
        ...formData,
        subname: cleanText(formData.subname),
      };
      const res = await dispatch(addlawDocInput(newData));
      if (res.success) {
        Toast({ message: "Added successfully", type: "success" });
        setErrors("");
        setFormData({ subname: "", status: "Enable" });
        setSelectedData(null);
      } else {
        setErrors(res.error);
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
      name: "date",
      selector: (row) => row.created_at,
      sortable: true,
      wrap: true,
    },
    {
      name: "Document name",
      selector: (row) => row.docname,
      sortable: true,
    },
    {
      name: "Field name",
      selector: (row) => row.documentsub,
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
              // openModal();
              setVisible(true)
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
    "status",
    "docname",
    "created_at",
    "documentsub",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(DocumentInputName, filterText, searchColumns);
  /////////////////////////////////////

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
    setFormData(row);
    const defaultOption = LawyerDocument.find(
      (option) => option.id === row.document
    );
    setSelectedData({
      value: defaultOption.id,
      label: defaultOption.document,
    });
  };

  const handleDelete = (row) => {
    DeleteById(row.id, deleteLawDocInput, dispatch);
  };

  // editing modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateFormDataUpdate(formData);
    if (validationResult.isValid) {
      const newData = {
        ...formData,
        documentsub: cleanText(formData.documentsub),
      };
      const res = await dispatch(updateLawDocInput(newData));
      if (res.success) {
        Toast({ message: "Updated Successfully", type: "success" });
        // closeModal();
        setVisible(false)
        setErrors("");
      } else {
        setErrors(res.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };

  return (
    <>
      {/* <Topbar /> */}
      <LawyerDocInputEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
      />
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Add input field</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Document name
                        </label>
                        <Select
                          options={options}
                          value={selectedData}
                          onChange={handleSelect}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "#e7e7e7"
                                : "#e7e7e7",
                              fontSize: "13px",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: "12px",
                              color: "black",
                            }),
                          }}
                        />
                        {errors.document && (
                          <div className="validation_msg">
                            {errors.document}
                          </div>
                        )}
                      </div>

                      <div className="col-md-12 mb-3 ">
                        <label htmlFor="lastName" className="form-label">
                          Input field name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subname"
                          autocomplete="off"
                          value={formData.subname}
                          onChange={handleChange}
                        />
                        {errors.subname && (
                          <div className="validation_msg">{errors.subname}</div>
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
                      <button
                        className="btn1 text-dark me-1"
                        onClick={() => {
                          setFormData({ subname: "", status: "Enable" });
                          setSelectedData(null);
                          setErrors("");
                        }}
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        className="btn1"
                        disabled={addLoading}
                      >
                        {addLoading ? "Adding..." : "Add"}
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
                        data={DocumentInputName}
                        filename={"DocumentInput.csv"}
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

      <Dialog
        visible={visible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Edit Lawyer Document"
        modal
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleUpdateSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3 ">
              <label htmlFor="lastName" className="form-label">
                Property Type
              </label>
              <Select
                options={options}
                value={selectedData}
                onChange={handleSelect}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "#e7e7e7" : "#e7e7e7",
                    fontSize: "13px",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: "12px",
                    color: "black",
                  }),
                }}
              />
              {errors.document && (
                <div className="validation_msg">{errors.document}</div>
              )}
            </div>

            <div className="col-md-12 mb-3 ">
              <label htmlFor="lastName" className="form-label">
                Sub Property
              </label>
              <input
                type="text"
                className="form-control"
                name="documentsub"
                value={formData.documentsub}
                onChange={handleChange}
              />
              {errors.documentsub && (
                <div className="validation_msg">{errors.documentsub}</div>
              )}
            </div>
          </div>

          <div className="mb-3 col-md-12">
            <label className="form-label" htmlFor="inputState">
              Status
            </label>
            <select
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
              type="button"
              className="btn1 me-1"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn1" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default LawyerDocInput;
