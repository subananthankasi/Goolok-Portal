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
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../Api/api";


const EnquiryReports = () => {

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


    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/propertyenquiry`);
            console.log("resss", response)
            setCompleteData(
                response.data?.map((data, index) => ({
                    ...data,
                    sno: index + 1,
                }))
            );
        } catch (error) {

        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    return (
        <>
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                            <div className="card-body p-1">
                                <h4 className="page_heading">Enquiry Reports</h4>
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
                                        pageSettings={{ pageSize: 10 }}
                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective
                                                field="sno"
                                                headerText="S.no"
                                                textAlign="Center"
                                                width="150"
                                            />
                                            <ColumnDirective
                                                headerText="Date"
                                                width="150"
                                                template={(props) => {
                                                    return (
                                                        <span>{String(props.created_at)?.split(" ")[0].split("-").reverse().join("/")}</span>
                                                    )
                                                }}
                                            />
                                            <ColumnDirective
                                                headerText="Property Type"
                                                width="190"
                                                textAlign="Center"
                                                field="property_type"
                                            />

                                            <ColumnDirective
                                                headerText="Full Name"
                                                width="150"
                                                field="name"
                                            />

                                            <ColumnDirective
                                                headerText="Mobile"
                                                width="150"
                                                field="mobile"
                                            />

                                            <ColumnDirective
                                                field="email"
                                                headerText="Email "
                                                width="170"
                                            />
                                            <ColumnDirective
                                                field="enquiry_type"
                                                headerText="Enquiry Type"
                                                width="170"
                                                template={(props) => props.enquiry_type || "--"}
                                            />
                                            <ColumnDirective
                                                headerText="Contact Method"
                                                width="180"
                                                field="contact_method"
                                            />
                                            <ColumnDirective
                                                headerText="Messages"
                                                width="180"
                                                field="message"
                                                template={(props) => props.message || "--"}
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
            </section>


        </>
    );
};

export default EnquiryReports;
