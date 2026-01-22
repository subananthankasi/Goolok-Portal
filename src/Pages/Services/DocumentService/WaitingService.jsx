import React, { useEffect, useState } from "react";
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
import API_BASE_URL from "../../../Api/api";
import ConfirmationModal from "../../../Utils/ConfirmationModal";
import AlertPop from "../../../Utils/AlertPop";
import Toast from "../../../Utils/Toast";

const WaitingService = () => {
  const staffid = JSON.parse(localStorage.getItem("token"));

  const [loading, setLoading] = useState(false);
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];

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
        break;
    }
  }

  const [enquiryDataFromWebsite, setEnquiryDataFromWebsite] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/landservice`, {
        headers: {
          "Gl-status": "all",
          Level: "get patta for your property",
        },
      });
      setLoading(false);
      setEnquiryDataFromWebsite(
        response.data?.map((data, index) => ({
          ...data,
          sno: index + 1,
        }))
      );
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
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

  function DocumentDropdown(props) {
    return (
      <>
        <div>
          <button
            className="btn btn-sm btn-primary w-50"
            data-tooltip-id="status"
            onClick={() => {
              openModalDoc();
              setDocId(props.id);
            }}
          >
            {props.count}
          </button>
        </div>
      </>
    );
  }
  const statusPopup = StatusModalOpen;
  const multiSelectDocument = DocumentDropdown;

  const [isModalDoc, setIsModalDoc] = useState(false);

  const openModalDoc = () => {
    setIsModalDoc(true);
  };

  const closeModalDoc = () => {
    setIsModalDoc(false);
  };

  const [isModalTakeTask, setIsModalTakeTask] = useState(false);
  const openModalTask = () => {
    setIsModalTakeTask(true);
  };
  const closeModaTask = () => {
    setIsModalTakeTask(false);
  };

  //   take task
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleReload = () => {
    fetchData();
  };

  const handleConfirm = async () => {
    const updateData = {
      taken: staffid.loginid,
    };
    try {
      await axios.put(`${API_BASE_URL}/enquirywaiting/${docId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchData();
      Toast({ message: "Successfully Updated", type: "success" });
    } catch (error) {
      handleOpenModal();
      setErrorMsg(error.response.data.messages.error);
    }
  };
  return (
    <>
      {/* <DocumentMo
                isOpen={isModalDoc}
                closeModal={closeModalDoc}
                id={docId}
                openModal={openModalDoc}
            /> */}

      <ConfirmationModal
        isOpen={isModalTakeTask}
        closeModal={closeModaTask}
        onConfirm={handleConfirm}
        message={"Are you sure you want to take this ?"}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleReload}
        message={errorMsg}
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
                    <h4 className="page_heading">Waiting Document Report</h4>
                    <div className="col-lg-12 mb-4 mt-4">
                      <GridComponent
                        id="DefaultExport"
                        dataSource={enquiryDataFromWebsite}
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
                            field="mobile"
                            headerText="Mobile"
                            width="150"
                          />
                          <ColumnDirective
                            field="email_id"
                            headerText="Email"
                            width="150"
                          />
                          <ColumnDirective
                            field="type"
                            headerText="Category"
                            width="150"
                          />
                          <ColumnDirective
                            field="service_cat"
                            headerText="Service"
                            width="150"
                          />
                          <ColumnDirective
                            field="property_type"
                            headerText="Property Type"
                            width="150"
                          />
                          <ColumnDirective
                            field="subpro_name"
                            headerText="Sub Property"
                            width="150"
                          />
                          <ColumnDirective
                            field="Document"
                            headerText="Document"
                            width="150"
                            template={multiSelectDocument}
                          />
                          {staffid?.logintype == "staff" && (
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WaitingService;
