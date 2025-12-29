import React from 'react'
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
import ReminderBlockBookingLand from '../BlockingBookingLand/ReminderBlockBookingLand';
import PaymentScheduleLandWholeComponent from '../PaymentScheduleLand/PaymentScheduleLandWholeComponents/PaymentScheduleLandWholeComponent';
import WholeRegTicketLand from '../RegistrationTicketLand/RegTicketLandComponent/WholeRegTicketLand';
import WholeRegisterLand from './WholeRegisterLand/WholeRegisterLand';
import { decryptData } from '../../../Utils/encrypt';






const UpdateRegistrationLand = () => {
  const { eid, id, status, booking_id, shortform, booking_no, pagetype } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  const decryBookingId = decryptData(booking_id);
  const decryShortForm = decryptData(shortform);
  const decryBookingNo = decryptData(booking_no);
  const decrypagetype = decryptData(pagetype);



  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            {/* <Header eid={decryEid} /> */}
            <TabView>
              <TabPanel header="Current">
                <WholeRegisterLand eid={decryEid} id={decryId} status={decryStatus} bookingid={decryBookingId} bookingno={decryBookingNo} pagetype={decrypagetype} />
              </TabPanel>
              <TabPanel header="Remainder">
                <ReminderBlockBookingLand />
                <PaymentScheduleLandWholeComponent eid={decryEid} id={decryId} status={decryStatus} bookingid={decryBookingId} bookingno={decryBookingNo} pagetype="reminder" />
                <WholeRegTicketLand eid={decryEid} id={decryId} status={decryStatus} bookingid={decryBookingId} shortform={decryShortForm} pagetype="reminder" />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
  )
}

export default UpdateRegistrationLand