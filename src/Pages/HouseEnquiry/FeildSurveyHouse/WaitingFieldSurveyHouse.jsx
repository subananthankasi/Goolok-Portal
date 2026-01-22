import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  ExcelExport,
  PdfExport,
  Sort,
  Page,
  Filter,
} from "@syncfusion/ej2-react-grids";
import Spinner from "react-bootstrap/Spinner";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useDispatch, useSelector } from "react-redux";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import ConfirmationModal from "../../../Utils/ConfirmationModal";
import { fetchStaff } from "../../../Redux/Actions/MasterPage/Staff";



const  WaitingFieldSurveyHouse = () => {

  const staffid = JSON.parse(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);


  const [WaitingData, setWaitingData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fieldsurvey/new`, {
        headers: {
          "Pr-Root": "house"
        }
      })
      setLoading(false);
      setWaitingData(
        response.data?.map((data, index) => ({
          ...data,
          sno: index + 1
        })))
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData()
  }, []);

  const [docId, setDocId] = useState("");
  function StatusModalOpen(props) {
    return (
      <button
        className="btn btn_pdf btn-outline-danger"
        data-tooltip-id="status"
        onClick={() => {
          setVisible(true);
          setDocId(props.id);
        }}
      >
        Assign ticket <TaskAltIcon sx={{ fontSize: 20 }} />
      </button>
    );
  }


  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
  const statusPopup = StatusModalOpen;

  let gridInstance;

  function toolbarClick(args) {
    switch (args.item.id) {
      case "DefaultExport_pdfexport":
        gridInstance.pdfExport();
        break;
      case "DefaultExport_excelexport":
        gridInstance.excelExport();
        break;
      case "DefaultExport_csvexport":
        gridInstance.csvExport();
        break;
    }
  }


  const [isModalTakeTask, setIsModalTakeTask] = useState(false);
  const openModalTask = () => {
    setIsModalTakeTask(true);
  };
  const closeModaTask = () => {
    setIsModalTakeTask(false);
  };


  // take task 

  const staffdata = useSelector(state => state.staff.staff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const [taken, setTeken] = useState("")
  const [visible, setVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirm = async () => {
    if (!taken) {
      setErrorMsg((prev) => ({ ...prev, taken: "Please select a staff member." }));
      return;
    } else {
      setErrorMsg((prev) => ({ ...prev, taken: "" }));
    }
    setErrorMsg("");
    const updateData = {
      taken: taken,
    }
    try {
      await axios.put(`${API_BASE_URL}/fieldsurvey/${docId}`, updateData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchData()
      setVisible(false)
      Toast({ message: "Successfully Updated", type: "success" })
      setTeken("")
    } catch (error) {
      const errorMessage = error.response.data.messages.error
      Toast({ message: errorMessage, type: "error" })
    }
  }

  return (
    <>


      <ConfirmationModal
        isOpen={isModalTakeTask}
        closeModal={closeModaTask}
        onConfirm={handleConfirm}
        message={"Are you sure you want to take this ?"}
      />

      <section className="section1">
        <div className="">
          <div className="row">
            {loading ? (
              <div
                style={{
                  height: "32vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spinner className="mt-auto" />
              </div>
            ) : (
              <div className="col-12">
                  <div className="card-body p-1">
                    <h4 className="page_heading">Waiting Report</h4>
                    <div className="col-lg-12 mb-4 mt-4">
                      <GridComponent
                        id="DefaultExport"
                        dataSource={WaitingData}
                        allowTextWrap={true}
                        ref={(grid) => (gridInstance = grid)}
                        toolbar={toolbarOptions}
                        allowExcelExport={true}
                        allowPdfExport={true}
                        allowSorting={true}
                        allowFiltering={true}
                        allowPaging={true}
                        filterSettings={filterSettings}
                        toolbarClick={toolbarClick.bind(this)}
                        height="350"
                      >
                        <ColumnsDirective>
                          <ColumnDirective
                            field="sno"
                            headerText="S.no"
                            width="150"
                          />
                          <ColumnDirective
                            headerText="Date"
                            width="150"
                            field="created_at"
                          />
                          <ColumnDirective
                            field="customer"
                            headerText="Customer Name"
                            width="150"
                          />
                          <ColumnDirective
                            headerText="Age"
                            width="150"
                            field="age"
                          />
                          <ColumnDirective
                            field="mobile"
                            headerText="Mobile"
                            width="150"
                          />
                          <ColumnDirective
                            field="email_id"
                            headerText="Email"
                            width="150"
                          />

                          {staffid?.logintype == "admin" &&
                            <ColumnDirective
                              headerText="Take task"
                              width="160"
                              template={statusPopup}
                            />}
                        </ColumnsDirective>
                        <Inject
                          services={[
                            Toolbar,
                            ExcelExport,
                            PdfExport,
                            Sort,
                            Filter,
                            Page,
                          ]}
                        />
                      </GridComponent>
                    </div>
                  </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Dialog header="Assign Ticket" visible={visible} style={{ width: '30vw' }} onHide={() => { setVisible(false); setErrorMsg(""); setTeken("") }}>
        <form autoComplete="off">
          <div>
            <p style={{ fontWeight: "600" }}> <ErrorOutlineIcon sx={{ fontSize: 25 }} /> Please Select The Staff before Submit </p>
          </div>
          <div className="form-group">
            <label htmlFor="taken" className="form-label">Select Staff :  </label>
            <select
              name="taken"
              id="taken"
              className="form-select"
              value={taken}
              onChange={(e) => setTeken(e.target.value)}
            >
              <option value=""> Select Staff  </option>
              {
                staffdata.map((item) => (
                  <option key={item.id} value={item.id}> {item.staff_name}  </option>
                ))
              }
            </select>
            {errorMsg.taken && (
              <div className="validation_msg">{errorMsg.taken}</div>
            )}

          </div>
          <div className="d-flex justify-content-end mt-3 gap-3">
            <Button variant="outlined" color="error" onClick={() => { setVisible(false); setErrorMsg(""); setTeken("") }} >Cancel</Button>
            <Button variant="contained" onClick={handleConfirm}>Submit</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default WaitingFieldSurveyHouse;


