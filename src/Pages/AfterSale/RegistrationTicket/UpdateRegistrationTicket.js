import React from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { decryptData } from "../../../Utils/encrypt";
import WholeRegistraionTickeAsale from "./RegistrationTicketComponents/WholeRegistraionTickeAsale";
import ReminderOfBlockingBooking from "./RegistrationTicketComponents/ReminderOfBlockingBooking";



const UpdateRegistrationTicket = () => {
  const { eid, id, status, booking_id, shortform, booking_no, block_id } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decryBookingId = decryptData(booking_id);
  const decryShortForm = decryptData(shortform);
  const decryBookingNo = decryptData(booking_no);
  const decryBlock_id = decryptData(block_id);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <TabView>
              <TabPanel header="Current">
                <WholeRegistraionTickeAsale
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  bookingid={decryBookingId}
                  shortform={decryShortForm}
                />
              </TabPanel>
              <TabPanel header="Remainder">
                {/* <ReminderBlockingBooking /> */}
                <ReminderOfBlockingBooking
                  eid={decryEid}
                  id={decryId}
                  status={decryStatus}
                  bookingid={decryBookingId}
                  bookingno={decryBookingNo}
                  pagetype="reminder"
                  block_id = {decryBlock_id}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateRegistrationTicket;
