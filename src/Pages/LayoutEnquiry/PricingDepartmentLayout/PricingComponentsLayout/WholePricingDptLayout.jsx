import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pricingConfirmThunk } from "../../../../Redux/Actions/Enquiry/pricingConfirmThunk";
import Toast from "../../../../Utils/Toast";
import PricingDepartmentLayout from "./PricingDepartmentLayout";
import PaymentScheduleDaysLayout from "./PaymentScheduleDaysLayout";
import PhaseCostPricingLayout from "./PhaseCostPricingLayout";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";

const WholePricingDptLayout = ({ eid, status, id, pagetype, discountPage }) => {
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
        Toast({ message: "Successfully Submited", type: "success" });
        navigate("/layout_pricing#Complete");
      } else if (pricingConfirmThunk.rejected.match(response)) {
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
      {/* <ProjectDetailsOwnerPricingLayout eid={eid} id={id} status={status} pagetype = {pagetype}/>  */}
      <PhaseCostPricingLayout eid={eid} id={id} status={status} pagetype={pagetype} />
      <PricingDepartmentLayout eid={eid} status={status} pagetype={pagetype} discountPage={discountPage} />
      {/* <PaymentSchedulePricingLayout eid={eid} id= {id} status={status} pagetype={pagetype}/> */}
      <PaymentScheduleDaysLayout id={id} eid={eid} status={status} pagetype={pagetype} />

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

export default WholePricingDptLayout;
