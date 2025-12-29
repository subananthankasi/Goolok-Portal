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
import { useDispatch, useSelector } from "react-redux"; 
import { 
  telecomDataFetch,
} from "../../Redux/Actions/Enquiry/enquiryReportAction"; 
import dummy from "../../Assets/images/dummyProfile.png"
import { useNavigate } from "react-router-dom";
 
function CompleteReport() {
  const [loading, setLoading] = useState(true);

  // get the enquiry data
  const dispatch = useDispatch();
  const enquiryDataFromWebsite = useSelector(
    (state) => state.Enquiry.telecomData
  );

  const DummyData = [
    {
        "sno": "1",
        "userid": "2",
        "taken": "27",
        "customer": "Ebin",
        "mobile": "9635258840",
        "email_id": "deva.gharuda@gmail.com",
        "type": "sale",
        "property_type": "Layout",
        "property_sub": "6",
        "patta": null,
        "chitta": null,
        "status": "pending",
        "taken_date": "2024-10-29 16:28:28",
        "dpt_status": null,
        "created_at": "2024-10-26 11:49:05",
        "updated_at": "2024-10-29 16:28:28",
        "subpro_name": "DTCP",
        "count": "2/2"
    },
    {
        "sno": "2",
        "userid": "6",
        "taken": "27",
        "customer": "Sekar",
        "mobile": "9952104148",
        "email_id": "deva@gharuda.co.in",
        "type": "sale",
        "property_type": "Land",
        "property_sub": "2",
        "patta": null,
        "chitta": null,
        "status": "pending",
        "taken_date": "2024-10-29 16:49:17",
        "dpt_status": null,
        "created_at": "2024-10-29 16:37:08",
        "updated_at": "2024-10-29 16:49:17",
        "subpro_name": " Barren Land",
        "count": "2/2"
    },
    {
        "sno": "3",
        "userid": "6",
        "taken": "27",
        "customer": "Jose",
        "mobile": "9889814445",
        "email_id": "jose@gmail.com",
        "type": "sale",
        "property_type": "Land",
        "property_sub": "1",
        "patta": null,
        "chitta": null,
        "status": "pending",
        "taken_date": "2024-10-29 17:10:16",
        "dpt_status": null,
        "created_at": "2024-10-29 16:59:42",
        "updated_at": "2024-10-29 17:10:16",
        "subpro_name": "Agricultural Land",
        "count": "1/3"
    }
  ]
   useEffect(() => {
    try{
        dispatch(telecomDataFetch())
        // const interval = setInterval(() => {
        //     dispatch(telecomDataFetch());
        //   }, 5000);
        //   return () => clearInterval(interval);
    }catch(error){

    }finally{
      setLoading(false);
    }
   }, [dispatch]);

   


   function ProfileUi(props) {
    return (
      <>
        <div className="row align-items-center">
           <div className="col-4">
              <img src={dummy} alt="image"style={{height:"auto",maxWidth:"80%"}}/> 
           </div>
           <div className="col-8">
               <p className="mb-1"><b>{props.customer}</b></p>
               <p className="mb-0">{props.mobile}</p>
               <p className="mb-0">{props.email_id}</p>
            </div>
        </div>
      </>
    );
  }
 
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];
  const Profile = ProfileUi;
 
  
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
    navigate(`/enquiry_notifications/${rowData.id}`);  
  };

 

  return (
    <>
      
      
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
                <div className=" ">
                  <div className="card-body">
                    <h4 className="page_heading">Pending Report</h4>
                    <div className="col-lg-12 mb-4 mt-4">
                      <GridComponent
                        id="DefaultExport"
                        dataSource={DummyData}
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
                            field="created_at"
                            headerText="Date"
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
     
    </>
  );
}

export default CompleteReport;

 
