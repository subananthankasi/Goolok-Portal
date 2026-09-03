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
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";


function Seller() {
    const branchData = useSelector((state) => state.Branch.BranchData);
    const isLoading = useSelector((state) => state.Branch.isLoading);
    const [newDialog, setNewDialog] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const [getData, setGetData] = useState([])



    const fetch = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/customersreport`,
                {
                    headers: {
                        "Pr-root": "sell",
                    },
                }
            );
            setGetData(response.data);
        } catch (error) {

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

    ];
    const exportData = getData?.map((row, index) => ({
        "S.No": index + 1,
        "Customer Name": row.user || "",
        "Mobile Number": row.mobile || "",
        "Email Id": row.mail || "",
        "Property ID": row.propertyid || "",
        "Property Type": row.property_type || "",
        "Property Value": row.total_amount || "",
    }));
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sellers Report");

        worksheet.columns = [
            { header: "S.No", key: "S.No", width: 10 },
            { header: "Customer Name", key: "Customer Name", width: 25 },
            { header: "Mobile Number", key: "Mobile Number", width: 20 },
            { header: "Email Id", key: "Email Id", width: 30 },
            { header: "Property ID", key: "Property ID", width: 20 },
            { header: "Property Type", key: "Property Type", width: 20 },
            { header: "Property Value", key: "Property Value", width: 20 },
        ];

        // Title
        worksheet.insertRow(1, ["SELLERS REPORT"]);
        worksheet.mergeCells("A1:G1");

        const titleRow = worksheet.getRow(1);
        titleRow.font = {
            bold: true,
            size: 16,
        };
        titleRow.alignment = {
            horizontal: "center",
            vertical: "middle",
        };
        titleRow.height = 25;

        exportData.forEach((row) => {
            worksheet.addRow(row);
        });

        // Header Style
        const headerRow = worksheet.getRow(2);

        headerRow.eachCell((cell) => {
            cell.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "198754" },
            };

            cell.alignment = {
                horizontal: "center",
                vertical: "middle",
            };

            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        // Filter
        worksheet.autoFilter = {
            from: "A2",
            to: "G2",
        };

        // Auto Width
        worksheet.columns.forEach((column) => {
            let maxLength = 0;

            column.eachCell?.({ includeEmpty: true }, (cell) => {
                const value = cell.value ? cell.value.toString() : "";
                maxLength = Math.max(maxLength, value.length);
            });

            column.width = Math.max(maxLength + 5, 15);
        });

        // Borders
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();

        saveAs(
            new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
            "Sellers_Report.xlsx"
        );
    };
    // search function
    const [filterText, setFilterText] = useState("");
    const searchColumns = [
        "sno",
        "user",
        "mobile",
        "mail",
        "propertyid",
        "property_type",

    ];
    const handleFilter = (event) => {
        setFilterText(event.target.value);
    };
    const filterdata = SearchData(getData, filterText, searchColumns);
    /////////////////////////////////////




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
                                            <h4 className="page_heading">Sellers Report</h4>
                                        </div>
                                        <div style={{ marginLeft: "auto" }}>

                                            {/* <ExportButton
                                                columns={columns}
                                                data={getData}
                                                filename={"seller.csv"}
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

export default Seller;




