import React from "react";
import { decryptData } from "../../../Utils/encrypt";
import { useParams } from "react-router-dom";
import WholeAfterSale from "../../AfterSale/AfterSale/AfterSaleComponents/WholeAfterSale";
import WholeRegistrationAsale from "../../AfterSale/Registration/RegistraionAsaleComponents/WholeRegistrationAsale";
import WholeRegistraionTickeAsale from "../../AfterSale/RegistrationTicket/RegistrationTicketComponents/WholeRegistraionTickeAsale";
import WholePaymentScheduleAsale from "../../AfterSale/PaymentSchedule/PaymentScheduleASaleComponents/WholePaymentScheduleAsale";
import ReminderBlockingBooking from "../../AfterSale/BlockingBooking/ReminderBlockingBooking";
import ReminderOfBlockingBooking from "../../AfterSale/RegistrationTicket/RegistrationTicketComponents/ReminderOfBlockingBooking";

const ViewBookingData = () => {
  const { eid, id, status, booking_id, shortform, booking_no } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decryBookingId = decryptData(booking_id);
  const decryShortForm = decryptData(shortform);
  const decryBookingNo = decryptData(booking_no);
  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            {/* <ReminderBlockingBooking /> */}
            {/* <WholePaymentScheduleAsale
              eid={decryEid}
              id={decryId}
              status={decryStatus}
              bookingid={decryBookingId}
              bookingno={decryBookingNo}
              pagetype="reminder"
            /> */}
            <ReminderOfBlockingBooking
              eid={decryEid}
              id={decryId}
              status={decryStatus}
              bookingid={decryBookingId}
              bookingno={decryBookingNo}
              pagetype="reminder"
            />
            <WholeRegistraionTickeAsale
              eid={decryEid}
              id={decryId}
              status={decryStatus}
              bookingid={decryBookingId}
              shortform={decryShortForm}
              pagetype="reminder"
            />
            <WholeRegistrationAsale
              eid={decryEid}
              id={decryId}
              status={decryStatus}
              bookingid={decryBookingId}
              bookingno={decryBookingNo}
              pagetype="reminder"
            />
            <WholeAfterSale
              eid={decryEid}
              id={decryId}
              status={decryStatus}
              bookingid={decryBookingId}
              bookingno={decryBookingNo}
              shortform={decryShortForm}
              pagetype="reminder"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewBookingData;
