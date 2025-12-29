import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport, Sort, Filter } from '@syncfusion/ej2-react-grids';
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useDispatch } from "react-redux";
import { projectVerifyThunk } from "../../../Redux/Actions/ProjectThunk/ProjectThunk";
// import { Badge } from 'primereact/badge';
import Badge from '@mui/material/Badge';
import { useLocation } from 'react-router-dom';

const CompleteServiceProject = () => {

  const { eid, id, status } = useParams();

  const [data, SetData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [enqId, setEnqId] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    }
  }

  function gridUrlTemplate(props) {
    return (

      <Link
        to={`/service_project_details/${props.id}/${props.userid}/${props.status}/${props.service_cat}`}
        className="btn btn_pdf light btn-warning text-dark"
      >
        {props.property_id}
      </Link>

    );
  }

  const renderStatusButton = (props) => {
    return (

      <button
        className=" btn-success"
        data-tooltip-id="status"
        style={{ background: "rgb(223, 237, 226)", width: "70px", height: "30px", color: "#181e25", fontSize: "14px", borderLeft: "2px solid rgb(50, 153, 52)", fontWeight: "400" }}
      >
        Live
      </button>

    )
  };
  const openSubmit = (id) => {
    setConfirmDialog(true)
    setEnqId(id)
  }





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/enquiryreport/new`, {
          headers: {
            'Gl-Status': 'live',
            "Level": "service",
          },
        });
        SetData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data:', error);
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
  const statusPopup = renderStatusButton;

  const handleConfirm = async (e) => {
    e.preventDefault();
    const formData = {
      id: enqId
    };
    dispatch(projectVerifyThunk(formData))
    setConfirmDialog(false)
    navigate('/live_property')

    try {

    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.messages?.error || error.message}`);
      } else {
        alert(`Error adding data: ${error}`);
      }
    }
  }
  const hideDialog = () => {
    setConfirmDialog(false)
  }

  const dialogFooter = (
    <div className=" d-flex gap-3 justify-content-end">
      <Button label="No" icon="pi pi-times" outlined severity="danger" style={{ borderRadius: '7px' }} onClick={() => setConfirmDialog(false)} />
      <Button label="Yes" icon="pi pi-check" severity="primary" style={{ borderRadius: '7px' }} onClick={handleConfirm} />
    </div>
  );
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
                    <h4 className="page_heading">Complete Service</h4>
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
                      >
                        <ColumnsDirective>
                          <ColumnDirective field='sno' headerText='S.no' width='150' />
                          <ColumnDirective field='property_id' headerText='Project ID' width='150' template={ProjectID} />
                          <ColumnDirective field='created_at' headerText='Property date' width='150' />
                          <ColumnDirective field='customer' headerText='Property Owner' width='150' />
                          <ColumnDirective field='subpro_name' headerText='Property Type' width='150' />
                          <ColumnDirective field='service_cat' headerText='Service' width='150' />
                          <ColumnDirective field='mobile' headerText='Mobile' width='150' />
                          <ColumnDirective field='live_date' headerText='Property date' width='150' />
                          <ColumnDirective headerText='Status' width='100' template={statusPopup} />
                        </ColumnsDirective>
                        <Inject services={[Toolbar, ExcelExport, PdfExport, Sort, Filter]} />
                      </GridComponent>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <Dialog visible={confirmDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={dialogFooter} onHide={hideDialog}>
        <div className="confirmation-content">
          <i class="fa-solid fa-circle-exclamation"></i>
          <span style={{ marginLeft: '10px' }}>Are you sure you want Move to Live</span>
        </div>
      </Dialog>



    </>
  )
}

export default CompleteServiceProject