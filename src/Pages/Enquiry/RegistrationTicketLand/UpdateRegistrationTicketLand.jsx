import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import WholeRegTicketLand from "./RegTicketLandComponent/WholeRegTicketLand";
import ReminderBlockBookingLand from "../BlockingBookingLand/ReminderBlockBookingLand";
import PaymentScheduleLandWholeComponent from "../PaymentScheduleLand/PaymentScheduleLandWholeComponents/PaymentScheduleLandWholeComponent";

const UpdateRegistrationTicketLand = () => {
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
            <TabView>
              <TabPanel header="Current">
                <WholeRegTicketLand
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  bookingid={decryBookingId}
                  shortform={decryShortForm}
                />
              </TabPanel>
              <TabPanel header="Remainder">
                <ReminderBlockBookingLand />
                <PaymentScheduleLandWholeComponent
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  bookingid={decryBookingId}
                  bookingno={decryBookingNo}
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

export default UpdateRegistrationTicketLand;
