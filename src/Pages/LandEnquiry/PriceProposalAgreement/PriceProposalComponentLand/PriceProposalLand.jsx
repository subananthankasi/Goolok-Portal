import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
// import customStyle from "../../../Utils/tableStyle";
import axios from "axios";
// import API_BASE_URL, { IMG_PATH } from "../../../Api/api";
// import Toast from "../../../Utils/Toast";
import Spinner from "react-bootstrap/Spinner";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import customStyle from "../../../../Utils/tableStyle";
import Toast from "../../../../Utils/Toast";



export const PriceProposalLand = ({ eid, id, status, pagetype }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const [editData, setEditData] = useState({});
  const [proposalData, setProposalData] = useState([]);

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.created_at,
      sortable: true,
      width: "120px",
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Proposed price per unit",
      selector: (row) => row.proposal_unit,
      // selector: (row) => `${row.proposal_unit}/sqft`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Total proposed price",
      selector: (row) => row.proposal_price,
      sortable: true,
      width: "180px",
    },
    {
      name: "View",
      cell: (row) => (
        <>
          <a
            href={`${IMG_PATH}/enquiry/proposal/${row.document}`}
            class="btn btn-warning ms-2"
            download="download"
            target="_blank"
          >
            <RemoveRedEyeIcon />
          </a>
        </>
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Digital sign status",
      cell: (row) => (
        <>
          <button
            type="button"
            className={`badge rounded-pill btnhover btn p-2 ${row.status == "pending" ? "bg-danger" : "bg-success"
              }`}
            style={{ width: "60px" }}
          >
            {row.status}
          </button>
        </>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Signed date",
      selector: (row) => row.signed_date,
      sortable: true,
    },
    ...(staffid.logintype == "staff" &&
      (status === "complete" || status === "pending") &&
      pagetype !== "reminder" &&
      proposalData[0]?.status !== "signed"
      ? [
        {
          name: "Edit",
          cell: (row) => (
            <div className="d-flex">
              <button
                className="btn btn-outline-info me-1 edit"
                data-tooltip-id="delete"
                onClick={() => {
                  setIsModalPriceproposalEdit(true);
                  setEditData(row);
                }}
              >
                <EditIcon />
              </button>
            </div>
          ),
          sortable: true,
        },
      ]
      : []),
  ];

  //  add more
  const [isModalPriceproposal, setIsModalPriceproposal] = useState(false);
  const [isModalPriceproposalEdit, setIsModalPriceproposalEdit] = useState(false);

  // fetch data
  const [loading, setLoading] = useState(true);
  const fetchProposalData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/proposal/${eid}/edit`);
      setProposalData(response.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposalData();
  }, []);


  return (
    <>
      <PriceproposalAgreement
        isOpen={isModalPriceproposal}
        closeModal={() => setIsModalPriceproposal(false)}
        eid={eid}
        id={id}
        fetch={fetchProposalData}
      />

      <PriceproposalEdit
        isOpen={isModalPriceproposalEdit}
        closeModal={() => setIsModalPriceproposalEdit(false)}
        fetch={fetchProposalData}
        editData={editData}
      />
      {loading ? (
        ""
      ) : (
        <div className="col-12 mt-4">
          <div className="card shadow border-0">
            <div className="card shadow border-0 p-4">
              <div className="d-flex justify-content-between">
                <h6>Price proposal agreement</h6>
              </div>
              <hr />

              {proposalData.length === "0" && staffid.logintype === "staff" ? (
                <div className="container" style={{ maxWidth: "350px" }}>
                  <div className="p-4 text-center">
                    <a
                      href="#0"
                      onClick={() => setIsModalPriceproposal(true)}
                      className="btn1"
                    >
                      + Create Proposal
                    </a>
                  </div>
                </div>
              ) : (
                <DataTable
                  persistTableHead={true}
                  columns={columns}
                  data={proposalData}
                  customStyles={customStyle}
                  pagination
                  fixedHeader
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PriceproposalAgreement = ({ isOpen, closeModal, eid, id, fetch }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [proposedPrice, setProposedPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: null }));
    } else {
      setFile(null);
      setErrors((prev) => ({
        ...prev,
        file: "Only PDF files are allowed.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!file) {
      newErrors.file = "Please upload a file.";
    } else if (file.type !== "application/pdf") {
      newErrors.file = "Only PDF files are allowed.";
    }
    if (!proposedPrice || isNaN(proposedPrice))
      newErrors.proposedPrice = "Enter a valid proposed price.";
    if (!totalPrice || isNaN(totalPrice))
      newErrors.totalPrice = "Enter a valid total price.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("enqid", eid);
    formData.append("proposalId", id);
    formData.append("file", file);
    formData.append("unit", proposedPrice);
    formData.append("price", totalPrice);
    setloading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/proposal`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Toast({ message: "Added successfully", type: "success" });
      closeModal();
      handleClear();
    } catch (error) {
      Toast({ message: "Error to add...Try again!", type: "error" });
    } finally {
      setloading(false);
      fetch();
    }
  };

  // Handle Clear button
  const handleClear = () => {
    setFile(null);
    setProposedPrice("");
    setTotalPrice("");
    setErrors({});
    fileInputRef.current.value = "";
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">
                Price proposal agreement draft
              </h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  handleClear();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-12 mb-3">
                    <div className="row align-items-center">
                      <div className="col-5">
                        <label className="form-label">Upload file :</label>
                      </div>
                      <div className="col-7">
                        <input
                          type="file"
                          className="form-control"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        {errors.file && (
                          <div className="validation_msg">{errors.file}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Proposed price per unit :
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={proposedPrice}
                          // onChange={(e) => setProposedPrice(e.target.value)}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            setProposedPrice(rawValue);
                          }}
                          onKeyPress={(e) => {
                            const regex = /^[0-9]$/;
                            if (!regex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.proposedPrice && (
                          <div className="validation_msg">
                            {errors.proposedPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total proposed price :
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={totalPrice}
                          onChange={(e) => setTotalPrice(e.target.value)}
                          onKeyPress={(e) => {
                            const regex = /^[0-9]$/;
                            if (!regex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.totalPrice && (
                          <div className="validation_msg">
                            {errors.totalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <button
                    className="btn1 me-1"
                    type="button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button className="btn1" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">wait...</span>
                      </>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



const PriceproposalEdit = ({ isOpen, closeModal, fetch, editData }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [proposedPrice, setProposedPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setProposedPrice(editData.proposal_unit);
      setTotalPrice(editData.proposal_price);
    }
  }, [editData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: null }));
    } else {
      setFile(null);
      setErrors((prev) => ({
        ...prev,
        file: "Only PDF files are allowed.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (file) {
      if (file.type !== "application/pdf") {
        newErrors.file = "Only PDF files are allowed.";
      }
    }

    if (!proposedPrice || isNaN(proposedPrice))
      newErrors.proposedPrice = "Enter a valid proposed price.";
    if (!totalPrice || isNaN(totalPrice))
      newErrors.totalPrice = "Enter a valid total price.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("id", editData.id);
    formData.append("file", file);
    formData.append("unit", proposedPrice);
    formData.append("price", totalPrice);
    formData.append("doc", editData.document);

    setloading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/proposalup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Toast({ message: "Added successfully", type: "success" });
      closeModal();
      handleClear();
    } catch (error) {
      Toast({ message: "Error to add...Try again!", type: "error" });
    } finally {
      setloading(false);
      fetch();
    }
  };

  // Handle Clear button
  const handleClear = () => {
    setFile(null);
    setErrors({});
    fileInputRef.current.value = "";
  };

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">
                Price proposal agreement update
              </h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => {
                  closeModal();
                  handleClear();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-12 mb-3">
                    <div className="row align-items-center">
                      <div className="col-5">
                        <label className="form-label">Upload file :</label>
                      </div>
                      <div className="col-7">
                        <div className="d-flex">
                          <input
                            type="file"
                            className="form-control"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                          <a
                            href={`${IMG_PATH}/enquiry/proposal/${editData.document}`}
                            class="btn btn-warning ms-1 text-end"
                            download="download"
                            target="_blank"
                          >
                            <RemoveRedEyeIcon />
                          </a>
                        </div>
                        {errors.file && (
                          <div className="validation_msg">{errors.file}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Proposed price per unit :
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={proposedPrice}
                          // value={proposedPrice ? `${proposedPrice}/sqft` : ""}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            setProposedPrice(rawValue);
                          }}
                          // onChange={(e) => setProposedPrice(e.target.value)}
                          onKeyPress={(e) => {
                            const regex = /^[0-9]$/;
                            if (!regex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.proposedPrice && (
                          <div className="validation_msg">
                            {errors.proposedPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="row">
                      <div className="col-5">
                        <label className="form-label">
                          Total proposed price :
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={totalPrice}
                          onChange={(e) => setTotalPrice(e.target.value)}
                          onKeyPress={(e) => {
                            const regex = /^[0-9]$/;
                            if (!regex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {errors.totalPrice && (
                          <div className="validation_msg">
                            {errors.totalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <button className="btn1" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">wait...</span>
                      </>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



