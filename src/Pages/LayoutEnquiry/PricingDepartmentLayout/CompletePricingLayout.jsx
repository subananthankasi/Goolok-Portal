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
import API_BASE_URL from "../../../Api/api";
import { encryptData } from "../../../Utils/encrypt";


const CompletePricingLayout = () => {

  const staffid = JSON.parse(sessionStorage.getItem('token'));
  const [completeData, setCompletedata] = useState([]);
  const dispatch = useDispatch()

  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];


  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pricingdpt?id=${staffid.loginid}&status=complete`, {
        headers: {
          "Pr-Root": "layout"
        }
      });

      setCompletedata(
        response.data?.map((data, index) => ({
          ...data,
          sno: index + 1,
        }))
      );
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const completeValues = useSelector((state) => state.completeData?.data)

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
       navigate(`/layout_pricing/${encryptData(rowData.enqid)}/${encryptData(rowData.id)}/${encryptData("complete")}`);
  
  };
  return (
    <>
      <section className="section1">
        <div className=" ">
          <div className="row">
            <div className="col-12">
              <div className="">
                <div className="card-body">
                  <h4 className="page_heading">Complete Pricing Department</h4>
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
                          width="150"
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
  )
}

export default CompletePricingLayout