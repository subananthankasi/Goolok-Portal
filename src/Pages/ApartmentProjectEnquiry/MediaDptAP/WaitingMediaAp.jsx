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
import { useDispatch, useSelector } from 'react-redux';

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../Api/api';
import Toast from '../../../Utils/Toast';
import { mediaWaitingThunk } from '../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptEnqThunk';
import ConfirmationModal from '../../../Utils/ConfirmationModal';




const WaitingMediaAp = () => {

    const staffid = JSON.parse(sessionStorage.getItem('token'));
    const dispatch = useDispatch()


    const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];


    const [WaitingData, setWaitingData] = useState([])
    const [docId, setDocId] = useState("");
    const [isModalTakeTask, setIsModalTakeTask] = useState(false);
    const navigate = useNavigate()
    let gridInstance;


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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mediadpt/new`, {
                headers: {
                    "Pr-Root": "apartment project"
                }
            })
            // setLoading(false); 
            setWaitingData(
                response.data?.map((data, index) => ({
                    ...data,
                    sno: index + 1
                })))
        } catch (error) {
            // setLoading(false); 
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);

    const handleConfirm = async () => {
        const payload = {
            "taken": staffid.loginid,
        }
        try {
            await axios.put(`${API_BASE_URL}/mediadpt/${docId}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            fetchData()
            Toast({ message: "Successfully Updated", type: "success" })


        } catch (error) {
            Toast({ message: "Failed to update", type: "error" })
        }
    }
    useEffect(() => {
        dispatch(mediaWaitingThunk())
    }, [])
    const dataWaiting = useSelector((state) => state.mediaWaitingData?.data?.[0])


    useEffect(() => {
        if (dataWaiting) {
            const updateData = [{
                ...dataWaiting,
                sno: 1,
            }];
            setWaitingData(updateData);

        } else {
            console.error('dataWaiting is not an object', dataWaiting);
        }
    }, [dataWaiting]);

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
                        {/* 
                     <div
                       style={{
                         height: "32vh",
                         display: "flex",
                         justifyContent: "center",
                       }}
                     >
                       <Spinner className="mt-auto" />
                     </div> */}

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
                </div>
            </section>
        </>
    )
}

export default WaitingMediaAp