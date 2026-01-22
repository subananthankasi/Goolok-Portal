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
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import { DateFormatcustom } from "../../../Utils/DateFormatcustom";
import { AgeCalculate } from "../../../Utils/AgeCalculate";
import "../../../index.css"
import { encryptData } from "../../../Utils/encrypt";

function CompleteDocument() {
  const [loading, setLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/invoice`, {
          headers: {
            "Gl-status": 'success',
            "Pr-Root": "land"
          }
        });
        const data = response?.data?.map((item, index) => ({
          ...item, sno: index + 1
        }))
        setInvoiceData(data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetch();
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
      default:
        break;
    }
  }

  const navigate = useNavigate();
  const handleRowSelect = (args) => {
    const rowData = args.data;
    // navigate(`/invoice_report/${encryptData(rowData.enqid)}/${encryptData(rowData.status)}`);
    navigate(
      `/invoice_report/${encryptData(rowData.enqid)}/${encryptData(
        rowData.id
      )}/${encryptData(rowData.status)}`
    );
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
                    <h4 className="page_heading">Complete Invoice Report</h4>
                    <div className="col-lg-12 mb-4 mt-4">
                      <GridComponent
                        id="DefaultExport"
                        dataSource={invoiceData}
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
                            template={(props) => DateFormatcustom(props.created_at)}
                            field="created_at"
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
                            template={(props) => AgeCalculate(props.created_at)}
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
  );
}

export default CompleteDocument;


