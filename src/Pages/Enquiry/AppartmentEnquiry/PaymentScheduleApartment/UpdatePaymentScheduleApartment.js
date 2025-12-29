import React from 'react'
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from 'primereact/tabview';
// import { Header } from '../Reusable/Header';
// import { decryptData } from '../../../Utils/encrypt';
import PaymentScheduleLandWholeComponent from '../../PaymentScheduleLand/PaymentScheduleLandWholeComponents/PaymentScheduleLandWholeComponent';
import ReminderBlockBookingLand from '../../BlockingBookingLand/ReminderBlockBookingLand';
import { decryptData } from '../../../../Utils/encrypt';
// import PaymentScheduleLandWholeComponent from './PaymentScheduleLandWholeComponents/PaymentScheduleLandWholeComponent';
// import ReminderBlockBookingLand from '../BlockingBookingLand/ReminderBlockBookingLand';



const UpdatePaymentScheduleApartment = () => {
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
                        {/* <Header eid={decryEid} /> */}
                        <TabView>
                            <TabPanel header="Current">
                                <PaymentScheduleLandWholeComponent eid={decryEid} id={decryId} status={decryStatus} bookingid={decryBookingId} bookingno={decryBookingNo} />
                            </TabPanel>
                            <TabPanel header="Remainder">
                                <ReminderBlockBookingLand />
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UpdatePaymentScheduleApartment