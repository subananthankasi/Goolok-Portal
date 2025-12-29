import React, { useEffect, useState } from "react";  
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link } from 'react-router-dom'; 
import { Tooltip as ReactTooltip } from "react-tooltip"; 
import DocumentStatus from "./Documentstatus";
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';  
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar, ExcelExport, PdfExport, Group, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";


function LayoutPendingProperty() {

    // get pending layout data all data
    const dispatch = useDispatch();
    const [layoutData,setLayoutData] = useState([])  
    const [loading,setLoading] = useState(true)

    useEffect(() => {
      const fetchLandData = async () => {
        try{
          const response = await axios.get(`${API_BASE_URL}/layout`, {
            headers: { 
              'Gl-Status':'pending',    
            },
        })  
        setLayoutData(response.data)
        setLoading(false) 
      }catch(error){
          console.error("Error fetching data" , error)
          setLoading(false) 
       }
      }
      fetchLandData()
    }, []);
     
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
    
    const finalData = layoutData.map((item, index) => {
      const completionCalc = calculateCompletionPercentage(item);   
      return {
        ...item,
        sno: (index + 1).toString(),
        com_precentage: completionCalc.toFixed(0)
      };
    });
    
     
 

   
 
 



  const filterSettings = { type: 'Excel' };
  const toolbarOptions = ['ExcelExport', 'PdfExport','Search'];
  let gridInstance;


   // delete
   const handleDelete = async(row) => { 
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) { 
        const response =  await axios.delete(`${API_BASE_URL}/layout/${row}`);
         if (response.status === 200) { 
          Toast({ message: "Successfully Deleted", type: "success" }) 
          window.location.reload()
         } else { 
          Toast({ message: "Failed to delete item", type: "warning" });   
        }   
      }  
    };

  
 
    function gridUrlTemplate(props) { 
      return ( 
        <Link to={`/layout_pending_property_view?id=${props.id}`}
          className="btn btn_pdf light btn-warning text-dark"  
        >
          {props.project_tid}
        </Link>

      );
  }

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
 const [editData,setEditData] = useState(); 
 function StatusModalOpen  (props) { 
  return(
    <div className="d-flex">
    <button  
      className="btn btn_pdf btn-outline-danger "  data-tooltip-id="status"
      onClick={() => {
        openModalStatus();  
        setEditData(props.id)
      }}
    >
      Status
    </button> 
  </div>
  )
  }
 
  function EditAction (props) {
    return(
      <div className="d-flex">
      <Link to={`/layout_pending_property_edit?id=${props.id}`}
      className="btn btn-outline-info me-1 edit"  
    >
       <EditIcon />
    </Link>

        <button
            className="btn btn-outline-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDelete(props.id)}
          >
            <DeleteIcon />
          </button>

    </div>
    )
  }

  const ProjectID = gridUrlTemplate;
  const completion = completionPrecentage;
  const statusPopup = StatusModalOpen;

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





  const [isModalOpenStatus, setIsModalOpenStatus] = useState(false);
  const openModalStatus = () => {
    setIsModalOpenStatus(true);
  };
  const closeModalStatus = () => {
    setIsModalOpenStatus(false);
  };

  return (
    <>
       <DocumentStatus isOpen={isModalOpenStatus} closeModal={closeModalStatus} editData={editData}/> 
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
                <h4 className="page_heading">Layout Pending Property Report</h4>
                  <div className="col-lg-12  mb-4 mt-4"> 
                  <GridComponent id='DefaultExport' dataSource={finalData} allowTextWrap={true} ref={grid => gridInstance = grid} toolbar={toolbarOptions} allowExcelExport={true} allowPdfExport={true} allowSorting={true} allowFiltering={true} filterSettings={filterSettings}  toolbarClick={toolbarClick.bind(this)}  height='350'>
                    <ColumnsDirective> 
                          <ColumnDirective field='sno' headerText='S.no' width='150' />
                          <ColumnDirective field='created_at' headerText='Date' width='150' />
                          <ColumnDirective field='project_tid' headerText='Project ID' width='150' template={ProjectID} />
                          <ColumnDirective field='com_precentage' headerText='Completion' width='150' template={completion}/>
                          <ColumnDirective field='project_name' headerText='Project Name' width='150' />
                          <ColumnDirective field='project_address' headerText='Address' width='150' />
                          <ColumnDirective field='project_intype' headerText='Property Type' width='150' />
                          <ColumnDirective   headerText='Status' width='100'  template={statusPopup}/> 
                          <ColumnDirective   headerText='Action' width='100'  template={EditAction}/> 
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
      <ReactTooltip  id="edit" place="bottom" content="Edit" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="view" place="bottom" content="View" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="view1" place="bottom" content="View Document" style={{ fontSize: "10px"}} />
      <ReactTooltip  id="status" place="bottom" content="Status" style={{ fontSize: "10px"}} />


   

            
     </>
  );
}

export default LayoutPendingProperty;
