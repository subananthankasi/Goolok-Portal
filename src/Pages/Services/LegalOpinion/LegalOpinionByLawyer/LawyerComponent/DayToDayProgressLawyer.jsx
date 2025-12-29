import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
// import API_BASE_URL from "../../../../Api/api";
import Spinner from "react-bootstrap/Spinner";
// import Toast from "../../../../Utils/Toast";
// import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmDialog } from "primereact/confirmdialog";
import { DateFormatcustom } from "../../../../../Utils/DateFormatcustom";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import customStyle from "../../../../../Utils/tableStyle";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Common from "../../../../../common/Common";
import { useSelector } from "react-redux";

export const DayToDayProgressLawyer = (props) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  //   day to day progress
  const column1 = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Ticket opened on date",
      selector: (row) => DateFormatcustom(row.open_date),
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remark,
      sortable: true,
    },
    {
      name: "Next Working Date",
      selector: (row) => DateFormatcustom(row.next_date),
      sortable: true,
    },
    ...(staffid.Login == "staff" &&
      (props.data.status === "pending" || props.data.status === "complete") &&
      props.data.pagetype !== "reminder" && enquiryDoumentData?.status !== "live"
      ? [
        {
          name: "Actions",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="edit"
                onClick={() => {
                  setEditData(row);
                  setIsModaledit(true);
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
      ]
      : []),
  ];

  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const fetchDayToDayProgress = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/allprogress/${props.data.eid}/lawyer`
      );
      setData(response.data);
    } catch {
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchDayToDayProgress();
  }, []);

  //   modal open and close
  const [isModalDay, setIsModalDay] = useState(false);

  // edit
  const [isModalEdit, setIsModaledit] = useState(false);

  const handleDelete = async (row) => {
    const confirm1 = () => {
      confirmDialog({
        message: "Are you sure you want to delete this item?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        defaultFocus: "accept",
        acceptClassName: "custom-accept-button",
        accept,
      });
    };
    const accept = async () => {
      try {
        await axios.delete(`${API_BASE_URL}/deleteprogress/${row.id}`);
        Toast({ message: "Successfully Deleted", type: "success" });
        fetchDayToDayProgress();
      } catch (error) {
        Toast({ message: "Failed to delete item", type: "error" });
        console.error("Error deleting item:", error);
      }
      // finally{
      //   fetchDayToDayProgress()
      // }
    };

    confirm1();
  };

  return (
    <>
      <AddDayProcess
        isOpen={isModalDay}
        closeModal={() => setIsModalDay(false)}
        enqid={props.data.eid}
        fetchDayToDayProgress={fetchDayToDayProgress}
      />

      <UpdateDayProcess
        isOpen={isModalEdit}
        closeModal={() => setIsModaledit(false)}
        fetchDayToDayProgress={fetchDayToDayProgress}
        editData={editData}
      />

      {!loadingPage && (
        <div>
          <div className="mt-5">
            <div className="d-flex justify-content-between mb-3">
              <h6>Day to day progress</h6>

              {staffid.Login == "staff" &&
                (props.data.status === "pending" ||
                  props.data.status === "complete") &&
                props.data.pagetype !== "reminder" &&  enquiryDoumentData?.status !=="live" && (
                  <div className="ms-2">
                    <a
                      href="#"
                      onClick={() => setIsModalDay(true)}
                      className="btn1 me-2"
                    >
                      + Add
                    </a>
                  </div>
                )}
            </div>
            <DataTable
              persistTableHead={true}
              columns={column1}
              data={data}
              customStyles={customStyle}
              pagination
              // selectableRows
              fixedHeader
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DayToDayProgressLawyer;

const AddDayProcess = ({
  isOpen,
  closeModal,
  enqid,
  fetchDayToDayProgress,
}) => {
  //   const column1 = [
  //     {
  //       name: "S.no",
  //       cell: (row, index) => index + 1,
  //       sortable: true,
  //     },
  //     {
  //       name: "Ticket opened on date",
  //       selector: (row) => row.created_at,
  //       sortable: true,
  //     },
  //     {
  //       name: "Remarks",
  //       selector: (row) => row.Remarks,
  //       sortable: true,
  //     },
  //     {
  //       name: "Next working date",
  //       selector: (row) => row.next_date,
  //       sortable: true,
  //     },
  //   ];

  const [errors, setErrors] = useState([]);
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    open_date: "",
    remark: "",
    next_date: "",
  });
  const { disableBeforeDate } = Common();

  // useEffect(()=>{
  //   if(enqid){
  //     setFormData({
  //       ...formData,
  //       enqid:enqid
  //     })
  //   }
  // },[enqid])
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      enqid: enqid,
    }));
  }, [enqid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validation = (formData) => {
    const newErrors = {};
    if (!formData.open_date) newErrors.open_date = "* is required.";
    if (!formData.remark.trim()) newErrors.remark = "* is required.";
    if (!formData.next_date) newErrors.next_date = "* is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isValid = validation(formData);
    if (isValid) {
      setloading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/addprogress`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        Toast({ message: "Successfully added", type: "success" });
        return response.data;
      } catch (error) {
        Toast({ message: "Error to add data! Try again later", type: "error" });
      } finally {
        setFormData({
          open_date: "",
          remark: "",
          next_date: "",
          enqid: enqid,
        });
        setErrors({});
        setloading(false);
        fetchDayToDayProgress();
        closeModal();
      }
    }
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 400 }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Add day by day progress</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  setFormData({
                    open_date: "",
                    remark: "",
                    next_date: "",
                    enqid: enqid,
                  });
                  setErrors({});
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="mt-3 mb-4 row">
                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">
                          Ticket opened on date
                        </label>
                      </div>
                      <div className="col-8">
                        <DatePicker
                          placement="topRight"
                          name="open_date"
                          value={
                            formData.open_date
                              ? dayjs(formData.open_date, "YYYY-MM-DD")
                              : null
                          }
                          onChange={(date) => {
                            const formatted = date
                              ? date.format("YYYY-MM-DD")
                              : "";

                            setFormData((prev) => ({
                              ...prev,
                              open_date: formatted,
                              next_date: "",
                            }));
                          }}
                          format="DD/MM/YYYY"
                          style={{ width: "100%" }}
                        />

                        {/* <input
                          className="form-control"
                          type="date"
                          name="open_date"
                          value={formData.open_date}
                          onChange={handleChange}
                        /> */}
                        {errors.open_date && (
                          <div className="validation_msg">
                            {" "}
                            {errors.open_date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Remarks</label>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control"
                          type="text"
                          name="remark"
                          value={formData.remark}
                          onChange={handleChange}
                        />
                        {errors.remark && (
                          <div className="validation_msg"> {errors.remark}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Next working date</label>
                      </div>
                      <div className="col-8">
                        <DatePicker
                          placement="topRight"
                          name="next_date"
                          value={
                            formData.next_date
                              ? dayjs(formData.next_date, "YYYY-MM-DD")
                              : null
                          }
                          onChange={(next_date) =>
                            handleChange({
                              target: {
                                name: "next_date",
                                value: next_date
                                  ? next_date?.format("YYYY-MM-DD")
                                  : "",
                              },
                            })
                          }
                          format="DD/MM/YYYY"
                          style={{ width: "100%" }}
                          disabledDate={disableBeforeDate(formData.open_date)}
                        />
                        {/* <input
                          className="form-control"
                          type="date"
                          name="next_date"
                          value={formData.next_date}
                          onChange={handleChange}
                        /> */}
                        {errors.next_date && (
                          <div className="validation_msg">
                            {" "}
                            {errors.next_date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button
                    className="btn1 me-1"
                    type="button"
                    onClick={() => {
                      setFormData({
                        open_date: "",
                        remark: "",
                        next_date: "",
                        enqid: enqid,
                      });
                      setErrors({});
                    }}
                  >
                    Clear
                  </button>
                  <button
                    className="btn1"
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">wait...</span>
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const UpdateDayProcess = ({
  isOpen,
  closeModal,
  fetchDayToDayProgress,
  editData,
}) => {
  const [errors, setErrors] = useState([]);
  const [loading, setloading] = useState(false);
  const { disableBeforeDate } = Common();
  const [formData, setFormData] = useState({
    open_date: "",
    remark: "",
    next_date: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validation = (formData) => {
    const newErrors = {};
    if (!formData.open_date) newErrors.open_date = "* is required.";
    if (!formData.remark.trim()) newErrors.remark = "* is required.";
    if (!formData.next_date) newErrors.next_date = "* is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isValid = validation(formData);
    if (isValid) {
      setloading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/addprogress`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        Toast({ message: "Successfully updated", type: "success" });
      } catch (error) {
        Toast({
          message: "error to update data! try agian later",
          type: "error",
        });
      } finally {
        setErrors({});
        setloading(false);
        fetchDayToDayProgress();
        closeModal();
      }
    }
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 400 }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Update Data</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  setErrors({});
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>
                <div className="mt-3 mb-4 row">
                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">
                          Ticket opened on date
                        </label>
                      </div>
                      <div className="col-8">
                        <DatePicker
                          placement="topRight"
                          name="open_date"
                          value={
                            formData.open_date
                              ? dayjs(formData.open_date, "YYYY-MM-DD")
                              : null
                          }
                          onChange={(date) => {
                            const formatted = date
                              ? date.format("YYYY-MM-DD")
                              : "";

                            setFormData((prev) => ({
                              ...prev,
                              open_date: formatted,
                              next_date: "",
                            }));
                          }}
                          format="DD/MM/YYYY"
                          style={{ width: "100%" }}
                        />

                        {/* <input
                          className="form-control"
                          type="date"
                          name="open_date"
                          value={formData.open_date}
                          onChange={handleChange}
                        /> */}
                        {errors.open_date && (
                          <div className="validation_msg">
                            {" "}
                            {errors.open_date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Remarks</label>
                      </div>
                      <div className="col-8">
                        <input
                          className="form-control"
                          type="text"
                          name="remark"
                          value={formData.remark}
                          onChange={handleChange}
                        />
                        {errors.remark && (
                          <div className="validation_msg"> {errors.remark}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="row">
                      <div className="col-4">
                        <label className="form-label">Next working date</label>
                      </div>
                      <div className="col-8">
                        <DatePicker
                          placement="topRight"
                          name="next_date"
                          value={
                            formData.next_date
                              ? dayjs(formData.next_date, "YYYY-MM-DD")
                              : null
                          }
                          onChange={(next_date) =>
                            handleChange({
                              target: {
                                name: "next_date",
                                value: next_date
                                  ? next_date?.format("YYYY-MM-DD")
                                  : "",
                              },
                            })
                          }
                          format="DD/MM/YYYY"
                          style={{ width: "100%" }}
                          disabledDate={disableBeforeDate(formData.open_date)}
                        />
                        {/* <input
                          className="form-control"
                          type="date"
                          name="next_date"
                          value={formData.next_date}
                          onChange={handleChange}
                        /> */}
                        {errors.next_date && (
                          <div className="validation_msg">
                            {" "}
                            {errors.next_date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button
                    className="btn1 me-1"
                    type="button"
                    onClick={() => {
                      setErrors({});
                    }}
                  >
                    Clear
                  </button>
                  <button
                    className="btn1"
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">wait...</span>
                      </>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
