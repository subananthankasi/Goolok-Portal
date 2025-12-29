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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ApartmentConfirmModal from '../../../../Utils/ApartmentConfirmModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../../Api/api';



const WaitingInv = () => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));

     const [WaitingData, setWaitingData] = useState([]);
        const [loading, setLoading] = useState(true);
         const dispatch = useDispatch()
            const navigate = useNavigate()

    const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/enquirywaiting`, {
    //             headers: {
    //                 "Gl-status": 'apartment'
    //             }
    //         })
    //         setLoading(false);
    //         setWaitingData(
    //             response.data?.map((data, index) => ({
    //                 ...data,
    //                 sno: index + 1
    //             })))
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // }
    // useEffect(() => {
    //     fetchData()
    // }, []);


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
    const filterSettings = { type: "Excel" };

    const [open,setOpen] = useState(false)
    function StatusModalOpen() {
        return (
            <button
                className="btn btn_pdf btn-outline-danger"
                data-tooltip-id="status"
                onClick={() => setOpen(true)}
            >
                Take <TaskAltIcon sx={{ fontSize: 20 }} />
            </button>
        );
    }

    const statusPopup = StatusModalOpen;
    const Data = [
        {
            sno: 1,
            date: '12/1/2025',
            customer: 'Shiva',
            age: '12 days',
            mobile: '1234567899',
            email_id: 'shiva@gmail.com'
        }
    ]

    const handleAccept = () => {
        setOpen(false);
    };

    const handleReject = () => {
        setOpen(false);
    };
    
    return (
        <>
            <ApartmentConfirmModal
                isOpen={open}
                onAccept={handleAccept}
                onReject={handleReject}
            />

            <section className="section1">
                <div className="">
                    <div className="row">
                        <div className="col-12">
                            <div className="">
                                <div className="card-body">
                                    <h4 className="page_heading">Waiting Report</h4>
                                    <div className="col-lg-12 mb-4 mt-4">
                                        <GridComponent
                                            id="DefaultExport"
                                            dataSource={Data}
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
                                                // template={(props) => DateFormatcustom(props.created_at)}
                                                />
                                                <ColumnDirective
                                                    field="customer"
                                                    headerText="Customer Name"
                                                    width="150"
                                                />
                                                <ColumnDirective
                                                    headerText="Age"
                                                    width="150"
                                                // template={(props) => AgeCalculate(props.created_at)}
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default WaitingInv