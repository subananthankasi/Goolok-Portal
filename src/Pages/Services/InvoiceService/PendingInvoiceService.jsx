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
import ClosedProperty from "../../../Utils/ClosedProperty";
import API_BASE_URL from "../../../Api/api";
import axios from "axios";
import { encryptData } from "../../../Utils/encrypt";
import { ButtonGroup, Button, Whisper, Popover, Dropdown, IconButton } from 'rsuite';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';



const PendingInvoiceService = () => {

  const options = ['Progress', 'Closed'];


  const [loading, setLoading] = useState(true);
  // staff id 
  const staffid = JSON.parse(sessionStorage.getItem('token'));
  const [pendingData, setPendingData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/serviceinvoice?id=${staffid.loginid}&status=pending`, {
        headers: {
          "Pr-Root": "land",
          "Level": "service",
          "Gl-Status": "get patta for your property"
        }
      });
      setLoading(false);
      setPendingData(
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

  const navigate = useNavigate();

  const handleRowSelect = (args) => {
    const rowData = args.data;
    navigate(`/update_invoice/${encryptData(rowData.enqid)}/${encryptData(rowData.id)}/${encryptData('pending')}`);
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
                    <h4 className="page_heading">Pending Document Report</h4>
                    <div className="col-lg-12 mb-4 mt-4">
                      <GridComponent
                        id="DefaultExport"
                        dataSource={pendingData}
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
                            headerText="Age"
                            width="100"
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
                          <ColumnDirective
                            field="service_cat"
                            headerText="Service Category"
                            width="150"
                          />
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
            )}
          </div>
        </div>
      </section>


    </>
  )
}

export default PendingInvoiceService