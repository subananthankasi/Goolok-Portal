import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import WholeAfterSale from "./AfterSaleComponents/WholeAfterSale";
import WholeRegistrationAsale from "../Registration/RegistraionAsaleComponents/WholeRegistrationAsale";
import WholeRegistraionTickeAsale from "../RegistrationTicket/RegistrationTicketComponents/WholeRegistraionTickeAsale";
import WholePaymentScheduleAsale from "../PaymentSchedule/PaymentScheduleASaleComponents/WholePaymentScheduleAsale";
import ReminderBlockingBooking from "../BlockingBooking/ReminderBlockingBooking";
import ReminderOfBlockingBooking from "../RegistrationTicket/RegistrationTicketComponents/ReminderOfBlockingBooking";

const UpdateAfterSale = () => {
  const { eid, id, status, booking_id, shortform, booking_no, block_id } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decryBookingId = decryptData(booking_id);
  const decryShortForm = decryptData(shortform);
  const decryBookingNo = decryptData(booking_no);
  const decryBlockId = decryptData(block_id);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <TabView>
              <TabPanel header="Current">
                <WholeAfterSale
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  bookingid={decryBookingId}
                  bookingno={decryBookingNo}
                  shortform={decryShortForm}
                />
              </TabPanel>
              <TabPanel header="Remainder">
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
                  block_id={decryBlockId}
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
                  //   pagetype={decrypagetype}
                  pagetype="reminder"
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateAfterSale;
