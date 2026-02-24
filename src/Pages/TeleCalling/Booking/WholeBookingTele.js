import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import FollowupDateTele from "../Document Verification/FollowupDateTele";
import PaymentScheduleASale from "../../AfterSale/BlockingBooking/PaymentScheduleASale";
import PaymentDetails from "../../AfterSale/BlockingBooking/PaymentDetails";
import axios from "axios";
import API_BASE_URL from "../../../Api/api";
import { Header } from "../../Enquiry/Reusable/Header";

const WholeBookingTele = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { eid, id, status } = useParams();
  const decryId = decryptData(id);
  const decryEid = decryptData(id);
  const decryStatus = decryptData(id);

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
        <div className="row">
          <div className="col-12">
            <Header eid={decryEid} />
            <PaymentScheduleASale
              decryId={decryId}
              bookingData={bookingData[0]}
              loading={loading}
            />
            <PaymentDetails bookingData={bookingData[0]} loading={loading} />
            <FollowupDateTele
              eid={decryEid}
              id={decryId}
              telePageType={"booking"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholeBookingTele;
