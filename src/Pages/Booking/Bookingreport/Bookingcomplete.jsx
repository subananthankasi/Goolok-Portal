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
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Toast from "../../../Utils/Toast";
import { Link, useNavigate } from "react-router-dom";
import { encryptData } from "../../../Utils/encrypt";

const Bookingcomplete = () => {

    const staffid = JSON.parse(localStorage.getItem("token"));
    const [completeData, setCompleteData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [cancelRow, setCancelRow] = useState();
    const filterSettings = { type: "Excel" };
    const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
    const navigate = useNavigate();
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


    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/bookingreport`,
                {
                    headers: {
                        "Pr-Root": "land",
                        "Gl-Status": "Registered"
                    },
                }
            );

            setCompleteData(
                response.data?.map((data, index) => ({
                    ...data,
                    sno: index + 1,
                }))
            );
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const data = useSelector((state) => state.completeContentData?.data?.[0]);

    useEffect(() => {
        if (data && typeof data === "object") {
            const updateData = [
                {
                    ...data,
                    sno: 1,
                },
            ];
            setCompleteData(updateData);
        } else {
            console.error("dataWaiting is not an object");
        }
    }, [data]);




    function handleVacant(props) {
        const buttonStyle = {
            backgroundColor: '#df3f4f',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '6px 16px',
            fontSize: '14px',
            fontWeight: '500',
            minWidth: '100px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        };

        const handleClick = (props) => {
            setVisible(true)
            setCancelRow(props);
        }
        return (
            <button
                onClick={() => handleClick(props)}
                style={buttonStyle}
            >
                Cancel
            </button>
        );
    }

    function bokkingId(props) {
        return (
            <Link
                className="btn btn_pdf light btn-warning text-dark"
            >
                {props.booking_id}
            </Link>

        );
    }
    function StatusPopup(props) {
        return (
            <a
                className="btn highlight_button  light btn-success text-success"
            >
                {props.status}
            </a>

        );
    }

    const handleCancelBooking = async () => {
        const payload = {
            vacantId: cancelRow.block_id,
            id: cancelRow.id,
        }
        try {
            await axios.post(`${API_BASE_URL}/cancelbooking`, payload);
            fetchData();
            setVisible(false);
            Toast({ message: "Succefully Move To vacant", type: "success" })
        } catch (error) {
            console.error(error);
        }
    }


    const handleRowSelect = (args) => {
        const rowData = args.data;
        navigate(`/bookingreport/${encryptData(rowData.enqid)}/${encryptData(rowData.id)}/${encryptData("complete")}/${encryptData(rowData.id)}/${encryptData(rowData.booking_no)}`);
    };


    return (
        <>
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                            <div className="card-body p-1">
                                <h4 className="page_heading">Completed Booking Repors</h4>
                                <div className="col-lg-12 mb-4 mt-4">
                                    <GridComponent
                                        id="DefaultExport"
                                        dataSource={completeData}
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
                                        rowSelected={handleRowSelect}

                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective
                                                field="sno"
                                                headerText="S.no"
                                                textAlign="Center"
                                                width="150"
                                            />
                                            <ColumnDirective
                                                headerText="Booking No"
                                                width="150"
                                                textAlign="Center"
                                                field="booking_id"
                                                template={bokkingId}
                                            />
                                            <ColumnDirective
                                                headerText="Cleared Date"
                                                width="150"
                                                // field="cleared_date"
                                                 template={(props)=>{
                                                    return(
                                                        <span>{String(props.cleared_date)?.split(" ")[0].split("-").reverse().join("/")}</span>
                                                    )
                                                }}
                                            />
                                            <ColumnDirective
                                                headerText="Age"
                                                width="150"
                                                field="age"
                                            />

                                            <ColumnDirective
                                                field="property_type"
                                                headerText="Category "
                                                width="170"
                                            />
                                            <ColumnDirective
                                                headerText="Sub Category"
                                                width="180"
                                                field="subpro_name"
                                            />
                                            <ColumnDirective
                                                headerText="Advance Amount"
                                                width="180"
                                                field="advance"
                                            />
                                            <ColumnDirective
                                                headerText="Blocking Amount"
                                                width="180"
                                                field="blocking_amount"
                                            />
                                            <ColumnDirective
                                                headerText="Pay Mode"
                                                width="180"
                                                field="pay_mode"
                                            />
                                            <ColumnDirective
                                                headerText="Status "
                                                width="180"
                                                field="status"
                                                template={StatusPopup}
                                            />
                                            {/* <ColumnDirective
                                                headerText="Move To Cancel"
                                                width="150"
                                                template={handleVacant}
                                            /> */}

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

            <Dialog
                header=" Confirmation"
                visible={visible}
                style={{ width: "34vw" }}
                onHide={() => {
                    setVisible(false);
                }}
            >
                <div>
                    <div className="confirmation-content">
                        <ErrorOutlineIcon sx={{ fontSize: 24 }} />
                        <span style={{ marginLeft: "10px" }}>
                            Are you sure you want to cancel this booking..?
                        </span>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3 gap-3">
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            setVisible(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" type="button" onClick={() => handleCancelBooking()}>
                        Yes
                    </Button>
                </div>

            </Dialog>
        </>
    );
};

export default Bookingcomplete;
