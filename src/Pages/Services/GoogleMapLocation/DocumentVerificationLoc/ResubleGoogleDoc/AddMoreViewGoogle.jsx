import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TableFooter } from "@mui/material";
import API_BASE_URL from "../../../../../Api/api";

const AddMoreViewGoogle = ({ isOpen, closeModal, id }) => {

    const [step, setStep] = useState(1);
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const columns = [
        {
            name: "S.no",
            cell: (row, index) => row.sno,
            sortable: true,
        },
        {
            name: "Survey No",
            selector: (row) => row.survey_no,
            sortable: true,
            wrap: true,
        },
        {
            name: "Sub division",
            selector: (row) => row.sub_division,
            sortable: true,
        },
        {
            name: "Hectare-Are",
            selector: (row) => row.hectare,
            sortable: true,
        },
    ];

    const columns1 = [
        {
            name: "S.no",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Survey No",
            selector: (row) => row.survey_no,
            sortable: true,
            wrap: true,
        },
        {
            name: "Sub division",
            selector: (row) => row.sub_division,
            sortable: true,
        },
        {
            name: "Units",
            selector: (row) => row.units,
            sortable: true,
        },
        {
            name: "Extent",
            selector: (row) => row.extent,
            sortable: true,
        },
    ];




    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState("");




    // ===============================
    //   for patta
    // ===============================
    const [previousDataPata, setPreviousdata] = useState();

    // get
    useEffect(() => {

        const fetchPatta = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/enquirypatta/${id.id}`
                );
                setIsLoading(false)
                setPreviousdata(response.data);
            } catch (error) {
                setIsLoading(false)
            }
        };
        if (id && id.doc_type == "Patta") {
            setIsLoading(true)
            fetchPatta();
        }
    }, [id, isOpen]);

    // patta 2 
    const [pattaData, setPattaData] = useState([]);
    useEffect(() => {
        if (id && id.doc_type == "Patta") {
            fetchPatta();
        }
    }, [id, isOpen]);

    const fetchPatta = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/enquirypatta/${id.id}/edit`
            );
            const data = response?.data?.map((map, index) => ({
                ...map,
                sno: index + 1
            }))
            setPattaData(data);
        } catch (error) { }
    };

    // ================================
    // -------- Aadhar ----------------
    // ================================
    const [aadharExistingData, setAadharExistingData] = useState()



    useEffect(() => {

        const fetchPatta = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/enqaadhar/${id.id}`
                );
                setAadharExistingData(response.data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        };
        if (id && id.doc_type == "Aadhaar") {
            setIsLoading(true)
            fetchPatta();
        }
    }, [id]);









    // ================================
    // -------- "Title document"

    // ================================
    const [deedExistingData, setDeedExistingData] = useState()


    useEffect(() => {

        const fetchPatta = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/enquirydeed/${id.id}`
                );
                setDeedExistingData(response.data);
            } catch (error) { }
        };
        if (id && id.doc_type == "Title document"
        ) {
            setIsLoading(true)
            fetchPatta();
        }
    }, [id]);




    // -------- "Title document 2"

    const [deedData, getDeedData] = useState([]);
    useEffect(() => {
        if (id && id.doc_type == "Title document") {
            fetchDeed();
        }
    }, [id]);

    const fetchDeed = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/enquirydeed/${id.id}/edit`
            );
            const data = response?.data?.map((map, index) => ({
                ...map,
                sno: index + 1
            }))
            getDeedData(data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    };

    const extentTotal = () => {
        let total = 0;

        for (let count of deedData) {
            total += Number(count.extent);
        }

        return `${total} / ${deedData?.[0]?.units || ""}`;
    };

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Total Extent:" colSpan={3} footerStyle={{ textAlign: 'right' }} />
                <Column footer={extentTotal} />
                <Column colSpan={2} />
            </Row>
        </ColumnGroup>
    );
    return (
        <>

            <div
                className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="d-flex" style={{ alignItems: "center" }}>

                            {id.doc_type == "Aadhaar" ? (<h4 className="page_subheading m-3"> {id.doc_type} Details</h4>) : (
                                <nav className="nav">
                                    <a style={{ height: "45px", fontSize: "14px" }}
                                        className={`nav-link link1 ${step === 1 ? "active1" : ""
                                            }`}
                                        href="#"
                                        onClick={() => setStep(1)}
                                    >
                                        {id.doc_type} Details 1
                                    </a>
                                    <a style={{ height: "45px", fontSize: "14px" }}
                                        className={`nav-link link1 ${step === 2 ? "active1" : ""
                                            }`}
                                        href="#"
                                        onClick={() => setStep(2)}
                                    >
                                        {id.doc_type} Details 2
                                    </a>
                                </nav>
                            )}


                            <button
                                type="button"
                                className="close closebutton"
                                onClick={() => { closeModal(false); }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <hr className="m-0" />
                        <div className="card-body p-3">

                            {isLoading ? (
                                <div
                                    style={{
                                        height: "32vh",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Spinner className="mt-auto" />
                                </div>
                            ) : (
                                <form>

                                    {/* patta  */}

                                    {id.doc_type == "Patta" && <>
                                        {step === 1 && (
                                            <>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Patta no :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.pattano}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Patta Type :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.patta_type}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Patta name :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.pattaname}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Fathers Name :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.father_name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Patta date :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.date}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    State :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.stateName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    District :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.districtName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Taluk :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.talukName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Revenue village :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.villageName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Ward  :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.ward}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Block  :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.block}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Classification  :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {previousDataPata?.classification}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6 mb-3 ">
                      <div className="row">
                        <div className="col-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Property Type :
                          </label>
                        </div>
                        <div className="col-8 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            {previousDataPata?.property_type}
                          </label>
                        </div>
                      </div>
                    </div> */}


                                                </div>
                                            </>
                                        )}
                                        {step === 2 && (
                                            <>
                                                <div className="row mt-3">

                                                    {/* <DataTable
                      persistTableHead={true}
                      columns={columns}
                      data={pattaData}
                      customStyles={customStyle}
                      pagination
                      // selectableRows 
                      fixedHeader
                    /> */}
                                                    <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                                                            <TableHead style={{ backgroundColor: 'rgb(47, 79, 79)' }}>
                                                                <TableRow>
                                                                    <TableCell style={{ color: "white" }} >S.No</TableCell >
                                                                    <TableCell align="right" style={{ color: "white" }}>Survey No</TableCell >
                                                                    <TableCell align="right" style={{ color: "white" }}>Sub Division</TableCell >

                                                                    {pattaData[0]?.old_survey_no && (
                                                                        <TableCell align="right" style={{ color: "white" }}> Old Survey No</TableCell >
                                                                    )}
                                                                    {pattaData[0]?.old_sub_division && (
                                                                        <TableCell align="right" style={{ color: "white" }}> Old Sub Division</TableCell >
                                                                    )}

                                                                    <TableCell align="right" style={{ color: "white" }}>Hectare-Are</TableCell >

                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {pattaData.map((item, index) => (
                                                                    <StyledTableRow key={index}>
                                                                        <TableCell component="th" scope="row">
                                                                            {index + 1}
                                                                        </TableCell >
                                                                        <TableCell align="right">{item.survey_no}</TableCell >
                                                                        <TableCell align="right">{item.sub_division}</TableCell >
                                                                        {item.old_survey_no && (
                                                                            <TableCell align="right" > {item.old_survey_no} </TableCell >
                                                                        )}
                                                                        {item.old_survey_no && (
                                                                            <TableCell align="right" >{item.old_sub_division} </TableCell >
                                                                        )}
                                                                        <TableCell align="right">{item.hectare}</TableCell >
                                                                    </StyledTableRow>
                                                                ))}
                                                            </TableBody>
                                                            <TableFooter>

                                                                {/* {pattaFormData.type === "Town_patta" ? ( */}
                                                                {/* <TableCell align="right" colSpan={'5'} style={{ fontSize: '14px' }}> </TableCell > */}
                                                                {/* ) : ( */}
                                                                <TableCell align="right" colSpan={'5'} style={{ fontSize: '14px' }}> </TableCell >
                                                                {/* )} */}
                                                                <TableCell colSpan={'2'} className="text-center" style={{ fontSize: '14px' }}>
                                                                    Sub Total Hectare-Are:  {pattaData?.reduce((total, item) => total + Number(item.hectare || 0), 0)}
                                                                </TableCell >
                                                            </TableFooter>
                                                        </Table>
                                                    </TableContainer>
                                                </div>


                                            </>
                                        )}

                                    </>}


                                    {/* chitta  */}
                                    {id.doc_type == "Aadhaar" && <>
                                        <div className="row">
                                            <div className="col-md-6 mb-3 ">
                                                <div className="row">
                                                    <div className="col-4 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            Aadhar name :
                                                        </label>
                                                    </div>
                                                    <div className="col-8 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            {aadharExistingData?.aadhar_name}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3 ">
                                                <div className="row">
                                                    <div className="col-4 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            Father name :
                                                        </label>
                                                    </div>
                                                    <div className="col-8 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            {aadharExistingData?.father_name}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3 ">
                                                <div className="row">
                                                    <div className="col-4 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            Aadhar number :
                                                        </label>
                                                    </div>
                                                    <div className="col-8 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            {aadharExistingData?.aadhar_number}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3 ">
                                                <div className="row">
                                                    <div className="col-4 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            Address :
                                                        </label>
                                                    </div>
                                                    <div className="col-8 mb-3 ">
                                                        <label htmlFor="lastName" className="form-label">
                                                            {aadharExistingData?.address}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </>
                                    }


                                    {/* "Title document" */}
                                    {id.doc_type == "Title document" && <>
                                        {step === 1 && (
                                            <>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Title doc  no :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.document}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Registered date :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.registerDate}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Present owner name :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.ownerName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Total EXTENT (UNITS) :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.extent}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Property type :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.type}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    State :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.stateName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    District :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.districtName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    Taluk :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.talukName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3 ">
                                                        <div className="row">
                                                            <div className="col-4 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    village :
                                                                </label>
                                                            </div>
                                                            <div className="col-8 mb-3 ">
                                                                <label htmlFor="lastName" className="form-label">
                                                                    {deedExistingData?.villageName}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6 mb-3 ">
                      <div className="row">
                        <div className="col-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Survey no :
                          </label>
                        </div>
                        <div className="col-8 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            {deedExistingData?.surveyNo}
                          </label>
                        </div>
                      </div>
                    </div> */}
                                                    {/* <div className="col-md-6 mb-3 ">
                      <div className="row">
                        <div className="col-4 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            Sub division :
                          </label>
                        </div>
                        <div className="col-8 mb-3 ">
                          <label htmlFor="lastName" className="form-label">
                            {deedExistingData?.subDivision}

                          </label>
                        </div>
                      </div>
                    </div> */}



                                                </div>
                                            </>
                                        )}
                                        {step === 2 && (
                                            <>
                                                <div className="row mt-3">

                                                    {/* <DataTable
                      persistTableHead={true}
                      columns={columns1}
                      data={deedData}
                      customStyles={customStyle}
                      pagination
                      // selectableRows 
                      fixedHeader
                    /> */}
                                                    <DataTable value={deedData} stripedRows footerColumnGroup={footerGroup} tableStyle={{ minWidth: '50rem' }}>
                                                        <Column
                                                            header="S.No"
                                                            body={(rowData, options) => options.rowIndex + 1}
                                                        />
                                                        <Column field="survey_no" header="Survey No"></Column>
                                                        <Column field="sub_division" header="Sub Division"></Column>
                                                        <Column field="extent" header="Extent"></Column>
                                                        <Column field="units" header="Units"></Column>

                                                    </DataTable>

                                                </div>
                                            </>
                                        )}
                                    </>}


                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMoreViewGoogle
