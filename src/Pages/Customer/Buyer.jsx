import React, { useEffect, useState } from "react";
// import "../mastercss.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { SearchData } from "../../Utils/Search";
import ExportButton from "../../Utils/ExportButton";
import CustomLoder from "../../Components/customLoader/CustomLoder";
import customStyle from "../../Utils/tableStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import StarsIcon from '@mui/icons-material/Stars';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";

function Buyer() {
    const branchData = useSelector((state) => state.Branch.BranchData);
    // const isLoading = useSelector((state) => state.Branch.isLoading);
    const [newDialog, setNewDialog] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [getData, setGetData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetch = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                `${API_BASE_URL}/customersreport`,
                {
                    headers: {
                        "Pr-root": "buy",
                    },
                }
            );
            setIsLoading(false)
            setGetData(response.data);
        } catch (error) {
            setIsLoading(false)


        }
    };
    useEffect(() => {
        fetch();
    }, []);


    // edit
    const [editData, setEditData] = useState();
    const handleEdit = (row) => {
        setEditData(row);
    };

    // delete
    const handleDelete = (row) => {

    };
    const exportData = getData?.map((row, index) => ({
        "S.No": index + 1,
        "Customer Name": row.user || "",
        "Mobile Number": row.mobile || "",
        "Email Id": row.mail || "",
        "Booking Date": row.created_at
            ? new Date(row.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            : "",
        "Booking ID": row.booking_id || "",
        "Property ID": row.propertyid || "",
        "Property Type": row.property_type || "",
        "Property Value": row.total_amount || "",
        "Wishlist": row.wishlist_count || 0,
    }));
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Buyers Report");

        // Columns
        worksheet.columns = [
            { header: "S.No", key: "S.No", width: 10 },
            { header: "Customer Name", key: "Customer Name", width: 25 },
            { header: "Mobile Number", key: "Mobile Number", width: 20 },
            { header: "Email Id", key: "Email Id", width: 30 },
            { header: "Booking Date", key: "Booking Date", width: 20 },
            { header: "Booking ID", key: "Booking ID", width: 20 },
            { header: "Property ID", key: "Property ID", width: 20 },
            { header: "Property Type", key: "Property Type", width: 20 },
            { header: "Property Value", key: "Property Value", width: 20 },
            { header: "Wishlist", key: "Wishlist", width: 15 },
        ];

        // Add Data
        exportData.forEach((row) => {
            worksheet.addRow(row);
        });

        // Header Style
        const headerRow = worksheet.getRow(1);

        headerRow.eachCell((cell) => {
            cell.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "28A745" }, // Green
            };

            cell.alignment = {
                vertical: "middle",
                horizontal: "center",
            };

            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        // Auto Width
        worksheet.columns.forEach((column) => {
            let maxLength = 0;

            column.eachCell?.({ includeEmpty: true }, (cell) => {
                const cellValue = cell.value ? cell.value.toString() : "";
                maxLength = Math.max(maxLength, cellValue.length);
            });

            column.width = Math.max(maxLength + 5, 15);
        });

        // Data Row Border
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" },
                    };
                });
            }
        });

        const buffer = await workbook.xlsx.writeBuffer();

        saveAs(
            new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            "Buyers_Report.xlsx"
        );
    };

    const columns = [
        {
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            wrap: true,
        },
        {
            name: "Customer Name",
            selector: (row) => row.user,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Mobile Number",
            selector: (row) => row.mobile,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Email Id",
            selector: (row) => row.mail,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Booking Date",
            selector: (row) => row.created_at,
            sortable: true,
            wrap: true,
            width: "170px",
            cell: (row) =>
                new Date(row.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
        },
        {
            name: "Booking ID",
            selector: (row) => row.booking_id,
            sortable: true,
            wrap: true,
            width: "170px",
        },
        {
            name: "Property ID",
            selector: (row) => row.propertyid,
            sortable: true,
            wrap: true,
            width: "170px",
        },
        {
            name: "Property Type",
            selector: (row) => row.property_type,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        {
            name: "Property Value",
            selector: (row) => row.total_amount,
            wrap: true,
            sortable: true,
            width: "170px",
        },
        // {
        //     name: "Wishlist",
        //     selector: (row) => row.wishlist_count,
        //     wrap: true,
        //     sortable: true,
        // },
        {
            name: "Wishlist",
            selector: (row) => row.wishlist_count,
            sortable: true,
            wrap: true,
            cell: (row) => {
                const properties = row.wishlist || [];

                const popover = (
                    <Popover
                        id={`wishlist-popover-${row.booking_id}`}
                        style={{
                            minWidth: "280px",
                            border: "none",
                            borderRadius: "16px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                        }}
                    >
                        <Popover.Header
                            as="h3"
                            style={{
                                background: "#fff5f5",
                                color: "#dc3545",
                                fontWeight: 800,
                                borderBottom: "1px solid #eee",
                                borderRadius: "16px 16px 0 0",
                            }}
                        >
                            ❤️ Wishlist Properties ({row.wishlist_count})
                        </Popover.Header>

                        <Popover.Body
                            style={{
                                maxHeight: "250px",
                                overflowY: "auto",
                                padding: "12px",
                            }}
                        >
                            {properties.length > 0 ? (
                                <div className="d-flex flex-column gap-2">
                                    {properties.map((item, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: "10px 14px",
                                                background: "#f8f9fa",
                                                borderRadius: "10px",
                                                border: "1px solid #ececec",
                                                fontWeight: 500,
                                                color: "#444",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <StarsIcon /> {item.title}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted py-2">
                                    No properties wishlisted
                                </div>
                            )}
                        </Popover.Body>
                    </Popover>
                );

                return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={popover}
                        rootClose
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "6px 14px",
                                borderRadius: "50px",
                                background:
                                    "linear-gradient(135deg, #fff0f3 0%, #ffe5e5 100%)",
                                border: "1px solid #ffd1d1",
                                cursor: "pointer",
                                fontWeight: 600,
                                color: "#dc3545",
                                boxShadow: "0 4px 12px rgba(220,53,69,0.12)",
                            }}
                        >
                            <FaHeart size={14} />
                            <span>{row.wishlist_count}</span>
                        </div>
                    </OverlayTrigger>
                );
            },
        }

    ];

    // search function
    const [filterText, setFilterText] = useState("");
    const searchColumns = [
        "sno",
        "user",
        "mobile",
        "mail",
        "propertyid",
        "property_type",
        "total_amount"
    ];
    const handleFilter = (event) => {
        setFilterText(event.target.value);
    };
    const filterdata = SearchData(getData, filterText, searchColumns);
    /////////////////////////////////////
    const [postLoading, setPostLoading] = useState(false)



    return (
        <>

            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex">
                                        <div>
                                            <h4 className="page_heading">Buyers Report</h4>
                                        </div>
                                        <div style={{ marginLeft: "auto" }}>
                                            {/* <ExportButton
                                                columns={columns}
                                                data={getData}
                                                filename={"Buyer.csv"}
                                            /> */}
                                            <button
                                                className="btn1 me-2"
                                                onClick={exportToExcel}
                                            >
                                                <DownloadIcon />
                                                <span style={{ marginLeft: "8px" }}>Export</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="col-lg-12  mb-4">
                                        <div className="searchbar">
                                            <input
                                                type="text"
                                                className="search"
                                                onChange={handleFilter}
                                                placeholder="..Search"
                                            ></input>
                                        </div>
                                        <DataTable
                                            columns={columns}
                                            data={filterdata}
                                            customStyles={customStyle}
                                            pagination
                                            // selectableRows
                                            persistTableHead={true}
                                            fixedHeader
                                            progressPending={isLoading}
                                            progressComponent={<CustomLoder />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ReactTooltip
                id="edit"
                place="bottom"
                content="Edit"
                style={{ fontSize: "10px" }}
            />
            <ReactTooltip
                id="delete"
                place="bottom"
                content="Delete"
                style={{ fontSize: "10px" }}
            />
            <ReactTooltip
                id="add"
                place="bottom"
                content="Branch Creation"
                style={{ fontSize: "10px" }}
            />


        </>


    );
}

export default Buyer;




