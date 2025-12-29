import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pricingConfirmThunk } from "../../../../../Redux/Actions/Enquiry/pricingConfirmThunk";
import PricingDptApart from "./PricingDptApart";
import PaymentScheduleStage from "./PaymentScheduleStage";
import PaymentMethodsApart from "./PaymentMethodsApart";
import Toast from "../../../../../Utils/Toast";
import ConfirmationModal from "../../../../../Utils/ConfirmationModal";

const WholePricingDptApart = ({ eid, id, status, pagetype, discountPage }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const toast = useRef();
  const confirmLoading = useSelector((state) => state.pricingConfirm?.loading)
  const handleConfirm = async () => {
    const payload = {
      enqid: eid,
      id: id,
    };
    try {
      const response = await dispatch(pricingConfirmThunk(payload));
      if (response.meta.requestStatus === "fulfilled") {
        Toast({ message: "Successfully Submitted", type: "success" });
        navigate("/apart_pricing_department#Complete");
      } else {
        Toast({ message: response?.payload?.reason?.response?.data?.messages?.error, type: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />
      <PricingDptApart
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
        discountPage={discountPage}
      />
      <PaymentScheduleStage
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      />
      {/* <PaymentMethodsApart eid={eid} id={id} status={status} pagetype={pagetype} /> */}
      {staffid.logintype == "staff" &&
        status == "pending" &&
        pagetype !== "reminder" && (
          <div className="text-end mt-3 mb-3">
            <button  onClick={() => setIsVerifyConfirm(true)} className="btn1" disabled ={confirmLoading} >
             {confirmLoading ? "Processing" : "Confirm"}
            </button>
          </div>
        )}
    </div>
  );
};

export default WholePricingDptApart;
