import React, { useEffect, useState } from "react";  
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link } from 'react-router-dom';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport,Sort, Filter } from '@syncfusion/ej2-react-grids';
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";  
import StatusUpdate from "./StatusUpdate";
import Spinner from 'react-bootstrap/Spinner';

function LayoutAwaitingConfirmation() {

 
 
  const [data, SetData] = useState([]); 
  const [loading,setLoading] = useState(true)

  const formatLand = data.map((item)=>item.land) 
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/project`, {
                headers: { 
                  'Gl-Status':'waiting',  
                  'Gl-Root':'Layout',  
                },
            });
            SetData(response.data) 
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };
 
        fetchData();
 
}, []);
  


 
  
 

 

  const filterSettings = { type: 'Excel' };
  const toolbarOptions = ['ExcelExport', 'PdfExport','Search'];
  let gridInstance;

 


 
    function gridUrlTemplate(props) { 
      return ( 
        <Link to={`/view_all_details?id=${props.id}&status=waiting&type=${props.project_intype}`}
          className="btn btn_pdf light btn-warning text-dark"  
        >
          {props.project_tid}
        </Link>

      );
  }
  /////////////////////////////////////
 
  const calculateCompletionPercentage = (record) => {
    const totalFields = Object.keys(record).length;
    let filledFields = 0;
  
    for (const key in record) {
      if (record[key] !== '' && record[key] !== null && record[key] !== undefined) {
        filledFields++;
      }
    } 
    return (filledFields / totalFields) * 100;
  };
  
  const finalData = formatLand.map((item, index) => {
    const completionCalc = calculateCompletionPercentage(item);   
    return {
      ...item,
      sno: (index + 1).toString(),
      com_precentage: completionCalc.toFixed(0)
    };
  });
  

  const [editData,setEditData] = useState(); 

 
  const renderStatusButton = (props) => {
    return(
    <button
      className="btn btn_pdf btn-outline-danger"
      data-tooltip-id="status"
      onClick={() => {
        openModalStatus();
        setEditData(props.id);
      }}
    >
      Status
    </button>
)
};

 

function completionPrecentage(props) { 
  return ( 
    <div className="d-flex">
    <div style={{ width: 40, height: 40 }}>
    <CircularProgressbar value={props.com_precentage} text={`${props.com_precentage}%`}
     styles={buildStyles({ 
      textSize: '26px', 
      pathColor: '#ffae42',
      textColor: 'black',
      trailColor: '#d6d6d6',
      backgroundColor: '#3e98c7',
    })}
     />;
    </div>
  </div> 
  );
}
 

  const ProjectID = gridUrlTemplate;
  const completion = completionPrecentage;
  const statusPopup = renderStatusButton;
  const [isModalOpenStatus, setIsModalOpenStatus] = useState(false);

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
  const openModalStatus = () => {
    setIsModalOpenStatus(true);
  };
  const closeModalStatus = () => {
    setIsModalOpenStatus(false);
  };
  return (
    <>
           <StatusUpdate isOpen={isModalOpenStatus} closeModal={closeModalStatus} editData={editData} />   

       <section className="section">
        <div className="container">
          <div className="row">
          {loading ? 
          <div style={{height:"32vh",display:"flex",justifyContent:"center"}}>
             <Spinner className="mt-auto"/> 
          </div>
          :
          <div className="col-12">
              <div className="card"> 
                <div className="card-body">
                <h4 className="page_heading">Awaiting Confirmation</h4>
                  <div className="col-lg-12  mb-4 mt-4"> 
                  <GridComponent id='DefaultExport' dataSource={finalData} allowTextWrap={true} ref={grid => gridInstance = grid} toolbar={toolbarOptions} allowExcelExport={true} allowPdfExport={true} allowSorting={true} allowFiltering={true} filterSettings={filterSettings}  toolbarClick={toolbarClick.bind(this)}  height='350'>
                    <ColumnsDirective> 
                          <ColumnDirective field='sno' headerText='S.no' width='150' />
                          <ColumnDirective field='created_at' headerText='Date' width='150' />
                          <ColumnDirective field='project_pid' headerText='Project ID' width='150' template={ProjectID} />
                          <ColumnDirective field='com_precentage' headerText='Completion' width='150' template={completion}/>
                          <ColumnDirective field='project_name' headerText='Project Name' width='150' />
                          <ColumnDirective field='project_address' headerText='Address' width='150' />
                          <ColumnDirective field='subpro_name' headerText='Property Type' width='150' />
                          <ColumnDirective field='assign_remark' headerText='Remark' width='150' />
                          <ColumnDirective   headerText='Status' width='100'  template={statusPopup}/>  
                    </ColumnsDirective>
                    <Inject services={[Toolbar, ExcelExport, PdfExport, Sort, Filter]}/>
                  </GridComponent>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section> 
     </>
  );
}

export default LayoutAwaitingConfirmation;
