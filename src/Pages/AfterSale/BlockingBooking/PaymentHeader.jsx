import React from "react";
import { Skeleton } from "primereact/skeleton";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const PaymentHeader = ({ bookingData, loading }) => {
  return (
    <div className="card shadow border-0">
      <div className="row p-3 align-items-center">
        {loading ? (
          <>
            <div className="col-4">
              {" "}
              <Skeleton height="10rem" width="100%" className="mb-1 " />{" "}
            </div>
            <div className="col-4">
              <Skeleton height="10rem" width="100%" className="mb-1 " />
            </div>
            <div className="col-4">
              <Skeleton height="10rem" width="100%" className="mb-1 " />
            </div>
          </>
        ) : (
          <>
            <div className="col-4 ">
              <div style={{ width: 130, height: 130, margin: "auto" }}>
                <CircularProgressbar
                  value={"100"}
                  text={bookingData?.age}
                  styles={buildStyles({
                    textSize: "20px",
                    pathColor: "#ffae42",
                    textColor: "black",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="">
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Booking ID :</b>
                  {bookingData?.booking_id}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Total Amount : </b> ₹{" "}
                  {bookingData?.total == null
                    ? bookingData?.sub_total
                    : bookingData?.total}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Booking Date :</b> {bookingData?.booking_date}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Booking Amount :</b> ₹ {bookingData?.advance}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Payment Option :</b> {bookingData?.payment_option}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Payment Method :</b> {bookingData?.pay_mode}
                </p>
              </div>
            </div>
            <div className="col-4">
              <div className="">
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Name :</b> {bookingData?.user}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Email :</b> {bookingData?.mail}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Mobile :</b> {bookingData?.mobile}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Property :</b> {bookingData?.property_type}
                </p>
                <p className="mb-3" style={{ fontSize: "13px" }}>
                  <b>Property Name :</b> {bookingData?.propertyName}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHeader;
