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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import API_BASE_URL from "../../../Api/api";
import { encryptData } from "../../../Utils/encrypt";

const CompleteInvoiceLayout = () => {
    const staffid = JSON.parse(localStorage.getItem('token'));

    const [completeData, setCompleteData] = useState([]);

    const navigate = useNavigate();

    const filterSettings = { type: "Excel" };
    const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/invoice`, {
                    headers: {
                        "Gl-status": 'success',
                        "Pr-Root": 'Layout'
                    }
                });
                const data = response?.data?.map((item, index) => ({
                    ...item, sno: index + 1
                }))
                setCompleteData(data)
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetch();
    }, []);


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


    const handleRowSelect = (args) => {
        const rowData = args.data;
        navigate(`/invoice_layout/${encryptData(rowData.enqid) }/${encryptData(rowData.id) }/${encryptData(rowData.status) }`);
    };



    return (
        <>
            <section className="section1">
                <div className=" ">
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
                                        <h4 className="page_heading">Complete Report</h4>
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
                                                        field='invoice_date'
                                                        headerText="Date"
                                                        width="150"
                                                    //    template={(props) => DateFormatcustom(props.created_at)}
                                                    />
                                                    <ColumnDirective
                                                        field="customer"
                                                        headerText="Customer Name"
                                                        width="150"
                                                    />
                                                    <ColumnDirective
                                                        field='age'
                                                        headerText="Age"
                                                        width="150"
                                                    //    template={(props) => AgeCalculate(props.created_at)}
                                                    />
                                                    <ColumnDirective
                                                        field="amount"
                                                        headerText="Amount"
                                                        width="150"
                                                    />
                                                    <ColumnDirective
                                                        field="status"
                                                        headerText="Status"
                                                        width="150"
                                                        template={(props) => (
                                                            <button
                                                                type="button"
                                                                className={`badge rounded-pill btnhover btn1 badge1 p-2 ${props.status === "success" ? "bg-success" : "bg-danger"
                                                                    }`}
                                                                style={{ width: "60px" }}
                                                            >
                                                                {props.status}
                                                            </button>
                                                        )}
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
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default CompleteInvoiceLayout