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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ButtonGroup, Button, Whisper, Popover, Dropdown, IconButton } from 'rsuite';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import API_BASE_URL from '../../../Api/api';
import { encryptData } from '../../../Utils/encrypt';
import ClosedProperty from '../../../Utils/ClosedProperty';
const options = ['Progress', 'Closed'];

const PendingContentWritingPlot = () => {
    const staffid = JSON.parse(sessionStorage.getItem('token'));
    const [pendingWaitingData, setPendingWaitingData] = useState([]);
    const dispatch = useDispatch()

    const filterSettings = { type: "Excel" };
    const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/contentdpt?id=${staffid.loginid}&status=pending`, {
                headers: {
                    "Pr-Root": "plot"
                }
            });
            //   setLoading(false);

            setPendingWaitingData(
                response.data?.map((data, index) => ({
                    ...data,
                    sno: index + 1,
                }))
            );
        } catch (error) {
            //   setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
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

    const navigate = useNavigate();

    const handleRowSelect = (args) => {
        const rowData = args.data;
        navigate(`/plot_content_writing/${encryptData(rowData.enqid)}/${encryptData(rowData.id)}/${encryptData("pending")}/${encryptData(rowData.subpro_name)}`);
    };

    const [action, setAction] = useState(0);
    const [visible, setVisible] = useState(false)
    const [rowId, setRowId] = useState(null)
    const handleDelete = (id) => {
        setVisible(true)
        setRowId(id)
    }
    return (
        <>
            <ClosedProperty
                visible={visible}
                onHide={() => { setVisible(false); setAction(0) }}
                id={rowId}
                fetch={fetchData}
            />
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                            <div className="card-body p-1">
                                <h4 className="page_heading">Pending Report</h4>
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
                                                field='age'
                                                headerText="Age"
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
                                            {/* <ColumnDirective
                                                    headerText="Status"
                                                    width="150"
                                                    template={(props) => (
                                                        <button
                                                            onClick={(event) => {
                                                                event.stopPropagation();
                                                                handleDelete(props.enqid);
                                                            }}
                                                            style={{
                                                                backgroundColor: "blue",
                                                                color: "white",
                                                                border: "none",
                                                                padding: "5px 10px",
                                                                borderRadius: "5px",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            progress
                                                        </button>

                                                    )}
                                                /> */}
                                            <ColumnDirective
                                                headerText="Status"
                                                width="170"
                                                template={(props) => (
                                                    <div >
                                                        <ButtonGroup>
                                                            <Button appearance="primary" color="green" onClick={(e) => e.stopPropagation()}>
                                                                {options[action]}
                                                            </Button>
                                                            <Whisper
                                                                placement="bottomEnd"
                                                                trigger="click"
                                                                speaker={({ onClose, left, top, className }, ref) => {
                                                                    const handleSelect = (eventKey) => {
                                                                        setAction(eventKey);
                                                                        if (eventKey === 1) {
                                                                            handleDelete(props.enqid);
                                                                        }
                                                                        onClose();
                                                                    };
                                                                    return (
                                                                        <Popover ref={ref} className={className} style={{ left, top }} full>
                                                                            <Dropdown.Menu onSelect={(event, eventKey) => handleSelect(event, eventKey)}>
                                                                                {options.map((item, index) => (
                                                                                    <Dropdown.Item key={index} eventKey={index}>
                                                                                        {item}
                                                                                    </Dropdown.Item>
                                                                                ))}
                                                                            </Dropdown.Menu>
                                                                        </Popover>
                                                                    );
                                                                }}
                                                            >
                                                                <IconButton appearance="primary" color="green" onClick={(event) => event.stopPropagation()} icon={<ArrowDownIcon />} />
                                                            </Whisper>
                                                        </ButtonGroup>

                                                    </div>
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
                </div>
            </section>
        </>
    )
}

export default PendingContentWritingPlot