import  { useRef, useState } from "react";
import PriceDepartmentPlot from "./PriceDepartmentPlot";
import PaymentScheduleUpdateStagePlot from "./PaymentScheduleUpdateStagePlot";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pricingConfirmThunk } from "../../../../Redux/Actions/Enquiry/pricingConfirmThunk";
import Toast from "../../../../Utils/Toast";
import { ProjectDetailsOwnerPlot } from "../../LandOwnerAgreementPlot/LandOwnerComponentPlot/ProjectDetailsOwnerPlot";
import ConfirmationModal from "../../../../Utils/ConfirmationModal";

const WholePricingDptPlot = ({ eid, status, id, pagetype, discountPage }) => {

  const staffid = JSON.parse(localStorage.getItem("token"));
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
        navigate("/plot_pricing_department#Complete");
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
      <ProjectDetailsOwnerPlot eid={eid} id={id} status={status} pagetype={pagetype} />
      {/* <PriceDetailsPlot  eid={eid} id={id} status={status} pagetype = {pagetype}/> */}
      <PriceDepartmentPlot eid={eid} status={status} pagetype={pagetype} discountPage={discountPage} />
      <PaymentScheduleUpdateStagePlot eid={eid} status={status} pagetype={pagetype} />
      {/* <PaymentScheduleStagePlot id={id} eid={eid} status={status} pagetype={pagetype}/> */}

      {staffid.logintype == "staff" && status == "pending" && pagetype !== "reminder" && (
        <div className="text-end mt-3 mb-3">
          <button onClick={() => setIsVerifyConfirm(true)} className="btn1" disabled={confirmLoading} >
            {confirmLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      )}
    </>
  );
};

export default WholePricingDptPlot;
