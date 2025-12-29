import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import PaymentHeader from "./PaymentHeader";
import PaymentPlans from "./PaymentPlans";
import PaymentDetails from "./PaymentDetails";
import PaymentScheduleASale from "./PaymentScheduleASale";

const BookingDetailsASale = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const decryId = decryptData(id);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/bookingschedule/${decryId}`
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
    <section className="section">
      <div className="container">
        <PaymentHeader bookingData={bookingData[0]} loading={loading} />
        <PaymentScheduleASale decryId={decryId} bookingData={bookingData[0]} loading={loading} />
        <PaymentDetails bookingData={bookingData[0]} loading={loading} />
      </div>
    </section>
  );
};

export default BookingDetailsASale;
