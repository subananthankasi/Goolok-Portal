import React, { useEffect, useState, useRef } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StateEdit from "./StateEdit";
import * as XLSX from "xlsx";
import Moment from "moment";
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addState,
  deleteState,
  fetchState,
} from "../../../Redux/Actions/MasterPage/StateAction";
import Toast from "../../../Utils/Toast";
import { validateFormData } from "./stateValidation";
import customStyle from "../../../Utils/tableStyle";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import Common from "../../../common/Common";
import { message } from "antd";
import { Dialog } from "primereact/dialog";

function State() {
  const updata = useRef(null);
  const [visible, setVisible] = useState(false);
  const StateNameData = useSelector((state) => state.State.StateNameData);
  const isLoading = useSelector((state) => state.State.isLoading);
  const addLoading = useSelector((state) => state.State.addLoading);
  const { cleanText } = Common();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchState());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    state_name: " ",
    status: "Enable",
  });


  const stateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((pre) => ({
      pre,
      [name]: "",
    }));
  };

  const [errorsBulk, setErrorsBulk] = useState();
  const [uploadedData, setUploadedData] = useState([]);
  const [duplicateList, setDuplicateList] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const binaryStr = await file.arrayBuffer();
    const workbook = XLSX.read(binaryStr, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const cleanedData = jsonData.map((item) => ({
      state_name: item.State?.trim(),
    }));

    setUploadedData(cleanedData);
    const existingStates = StateNameData.map((x) =>
      x.state_name.toLowerCase().trim()
    );

    const duplicates = cleanedData.filter((item) =>
      existingStates.includes(item.state_name.toLowerCase().trim())
    );

    if (duplicates.length > 0) {
      setDuplicateList(duplicates);
      setVisible(true);
    }
  };

  const bulkSubmit = async () => {
    if (uploadedData.length === 0) {
      setErrorsBulk("No valid states to add");
      return;
    }
    setErrorsBulk("");

    const res = await dispatch(addState(uploadedData));

    if (res.success) {
      Toast({ message: "Added successfully", type: "success" });
      updata.current.value = "";
      setUploadedData([]);
      setVisible(false);
    } else {
      message.warning(res?.error?.error);
    }
  };

  const removeAllDuplicates = () => {
    const dupNames = duplicateList.map((d) => d.state_name);

    const updated = uploadedData.filter(
      (item) => !dupNames.includes(item.state_name)
    );
    setUploadedData(updated);
    setDuplicateList([]);
    Toast({
      message: "Duplicates removed successfully.",
      type: "success",
    });
  };

  const [errors, setErrors] = useState({});

  const state_nameubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      state_name: cleanText(formData.state_name),
    };
    const stateSubmitData = [newData];
    const validationResult = validateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(addState(stateSubmitData));
      if (res.success) {
        Toast({ message: "Added successfully", type: "success" });
        setErrors({});
        setFormData({ state_name: "", status: "Enable" });
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
      cell: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => Moment(row.createdat).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state_name,
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
  const searchColumns = ["sno", "createdat", "state_name", "status"];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(StateNameData, filterText, searchColumns);
  /////////////////////////////////////

  const [editData, setEditData] = useState();

  const handleEdit = (row) => {
    setEditData(row);
  };

  const handleDelete = (row) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        dispatch(deleteState(row.id));
        Toast({ message: "Successfully Deleted", type: "error" });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
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
      <StateEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="card">
                <Tabs
                  defaultActiveKey="tab1"
                  id="fill-tab-example"
                  className=" "
                  fill
                >
                  <Tab eventKey="tab1" title="Add Single State ">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-12 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                              State
                            </label>
                            <input
                              type="text"
                              name="state_name"
                              value={formData?.state_name}
                              onChange={stateChange}
                              className="form-control"
                              id="lastName"
                              autoComplete="off"
                            />
                            {errors?.state_name && (
                              <div className="validation_msg">
                                {errors?.state_name}
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
                            name="status"
                            className="form-select"
                            value={formData.status}
                            onChange={stateChange}
                          >
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                          </select>
                          {errors.status && (
                            <div className="validation_msg">
                              {errors.status}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>

                    <div className="text-end py-3 px-3">
                      <button
                        className="  btn1 me-1"
                        onClick={() => {
                          setFormData({ state_name: "", status: "Enable" });
                          setErrors({});
                          setUploadedData([]);
                        }}
                      >
                        Clear
                      </button>
                      <button
                        onClick={state_nameubmit}
                        className="  btn1"
                        disabled={addLoading}
                      >
                        {addLoading ? "Processing..." : "Add"}
                      </button>
                    </div>
                  </Tab>

                  <Tab eventKey="longer-tab" title="Add Multiple State">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-12 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                              Upload the excel file
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="lastName"
                              ref={updata}
                              onChange={handleFileUpload}
                            />
                            {errorsBulk && (
                              <div className="validation_msg">{errorsBulk}</div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 d-flex py-3 px-3">
                          <ExportButton
                            columns={[
                              {
                                name: "State",
                                selector: (row) => row?.state_name,
                              },
                            ]}
                            data={[{ state_name: "Tamil Nadu" }]}
                            filename={"state.csv"}
                            type={"Format"}
                          />
                          <div style={{ marginLeft: "auto" }}>
                            <button
                              className="btn1 me-1"
                              type="button"
                              onClick={() => {
                                setUploadedData([]);
                                setErrorsBulk("");
                                setDuplicateList([]);
                                updata.current.value = "";
                              }}
                            >
                              Clear
                            </button>
                            <button
                              onClick={bulkSubmit}
                              type="button"
                              className="btn1"
                              disabled={addLoading}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div className="col-lg-8 col-sm-6">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">State Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={StateNameData}
                        filename={"state.csv"}
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
                      persistTableHead={true}
                      columns={columns}
                      data={filterdata}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
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
        style={{ width: "40rem" }}
        header="Duplicate States"
        modal
        className="p-fluid"
        closable={uploadedData.length === 0 ? true : false}
        dismissableMask={false}
        onHide={() => {
          setVisible(false);
          setUploadedData([]);
          updata.current.value = "";
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              padding: "10px 5px",
              borderBottom: "2px solid #eee",
            }}
          >
            <span
              style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}
            >
              {duplicateList.length} Duplicates Found
            </span>

            {duplicateList.length > 0 && (
              <button
                onClick={removeAllDuplicates}
                style={{
                  background: "#ef0014ff",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Remove All
              </button>
            )}
          </div>

          <div>
            {uploadedData?.map((item, index) => {
              const isDuplicate = duplicateList.some(
                (dup) =>
                  dup.state_name.trim().toLowerCase() ===
                  item.state_name.trim().toLowerCase()
              );

              return (
                <div
                  key={index}
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid #ddd",
                    borderRadius: "6px",
                    marginBottom: "8px",
                    background: isDuplicate ? "#ffe5e5" : "#f7f7f7",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: isDuplicate ? "#d9534f" : "#333",
                      fontSize: "14px",
                    }}
                  >
                    {item.state_name}
                  </span>

                  {isDuplicate && (
                    <span style={{ color: "#d9534f", fontWeight: "600" }}>
                      Duplicate
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {duplicateList.length === 0 && uploadedData.length > 0 && (
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <button
                onClick={bulkSubmit}
                style={{
                  background: "#2a9d8f",
                  color: "white",
                  border: "none",
                  padding: "7px 10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
                disabled={addLoading}
              >
                {addLoading ? "Processing..." : "Submit"}
              </button>
            </div>
          )}

          {duplicateList.length > 0 && (
            <p className="text-center" style={{ color: "#d9534f", fontWeight: "600" }}>
              your uploaded state name already excist
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default State;
