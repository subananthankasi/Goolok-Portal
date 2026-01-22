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
} from "@syncfusion/ej2-react-grids";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import API_BASE_URL, { IMG_PATH } from "../../../../../Api/api";
import Toast from "../../../../../Utils/Toast";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";

export const CleranceDateLawyer = (props) => {
    const options = props.data.status == "complete" ? " " : "Edit";
    const filterSettings = { type: "Excel" };
    const toolbarOptions = [options];

    const staffid = JSON.parse(localStorage.getItem("token"));
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );
    const editSettings = {
        allowEditing:
            props.data.status === "pending" ||
                (props.data.status === "complete" &&
                    staffid.Login === "staff" &&
                    enquiryDoumentData?.status !== "live")
                ? true
                : false,
        mode: "Dialog",
        template: dialogTemplate,
    };
    const pageSettings = { pageCount: 5 };

    const [loadingPage, setLoadingPage] = useState(true);
    const [surveyData, setSurveyData] = useState([]);

    const parsedSurveyData = surveyData.map((item) => {
        const parsedLawyerDetails = item.lawyer_details
            ? JSON.parse(item.lawyer_details)
            : {};
        return {
            ...parsedLawyerDetails,
        };
    });

    const fetchSurveyData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/lawyer/${props.data.eid}`
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

    const [selectedFile, setSelectedFile] = useState(null);

    function dialogTemplate(props) {
        return (
            <DialogFormTemplate props={props} setSelectedFile={setSelectedFile} />
        );
    }

    async function actionComplete(args) {
        if (args.action === "edit") {
            const formData = new FormData();
            formData.append("id", args.data.id);
            formData.append("survey_no", args.data.survey_no);
            formData.append("sub_division", args.data.sub_division);
            formData.append("Positive", args.data.positive);
            formData.append("Negative", args.data.negative);
            formData.append("last_deed_no", args.data.last_saledeed_no);
            formData.append("Lastdate", args.data.last_saledeed_date);
            formData.append("Power", args.data.power_agent);
            formData.append("query", args.data.query);
            formData.append("Partners", args.data.partners);
            formData.append("etc", args.data.etc);

            if (selectedFile instanceof File) {
                formData.append("document_list", selectedFile);
            } else {
                console.error(" No valid File object found. Skipping file upload.");
            }
            try {
                await axios.post(`${API_BASE_URL}/lawyersurveyadd`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
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
        data.lawyer_details !== null ? parsedSurveyData[index] : data
    );
    //................................................................

    const [date, setDate] = useState(null);
    const [getData, setGetData] = useState([]);

    const fetchDate = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/clearance/${props.data.eid}`
            );
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
        fetchDate();
    }, []);

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

        const formattedDate = `${selectedDate.getFullYear()}-${(
            selectedDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

        const payload = {
            clearanceDate: formattedDate,
            id: props.data.id,
        };

        try {
            const response = await axios.post(
                `${API_BASE_URL}/addclearance`,
                payload
            );
        } catch (error) {
            console.error("Error saving date:", error);
        }
    };

    return (
        <>
            {loadingPage ? (
                " "
            ) : (
                <div>
                    <div className="d-flex gap-4">
                        <h6 className="mb-4 ">Expected legal opinion clearance date</h6>
                        <Calendar
                            value={date}
                            onChange={handleDateChange}
                            showIcon
                            maxDate={new Date()}
                            placeholder="Select a date..."
                            className="mb-2"
                            style={{ height: "30px" }}
                            disabled={enquiryDoumentData?.status === "live"}
                        />
                    </div>

                    <div className="control-pane">
                        <div className="control-section">
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
                                    />
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
                                        field="power_agent"
                                        headerText="Power agent"
                                        width="150"
                                        validationRules={{ required: true }}
                                    />
                                    {/* <ColumnDirective field="Lastdate" headerText="Last sale deed date" width="150" /> */}
                                    <ColumnDirective
                                        field="last_saledeed_date"
                                        headerText="Last Sale Deed Date"
                                        width="150"
                                        textAlign="Center"
                                        template={(props) => {
                                            if (!props.last_saledeed_date) return "";
                                            const date = new Date(props.last_saledeed_date);
                                            return date.toLocaleDateString("en-GB");
                                        }}
                                    />
                                    <ColumnDirective
                                        field="last_saledeed_no"
                                        headerText="Last sale deed No"
                                        width="150"
                                    />
                                    <ColumnDirective
                                        field="partners"
                                        headerText="Partners"
                                        width="150"
                                    />
                                    <ColumnDirective field="etc" headerText="etc" width="150" />
                                    <ColumnDirective
                                        field="positive"
                                        headerText="Positive impression"
                                        width="200"
                                        validationRules={{ required: true }}
                                    />
                                    <ColumnDirective
                                        field="negative"
                                        headerText="Negative impression"
                                        width="200"
                                        validationRules={{ required: true }}
                                    />
                                    <ColumnDirective
                                        field="wanted"
                                        headerText=" wanted document list"
                                        width="200"
                                        template={(props) => {
                                            return props.wanted ? (
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        window.open(
                                                            `${IMG_PATH}/enquiry/${props.wanted}`,
                                                            "_blank"
                                                        )
                                                    }
                                                >
                                                    <PictureAsPdfIcon sx={{ color: "red" }} />{" "}
                                                </button>
                                            ) : null;
                                        }}
                                    />

                                    <ColumnDirective
                                        field="query"
                                        headerText="Add query"
                                        width="150"
                                        validationRules={{ required: true }}
                                    />
                                </ColumnsDirective>
                                <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
                            </GridComponent>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function DialogFormTemplate({ props, setSelectedFile }) {
    const [formData, setFormData] = React.useState(props || {});

    function onChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const onFileSelected = (args) => {
        if (args.filesData.length > 0) {
            const file = args.filesData[0].rawFile;

            setSelectedFile(file);

            setFormData((prev) => ({
                ...prev,
                document_list_name: file.name,
            }));
        }
    };
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
                            value={formData.sno || ""}
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
                            value={formData.survey_no || ""}
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
                            value={formData.sub_division || ""}
                            onChange={onChange}
                        />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">Sub division</label>
                    </div>
                </div>
                <div className="form-group col-md-6 mb-3">
                    <div className="e-float-input e-control-wrapper">
                        <input
                            id="last_deed_no"
                            name="last_saledeed_no"
                            type="text"
                            value={formData.last_saledeed_no || ""}
                            onChange={onChange}
                        />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">
                            Last Sale Deed No
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <div className="e-float-input e-control-wrapper">
                        <DatePickerComponent
                            id="Lastdate"
                            name="last_saledeed_date"
                            value={formData.last_saledeed_date}
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
                            id="Power"
                            name="power_agent"
                            type="text"
                            value={formData.power_agent || ""}
                            // onChange={onChange}
                            onChange={(e) => {
                                const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                onChange({ target: { name: "power_agent", value: onlyText } });
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
                        <input
                            id="etc"
                            name="etc"
                            type="text"
                            value={formData.etc || ""}
                            onChange={onChange}
                        />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">etc</label>
                    </div>
                </div>

                <div className="form-group col-md-6 mb-3">
                    <div className="e-float-input e-control-wrapper">
                        <input
                            id="Partners"
                            name="partners"
                            type="text"
                            value={formData.partners || ""}
                            // onChange={onChange}
                            onChange={(e) => {
                                const onlyText = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                onChange({ target: { name: "partners", value: onlyText } });
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
                        <textarea
                            id="Negative"
                            name="negative"
                            type="text"
                            value={formData.negative || ""}
                            onChange={onChange}
                        />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">
                            Negative impression
                        </label>
                    </div>
                </div>

                <div className="form-group col-md-6 mb-3">
                    <div className="e-float-input e-control-wrapper">
                        <textarea
                            id="Positive"
                            name="positive"
                            type="text"
                            value={formData.positive || ""}
                            onChange={onChange}
                        />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top">
                            Positive impression
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <div className="e-float-input e-control-wrapper">
                        <input
                            id="query"
                            name="query"
                            type="text"
                            value={formData.query || ""}
                            onChange={onChange}
                        />
                        <span className="e-float-line"></span>
                        <label className="e-float-text e-label-top"> Query</label>
                    </div>
                </div>
                <div className="form-group col-md-5 mb-3">
                    <div className="e-float-input e-control-wrapper">
                        <UploaderComponent
                            id="document_list"
                            name="wanted"
                            allowedExtensions=".pdf,.png,.jpeg,.jpg"
                            autoUpload={false}
                            multiple={false}
                            selected={onFileSelected}
                        />
                        <span className="e-float-line"></span>
                    </div>
                </div>
                {props.wanted ? (
                    <div
                        className="col-md-1 mb-3 text-center d-flex"
                        style={{ textAlign: "center", alignItems: "center" }}
                    >
                        <button
                            className="btn"
                            onClick={() =>
                                window.open(`${IMG_PATH}/enquiry/${props.wanted}`, "_blank")
                            }
                        >
                            <VisibilityIcon sx={{ fontSize: 25 }} />
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
