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
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import API_BASE_URL from "../../../../Api/api";



const CompleteDocMissing = () => {


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

    const navigate = useNavigate();

    const handleRowSelect = (args) => {
        const rowData = args.data;
        navigate(`/updatedoc_verif_missing/${rowData.id}/${rowData.userid}/complete`);

    };

    const dispatch = useDispatch();
    const [enquiryDataFromWebsite, setenquiryDataFromWebsite] = useState([])
    // staff id 
    const staffid = JSON.parse(localStorage.getItem('token'));

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/enquiryreport?id=${staffid.loginid}&status=complete`, {
                headers: {
                    "Gl-status": 'land',
                    "Level": "service",
                    "Pr-Root": "Missing Documents"
                }
            })
            setenquiryDataFromWebsite(response.data?.map((data, index) => ({
                ...data,
                sno: index + 1
            })))
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [dispatch, staffid.loginid]);
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
                                        <h4 className="page_heading">Complete Document Report</h4>
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
                                                    <ColumnDirective field='service_cat' headerText='Service' width='150' />
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

export default CompleteDocMissing