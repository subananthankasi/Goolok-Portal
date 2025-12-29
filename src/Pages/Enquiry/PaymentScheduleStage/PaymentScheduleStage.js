import React from "react";
import PaymentScheduleStageCard from "./PaymentScheduleStageCard";

const PaymentScheduleStage = (id) => {
  return (
    <>
      <div className="col-12 mt-4 mb-2">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <div className="d-flex justify-content-between">
              <h6>Payment Schedule</h6>
            </div>
            <hr />
            <PaymentScheduleStageCard id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScheduleStage;
