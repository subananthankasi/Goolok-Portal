import { useEffect, useRef, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tab, Tabs } from "react-bootstrap";
import VillageEdit from "./villageEdit";
import customStyle from "../../../Utils/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addVillage,
  deleteVillage,
  fetchVillage,
} from "../../../Redux/Actions/MasterPage/VillageAction";
import StateDropDown from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown from "../../../Utils/SelectDropDown/TalukDropDown";
import {
  VillageValidateFormData,
  VillageValidateFormDatas,
} from "./valiadation";
import Toast from "../../../Utils/Toast";
import { DeleteById } from "../../../Utils/DeleteById";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import { Dialog } from "primereact/dialog";
import * as XLSX from "xlsx";
import { message } from "antd";
import Common from "../../../common/Common";


function Village() {
  const { cleanText } = Common()
  const VillageData = useSelector((state) => state.Village.villageData);
  const isLoading = useSelector((state) => state.Village.isLoading);
  const addLoading = useSelector((state) => state.Village.addLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVillage());
  }, [dispatch]);

  // add new data
  const [formData, setFormData] = useState({
    village_state: " ",
    village_district: " ",
    village_taluk: " ",
    village_name: "",
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      village_name: cleanText(formData.village_name),
    };
    const validationResult = VillageValidateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(addVillage([formData]))
      if (res.success) {
        Toast({ message: "Added Successfully", type: "success" });
        setErrors("");
        handleResetSelected();
      } else {
        setErrors(res?.error);
      }
    } else {
      setErrors(validationResult.errors);
    }
  };
  const handleResetSelected = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
  };

  // set dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      village_state: selectedState ? selectedState.value : "",
      village_district: selectedDistrict ? selectedDistrict.value : "",
      village_taluk: selectedTaluk ? selectedTaluk.value : "",
    }));

    setBulkFormData((prevState) => ({
      ...prevState,
      village_state: selectedState ? selectedState.value : "",
      village_district: selectedDistrict ? selectedDistrict.value : "",
      village_taluk: selectedTaluk ? selectedTaluk.value : "",
    }));
  }, [selectedState, selectedDistrict, selectedTaluk]);

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
      width: "150px",

    },
    {
      name: "State",
      selector: (row) => row.state_name,
      sortable: true,
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
      width: "170px",

    },
    {
      name: "Village",
      selector: (row) => row.village_name,
      sortable: true,
      wrap: true,
      width: "170px",

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
  const formatColumn = [
    {
      name: "Village Name",
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
    "taluk_name",
    "village_name",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(VillageData, filterText, searchColumns);
  /////////////////////////////////////

  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // delete

  const handleDelete = (row) => {
    DeleteById(row.id, deleteVillage, dispatch);
  };

  const [bulkFormData, setBulkFormData] = useState({
    village_state: " ",
    village_district: " ",
    village_taluk: " ",
    village_name: "",
    status: "Enable",
  });

  const [errorMessageBulk, setErrorMessageBulk] = useState(""); const updata = useRef(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [duplicateList, setDuplicateList] = useState([]);
  const [visible, setVisible] = useState(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const binaryStr = await file.arrayBuffer();
    const workbook = XLSX.read(binaryStr, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    const cleanedData = jsonData
      .map((item) => ({
        village_name: item.village?.trim(),
      }))
      .filter((row) => row.village_name && row.village_name.trim() !== "");
    setUploadedData(cleanedData);
    const existingDistrict = VillageData.map((x) =>
      x.village_name.toLowerCase().trim()
    );

    const duplicates = cleanedData.filter((item) =>
      existingDistrict.includes(item.village_name.toLowerCase().trim())
    );

    if (duplicates.length > 0) {
      setDuplicateList(duplicates);
      setVisible(true);
    }
  };
  const bulkSubmit = async (e) => {
    e.preventDefault();
    const payload = uploadedData.map(item => ({
      village_name: item.village_name,
      village_state: bulkFormData.village_state,
      village_district: bulkFormData.village_district,
      village_taluk: bulkFormData.village_taluk,
      status: bulkFormData.status,
    }));
    const validationResult = VillageValidateFormDatas(payload[0]);
    if (validationResult.isValid) {
      const res = await dispatch(addVillage(payload));
      if (res?.success) {
        Toast({ message: "Added successfully", type: "success" });
        updata.current.value = "";
        setUploadedData([]);
        handleResetSelected();
        setErrorMessageBulk("");
        setVisible(false);
      } else {
        message.warning(res?.error?.error);
      }
    } else {
      setErrorMessageBulk(validationResult.errorMessage);
    }
  };


  const removeAllDuplicates = () => {
    const dupNames = duplicateList.map((d) => d.village_name);

    const updated = uploadedData.filter(
      (item) => !dupNames.includes(item.village_name)
    );
    setUploadedData(updated);
    setDuplicateList([]);
    Toast({
      message: "Duplicates removed successfully.",
      type: "success",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleResetSelected();
    setErrors("");
    setErrorMessageBulk("");
    setFormData({ village_name: "", status: "Enable" });
  };
  return (
    <>
      <VillageEdit
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
                  <Tab eventKey="tab1" title="Add Single Village">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-12 mb-3 ">
                            <label className="form-label" htmlFor="inputState">
                              State
                            </label>
                            <StateDropDown
                              onSelect={handleStateSelect}
                              selectedState={selectedState}
                            />
                            {errors.village_state && (
                              <div className="validation_msg">
                                {errors.village_state}
                              </div>
                            )}
                          </div>

                          <div className="mb-3 col-md-12">
                            <label className="form-label" htmlFor="inputState">
                              District
                            </label>
                            <DistrictDropDown
                              onSelect={handleDistrictSelect}
                              selectedDistrict={selectedDistrict}
                              filter={selectedState}
                            />
                            {errors.village_district && (
                              <div className="validation_msg">
                                {errors.village_district}
                              </div>
                            )}
                          </div>

                          <div className="mb-3 col-md-12">
                            <label className="form-label" htmlFor="inputState">
                              Taluk
                            </label>
                            <TalukDropDown
                              onSelect={handleTalukSelect}
                              selectedTaluk={selectedTaluk}
                              filter={selectedDistrict}
                            />
                            {errors.village_taluk && (
                              <div className="validation_msg">
                                {errors.village_taluk}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Village
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="village_name"
                            value={formData.village_name}
                            onChange={handleChange}
                          />
                          {errors.village_name && (
                            <div className="validation_msg">
                              {errors.village_name}
                            </div>
                          )}
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
                          <button className="btn1 me-1" onClick={handleCancel}>
                            Clear
                          </button>
                          <button
                            className="btn1"
                            onClick={handleSubmit}
                            disabled={addLoading}
                          >
                            {addLoading ? "Processing..." : "Add"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Tab>
                  <Tab eventKey="longer-tab" title="Add Multiple Village">
                    <div className="card-body">
                      <form>
                        <div className="col-md-12 mb-3 ">
                          <label className="form-label" htmlFor="inputState">
                            State
                          </label>
                          <StateDropDown
                            onSelect={handleStateSelect}
                            selectedState={selectedState}
                          />
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label className="form-label" htmlFor="inputState">
                            District
                          </label>
                          <DistrictDropDown
                            onSelect={handleDistrictSelect}
                            selectedDistrict={selectedDistrict}
                            filter={selectedState}
                          />
                        </div>

                        <div className="mb-3 col-md-12">
                          <label className="form-label" htmlFor="inputState">
                            Taluk
                          </label>
                          <TalukDropDown
                            onSelect={handleTalukSelect}
                            selectedTaluk={selectedTaluk}
                            filter={selectedDistrict}
                          />
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
                          </div>
                        </div>

                        {errorMessageBulk && (
                          <div className="alert alert-danger" role="alert">
                            {errorMessageBulk}
                          </div>
                        )}

                        <div className="col-md-12 d-flex py-3 px-3">
                          <ExportButton
                            columns={formatColumn}
                            data={[]}
                            filename={"Village.csv"}
                            type={"Format"}
                          />

                          <div style={{ marginLeft: "auto" }}>
                            <button
                              className="btn1 me-1"
                              onClick={handleCancel}
                            >
                              Clear
                            </button>
                            <button
                              className="btn1"
                              onClick={bulkSubmit}
                              disabled={addLoading}
                            >
                              {addLoading ? "Processing..." : "Add"}
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
                        data={VillageData}
                        filename={"Village.csv"}
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
                      fixedHeader
                      persistTableHead={true}
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
        header="Duplicate Taluk"
        modal
        className="p-fluid"
        closable={uploadedData.length === 0 ? true : false}
        dismissableMask={false}
        onHide={() => {
          setVisible(false);
          setUploadedData([]);
          updata.current.value = "";
          handleResetSelected();
          setErrorMessageBulk("");
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
                  dup.village_name.trim().toLowerCase() ===
                  item.village_name.trim().toLowerCase()
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
                    {item.village_name}
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
              your uploaded village name already excist
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default Village;
