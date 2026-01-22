import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pricingConfirmThunk } from "../../../../Redux/Actions/Enquiry/pricingConfirmThunk";
import Toast from "../../../../Utils/Toast";
import PhasePricingCostAP from "./PhasePricingCostAP";
import PricingDepartmentAP from "./PricingDepartmentAP";
import PaymentScheduleDaysPricingAP from "./PaymentScheduleDaysPricingAP";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";


const WholePricingDptAp = ({ eid, status, id, pagetype, subtype, discountPage }) => {
  const staffid = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmLoading = useSelector((state) => state.pricingConfirm?.loading)
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const handleConfirm = async () => {
    const payload = {
      enqid: eid,
      id: id,
    };
    try {
      const response = await dispatch(pricingConfirmThunk(payload));
      if (pricingConfirmThunk.fulfilled.match(response)) {
        const message = response.payload.data;
        Toast({ message: "Successfully Submited", type: "success" });
        navigate("/aproject_pricing#Complete");
      } else if (pricingConfirmThunk.rejected.match(response)) {
        const errorPayload =
          response?.payload?.reason?.response?.data?.messages?.error;

        Toast({ message: "rejected", type: "error" });
      }
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
        loading={confirmLoading}
      />
      {/* <ProjectDetailsPricingAP eid={eid} id={id} status={status} pagetype = {pagetype}  />  */}
      <PhasePricingCostAP eid={eid} id={id} status={status} pagetype={pagetype} />
      <PricingDepartmentAP eid={eid} status={status} pagetype={pagetype} discountPage={discountPage} />
      {/* <PaymentSchedulePricingAP eid={eid} id= {id} status={status} pagetype={pagetype}/> */}
      <PaymentScheduleDaysPricingAP id={id} eid={eid} status={status} pagetype={pagetype} />

      {staffid.logintype === "staff" && status === "pending" && pagetype !== "reminder" && (
        <div className="text-end mt-3 mb-3">
          <a href="#0" onClick={() => setIsVerifyConfirm(true)} className="btn1" disabled={confirmLoading}>
            {confirmLoading ? "Processing..." : "Confirm"}
          </a>
        </div>
      )}
    </>
  );
};

export default WholePricingDptAp;
