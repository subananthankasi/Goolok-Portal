import { useEffect, useRef, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DistrictCityEdit from "./DistrictCityEdit";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tab, Tabs } from "react-bootstrap";
import customStyle from "../../../Utils/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addDistrict,
  deleteDistrict,
  fetchDistrict,
} from "../../../Redux/Actions/MasterPage/DistrictAction";
import Select from "react-select";
import {
  DistrictvalidateFormData,
} from "./validation";
import Toast from "../../../Utils/Toast";
import { DeleteById } from "../../../Utils/DeleteById";
import { fetchState } from "../../../Redux/Actions/MasterPage/StateAction";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import * as XLSX from "xlsx";
import { message } from "antd";
import { Dialog } from "primereact/dialog";
import Common from "../../../common/Common";


function District() {

  const updata = useRef(null);
  const districtData = useSelector((state) => state.District.districtData);
  const stateData = useSelector((state) => state.State.StateNameData);
  const isLoading = useSelector((state) => state.District.isLoading);
  const addLoading = useSelector((state) => state.District.addLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDistrict());
    dispatch(fetchState());
  }, [dispatch]);

  // State dropdown
  const options = stateData.map((data) => ({
    value: data.id,
    label: data.state_name,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData({
      ...formData,
      state_type: selectedOption.value,
    });
    setBulkFormData({
      ...bulkFormData,
      state_type: selectedOption.value,
    });
  };

  // add new data
  const [formData, setFormData] = useState({
    state_type: "",
    district: "",
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
  const { cleanText } = Common()
  const onSubmit = async (e) => {
    e.preventDefault();
    const newData = [{
      ...formData,
      district: cleanText(formData.district),
    }];
    const validationResult = DistrictvalidateFormData(newData[0]);
    if (validationResult.isValid) {
      const res = await dispatch(addDistrict(newData));
      if (res.success) {
        Toast({ message: "Added Successfully", type: "success" });
        setErrors("");
        setFormData({ state_type: "", district: "", status: "Enable" });
        setSelectedOption(null);
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // delete district
  const handleDelete = (row) => {
    DeleteById(row.id, deleteDistrict, dispatch);
  };

  // edit modal open
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [bulkFormData, setBulkFormData] = useState({
    state_type: "",
    district: "",
    status: "Enable",
  });

  const [uploadedData, setUploadedData] = useState([]);
  const [duplicateList, setDuplicateList] = useState([]);
  const [visible, setVisible] = useState(false)
  const [errorsBulk, setErrorsBulk] = useState();
  const [errorsBulkState, setErrorsBulkState] = useState();
  const [selectState, setSelectState] = useState("");

  const handleChangeBulkStateSelect = (selectedOption) => {
    setSelectState(selectedOption);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const binaryStr = await file.arrayBuffer();
    const workbook = XLSX.read(binaryStr, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    const cleanedData = jsonData
      .map((item) => ({
        district: item.district?.trim(),
      }))
      .filter((row) => row.district && row.district.trim() !== "");
    setUploadedData(cleanedData);
    const existingDistrict = districtData.map((x) =>
      x.district.toLowerCase().trim()
    );

    const duplicates = cleanedData.filter((item) =>
      existingDistrict.includes(item.district.toLowerCase().trim())
    );

    if (duplicates.length > 0) {
      setDuplicateList(duplicates);
      setVisible(true);
    }
  };
  const validateBulkData = () => {
    if (!selectState || !selectState.value) {
      setErrorsBulkState("Please select a state");
      return false;
    }

    if (uploadedData.length === 0) {
      setErrorsBulk("No valid districts to add");
      return false;
    }
    setErrorsBulk("");
    setErrorsBulkState("");
    return true;
  };

  const bulkSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateBulkData()) return;

    const payload = uploadedData.map(item => ({
      district: item.district,
      state_type: selectState.value,
      status: "Enable"
    }));

    const res = await dispatch(addDistrict(payload));
    if (res.success) {
      Toast({ message: "Added successfully", type: "success" });

      updata.current.value = "";
      setUploadedData([]);
      setSelectState(null);
      setVisible(false);
    } else {
      message.warning(res?.error?.error);
    }
  };


  const removeAllDuplicates = () => {
    const dupNames = duplicateList.map((d) => d.district);

    const updated = uploadedData.filter(
      (item) => !dupNames.includes(item.district)
    );
    setUploadedData(updated);
    setDuplicateList([]);
    Toast({
      message: "Duplicates removed successfully.",
      type: "success",
    });
  };

  // table column
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
  const formatColumn = [
    {
      name: "District",
      selector: (row) => row.sno,
    },
  ];

  // search function
  const [filterText, setFilterText] = useState("");
  const searchColumns = [
    "sno",
    "createdat",
    "state_name",
    "district",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(districtData, filterText, searchColumns);
  /////////////////////////////////////

  return (
    <>
      <DistrictCityEdit
        isOpen={isModalOpen}
        closeModal={closeModal}
        editData={editData}
        dropdown={options}
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
                  <Tab eventKey="tab1" title="Add Single District">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-12 mb-3 ">
                            <label className="form-label" htmlFor="inputState">
                              State
                            </label>
                            <Select
                              options={options}
                              value={selectedOption}
                              onChange={handleChangeSelect}
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
                            {errors.state_type && (
                              <div className="validation_msg">
                                {errors.state_type}
                              </div>
                            )}
                          </div>

                          <div className="col-md-12 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                              District
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                            />
                            {errors.district && (
                              <div className="validation_msg">
                                {errors.district}
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
                            <div className="validation_msg">
                              {errors.status}
                            </div>
                          )}
                        </div>

                        <div className="text-end py-3 px-3">
                          <button
                            type="button"
                            className="btn1 me-1"
                            onClick={() => {
                              setFormData({
                                state_type: "",
                                district: "",
                                status: "Enable",
                              });
                              setErrors("");
                              setSelectedOption(null);
                            }}
                          >
                            Clear
                          </button>
                          <button
                            className="btn1"
                            onClick={onSubmit}
                            disabled={addLoading}
                          >
                            {addLoading ? "Processing..." : "Add"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Tab>
                  <Tab eventKey="longer-tab" title="Add Multiple District">
                    <div className="card-body">
                      <form>
                        <div className="col-md-12 mb-3 ">
                          <label className="form-label" htmlFor="inputState">
                            State
                          </label>
                          <Select
                            options={options}
                            value={selectState}
                            onChange={handleChangeBulkStateSelect}
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
                          {errorsBulkState && (
                            <div className="validation_msg">{errorsBulkState}</div>
                          )}
                        </div>
                        {/* <div className="row">
                          <div className="col-md-12 mb-3 ">
                            <label htmlFor="lastName" className="form-label">
                              Upload the excel file
                            </label>
                            <ExcelFileUpload
                              setExcelData={setExcelData}
                              fileInputRef={fileUploadRef}
                            />
                          </div>
                        </div> */}
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
                            columns={formatColumn}
                            data={[]}
                            filename={"District.csv"}
                            type={"Format"}
                          />

                          <div style={{ marginLeft: "auto" }}>
                            <button
                              type="button"
                              className="btn1 me-1"
                              onClick={() => {
                                setFormData({
                                  state_type: "",
                                  district: "",
                                  status: "",
                                });
                                setErrorsBulk("");
                                setUploadedData([]);
                                setSelectState("")
                                updata.current.value = "";
                              }}
                            >
                              Clear
                            </button>
                            <button type="submit" className="btn1" onClick={bulkSubmit}>
                              Add bulk
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
                    <h4 className="page_heading">Report</h4>
                    <div style={{ marginLeft: "auto" }}>
                      <ExportButton
                        columns={columns}
                        data={filterdata}
                        filename={"district.csv"}
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
        style={{ width: "40rem" }}
        header="Duplicate District"
        modal
        className="p-fluid"
        closable={uploadedData.length === 0 ? true : false}
        dismissableMask={false}
        onHide={() => {
          setVisible(false);
          setUploadedData([]);
          updata.current.value = "";
          setErrorsBulk("");
          setSelectState("")
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
                  dup.district.trim().toLowerCase() ===
                  item.district.trim().toLowerCase()
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
                    {item.district}
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
                type="submit"
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
              your uploaded District name already excist
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default District;
