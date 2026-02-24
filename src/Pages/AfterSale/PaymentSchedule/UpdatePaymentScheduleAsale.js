import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import WholePaymentScheduleAsale from "./PaymentScheduleASaleComponents/WholePaymentScheduleAsale";
import ReminderBlockingBooking from "../BlockingBooking/ReminderBlockingBooking";

const UpdatePaymentScheduleAsale = () => {
  const { eid, id, status, booking_id, booking_no } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decryBookingId = decryptData(booking_id);
  const decryBookingNo = decryptData(booking_no);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <TabView>
              <TabPanel header="Current">
                <WholePaymentScheduleAsale
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  bookingid={decryBookingId}
                  bookingno={decryBookingNo}
                />
              </TabPanel>
              <TabPanel header="Remainder">
                <ReminderBlockingBooking />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePaymentScheduleAsale;
