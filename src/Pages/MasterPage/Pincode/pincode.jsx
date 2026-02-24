import { useEffect, useRef, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PincodeEdit from "./pincodeEdit";
import { SearchData } from "../../../Utils/Search";
import ExportButton from "../../../Utils/ExportButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addPincode,
  deletePincode,
  fetchPincode,
} from "../../../Redux/Actions/MasterPage/PincodeAction";
import customStyle from "../../../Utils/tableStyle";
import StateDropDown from "../../../Utils/SelectDropDown/StateDropDown";
import DistrictDropDown from "../../../Utils/SelectDropDown/DistrictDropDown";
import TalukDropDown from "../../../Utils/SelectDropDown/TalukDropDown";
import VillageDropDown from "../../../Utils/SelectDropDown/VillageDropDown";
import {
  PincodeValidateFormData,
  PincodeValidateFormDatas,
} from "./Validation";
import Toast from "../../../Utils/Toast";
import { DeleteById } from "../../../Utils/DeleteById";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import { Dialog } from "primereact/dialog";
import * as XLSX from "xlsx";
import { message } from "antd";



function Pincode() {
  // get pincode all data
  const pincodeData = useSelector((state) => state.Pincode.PincodeData);
  const isLoading = useSelector((state) => state.Pincode.isLoading);
  const addLoading = useSelector((state) => state.Pincode.addLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPincode());
  }, [dispatch]);

  // add new data
  const [formData, setFormData] = useState({
    pin_state: " ",
    pin_district: " ",
    pin_taluk: " ",
    pin_village: "",
    pincode: "",
    status: "Enable",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "pincode") {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      [name]: onlyNumbers
    }));

    if (value && /\D/.test(value)) {
      setErrors((prev) => ({ ...prev, pincode: "Only numbers allowed" }));
    } else if (onlyNumbers.length > 0 && onlyNumbers.length < 6) {
      setErrors((prev) => ({ ...prev, pincode: "Pincode must be 6 digits" }));
    } else if (onlyNumbers.length === 6) {
      setErrors((prev) => ({ ...prev, pincode: "" }));
    } else {
      setErrors((prev) => ({ ...prev, pincode: "" }));
    }

    return;
  }

  setFormData({ ...formData, [name]: value });
};


  // set dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedTaluk, setSelectedTaluk] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedTaluk(null);
    setSelectedVillage(null);
  };

  const handleTalukSelect = (taluk) => {
    setSelectedTaluk(taluk);
    setSelectedVillage(null);
  };

  const handleVillageSelect = (village) => {
    setSelectedVillage(village);
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      pin_state: selectedState ? selectedState.value : "",
      pin_district: selectedDistrict ? selectedDistrict.value : "",
      pin_taluk: selectedTaluk ? selectedTaluk.value : "",
      pin_village: selectedVillage ? selectedVillage.value : "",
    }));

    setBulkFormData((prevState) => ({
      ...prevState,
      pin_state: selectedState ? selectedState.value : "",
      pin_district: selectedDistrict ? selectedDistrict.value : "",
      pin_taluk: selectedTaluk ? selectedTaluk.value : "",
      pin_village: selectedVillage ? selectedVillage.value : "",
    }));
  }, [selectedState, selectedDistrict, selectedTaluk, selectedVillage]);

  // submit

  const [errors, setErrors] = useState({}); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = PincodeValidateFormData(formData);
    if (result.isValid) {
      Toast({ message: "Added successfully", type: "success" });
      handleResetSelected();
      dispatch(addPincode([formData]));
    } else {
      setErrors(result.errors);
    }
  };

  const handleResetSelected = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedTaluk(null);
    setSelectedVillage(null);
    setFormData({ pincode: "", status: "Enable" });
    setErrors("");
    setErrorMessageBulk("");
  };

  // delete
  const handleDelete = (row) => {
    DeleteById(row.id, deletePincode, dispatch);
  };

  // edit
  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  const [bulkFormData, setBulkFormData] = useState({
    pin_state: " ",
    pin_district: " ",
    pin_taluk: " ",
    pin_village: "",
    pincode: "",
    status: "Enable",
  });

  const [errorMessageBulk, setErrorMessageBulk] = useState("");

  const updata = useRef(null);
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
        pincode: item.pincode?.trim(),
      }))
      .filter((row) => row.pincode && row.pincode.trim() !== "");
    setUploadedData(cleanedData);

    const existingDistrict = pincodeData.map((x) =>
      x.pincode.toLowerCase().trim()
    );

    const duplicates = cleanedData.filter((item) =>
      existingDistrict.includes(item.pincode.toLowerCase().trim())
    );

    if (duplicates.length > 0) {
      setDuplicateList(duplicates);
      setVisible(true);
    }
  };


  const bulkSubmit = async (e) => {
    e.preventDefault();
    const payload = uploadedData.map(item => ({
      pin_state: bulkFormData.pin_state,
      pin_district: bulkFormData.pin_district,
      pin_taluk: bulkFormData.pin_taluk,
      pin_village: bulkFormData.pin_village,
      pincode: item.Pincode,
      status: bulkFormData.status,
    }));
    const validationResult = PincodeValidateFormDatas(payload[0]);
    if (validationResult.isValid) {
      const res = await dispatch(addPincode(payload));
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
    const dupNames = duplicateList.map((d) => d.taluk_name);

    const updated = uploadedData.filter(
      (item) => !dupNames.includes(item.taluk_name)
    );
    setUploadedData(updated);
    setDuplicateList([]);
    Toast({
      message: "Duplicates removed successfully.",
      type: "success",
    });
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
      name: "Pincode",
      selector: (row) => row.pincode,
      sortable: true,
      width: "150px",

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
      name: "Pincode",
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
    "pincode",
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(pincodeData, filterText, searchColumns);
  /////////////////////////////////////

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PincodeEdit
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
                  <Tab eventKey="tab1" title="Add Single Pincode">
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
                            {errors.pin_state && (
                              <div className="validation_msg">
                                {errors.pin_state}
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
                            {errors.pin_district && (
                              <div className="validation_msg">
                                {errors.pin_district}
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
                            {errors.pin_taluk && (
                              <div className="validation_msg">
                                {errors.pin_taluk}
                              </div>
                            )}
                          </div>

                          <div className="mb-3 col-md-12">
                            <label className="form-label" htmlFor="inputState">
                              Village
                            </label>
                            <VillageDropDown
                              onSelect={handleVillageSelect}
                              selectedVillage={selectedVillage}
                              filter={selectedTaluk}
                            />
                            {errors.pin_village && (
                              <div className="validation_msg">
                                {errors.pin_village}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Pincode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                          />
                          {errors.pincode && (
                            <div className="validation_msg">
                              {errors.pincode}
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
                          <button
                            className="btn1 me-1"
                            type="button"
                            onClick={handleResetSelected}
                          >
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
                  <Tab eventKey="longer-tab" title="Add Multiple Pincode">
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

                        <div className="mb-3 col-md-12">
                          <label className="form-label" htmlFor="inputState">
                            Village
                          </label>
                          <VillageDropDown
                            onSelect={handleVillageSelect}
                            selectedVillage={selectedVillage}
                            filter={selectedTaluk}
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
                            filename={"Pincode.csv"}
                            type={"Format"}
                          />
                          <div style={{ marginLeft: "auto" }}>
                            <button
                              className="btn1 me-1"
                              type="button"
                              onClick={handleResetSelected}
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
                        data={pincodeData}
                        filename={"pincode.csv"}
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
                  dup.pincode.trim().toLowerCase() ===
                  item.pincode.trim().toLowerCase()
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
                    {item.pincode}
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
              your uploaded pincode already excist
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default Pincode;
