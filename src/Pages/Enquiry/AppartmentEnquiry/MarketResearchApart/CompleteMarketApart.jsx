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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import { encryptData } from "../../../../Utils/encrypt";

const CompleteMarketApart = () => {

    const staffid = JSON.parse(sessionStorage.getItem('token'));



    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [pendingWaitingData, setPendingWaitingData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/market?id=${staffid.loginid}&status=complete`, {
                headers: {
                    "Pr-Root": "apartment"
                }
            });
            setLoading(false);
            setPendingWaitingData(
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
        }
    }
    const handleRowSelect = (args) => {
        const rowData = args.data;
        navigate(`/apart_MarketResearch_verification/${encryptData(rowData.enqid)}/${encryptData(rowData.id)}/${encryptData('complete')}`);
        // navigate(`/apart_MarketResearch_verification/${rowData.enqid}/${rowData.id}/complete`); 
    };
    return (
        <>
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                                <div className="card-body p-1">
                                    <h4 className="page_heading">Complete Report</h4>
                                    <div className="col-lg-12 mb-4 mt-4">
                                        <GridComponent
                                            id="DefaultExport"
                                            dataSource={pendingWaitingData}
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
                                                    field="created_at"

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
                                                    field="age"

                                                    headerText="Age"
                                                    width="150"
                                                //    template={(props) => AgeCalculate(props.created_at)}
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
export default CompleteMarketApart