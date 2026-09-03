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


const CustomerLead = () => {

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
                `${API_BASE_URL}/customerlead`);
console.log("resss",response)
            setCompleteData(
                response.data?.data?.map((data, index) => ({
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

    

function StatusPopup(props) {
    return (
        <span
            className={
                props.whatsapp_updates
                    ? "status-badge status-yes"
                    : "status-badge status-no"
            }
        >
            {props.whatsapp_updates ? "Yes" : "No"}
        </span>
    );
}
    return (
        <>
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                            <div className="card-body p-1">
                                <h4 className="page_heading">Customer Lead Reports</h4>
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
                                    // rowSelected={handleRowSelect}

                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective
                                                field="sno"
                                                headerText="S.no"
                                                textAlign="Center"
                                                width="150"
                                            />
                                            <ColumnDirective
                                                headerText="Name"
                                                width="150"
                                                textAlign="Center"
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
                                                headerText="Messages"
                                                width="180"
                                                field="message"
                                            />
                                            <ColumnDirective
                                                headerText="Cleared Date"
                                                width="150"
                                                template={(props) => {
                                                    return (
                                                        <span>{String(props.created_at)?.split(" ")[0].split("-").reverse().join("/")}</span>
                                                    )
                                                }}
                                            />

                                            <ColumnDirective
                                                headerText="Whatsapp Update"
                                                width="180"
                                                template={StatusPopup}
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

export default CustomerLead;
