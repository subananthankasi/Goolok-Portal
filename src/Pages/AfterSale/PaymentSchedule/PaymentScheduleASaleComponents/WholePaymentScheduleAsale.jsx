import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import AlertPop from "../../../../Utils/AlertPop";
import Button from "@mui/material/Button";
import Select from "react-select";
// import ReadyCash from "./ReadyCash";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PaymentDetailsAfterSale from "./PaymentDetailsAfterSale";
import { ThreeCircles } from "react-loader-spinner";

const WholePaymentScheduleAsale = ({
  eid,
  id,
  status,
  bookingno,
  bookingid,
  pagetype,
}) => {
  const navigate = useNavigate();
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [readyCashData, setReadyCashData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // visible is form showing and !visible is table showing

  const handleConfirm = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/transactions/${bookingid}`,
        { enqid: eid, id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Toast({ message: "Successfully Updated", type: "success" });
      navigate("/payment_schedule#Complete");
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error ||
        error.message ||
        "Failed to update";
      setErrorMsg(errorMessage);
      handleOpenModal();
    }
  };

  // error alert
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModals = () => setModalOpen(false);

  const options = [
    { value: "Ready Cash", label: "Ready Cash" },
    { value: "Bank Loan", label: "Bank Loan" },
    { value: "3 Settlements", label: "3 Settlements" },
    { value: "5 Settlements", label: "5 Settlements" },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/${bookingid}`,
        {
          headers: {
            "Gl-Status": "payable",
          },
        }
      );
      setReadyCashData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (readyCashData.length > 0) {
      const value = readyCashData[0].pay_option;
      const found = options.find((opt) => opt.value === value);
      setSelectedOption(found ? found : "");
    } else {
      setSelectedOption("");
    }
  }, [readyCashData]);

  const deleteAll = () => {
    setDeleteDialog(true);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/dataremove/${readyCashData[0]?.bid}`
      );
      Toast({ message: "Successfully deleted", type: "success" });
      fetchData();
      setDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
      />
      <AlertPop
        isOpen={modalOpen}
        onClose={handleCloseModals}
        message={errorMsg}
      />

      <div className="col-12 mt-4 mb-2">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className= {loading ? "d-flex justify-content-center mt-5" : "d-flex justify-content-between"}>
              {loading ? (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <ThreeCircles
                    visible={true}
                    height="50"
                    width="50"
                    color="#2f4f4f"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : readyCashData.length === 0 ? (
                <div className="form-group" style={{ width: "30%" }}>
                  <h6>
                    Select Payment Option :{" "}
                    <span style={{ color: "red" }}>*</span>
                  </h6>
                  <Select
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Select Mode of Payment"
                  />
                </div>
              ) : (
                <h6>{readyCashData[0]?.pay_option}</h6>
              )}
              {/* {readyCashData.length > 0 && pagetype !=="reminder" &&  ( */}
                  {(readyCashData.length > 0 && status === "pending"||status === "complete") && staffid.Login === "staff" && pagetype !== "reminder" && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={deleteAll}
                >
                  Delete All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <PaymentDetailsAfterSale
          eid={eid}
          id={id}
          status={status}
          bookingno={bookingno}
          bookingid={bookingid}
          paymentoption={selectedOption}
          readyCashData={readyCashData}
          fetchData={fetchData}
          visible={visible}
          setVisible={setVisible}
          pagetype={pagetype}
          loading={loading}
          setLoading={setLoading}
        />
        {/* {selectedOption?.value &&
          (selectedOption.value === "Ready Cash" ? (
            <ReadyCash
              eid={eid}
              id={id}
              status={status}
              bookingno={bookingno}
              bookingid={bookingid}
              paymentoption={selectedOption}
              readyCashData={readyCashData}
              fetchData={fetchData}
              visible={visible}
              setVisible={setVisible}
              pagetype={pagetype}
            />
          ) : selectedOption.value === "Bank Loan" ? (
            <BankLoan
              eid={eid}
              id={id}
              status={status}
              bookingno={bookingno}
              bookingid={bookingid}
              paymentoption={selectedOption}
              readyCashData={readyCashData}
              fetchData={fetchData}
              visible={visible}
              setVisible={setVisible}
            />
          ) : selectedOption.value === "3 Settlements" ? (
            <ThreeSettlement
              eid={eid}
              id={id}
              status={status}
              bookingno={bookingno}
              bookingid={bookingid}
              paymentoption={selectedOption}
              readyCashData={readyCashData}
              fetchData={fetchData}
              visible={visible}
              setVisible={setVisible}
            />
          ) : selectedOption.value === "5 Settlements" ? (
            <FiveSettlements
              eid={eid}
              id={id}
              status={status}
              bookingno={bookingno}
              bookingid={bookingid}
              paymentoption={selectedOption}
              readyCashData={readyCashData}
              fetchData={fetchData}
              visible={visible}
              setVisible={setVisible}
            />
          ) : null)} */}
      </div>

      {staffid.logintype === "staff" &&
        status === "pending" &&
        pagetype !== "reminder" && (
          <div className="mt-3 ms-2 mx-4 mb-3 text-end">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => setIsVerifyConfirm(true)}
            >
              Confirm
            </Button>
          </div>
        )}

      <Dialog
        visible={deleteDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        onHide={() => setDeleteDialog(false)}
      >
        <div className="confirmation-content">
          <ErrorOutlineIcon sx={{ color: "red", fontSize: 23 }} />
          <span style={{ marginLeft: "10px" }}>
            Are you sure you want to delete the data ..?
          </span>
        </div>

        <div className="d-flex justify-content-end mt-3 gap-3">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialog(false)}
          >
            No
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Dialog>
    </>
  );
};
export default WholePaymentScheduleAsale;
