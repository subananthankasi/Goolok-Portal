import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaymentScheduleASale from "../../BlockingBooking/PaymentScheduleASale";
import PaymentDetails from "../../BlockingBooking/PaymentDetails";
import { decryptData } from "../../../../Utils/encrypt";
import API_BASE_URL from "../../../../Api/api";


const ReminderOfBlockingBooking = ({ bookingid, block_id }) => {
    const [bookingData, setBookingData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/bookingschedule/${bookingid}`
            );
            setBookingData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            {/* <PaymentHeader bookingData={bookingData[0]} loading={loading} /> */}
            <PaymentScheduleASale decryId={bookingid} bookingData={bookingData[0]} loading={loading} />
            <PaymentDetails bookingData={bookingData[0]} loading={loading} block_id={block_id} />

        </>
    );
};

export default ReminderOfBlockingBooking;
