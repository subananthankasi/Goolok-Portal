import axios from "axios";
import API_BASE_URL from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import React, { useEffect, useState } from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Toolbar,
    Sort,
    Edit,
    Inject,
    Filter,
  } from '@syncfusion/ej2-react-grids';
import { Calendar } from 'primereact/calendar';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
export const ApartClearancedate = (props) => {


    const options = props.data.status === "complete" ? " " : "Edit"
    const filterSettings = { type: 'Excel' };
    const toolbarOptions = [options];
    const staffid = JSON.parse(localStorage.getItem("token"));
  
    const editSettings = {
      allowEditing: (props.data.status === "pending" || props.data.status === "complete") && staffid.Login === "staff" ? true : false,
      mode: "Dialog",
      template: dialogTemplate,
    };
    const pageSettings = { pageCount: 5 };
    const [loadingPage, setLoadingPage] = useState(true);
    const [surveyData, setSurveyData] = useState([])
  
    const parsedSurveyData = surveyData.map((item) => {
      const parsedLawyerDetails = item.lawyer_details ? JSON.parse(item.lawyer_details) : {};
      return {
        ...parsedLawyerDetails,
      };
    });
  
    const fetchSurveyData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lawyer/${props.data.eid}`)
        const data = response.data.map((data, index) => ({
          ...data,
          sno: index + 1,
        }))
        setSurveyData(data)
      } catch (error) {
  
      } finally {
        setLoadingPage(false)
      }
    }
  
  
    useEffect(() => {
      fetchSurveyData()
    }, [])
  
  
  
  
  
    function dialogTemplate(props) {
      return <DialogFormTemplate props={props} />;
    }
  
    async function actionComplete(args) {
      if (args.action === "edit") {
        const updateData = {
          "id": args.data.id,
          "details": args.data
        }
        try {
          await axios.post(`${API_BASE_URL}/lawyersurveyadd`, updateData, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          Toast({ message: "Successfully update", type: 'success' })
        } catch (error) {
          Toast({ message: "error to update data! try agian later", type: 'error' })
        } finally {
          fetchSurveyData()
        }
      }
    }
  
  
    // const dataSource = surveyData.lawyer_details !== null ? parsedSurveyData : surveyData
    const dataSource = surveyData.map((data, index) =>
      data.lawyer_details !== null ? parsedSurveyData[index] : data
    );
    //................................................................
  
    const [date, setDate] = useState(null)
    const [getData, setGetData] = useState([])
  
    // const fetchDate = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/clearance/${props.data.eid}`)
    //     setGetData(response.data)
    //     if (response.data[0].clearance_date) {
    //       setDate(new Date(response.data[0].clearance_date));
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
  
    // }
    const fetchDate = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/clearance/${props.data.eid}`);
        setGetData(response.data);
  
        if (response.data[0].clearance_date) {
          const apiDate = new Date(response.data[0].clearance_date);
          if (!isNaN(apiDate.getTime())) {
            setDate(apiDate);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
      fetchDate()
    }, [])
  
    // const handleDateChange = async (selectedDate) => {
    //   setDate(selectedDate);
    //   const formattedDate = selectedDate.toISOString().split("T")[0];
  
    //   const payload = {
    //     clearanceDate: formattedDate,
    //     id: props.data.id
    //   };
  

    //   try {
    //     const response = await axios.post(`${API_BASE_URL}/addclearance`, payload);
    //   } catch (error) {
    //     console.error("Error saving date:", error);
    //   }
    // };
    const handleDateChange = async (e) => {
  
      let selectedDate = e.value; 
      if (!selectedDate) return; 
  
  
      if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
        console.error("Invalid date selected");
        return;
      }
  
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (selectedDate > today) {
        console.error("Future dates are not allowed");
        setDate(null);
        return;
      }
  
      setDate(selectedDate);
  
  
      // const formattedDate = selectedDate.toISOString().split("T")[0];
      const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

  
      const payload = {
        clearanceDate: formattedDate,
        id: props.data.id
      };

  
      try {
        const response = await axios.post(`${API_BASE_URL}/addclearance`, payload);
      } catch (error) {
        console.error("Error saving date:", error);
      }
    };
  
    return (
      <>
        {loadingPage ? " " :
          <div>
            <div className='d-flex gap-4' >
              <h6 className='mb-4 '>Expected legal opinion clearance date</h6>
              {/* <DatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control w-50"
                style={{ width: "250px" }}
                maxDate={new Date()}
                placeholderText="Select a date ...."
              /> */}
              <Calendar
                value={date}
                onChange={handleDateChange}
                showIcon
                maxDate={new Date()}
                placeholder="Select a date..."
                className='mb-2'
                style={{ height: '30px' }}
              />
            </div>
  
            <div className="control-pane">
              <div className="control-section">
                <GridComponent
                  dataSource={dataSource}
                  toolbar={toolbarOptions}
                  allowSorting={true}
                  allowFiltering={true}
                  filterSettings={filterSettings}
                  allowPaging={true}
                  editSettings={editSettings}
                  pageSettings={pageSettings}
                  actionComplete={actionComplete}
                >
                  <ColumnsDirective>
                    <ColumnDirective field="sno" headerText="S.No" width="150" isPrimaryKey={true} />
                    <ColumnDirective field="survey_no" headerText="Survey no" width="150" />
                    <ColumnDirective field="sub_division" headerText="Sub division" width="150" />
                    <ColumnDirective field="Power" headerText="Power agent" width="150" validationRules={{ required: true }} />
                    {/* <ColumnDirective field="Lastdate" headerText="Last sale deed date" width="150" /> */}
                    <ColumnDirective
                      field="Lastdate"
                      headerText="Last Sale Deed Date"
                      width="150"
                      textAlign="Center"
                      template={(props) => {
                        if (!props.Lastdate) return "";
                        const date = new Date(props.Lastdate);
                        return date.toLocaleDateString("en-GB");
                      }}
                    />
                    <ColumnDirective field="last_deed_no" headerText="Last sale deed No" width="150" />
                    <ColumnDirective field="Partners" headerText="Partners" width="150" />
                    <ColumnDirective field="etc" headerText="etc" width="150" />
                    <ColumnDirective field="CompletionCerificate_No" headerText="CompletionCerificate_No" width="150" />
                    <ColumnDirective field="LandTax_Receipt" headerText="LandTax_Receipt" width="150" />
                    <ColumnDirective field="NOC" headerText="NOC" width="150" />

                      
                    <ColumnDirective field="Positive" headerText="Positive impression" width="200" validationRules={{ required: true }} />
                    <ColumnDirective field="Negative" headerText="Negative impression" width="200" validationRules={{ required: true }} />
                    <ColumnDirective field="document_list" headerText="Add wanted document list" width="200" validationRules={{ required: true }} />
                    <ColumnDirective field="query" headerText="Add query" width="150" validationRules={{ required: true }} />
                  </ColumnsDirective>
                  <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
                </GridComponent>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
  
  function DialogFormTemplate({ props }) {
    const [formData, setFormData] = React.useState(props || {});
  
    function onChange(event) {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  
    return (
      <div className="container">
        <div className="row">
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="sno"
                name="sno"
                type="text"
                disabled
                value={formData.sno || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Sno</label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="survey_no"
                name="survey_no"
                type="text"
                disabled
                value={formData.survey_no || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Survey No</label>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="sub_division"
                name="sub_division"
                type="text"
                disabled
                value={formData.sub_division || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Sub division</label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="Power"
                name="Power"
                type="text"
                value={formData.Power || ''}
                // onChange={onChange}
                onChange={(e) => {
                  const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  onChange({ target: { name: "Power", value: onlyText } });
                }}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Power Agent</label>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
  
              <DatePickerComponent
                id="Lastdate"
                value={formData.Lastdate}
                // value={new Date(formData.Lastdate)}
                placeholder="Last Sale Deed Date"
                floatLabelType="Always"
                format="dd-MMM-yy"
                max={new Date()}
              />
              <span className="e-float-line"></span>
              {/* <label className="e-float-text e-label-top">Last sale date</label> */}
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="Partners"
                name="Partners"
                type="text"
                value={formData.Partners || ''}
                // onChange={onChange}
                onChange={(e) => {
                  const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  onChange({ target: { name: "Partners", value: onlyText } });
                }}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Partners</label>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="etc"
                name="etc"
                type="text"
                value={formData.etc || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">etc</label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="CompletionCerificate_No"
                name="CompletionCerificate_No"
                type="text"
                value={formData.CompletionCerificate_No || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Completion Cerificate No</label>
            </div>
          </div>
         </div>
        <div className="row">

          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="LandTax_Receipt"
                name="LandTax_Receipt"
                type="text"
                value={formData.LandTax_Receipt || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">LandTax_Receipt</label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="NOC"
                name="NOC"
                type="text"
                value={formData.NOC|| ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">NOC</label>
            </div>
          </div>
          </div>
          
        
  
        <div className="row">
        <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="Positive"
                name="Positive"
                type="text"
                value={formData.Positive || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Positive impression</label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="Negative"
                name="Negative"
                type="text"
                value={formData.Negative || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Negative impression</label>
            </div>
          </div>
          
        </div>
  
        <div className="row">
        <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="document_list"
                name="document_list"
                type="text"
                value={formData.document_list || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Add wanted document</label>
            </div>
          </div>
          <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="query"
                name="query"
                type="text"
                value={formData.query || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Add query</label>
            </div>
          </div>
          </div>
        <div className="row">

        <div className="form-group col-md-6 mb-3">
            <div className="e-float-input e-control-wrapper">
              <input
                id="last_deed_no"
                name="last_deed_no"
                type="text"
                value={formData.last_deed_no || ''}
                onChange={onChange}
              />
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Last Sale Deed No</label>
            </div>
          </div>
          </div>
        {/* <div className="row">
          <div className="form-group col-md-6">
            <NumericTextBoxComponent
              id="Freight"
              format="C2"
              value={formData.Freight}
              placeholder="Freight"
              floatLabelType="Always"
            />
          </div>
          <div className="form-group col-md-6">
            <DatePickerComponent
              id="OrderDate"
              value={formData.OrderDate}
              placeholder="Order Date"
              floatLabelType="Always"
            />
          </div>
        </div> */}
      </div>
    );
  }
  
  