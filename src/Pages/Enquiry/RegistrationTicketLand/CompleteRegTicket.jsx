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
import { Link, useNavigate } from "react-router-dom";
import {useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { encryptData } from "../../../Utils/encrypt";

const CompleteRegTicket = () => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [completeData, setCompleteData] = useState([]);

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

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/ticketbooking?id=${staffid.loginid}&status=complete`,
                {
                    headers: {
                        "Pr-Root": "land",
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

    const handleRowSelect = (args) => {
        const rowData = args.data;
        navigate(`/registeration_ticket/${encryptData(rowData.enqid)}/${encryptData(rowData.id)}/${encryptData("complete")}/${encryptData(rowData.bid)}/${encryptData(rowData.shortform)}/${encryptData(rowData.booking_no)}`);
    };

    function bokkingId(props) {
        return (
            <Link
                className="btn btn_pdf light btn-warning text-dark"
            >
                {props.booking_no}
            </Link>

        );
    }
    return (
        <>
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                            <div className="">
                                <div className="card-body">
                                    <h4 className="page_heading">Complete Reports</h4>
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
                                                    width="150"
                                                />
                                                <ColumnDirective
                                                    headerText="Date"
                                                    width="150"
                                                    field="created_at"
                                                />
                                                <ColumnDirective
                                                    field="booking_no"
                                                    headerText="Booking No"
                                                    width="150"
                                                    template={bokkingId}
                                                />
                                                <ColumnDirective
                                                    headerText="Age"
                                                    width="150"
                                                    field="age"
                                                />
                                                <ColumnDirective
                                                    field="property_type"
                                                    headerText="Propety"
                                                    width="150"
                                                />
                                                <ColumnDirective
                                                    field="subpro_name"
                                                    headerText="Sub Property"
                                                    width="150"
                                                />


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
    );
};

export default CompleteRegTicket;
