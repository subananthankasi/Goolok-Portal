
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, Page, ExcelExport, PdfExport, Sort, Filter } from '@syncfusion/ej2-react-grids';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useLocation } from 'react-router-dom';
import { encryptData } from "../../../Utils/encrypt";
import API_BASE_URL from "../../../Api/api";


const LayoutBookingReports = () => {
  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const filterSettings = { type: 'Excel' };
  const toolbarOptions = ['ExcelExport', 'PdfExport', 'Search'];
  let gridInstance;

  function toolbarClick(args) {
    switch (args.item.id) {
      case 'DefaultExport_pdfexport':
        gridInstance.pdfExport();
        break;
      case 'DefaultExport_excelexport':
        gridInstance.excelExport();
        break;
      case 'DefaultExport_csvexport':
        gridInstance.csvExport();
        break;
      default:
        break;
    }
  }

  function gridUrlTemplate(props) {
    return (
      <Link
        to={`/layoutdraw/${encryptData(props.id)}`
        }
        className="btn btn_pdf light btn-warning text-dark"
      >
        {props.property_id}
      </Link>
    );
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/enquiryreport/new`, {
          headers: {
            'Gl-Status': 'live',
            "Level": "sale",
          },
        });
        SetData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };

    fetchData();

  }, [location]);

  const finalData = data?.map((item, index) => {
    return {
      ...item,
      sno: (index + 1).toString(),
    };
  });

  const ProjectID = gridUrlTemplate;


  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            {loading ?
              <div style={{ height: "32vh", display: "flex", justifyContent: "center" }}>
                <Spinner className="mt-auto" />
              </div>
              :
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="page_heading">Layout Booking Reports</h4>
                    <div className="col-lg-12  mb-4 mt-4">
                      <GridComponent
                        id='DefaultExport'
                        dataSource={finalData}
                        allowTextWrap={true}
                        ref={grid => gridInstance = grid}
                        toolbar={toolbarOptions}
                        allowExcelExport={true}
                        allowPdfExport={true}
                        allowSorting={true}
                        allowFiltering={true}
                        filterSettings={filterSettings}
                        toolbarClick={toolbarClick.bind(this)}
                        height='350'
                        allowPaging={true}
                      >
                        <ColumnsDirective>
                          <ColumnDirective field='sno' headerText='S.no' width='150' />
                          <ColumnDirective field='property_id' headerText='Property ID' width='150' template={ProjectID} />
                          <ColumnDirective field='created_at' headerText='Date' width='170' />

                          <ColumnDirective
                            field="property_type"
                            headerText="Property Type"
                            width="170"
                          />
                          <ColumnDirective field='subpro_name' headerText='Sub Property Type' width='180' />
                          <ColumnDirective field='mobile' headerText='Mobile' width='150' />
                          <ColumnDirective field='live_date' headerText='Layout Status' width='170' />
                        </ColumnsDirective>
                        <Inject services={[Toolbar, ExcelExport, PdfExport, Sort, Filter, Page]} />
                      </GridComponent>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default LayoutBookingReports
