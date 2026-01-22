import React, { useEffect, useState } from 'react'
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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import API_BASE_URL from '../../../Api/api';
import Toast from '../../../Utils/Toast';
import ConfirmationModal from '../../../Utils/ConfirmationModal';



const WaitingLocCom = () => {

const staffid = JSON.parse(localStorage.getItem('token'));
const [loading, setLoading] = useState(true);


const [locationWaitingData, setLocationWaitingData] = useState([])

const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/location/new`, {
      headers: {
        "Pr-Root": "commercial"
      }
    })
    setLoading(false);
    setLocationWaitingData(
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
        openModalTask();
        setDocId(props.id);
      }}
    >
      Take <TaskAltIcon sx={{ fontSize: 20 }} />
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
const handleConfirm = async () => {
  const updateData = {
    "taken": staffid.loginid,
  }
  try {
    await axios.put(`${API_BASE_URL}/location/${docId}`, updateData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    fetchData()
    Toast({ message: "Successfully Updated", type: "success" })
  } catch (error) {
    Toast({ message: "Failed to update", type: "error" })
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
              <div className="">
                <div className="card-body">
                  <h4 className="page_heading">Waiting Location Report</h4>
                  <div className="col-lg-12 mb-4 mt-4">
                    <GridComponent
                      id="DefaultExport"
                      dataSource={locationWaitingData}
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
                          template={(props) => props.created_at}
                        />
                        <ColumnDirective
                          field="customer"
                          headerText="Customer Name"
                          width="150"
                        />
                        <ColumnDirective
                          headerText="Age"
                          width="150"
                          template={(props) => props.age}
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

                        {staffid?.logintype == "staff" &&
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
            </div>
          )}
        </div>
      </div>
    </section>
  </>
);
}

export default WaitingLocCom