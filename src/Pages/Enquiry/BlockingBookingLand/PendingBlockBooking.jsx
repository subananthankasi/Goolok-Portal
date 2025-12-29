import { useEffect, useState } from 'react'
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
import axios from 'axios';
import API_BASE_URL from '../../../Api/api';
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import ReplyIcon from '@mui/icons-material/Reply';
import Toast from '../../../Utils/Toast';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



const PendingBlockBooking = () => {
    const staffid = JSON.parse(sessionStorage.getItem('token'));
    const [pendingWaitingData, setPendingWaitingData] = useState([]);
    const [bookingVisible, setBookingVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const filterSettings = { type: "Excel" };
    const toolbarOptions = ["ExcelExport", "PdfExport", "Search"];

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blocking`, {
                headers: {
                    "Pr-Root": "land",
                    "Gl-Status": "pending"
                }
            });
            //   setLoading(false);

            setPendingWaitingData(
                response.data?.map((data, index) => ({
                    ...data,
                    sno: index + 1,
                }))
            );
        } catch (error) {
            //   setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [rowValues, setRowValues] = useState([])

    function handleBooking(props) {
        const buttonStyle = {
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '6px 16px',
            fontSize: '14px',
            fontWeight: '500',
            minWidth: '100px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        };

        const handleMouseOver = (e) => {
            e.target.style.backgroundColor = '#0056b3';
        };

        const handleMouseOut = (e) => {
            e.target.style.backgroundColor = '#17a2b8';
        };

        const handleClick = (props) => {
            setBookingVisible(true)
            setRowValues(props)
        };

        return (
            <button
                onClick={() => handleClick(props)}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={buttonStyle}
            >
                Booking
            </button>
        );
    }
    const [cancelRow,setCancelRow] = useState([])

    function handleVacant(props) {
        const buttonStyle = {
            backgroundColor: '#df3f4f',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            padding: '6px 16px',
            fontSize: '14px',
            fontWeight: '500',
            minWidth: '100px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        };

        const handleClick = (props) => {
            setVisible(true)
            setCancelRow(props)
        };

        return (
            <button
                onClick={()=>handleClick(props)}
                style={buttonStyle}
            >
                <ReplyIcon />
            </button>
        );
    }

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            enqid: rowValues.enqid,
            blockId: rowValues.id,
            shortform: rowValues.shortform,
            userid: staffid.loginid
        }
        try {
            await axios.post(`${API_BASE_URL}/blocking`, payload);
            fetchData();
            formik.resetForm()
            setBookingVisible(false);
            Toast({ message: "Succefully Updated", type: "success" });
        } catch (error) {
            console.error(error);
        }

    }
    const formik = useFormik({
        initialValues: {
            block_amount: "",
            advance_amount: "",
            paymode: "",
            cleared_date: ""
        },
        validationSchema: yup.object().shape({
            block_amount: yup.string().required("block amount  is required!!"),
            advance_amount: yup.string().required("advance amount is required!!"),
            paymode: yup.string().required("paymode is required!!"),
            cleared_date: yup.string().required("cleared date is required!!"),
        }),
        onSubmit,
    });


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

    function blockingId(props) {
        return (
            <Link
                className="btn btn_pdf light btn-warning text-dark"
            >
                {props.block_id}
            </Link>

        );
    }
    function StatusPopup(props) {
        return (
            <a
                className="btn highlight_button  light btn-success text-success"
            >
                {props.property_status}
            </a>

        );
    }
    const handleCancelBooking = async () => {
        try {
            await axios.put(`${API_BASE_URL}/blocking/${cancelRow.id}`,);
            fetchData();
            setVisible(false);
            Toast({ message: "Succefully Move To vacant", type: "success" })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <section className="section1">
                <div className=" ">
                    <div className="row">
                        <div className="col-12">
                            <div className="card-body p-1">
                                <h4 className="page_heading">Pending Report</h4>
                                <div className="col-lg-12 mb-4 mt-4">
                                    <GridComponent
                                        id="DefaultExport"
                                        dataSource={pendingWaitingData}
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

                                    >
                                        <ColumnsDirective>
                                            <ColumnDirective
                                                field="sno"
                                                headerText="S.no"
                                                textAlign='center'
                                                width="150"
                                            />
                                            <ColumnDirective
                                                headerText="Blocking ID"
                                                width="150"
                                                field="block_id"
                                                template={blockingId}
                                            />
                                            <ColumnDirective
                                                headerText="Date"
                                                width="150"
                                                field="live_date"
                                            />

                                            <ColumnDirective
                                                field="property_type"
                                                headerText="Category "
                                                width="150"
                                            />
                                            <ColumnDirective
                                                headerText="Sub Category"
                                                width="180"
                                                field="subpro_name"
                                            />

                                            <ColumnDirective
                                                headerText="Live Property ID"
                                                width="180"
                                                field="vacant_id"
                                            />
                                            <ColumnDirective
                                                field="property_status"
                                                headerText="Property Status"
                                                width="180"
                                                template={StatusPopup}
                                            />
                                            <ColumnDirective
                                                headerText="Move To Booking"
                                                width="180"
                                                template={handleBooking}
                                            />
                                            <ColumnDirective
                                                headerText="Move To Vacant"
                                                width="150"
                                                template={handleVacant}
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
                </div>
            </section>

            <Dialog
                header="Blocking - Accounts Confirmation"
                visible={bookingVisible}
                style={{ width: "34vw" }}
                onHide={() => {
                    setBookingVisible(false);
                    formik.resetForm()
                }}
            >
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className="form-group mt-1">
                        <label htmlFor="remark" className="form-label">
                            Blocking Amount :
                        </label>
                        <select
                            name="block_amount"
                            id="block_amount"
                            className="form-select"
                            value={formik.values.block_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter blocking amounts...."
                        >
                            <option>Select Type  </option>
                            <option value="Received" >Received  </option>
                            <option value="Not Received" >Not Received  </option>
                        </select>
                        {formik.errors.block_amount && formik.touched.block_amount ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.block_amount}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-1">
                        <label htmlFor="remark" className="form-label">
                            Payment Cleared Date :
                        </label>
                        <input
                            type='date'
                            name="cleared_date"
                            id="cleared_date"
                            className="form-control"
                            value={formik.values.cleared_date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                        {formik.errors.cleared_date && formik.touched.cleared_date ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.cleared_date}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-1">
                        <label htmlFor="remark" className="form-label">
                            Advance Amount :
                        </label>
                        <input
                            name="advance_amount"
                            id="advance_amount"
                            className="form-control"
                            value={formik.values.advance_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter advance amount...."
                        />
                        {formik.errors.advance_amount && formik.touched.advance_amount ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.advance_amount}
                            </p>
                        ) : null}
                    </div>
                    <div className="form-group mt-1">
                        <label htmlFor="remark" className="form-label">
                            Mode Of Pay :
                        </label>
                        <input
                            name="paymode"
                            id="paymode"
                            className="form-control"
                            value={formik.values.paymode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter mode of pay...."
                        />
                        {formik.errors.paymode && formik.touched.paymode ? (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {formik.errors.paymode}
                            </p>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-3">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                setBookingVisible(false);
                                formik.resetForm();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Dialog>

            <Dialog
                header=" Confirmation"
                visible={visible}
                style={{ width: "34vw" }}
                onHide={() => {
                    setVisible(false);
                }}
            >
                <div>
                    <div className="confirmation-content">
                        <ErrorOutlineIcon sx={{ fontSize: 24 }} />
                        <span style={{ marginLeft: "10px" }}>
                            Are you sure you want to cancel this booking..?
                        </span>
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-3 gap-3">
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            setVisible(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" type="button" onClick={() => handleCancelBooking()}>
                        Yes
                    </Button>
                </div>

            </Dialog>
        </>
    )
}

export default PendingBlockBooking