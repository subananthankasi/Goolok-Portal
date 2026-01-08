import React, { useEffect, useRef, useState } from "react";
import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AreaEdit from "./areaEdit";
import ExportButton from "../../../Utils/ExportButton";
import { SearchData } from "../../../Utils/Search";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaluk,
  deleteTaluk,
  fetchTaluk,
} from "../../../Redux/Actions/MasterPage/TalukAction";
import customStyle from "../../../Utils/tableStyle";
import DistrictDropDown from "../../../Utils/SelectDropDown/DistrictDropDown";
import StateDropDown from "../../../Utils/SelectDropDown/StateDropDown";
import { TalukvalidateFormData, TalukvalidateFormDatas } from "./ares";
import Toast from "../../../Utils/Toast";
import { DeleteById } from "../../../Utils/DeleteById";
import ExcelFileUpload from "../../../Utils/ExcelFileUpload";
import CustomLoder from "../../../Components/customLoader/CustomLoder";
import { Dialog } from "primereact/dialog";
import * as XLSX from "xlsx";
import { message } from "antd";
import Common from "../../../common/Common";



function Area() {
  // getting needed data
  const dispatch = useDispatch();
  const TalukData = useSelector((state) => state.Taluk.TalukData);
  const isLoading = useSelector((state) => state.Taluk.isLoading);
  const addLoading = useSelector((state) => state.Taluk.addLoading);

  useEffect(() => {
    dispatch(fetchTaluk());
  }, [dispatch]);

  // add new taluk
  const [formData, setFormData] = useState({
    taluk_state: "",
    taluk_district: "",
    taluk_name: "",
    status: "Enable",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // dropdown
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(null);
  };
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  useEffect(() => {
    if (selectedDistrict) {
      setFormData((prevState) => ({
        ...prevState,
        taluk_district: selectedDistrict.value,
      }));

      setBulkFormData((prevState) => ({
        ...prevState,
        taluk_district: selectedDistrict.value,
      }));
    }

    if (selectedState) {
      setFormData((prevState) => ({
        ...prevState,
        taluk_state: selectedState.value,
      }));

      setBulkFormData((prevState) => ({
        ...prevState,
        taluk_state: selectedState.value,
      }));
    }
  }, [selectedDistrict, selectedState]);

  const handleResetSelected = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
  };

  // submit
  const [errors, setErrors] = useState({});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationResult = TalukvalidateFormData(formData);
  //   if (validationResult.isValid) {
  //     Toast({ message: "Added successfully", type: "success" });
  //     setFormData({ taluk_name: "", status: "Enable" });
  //     setErrors({});
  //     handleResetSelected();
  //     dispatch(addTaluk([formData]));
  //   } else {
  //     setErrors(validationResult.errors);
  //   }
  // };

  //  edit data
  const { cleanText } = Common()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      taluk_name: cleanText(formData.taluk_name),
    };
    const validationResult = TalukvalidateFormData(newData);
    if (validationResult.isValid) {
      const res = await dispatch(addTaluk([formData]));
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


  const [editData, setEditData] = useState();
  const handleEdit = (row) => {
    setEditData(row);
  };

  // delete
  const handleDelete = (row) => {
    DeleteById(row.id, deleteTaluk, dispatch);
  };

  // bulk upload data get
  const fileUploadRef = useRef(null);
  const [excelData, setExcelData] = useState([]);
  const [bulkFormData, setBulkFormData] = useState({
    taluk_state: "",
    taluk_district: "",
    taluk_name: "",
    status: "Enable",
  });

  // convert json format
  // const bulkData = excelData.map((data) => ({
  //   taluk_state: bulkFormData.taluk_state,
  //   taluk_district: bulkFormData.taluk_district,
  //   taluk_name: data.Taluk,
  //   status: bulkFormData.status,
  // }));

  const [errorMessageBulk, setErrorMessageBulk] = useState("");

  // const BulkSubmit = (e) => {
  //   e.preventDefault();
  //   const validationResult = TalukvalidateFormDatas(bulkData[0]);

  //   if (validationResult.isValid) {
  //     fileUploadRef.current.value = "";
  //     Toast({ message: "Added successfully", type: "success" });
  //     setExcelData([]);
  //     handleResetSelected();
  //     setErrorMessageBulk("");
  //     dispatch(addTaluk(bulkData));
  //   } else {
  //     setErrorMessageBulk(validationResult.errorMessage);
  //   }
  // };
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
        taluk_name: item.taluk?.trim(),
      }))
      .filter((row) => row.taluk_name && row.taluk_name.trim() !== "");
    setUploadedData(cleanedData);

    const existingDistrict = TalukData.map((x) =>
      x.taluk_name.toLowerCase().trim()
    );

    const duplicates = cleanedData.filter((item) =>
      existingDistrict.includes(item.taluk_name.toLowerCase().trim())
    );

    if (duplicates.length > 0) {
      setDuplicateList(duplicates);
      setVisible(true);
    }
  };


  const bulkSubmit = async (e) => {
    e.preventDefault();
    const payload = uploadedData.map(item => ({
      taluk_name: item.taluk_name,
      taluk_state: bulkFormData.taluk_state,
      taluk_district: bulkFormData.taluk_district,
      status: bulkFormData.status,
    }));
    const validationResult = TalukvalidateFormDatas(payload[0]);
    if (validationResult.isValid) {
      const res = await dispatch(addTaluk(payload));
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
      width: "150px",

    },
    {
      name: "Taluk",
      selector: (row) => row.taluk_name,
      sortable: true,
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
      name: "Taluk",
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
    "status",
  ];
  const handleFilter = (event) => {
    setFilterText(event.target.value);
  };
  const filterdata = SearchData(TalukData, filterText, searchColumns);
  /////////////////////////////////////

  // edit modal set
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      taluk_name: "",
      status: "Enable",
    });
    setSelectedDistrict(null);
    setSelectedState(null);
    setErrors("");
    setErrorMessageBulk("");
  };

  return (
    <>
      <AreaEdit
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
                  <Tab eventKey="tab1" title="Add Single Taluk">
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
                            {errors.taluk_state && (
                              <div className="validation_msg">
                                {errors.taluk_state}
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
                            {errors.taluk_district && (
                              <div className="validation_msg">
                                {errors.taluk_district}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Taluk
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="taluk_name"
                            value={formData.taluk_name}
                            onChange={handleChange}
                          />
                          {errors.taluk_name && (
                            <div className="validation_msg">
                              {errors.taluk_name}
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
                            {addLoading ? "processing..." : "Add"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Tab>
                  <Tab eventKey="longer-tab" title="Add Multiple Taluk">
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
                            filename={"Taluk.csv"}
                            type={"Format"}
                          />

                          <div style={{ marginLeft: "auto" }}>
                            <button
                              className="btn1 me-1"
                              onClick={handleCancel}
                            >
                              Clear
                            </button>
                            <button className="btn1" onClick={bulkSubmit}>
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
                        data={TalukData}
                        filename={"Taluk.csv"}
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
                  dup.taluk_name.trim().toLowerCase() ===
                  item.taluk_name.trim().toLowerCase()
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
                    {item.taluk_name}
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
              your uploaded Taluk name already excist
            </p>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default Area;
