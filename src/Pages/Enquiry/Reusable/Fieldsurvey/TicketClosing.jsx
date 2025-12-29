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
import { DateFormatcustom } from "../../../../Utils/DateFormatcustom";
import { useSelector } from "react-redux";

export const TicketClosing = (props) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  // const options = props.props.status == "pending" && staffid.Login == "staff" ? "Edit" : " ";
  const options =
    props.props.pagetype === "reminder" || staffid.Login === "admin"
      ? " "
      : "Edit";
  const enquiryDoumentData = useSelector(
    (state) => state.Enquiry.enquiryDocument
  );
  const filterSettings = { type: "Excel" };
  const toolbarOptions = [options];
  const editSettings = {
    allowEditing:
      props.props.status == "pending" ||
        (props.props.status == "complete" &&
          props.props.pagetype !== "reminder" &&
          staffid.Login == "staff" &&
          enquiryDoumentData?.status !== "booking")
        ? true
        : false,
    mode: "Dialog",
    template: dialogTemplate,
  };
  const pageSettings = { pageCount: 5 };

  const [loadingPage, setLoadingPage] = useState(true);
  const [surveyData, setSurveyData] = useState([]);

  const parsedSurveyData = surveyData.map((item) => {
    const parsedLawyerDetails = item.survey_details
      ? JSON.parse(item.survey_details)
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
        area: args.data.area,
        North: args.data.north,
        East: args.data.east,
        South: args.data.south,
        West: args.data.west,
        Other_sides: args.data.other_side,
        verification: args.data.verification,
        dispute: args.data.dispute,
        next_update: args.data.next_update,
      };

      try {
        await axios.post(`${API_BASE_URL}/fieldsurvey`, updateData, {
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

  const dataSource = surveyData.map((data, index) =>
    data.survey_details !== null ? parsedSurveyData[index] : data
  );

  // const dateTemplate = (props) => {

  //   const date = new Date(props.next_update);
  //   const formattedDate = date.toLocaleDateString("en-GB");
  //   return <span>{formattedDate}</span>;
  // };
  const dateTemplate = (props) => {
    if (props.next_update) {
      const date = new Date(props.next_update);
      const formattedDate = date.toLocaleDateString("en-GB");
      return <span>{formattedDate}</span>;
    } else {
      return <span></span>;
    }
  };
  return (
    <>
      {loadingPage ? (
        " "
      ) : (
        <div className="mt-4">
          <div className="d-flex justify-content-between mb-3">
            <h6>Ticket Closing</h6>
          </div>

          <div className="border-0">
            <GridComponent
              dataSource={surveyData}
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
                  field="area"
                  headerText="Area"
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
                  headerText="Other Sides"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="verification"
                  headerText="Verification status"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="dispute"
                  headerText="Dispute"
                  width="150"
                  validationRules={{ required: true }}
                ></ColumnDirective>
                <ColumnDirective
                  field="next_update"
                  headerText="Next followup date"
                  width="150"
                  validationRules={{ required: true }}
                  template={dateTemplate}
                ></ColumnDirective>

                {(props.props.status === "pending" ||
                  props.props.status === "complete") &&
                  staffid.Login === "staff" &&
                  props.props.pagetype !== "reminder" &&
                  enquiryDoumentData?.status !== "booking" && (
                    <ColumnDirective
                      headerText="Actions"
                      width="150"
                      commands={[
                        {
                          type: "Edit",
                          buttonOption: {
                            content: "Edit",
                            cssClass: "e-primary",
                          },
                        },
                      ]}
                    ></ColumnDirective>
                  )}
              </ColumnsDirective>

              <Inject
                services={[Page, Toolbar, Edit, Sort, Filter, CommandColumn]}
              />
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
              id="Area"
              name="area"
              type="text"
              value={formData.area || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Area</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="north"
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
              id="east"
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
              id="south"
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
              id="west"
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
              id="othersides"
              name="other_side"
              type="text"
              value={formData.other_side || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Other Sides</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="verification_status"
              name="verification"
              type="text"
              value={formData.verification || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">
              Verification Status
            </label>
          </div>
        </div>

        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="Dispute"
              name="dispute"
              type="text"
              value={formData.dispute || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">Dispute</label>
          </div>
        </div>
        <div className="form-group col-6 mb-3">
          <div className="e-float-input e-control-wrapper">
            <input
              id="Next_followup_date"
              name="next_update"
              type="date"
              value={formData.next_update || ""}
              onChange={onChange}
            />
            <span className="e-float-line"></span>
            <label className="e-float-text e-label-top">
              Next followup date
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
