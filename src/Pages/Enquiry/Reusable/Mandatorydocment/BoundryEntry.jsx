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
  CommandColumn
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import { useSelector } from "react-redux";

export const BoundryEntry = (props) => {

  const staffid = JSON.parse(sessionStorage.getItem("token"));
  // const options = props.props.status === "pending" && staffid.Login === "staff" ? "Edit" : " ";
  const options = props.props.pagetype === "reminder" || staffid.Login === "admin" ? " " : "Edit"
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const filterSettings = { type: "Excel" };
  const toolbarOptions = [options];
  const editSettings = {
    allowEditing: (props.props.status === "pending" || props.props.status === "complete") && props.props.pagetype !== "pagetype" && staffid.Login === "staff" && enquiryDoumentData?.status !== "booking" ? true : false,
    mode: "Dialog",
    template: dialogTemplate,
  };
  const pageSettings = { pageCount: 5 };

  const [loadingPage, setLoadingPage] = useState(true);
  const [surveyData, setSurveyData] = useState([]);

  const parsedSurveyData = surveyData.map((item) => {
    const parsedLawyerDetails = item.mandatory_details
      ? JSON.parse(item.mandatory_details)
      : {};
    return {
      ...parsedLawyerDetails,
    };
  });

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

  function dialogTemplate(props) {
    return <DialogFormTemplate props={props} />;
  }

  async function actionComplete(args) {

    if (args.action === "edit") {
      // const updateData = {
      //   "id": args.data.id,
      //   "details": args.data
      // };
      const updateData = {
        id: args.data.id,
        survey_no: args.data.survey_no,
        sub_division: args.data.sub_division,
        extent: args.data.extentunit,
        North: args.data.north,
        East: args.data.east,
        South: args.data.south,
        West: args.data.west,
        Other_sides: args.data.other_side
      };

      try {
        await axios.post(`${API_BASE_URL}/mandatory`, updateData, {
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
        fetchSurveyData();
      }
    }
  }

  // const dataSource = surveyData.lawyer_details !== null ? parsedSurveyData : surveyData
  const dataSource = surveyData.map((data, index) =>
    data.mandatory_details !== null ? parsedSurveyData[index] : data
  );

  return (
    <>
      {loadingPage ? (
        " "
      ) : (
        <div className="mt-4">
          <div className="d-flex justify-content-between mb-3">
            <h6>Boundry Entry</h6>
          </div>

          <div className="border-0">
            <GridComponent
              dataSource={surveyData}
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
                <ColumnDirective
                  field="sno"
                  headerText="S.No"
                  width="150"
                  isPrimaryKey={true}
                ></ColumnDirective>
                <ColumnDirective
                  field="survey_no"
                  headerText="Survey no"
                  width="150"
                />
                <ColumnDirective
                  field="sub_division"
                  headerText="Sub division"
                  width="150"
                />
                <ColumnDirective
                  field="extentunit"
                  headerText="Extent in units"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="north"
                  headerText="North"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="east"
                  headerText="East"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="south"
                  headerText="South"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="west"
                  headerText="West"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="other_side"
                  headerText="Other sides"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                {(props.props.status === "pending" || props.props.status === "complete") && staffid.Login === "staff" && props.props.pagetype !== "reminder" && enquiryDoumentData?.status !== "booking" && (
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
        </div>
      )}
    </>
  );
};

function DialogFormTemplate({ props }) {
  const [formData, setFormData] = React.useState(props || {});

  function onChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="row">
        <div className="form-group col-6 mb-3">
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
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="extent"
              name="extentunit"
              type="text"
              value={formData.extentunit || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Extent in units</label>
          </div>
        </div>

        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="North"
              name="north"
              type="text"
              value={formData.north || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">North</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="East"
              name="east"
              type="text"
              value={formData.east || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">East</label>
          </div>
        </div>

        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="South"
              name="south"
              type="text"
              value={formData.south || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">South</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="West"
              name="west"
              type="text"
              value={formData.west || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">West</label>
          </div>
        </div>

        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="Other_sides"
              name="other_side"
              type="text"
              value={formData.other_side || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Other sides</label>
          </div>
        </div>
      </div>
    </div>
  );
}
