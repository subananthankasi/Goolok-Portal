import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pricingConfirmThunk } from "../../../../Redux/Actions/Enquiry/pricingConfirmThunk";
import Toast from "../../../../Utils/Toast";
import PricingDepartmentHouse from "./PricingDepartmentHouse";
import PaymentScheduleDaysHouse from "./PaymentScheduleDaysHouse";

const WholePricingDptHouse = ({ eid, status, id, pagetype, discountPage }) => {

  const staffid = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmLoading = useSelector((state) => state.pricingConfirm?.loading)
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
        navigate("/house_pricing#Complete");
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
      <PricingDepartmentHouse eid={eid} status={status} pagetype={pagetype} discountPage={discountPage} />
      {/* <PaymentSchedulePricingHouse
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      /> */}
      <PaymentScheduleDaysHouse
        id={id}
        eid={eid}
        status={status}
        pagetype={pagetype}
      />

      {staffid.logintype == "staff" &&
        status == "pending" &&
        pagetype !== "reminder" && (
          <div className="text-end mt-3 mb-3">
            <button onClick={handleConfirm} className="btn1" disabled={confirmLoading} >
              {confirmLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        )}
    </>
  );
};

export default WholePricingDptHouse;
