import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { decryptData } from '../../../Utils/encrypt';
import axios from 'axios';
import API_BASE_URL from '../../../Api/api';
import Toast from '../../../Utils/Toast';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import DataTable from 'react-data-table-component';
import customStyle from "../../../Utils/tableStyle";
// import ReminderBlockBookingLand from '../../Enquiry/BlockingBookingLand/ReminderBlockBookingLand';
// import PaymentScheduleLandWholeComponent from '../../Enquiry/PaymentScheduleLand/PaymentScheduleLandWholeComponents/PaymentScheduleLandWholeComponent';
import { IMG_PATH } from "../../../Api/api";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TableChartIcon from '@mui/icons-material/TableChart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const getFileIcon = (filename) => {
  if (!filename) return <InsertDriveFileIcon sx={{ fontSize: 32 }} />;
  
  const extension = filename.split('.').pop().toLowerCase();
  
  switch(extension) {
    case 'pdf':
      return <PictureAsPdfIcon sx={{ color: '#d32f2f', fontSize: 30 }} />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <TableChartIcon sx={{ color: '#2e7d32', fontSize: 30 }} />;
    case 'doc':
    case 'docx':
      return <DescriptionIcon sx={{ color: '#1565c0', fontSize: 30 }} />;
    default:
      return <InsertDriveFileIcon sx={{ fontSize: 32 }} />;
  }
};

const UpdateAfterSaleLand = () => {
    const { eid, id, status, booking_id, shortform, booking_no } = useParams();
    const decryEid = decryptData(eid);
    const decryId = decryptData(id);
    const decryStatus = decryptData(status);
    const decryBookingId = decryptData(booking_id);
    const decryShortForm = decryptData(shortform);
    const decryBookingNo = decryptData(booking_no);

    const [paymentData, setPaymentData] = useState([]);
    const [regTicketData, setRegTicketData] = useState([]);
    const [registerData, setRegisterData] = useState([]);
    const [afterSaleData, setAfterSaleData] = useState([]);
    // alert(JSON.stringify(afterSaleData))
    const [loading, setLoading] = useState({
        payment: true,
        regTicket: true,
        register: true,
        afterSale: true
    });
    const [error, setError] = useState({
        payment: null,
        regTicket: null,
        register: null,
        afterSale: null
    });

    // Fetch payment data from API
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/transactions/${decryBookingId}`);
                setPaymentData(response.data);
                setLoading(prev => ({...prev, payment: false}));
            } catch (err) {
                setError(prev => ({...prev, payment: err.message}));
                setLoading(prev => ({...prev, payment: false}));
                Toast({ message: "Failed to fetch payment data", type: "error" });
            }
        };

        // Fetch registration ticket data from API
        const fetchRegTicketData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/ticketbooking/${decryBookingId}/edit`);
                // Convert the object to an array for DataTable
                const dataArray = response.data ? [response.data] : [];
                setRegTicketData(dataArray);
                setLoading(prev => ({...prev, regTicket: false}));
            } catch (err) {
                setError(prev => ({...prev, regTicket: err.message}));
                setLoading(prev => ({...prev, regTicket: false}));
                Toast({ message: "Failed to fetch registration ticket data", type: "error" });
            }
        };

        // Fetch registration data
        const fetchRegisterData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/registration/${decryBookingId}`);
                const dataAsArray = response.data ? [response.data] : [];
                setRegisterData(dataAsArray);
                setLoading(prev => ({...prev, register: false}));
            } catch (err) {
                setError(prev => ({...prev, register: err.message}));
                setLoading(prev => ({...prev, register: false}));
                Toast({ message: "Failed to fetch registration data", type: "error" });
            }
        };

        // Fetch after sale data
        const fetchAfterSaleData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/aftersaledpt/${decryBookingId}`);
                // const dataAsArray = response.data ? [response.data] : [];

                setAfterSaleData(response.data);
                setLoading(prev => ({...prev, afterSale: false}));
            } catch (err) {
                setError(prev => ({...prev, afterSale: err.message}));
                setLoading(prev => ({...prev, afterSale: false}));
                Toast({ message: "Failed to fetch after sale data", type: "error" });
            }
        };

        fetchPaymentData();
        fetchRegTicketData();
        fetchRegisterData();
        fetchAfterSaleData();
    }, [decryBookingId]);

    // Column definitions for Payment DataTable
    const paymentColumns = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Booking ID",
            selector: row => row.book_id,
            sortable: true,
            width: "150px"
        },
        {
            name: "Total Land Extent",
            selector: row => row.land_extent,
            sortable: true,
            width: "180px"
        },
        {
            name: "Price per unit",
            selector: row => row.price_unit,
            sortable: true,
            width: "150px"
        },
        {
            name: "Total Property Cost",
            selector: row => row.prop_cost,
            sortable: true,
            width: "180px"
        },
        {
            name: "Offers & Discount",
            selector: row => row.discount,
            sortable: true,
            width: "180px"
        },
        {
            name: "Total Amount Payable",
            selector: row => row.amt_payable,
            sortable: true,
            width: "180px"
        },
        {
            name: "Advance Paid",
            selector: row => row.adv_paid,
            sortable: true,
            width: "150px"
        },
        {
            name: "Balance Payable",
            selector: row => row.bal_payable,
            sortable: true,
            width: "180px"
        },
        {
            name: "Amount Paid",
            selector: row => row.amt_paid,
            sortable: true,
            width: "150px"
        },
        {
            name: "Mode of Payment",
            selector: row => row.pay_mode,
            sortable: true,
            width: "180px",
            cell: row => <span style={{ fontWeight: 'bold' }}>{row.pay_mode}</span>
        },
        {
            name: "Payment Date",
            selector: row => row.pay_date,
            sortable: true,
            width: "150px"
        },
        {
            name: "Remarks",
            selector: row => row.remarks,
            sortable: true,
            width: "200px"
        }
    ];

    // Column definitions for Registration Ticket DataTable
    const regTicketColumns = [
        {
            name: "Registration ID",
            selector: row => row.reg_id,
            sortable: true,
            width: "180px"
        },
        {
            name: "Category",
            selector: row => row.categoryname,
            sortable: true,
            width: "150px"
        },
        {
            name: "Sub Category",
            selector: row => row.subpro_name,
            sortable: true,
            width: "180px"
        },
        {
            name: "State",
            selector: row => row.stateName,
            sortable: true,
            width: "150px"
        },
        {
            name: "District",
            selector: row => row.districtName,
            sortable: true,
            width: "150px"
        },
        {
            name: "Taluk",
            selector: row => row.talukName,
            sortable: true,
            width: "150px"
        },
        {
            name: "Village",
            selector: row => row.villageName,
            sortable: true,
            width: "150px"
        },
        {
            name: "SRO",
            selector: row => row.sro_title,
            sortable: true,
            width: "180px"
        },
        {
            name: "Property Type",
            selector: row => row.property_type,
            sortable: true,
            width: "180px"
        },
        {
            name: "Extent In Unit",
            selector: row => row.extent_units,
            sortable: true,
            width: "150px"
        }
    ];

    // Column definitions for Registration DataTable
    const registerColumns = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Registration ID",
            selector: (row) => row.reg_id,
            sortable: true,
            width: "170px"
        },
        {
            name: "State",
            selector: (row) => row.stateName,
            sortable: true,
            width: "170px"
        },
        {
            name: "District",
            selector: (row) => row.districtName,
            sortable: true,
            width: "170px"
        },
        {
            name: "Taluk",
            selector: (row) => row.talukName,
            sortable: true,
            width: "170px"
        },
        {
            name: "Village",
            selector: (row) => row.villageName,
            sortable: true,
            width: "170px"
        },
        {
            name: "Property type",
            selector: (row) => row.property_type,
            sortable: true,
            width: "180px"
        },
        {
            name: "Extent in units",
            selector: (row) => row.extent_units,
            sortable: true,
            width: "180px"
        },
        {
            name: "Registration Date",
            selector: (row) => row.reg_date,
            sortable: true,
            width: "170px"
        },
        {
            name: "Registration Time",
            selector: (row) => row.reg_time,
            sortable: true,
            width: "170px"
        },
        {
            name: "Sro Details",
            selector: (row) => row.sro_title,
            sortable: true,
            width: "170px"
        },
        {
            name: "LandOwner Name",
            selector: (row) => row.landowner_name,
            sortable: true,
            width: "180px"
        },
        {
            name: "LandOwner No",
            selector: (row) => row.landowner_contact,
            sortable: true,
            width: "180px"
        },
        {
            name: "Purchaser Name",
            selector: (row) => row.purchaser_name,
            sortable: true,
            width: "180px"
        },
        {
            name: "Purchaser No",
            selector: (row) => row.purchaser_contact,
            sortable: true,
            width: "180px"
        },
        {
            name: "Staff Name",
            selector: (row) => row.staff_name,
            sortable: true,
            width: "180px"
        },
        {
            name: "Staff No",
            selector: (row) => row.staff_contact,
            sortable: true,
            width: "180px"
        },
        {
            name: "Document Status",
            selector: (row) => row.doc_status,
            sortable: true,
            width: "180px"
        },
        {
            name: "Registration File",
            cell: (row) =>
                row.doc_status === "Not Collect" || !row.doc_upload_path ? (
                    "-"
                ) : (
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-sm btn-link ms-1 p-0"
                            onClick={() =>
                                window.open(`${IMG_PATH}/regdocument/${row.doc_upload_path}`, '_blank')
                            }
                            title="View EC Document"
                        >
                            {getFileIcon(row.doc_upload_path)}
                        </button>
                    </div>
                ),
            sortable: true,
            width: "180px",
        },
        {
            name: "Collected Reg date",
            selector: (row) =>
                row.doc_status === "Collect" || !row.reg_collect_date
                    ? "-"
                    : row.reg_collect_date,
            sortable: true,
            width: "180px",
        },
        {
            name: "Registration Status",
            width: "180px",
            selector: (row) => row.reg_status || "Pending",
            sortable: true,
        }
    ];

    // Column definitions for After Sale DataTable
    const afterSaleColumns = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
            width: "80px"
        },
        {
            name: "Registration ID",
            selector: (row) => row.reg_id,
            sortable: true,
            width: "170px"
        },
        {
            name: "Registration Date",
            selector: (row) => {
                const date = new Date(row.reg_date);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
            sortable: true,
            width: "170px"
        },
        {
            name: "Category",
            selector: (row) => row.categoryName || "-",
            sortable: true,
            width: "160px"
        },
        {
            name: "Sub Category",
            selector: (row) => row.sub_catName || "-",
            sortable: true,
            width: "160px"
        },
        {
            name: "Property Type",
            selector: (row) => row.categoryName || "-",
            sortable: true,
            width: "200px"
        },
        {
            name: "Extent in Units",
            selector: (row) => row.extent_units || "-",
            sortable: true,
            width: "180px"
        },
        {
            name: "EC Document",
            cell: (row) => (
                row.ec_doc ? (
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-sm btn-link ms-1 p-0"
                            onClick={() => window.open(`${IMG_PATH}/regdocument/${row.ec_doc}`, '_blank')}
                            title="View EC Document"
                        >
                            {getFileIcon(row.ec_doc)}
                        </button>
                    </div>
                ) : "-"
            ),
            sortable: true,
            width: "180px"
        },
        {
            name: "Sale Deed No",
            selector: (row) => row.sd_no || "-",
            sortable: true,
            width: "150px"
        },
        {
            name: "Sale Deed Name",
            selector: (row) => row.sd_name || "-",
            sortable: true,
            width: "180px"
        },
        {
            name: "Sale Deed Soft Copy",
            cell: (row) => (
                row.sd_soft_copy ? (
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-sm btn-link ms-1 p-0"
                            onClick={() => window.open(`${IMG_PATH}/regdocument/${row.sd_soft_copy}`, '_blank')}
                            title="View Sale Deed Soft Copy"
                        >
                            {getFileIcon(row.sd_soft_copy)}
                        </button>
                    </div>
                ) : "-"
            ),
            sortable: true,
            width: "200px"
        },
        {
            name: "Sale Deed Hard Copy",
            selector: (row) => row.sd_hard_copy || "-",
            sortable: true,
            width: "200px"
        },
        {
            name: "Tracking ID",
            selector: (row) => row.tracking_id || "-",
            sortable: true,
            width: "160px"
        },
        {
            name: "Patta Application No",
            selector: (row) => row.patta_app_no || "-",
            sortable: true,
            width: "180px"
        },
        {
            name: "Patta Application",
            cell: (row) => (
                row.patta_app ? (
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-sm btn-link ms-1 p-0"
                            onClick={() => window.open(`${IMG_PATH}/regdocument/${row.patta_app}`, '_blank')}
                            title="View Patta Application"
                        >
                            {getFileIcon(row.patta_app)}
                        </button>
                    </div>
                ) : "-"
            ),
            sortable: true,
            width: "180px"
        },
        {
            name: "Patta No",
            selector: (row) => row.patta_no || "-",
            sortable: true,
            width: "150px"
        },
        {
            name: "Patta Name",
            selector: (row) => row.patta_name || "-",
            sortable: true,
            width: "160px"
        },
        {
            name: "Survey No",
            selector: (row) => row.survey_no || "-",
            sortable: true,
            width: "150px"
        },
        {
            name: "Area",
            selector: (row) => row.area || "-",
            sortable: true,
            width: "150px"
        },
        {
            name: "Patta Document",
            cell: (row) => (
                row.patta_doc ? (
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-sm btn-link ms-1 p-0"
                            onClick={() => window.open(`${IMG_PATH}/regdocument/${row.patta_doc}`, '_blank')}
                            title="View Patta Document"
                        >
                            {getFileIcon(row.patta_doc)}
                        </button>
                    </div>
                ) : "-"
            ),
            sortable: true,
            width: "180px"
        }
    ];

    if (loading.payment || loading.regTicket || loading.register || loading.afterSale) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <section className="section">
            <div className="container-fluid">
                <div className="row">
                    {/* Payment Schedule DataTable */}
                    <div className="col-12 mb-4">
                        <Card className="shadow border-0">
                            <div className="mb-3">
                                <h6>Payment Details</h6>
                            </div>

                            {error.payment ? (
                                <div className="p-4">
                                    <Card className="border-red-200 bg-red-50">
                                        <div className="text-red-600">Error loading payment data: {error.payment}</div>
                                    </Card>
                                </div>
                            ) : paymentData.length > 0 ? (
                                <DataTable
                                    columns={paymentColumns}
                                    data={paymentData}
                                    customStyles={customStyle}
                                    pagination
                                    highlightOnHover
                                    persistTableHead
                                    fixedHeader
                                    responsive
                                />
                            ) : (
                                <div className="p-4 text-center">No payment data available</div>
                            )}
                        </Card>
                    </div>

                    {/* Registration Ticket DataTable */}
                    <div className="col-12 mb-4">
                        <Card className="shadow border-0">
                            <div className="mb-3">
                                <h6>Registration Ticket</h6>
                            </div>

                            {error.regTicket ? (
                                <div className="p-4">
                                    <Card className="border-red-200 bg-red-50">
                                        <div className="text-red-600">Error loading registration ticket data: {error.regTicket}</div>
                                    </Card>
                                </div>
                            ) : regTicketData.length > 0 ? (
                                <DataTable
                                    columns={regTicketColumns}
                                    data={regTicketData}
                                    customStyles={customStyle}
                                    pagination
                                    highlightOnHover
                                    persistTableHead
                                    fixedHeader
                                    responsive
                                />
                            ) : (
                                <div className="p-4 text-center">No registration ticket data available</div>
                            )}
                        </Card>
                    </div>

                    {/* Registration DataTable */}
                    <div className="col-12 mb-4">
                        <Card className="shadow border-0">
                            <div className="mb-3">
                                <h6>Registration Details</h6>
                            </div>

                            {error.register ? (
                                <div className="p-4">
                                    <Card className="border-red-200 bg-red-50">
                                        <div className="text-red-600">Error loading registration data: {error.register}</div>
                                    </Card>
                                </div>
                            ) : registerData.length > 0 ? (
                                <DataTable
                                    columns={registerColumns}
                                    data={registerData}
                                    customStyles={customStyle}
                                    pagination
                                    highlightOnHover
                                    persistTableHead
                                    fixedHeader
                                    responsive
                                />
                            ) : (
                                <div className="p-4 text-center">No registration data available</div>
                            )}
                        </Card>
                    </div>

                    {/* After Sale DataTable */}
                    <div className="col-12 mb-4">
                        <Card className="shadow border-0">
                            <div className="mb-3">
                                <h6>After Sale Details</h6>
                            </div>

                            {error.afterSale ? (
                                <div className="p-4">
                                    <Card className="border-red-200 bg-red-50">
                                        <div className="text-red-600">Error loading after sale data: {error.afterSale}</div>
                                    </Card>
                                </div>
                            ) : afterSaleData.length > 0 ? (
                                <DataTable
                                    columns={afterSaleColumns}
                                    data={afterSaleData}
                                    customStyles={customStyle}
                                    pagination
                                    highlightOnHover
                                    persistTableHead
                                    fixedHeader
                                    responsive
                                />
                            ) : (
                                <div className="p-4 text-center">No after sale data available</div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateAfterSaleLand;