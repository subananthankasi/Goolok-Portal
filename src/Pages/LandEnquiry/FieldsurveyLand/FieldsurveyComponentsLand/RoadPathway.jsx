import React, { useEffect, useState } from "react";
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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useSelector } from "react-redux";

const RoadPathway = (props) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  // const options = props.props.status == "pending" || props.props.status == "complete" && staffid.Login == "staff" ? "Edit" : " ";
  const options = props.props.pagetype === "reminder" || staffid.Login === "admin" || enquiryDoumentData?.status === "booking" ? " " : "Edit"

  const [surveyData, setSurveyData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);


  const parsedSurveyData = surveyData.map((item) => {
    const parsedLawyerDetails = item.pathway
      ? JSON.parse(item.pathway)
      : {};
    return {
      ...parsedLawyerDetails,
    };
  });

  const filterSettings = { type: "Excel" };
  const toolbarOptions = [options];
  const editSettings = {
    allowEditing: props.props.status == "pending" || props.props.status == "complete" && props.props.pagetype !== "reminder" && staffid.Login == "staff" && enquiryDoumentData?.status !=="booking" ? true : false,
    mode: "Dialog",
    template: dialogTemplate,
  };
  const pageSettings = { pageCount: 5 };

  const fetchSurveyData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lawyer/${props.props.eid}`
      );
      const data = response.data.map((data, index) => ({
        ...data,
        sno: index + 1,
      }));
      setSurveyData(data);
    } catch (error) {
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const [pathWayData, setPathWayData] = useState([])

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customerprop/${props.props.eid}`, {
        headers: {
          'Gl-Status': 'customer'
        },
      })
      setPathWayData(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCustomerData();
  }, []);


  function dialogTemplate(props) {
    return <DialogFormTemplate props={props} />;
  }
  async function actionComplete(args) {
    if (args.action === "edit") {
      // const updateData = {
      //   "id": args.data.id,
      //   "pathway": args.data
      // };
      const updateData = {
        id: args.data.id,
        access: args.data.access,
        facing_width: args.data.facing_width,
        road_frontage: args.data.road_frontage,
        road_width: args.data.road_width,
        property_type: args.data.property_type,
        boundary: args.data.boundary,
        connectivity: args.data.connectivity

      };

      try {
        await axios.post(`${API_BASE_URL}/pathwaycreate`, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        Toast({ message: "Successfully update", type: "success" });
      } catch (error) {
        Toast({
          message: "error to update data! try agian later",
          type: "error",
        });
      } finally {
        fetchCustomerData();
      }
    }
  }

  const dataSource = surveyData.map((data, index) =>
    data.pathway !== null ? parsedSurveyData[index] : data
  );


  return (
    <>
      <div className="mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h6>Road/Pathway</h6>
        </div>

        <div className="border-0">
          <GridComponent
            dataSource={pathWayData}
            // toolbar={toolbarOptions}
            allowSorting={true}
            allowFiltering={true}
            filterSettings={filterSettings}
            allowPaging={true}
            editSettings={editSettings}
            pageSettings={pageSettings}
            actionComplete={actionComplete}
          >

            <ColumnsDirective>

              {/* <ColumnDirective
                field="sno"
                headerText="S.No"
                width="150"
                isPrimaryKey={true}
              ></ColumnDirective> */}
              {/* <ColumnDirective
                field="survey_no"
                headerText="Survey no"
                width="150"
              />
              <ColumnDirective
                field="sub_division"
                headerText="Sub division"
                width="150"
              /> */}

              <ColumnDirective
                field="access"
                headerText="Access"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>
              <ColumnDirective
                field="facing_width"
                headerText="Road Facing"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>
              <ColumnDirective
                field="road_frontage"
                headerText="Road Frontage"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>
              <ColumnDirective
                field="road_width"
                headerText="Road Width"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>
              <ColumnDirective
                field="property_type"
                headerText="Property Type"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>
              <ColumnDirective
                field="boundary"
                headerText="Boundary Wall"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>
              <ColumnDirective
                field="connectivity"
                headerText="Land Connectivity"
                width="150"
                validationRules={{ required: true }}
              ></ColumnDirective>

              {(props.props.status === "pending" || props.props.status === "complete") && staffid.Login === "staff" && props.props.pagetype !== "reminder" && enquiryDoumentData?.status !=="booking" && (
                <ColumnDirective
                  headerText="Actions"
                  width="150"
                  commands={[
                    { type: "Edit", buttonOption: { content: "Edit", cssClass: "e-primary" } },
                  ]}
                ></ColumnDirective>
              )}

            </ColumnsDirective>

            <Inject services={[Page, Toolbar, Edit, Sort, Filter, CommandColumn]} />

          </GridComponent>
        </div>
      </div >
    </>
  )
}

export default RoadPathway

function DialogFormTemplate({ props }) {
  const [formData, setFormData] = React.useState(props || {});

  // function onChange(event) {
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // }
  function onChange(event) {

    if (event.target) {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    else {
      setFormData((prev) => ({ ...prev, access: event.value }));
      setFormData((prev) => ({ ...prev, property_type: event.value }));

    }
  }


  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="row">
        {/* <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="sno"
              name="sno"
              type="text"
              disabled
              value={formData.sno || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Sno</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="survey_no"
              name="survey_no"
              type="text"
              disabled
              value={formData.survey_no || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Survey No</label>
          </div>
        </div>

        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="sub_division"
              name="sub_division"
              type="text"
              disabled
              value={formData.sub_division || ""}
              onChange={onChange}
            />

            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Sub division</label>
          </div>
        </div> */}

        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <DropDownListComponent
              id="access"
              name="access"
              dataSource={["Available", "Not Available"]}
              placeholder="Access"
              value={formData.access || ""}
              // change={onChange}
              change={(e) => onChange({ name: "access", value: e.value })}
            />
            <span className="e-float-line"></span>
            {/* <label className="e-float-text e-label-top">Access</label> */}
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="facing_width"
              name="facing_width"
              type="text"
              value={formData.facing_width || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Road Facing</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="road_frontage"
              name="road_frontage"
              type="text"
              value={formData.road_frontage || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Road Frontage</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="road_width"
              name="road_width"
              type="text"
              value={formData.road_width || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Road Width</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">

            <DropDownListComponent
              id="property_type"
              name="property_type"
              dataSource={["Corner", "Not a corner"]}
              placeholder="Property Type"
              value={formData.property_type || ""}
              // change={onChange}
              change={(e) => onChange({ name: "property_type", value: e.value })}
            />
            <span className="e-float-line"></span>
            {/* <label className="e-float-text e-label-top">Property Type</label> */}
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="boundary"
              name="boundary"
              type="text"
              value={formData.boundary || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Boundary Wall</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="connectivity"
              name="connectivity"
              type="text"
              value={formData.connectivity || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Land Connectivity</label>
          </div>
        </div>

      </div>
    </div>
  );
}