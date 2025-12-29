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
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { encryptData } from "../../../Utils/encrypt";

const AdminTicketTele = () => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [pendingWaitingData, setPendingWaitingData] = useState([]);

  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/telebooking/all`);
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
      default:
        break;
    }
  }

  const navigate = useNavigate();

  const handleRowSelect = (args) => {
    const rowData = args.data;
    navigate(
      `/telecalling_registrationticket/${encryptData(
        rowData.enqid
      )}/${encryptData(rowData.id)}/${encryptData("pending")}/${encryptData(
        rowData.bid
      )}/${encryptData(rowData.shortform)}/${encryptData(rowData.booking_no)}`
    );
  };

  function bokkingId(props) {
    return (
      <Link className="btn btn_pdf light btn-warning text-dark">
        {props.booking_no}
      </Link>
    );
  }
  function bookingStatus(props) {
    return (
     <Link
  className={`btn btn_pdf light text-dark ${
    props.status === "pending"
      ? "btn-danger"   
      : props.status === "complete"
      ? "btn-success" 
      : props.status === "postponed"
      ? "btn-info"   
      : "btn-secondary" 
  }`}
  style={{ textTransform: "capitalize" }}
>
  {props.status}
</Link>

    );
  }
  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="">
                <div className="card-body">
                  <h4 className="page_heading">Registration Tickets Reports</h4>
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
                        <ColumnDirective
                          field="status"
                          headerText="Status"
                          width="150"
                          template={bookingStatus}
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

export default AdminTicketTele;
