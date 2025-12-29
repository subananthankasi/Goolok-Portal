import React, { useEffect, useState } from "react";
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
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Toast from "../../../Utils/Toast";
import ConfirmationModal from "../../../Utils/ConfirmationModal";


const WaitingContentWriting = () => {
  const [WaitingData, setWaitingData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contentdpt/new`, {
        headers: {
          "Pr-Root": "plot",
        },
      });
      // setLoading(false);
      setWaitingData(
        response.data?.map((data, index) => ({
          ...data,
          sno: index + 1,
        }))
      );
    } catch (error) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
  const [docId, setDocId] = useState("");
  const [isModalTakeTask, setIsModalTakeTask] = useState(false);

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

  const statusPopup = StatusModalOpen;

  const openModalTask = () => {
    setIsModalTakeTask(true);
  };
  const closeModaTask = () => {
    setIsModalTakeTask(false);
  };

  const handleConfirm = async () => {
    const payload = {
      taken: staffid.loginid,
    };
    try {
      await axios.put(`${API_BASE_URL}/contentdpt/${docId}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchData();
      Toast({ message: "Successfully Updated", type: "success" });
    } catch (error) {
      Toast({ message: "Failed to update", type: "error" });
    }
  };

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
      default:
        return;
    }
  }
  const filterSettings = { type: "Excel" };
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

                      {staffid?.logintype === "staff" && (
                        <ColumnDirective
                          headerText="Take task"
                          width="160"
                          template={statusPopup}
                        />
                      )}
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
        </div>
      </section>
    </>
  );
};

export default WaitingContentWriting;
