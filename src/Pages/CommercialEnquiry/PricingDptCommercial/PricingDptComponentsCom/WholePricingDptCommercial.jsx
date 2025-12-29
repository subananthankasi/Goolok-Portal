import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pricingConfirmThunk } from "../../../../Redux/Actions/Enquiry/pricingConfirmThunk";
import Toast from "../../../../Utils/Toast";
import { ProjectDetailsOwnerPricingCom } from "./ProjectDetailsOwnerPricingCom";
import PricingDepartmentCom from "./PricingDepartmentCom";
import PaymentSchedulePricingCom from "./PaymentSchedulePricingCom";
import PaymentScheduleDaysCom from "./PaymentScheduleDaysCom";
import { OtherProjectPricingCom } from "./OtherProjectPricingCom";
import PhaseCostPricingCom from "./PhaseCostPricingCom";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";
import NewPricingDepartment from "./NewPricingDepartment";


const WholePricingDptCommercial = ({ eid, status, id, pagetype, subtype, discountPage }) => {
  const staffid = JSON.parse(sessionStorage.getItem("token"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef();
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
        navigate("/commercial_pricing#Complete");
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
      {/* {subtype === "Land" ? (
      <ProjectDetailsOwnerPricingCom eid={eid} id={id} status={status} pagetype = {pagetype} subtype ={subtype} /> 
    ):(
      <OtherProjectPricingCom eid={eid} id={id} status={status} pagetype = {pagetype} subtype ={subtype} /> 
    )}
    {subtype === "Complex" && (
      <PhaseCostPricingCom eid={eid} id={id} status={status} pagetype = {pagetype}/>
    )} */}

      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />
      <PricingDepartmentCom eid={eid} status={status} pagetype={pagetype} discountPage={discountPage} />
      {/* <NewPricingDepartment eid={eid} status={status} pagetype={pagetype} discountPage={discountPage}/> */}
      {/* <PaymentSchedulePricingCom eid={eid} id= {id} status={status} pagetype={pagetype}/> */}
      <PaymentScheduleDaysCom id={id} eid={eid} status={status} pagetype={pagetype} />

      {staffid.logintype === "staff" && status === "pending" && pagetype !== "reminder" && (
        <div className="text-end mt-3 mb-3">
          <button onClick={() => setIsVerifyConfirm(true)} className="btn1" disabled={confirmLoading} >
            {confirmLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      )}
    </>
  );
};

export default WholePricingDptCommercial;
