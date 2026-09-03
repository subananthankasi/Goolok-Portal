import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { SearchData } from "../../Utils/Search";
import CustomLoder from "../../Components/customLoader/CustomLoder";
import customStyle from "../../Utils/tableStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import StarsIcon from '@mui/icons-material/Stars';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Progress } from "antd";
import { useParams } from "react-router-dom";
import { decryptData } from "../../Utils/encrypt";
import VisibilityIcon from '@mui/icons-material/Visibility';



const ViewPaymentDetails = ({ data }) => {
    const [viewModal, setViewModal] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const handleViewPdf = (row) => {
        const pdfUrl = `${IMG_PATH}/sellerpayment/${row.attachment}`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };


    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            wrap: true,
        },
        {
            name: "Date",
            selector: (row) => row.Date,
            sortable: true,
            wrap: true,
            width: "170px",
            // cell: (row) =>
            //     new Date(row.Date).toLocaleDateString("en-GB", {
            //         day: "2-digit",
            //         month: "short",
            //         year: "numeric",
            //     }),
        },
        {
            name: "Seller Name",
            selector: (row) => row.Seller_Name,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Mobile Number",
            selector: (row) => row.Mobile_No,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Category",
            selector: (row) => row.Category,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Sub Category",
            selector: (row) => row.Sub_Category,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Total Seller Amount",
            selector: (row) => row.Amount,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Paid Amount",
            selector: (row) => row.paid_amount ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Balance Amount",
            selector: (row) => row.balance_amount ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Payment Type",
            selector: (row) => row.payment_type ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Payment Mode",
            selector: (row) => row.payment_mode ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Bank Name",
            selector: (row) => row.bank_name ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Transaction Id",
            selector: (row) => row.transaction_id ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },

        {
            name: "Status",
            selector: (row) => row.status ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Remarks",
            selector: (row) => row.remark ?? "-",
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Attachment",
            cell: (row) => (
                row.attachment ? (
                    <button
                        className="btn1 btn-sm"
                        onClick={() => handleViewPdf(row)}
                    >
                        View
                    </button>
                ) : (
                    "-"
                )
            ),
            width: "150px",
        },
        // {
        //     name: "Actions",
        //     cell: (row) => (
        //         <div className="d-flex">
        //             <button
        //                 className="btn btn-outline-info me-1 edit"
        //                 data-tooltip-id="edit"
        //                 onClick={() => handleEdit(row)}
        //             >
        //                 <EditIcon />
        //             </button>
        //             <button
        //                 className="btn btn-outline-success delete"
        //                 data-tooltip-id="view"
        //                 onClick={() => setDataView(true)}
        //             onClick={() => openDelete(row)}
        //             >
        //                 <VisibilityIcon />
        //             </button>
        //         </div>
        //     ),
        // },
    ];

    return (
        <DataTable
            columns={columns}
            data={data[0]?.payment_data}
            customStyles={customStyle}
            // pagination
            // selectableRows
            persistTableHead={true}
            fixedHeader
            // progressPending={isLoading}
            progressComponent={<CustomLoder />}
        />
    )
}

export default ViewPaymentDetails