import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Whisper,
  Popover,
  Dropdown,
  IconButton,
} from "rsuite";
import API_BASE_URL from "../../../Api/api";
import ClosedProperty from "../../../Utils/ClosedProperty";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import { encryptData } from "../../../Utils/encrypt";

function PendingDocAP() {
  const [loading, setLoading] = useState(true);
  const options = ["Progress", "Closed"];

  // get the enquiry data
  const dispatch = useDispatch();
  const [enquiryDataFromWebsite, setenquiryDataFromWebsite] = useState([]);

  // staff id
  const staffid = JSON.parse(sessionStorage.getItem("token"));

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/enquiryreport?id=${staffid.loginid}&status=progress`,
        {
          headers: {
            "Gl-status": "apartment project",
          },
        }
      );
      setenquiryDataFromWebsite(
        response.data?.map((data, index) => ({
          ...data,
          sno: index + 1,
          count:
            Math.floor((new Date() - new Date(data.created_at)) / 86400000) +
            "day",
        }))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, [dispatch, staffid.loginid]);

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
    }
  }
  const navigate = useNavigate();
  const handleRowSelect = (args) => {
    const rowData = args.data;
    navigate(
      `/aproject_document/${encryptData(rowData.id)}/${encryptData(
        rowData.userid
      )}/${encryptData("pending")}`
    );
  };
  const [action, setAction] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rowId, setRowId] = useState(null);
  const handleDelete = (id) => {
    setVisible(true);
    setRowId(id);
  };

  return (
    <>
      <ClosedProperty
        visible={visible}
        onHide={() => {
          setVisible(false);
          setAction(0);
        }}
        id={rowId}
        fetch={fetch}
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
                            // template={(props) => DateFormatcustom(props.created_at)}
                            field="created_at"
                          />
                          <ColumnDirective
                            field="taken_by"
                            headerText="Taken By"
                            width="150"
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
                          {/* <ColumnDirective
                            headerText="Status"
                            width="150"
                            template={(props) => (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDelete(props.id);
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
                            width="190"
                            template={(props) => (
                              <div>
                                <ButtonGroup>
                                  <Button
                                    appearance="primary"
                                    color="green"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {options[action]}
                                  </Button>
                                  <Whisper
                                    placement="bottomEnd"
                                    trigger="click"
                                    speaker={(
                                      { onClose, left, top, className },
                                      ref
                                    ) => {
                                      const handleSelect = (eventKey) => {
                                        setAction(eventKey);
                                        if (eventKey === 1) {
                                          handleDelete(props.id);
                                        }
                                        onClose();
                                      };
                                      return (
                                        <Popover
                                          ref={ref}
                                          className={className}
                                          style={{ left, top }}
                                          full
                                        >
                                          <Dropdown.Menu
                                            onSelect={(event, eventKey) =>
                                              handleSelect(event, eventKey)
                                            }
                                          >
                                            {options.map((item, index) => (
                                              <Dropdown.Item
                                                key={index}
                                                eventKey={index}
                                              >
                                                {item}
                                              </Dropdown.Item>
                                            ))}
                                          </Dropdown.Menu>
                                        </Popover>
                                      );
                                    }}
                                  >
                                    <IconButton
                                      appearance="primary"
                                      color="green"
                                      onClick={(event) =>
                                        event.stopPropagation()
                                      }
                                      icon={<ArrowDownIcon />}
                                    />
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

      {/* <Dialog header="Confirmation" visible={visible} style={{ width: '30vw' }} onHide={() => { if (!visible) return; setVisible(false); setRemark("") }}>
        <form autoComplete="off">
          <div>
            <p style={{ fontWeight: "600" }}> <ErrorOutlineIcon sx={{ fontSize: 25 }} /> Are you sure you want to proceed ?</p>
          </div>
          <div className="form-group">
            <label htmlFor="docname" className="form-label">Remark :  </label>
            <textarea
              type="text"
              name="remark"
              className="form-control"
              placeholder="Enter remark...."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />

          </div>
          <div className="d-flex justify-content-end mt-3 gap-3">
            <Button variant="outlined" color="error" onClick={() => setVisible(false)} >No</Button>
            <Button variant="contained" onClick={submit}>Yes</Button>
          </div>
        </form>
      </Dialog> */}
    </>
  );
}

export default PendingDocAP;
