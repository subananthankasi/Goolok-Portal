import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import RegTikcketDetailsTele from "./RegTikcketDetailsTele";
import RegTikcketDateWholeTele from "./RegTikcketDateWholeTele";
import FollowupDateTele from "../Document Verification/FollowupDateTele";
import { Header } from "../../Enquiry/Reusable/Header";

const WholeRegistrationTele = () => {
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
        <div className="container">
          <Header eid={decryEid} />
          <RegTikcketDetailsTele
            eid={decryEid}
            id={decryId}
            status={decryStatus}
            shortform={decryShortForm}
            bookingid={decryBookingId}
          />
          <RegTikcketDateWholeTele
            eid={decryEid}
            id={decryId}
            status={decryStatus}
            shortform={decryShortForm}
            bookingid={decryBookingId}
          />
          <FollowupDateTele
            eid={decryEid}
            id={decryId}
            telePageType={"priceproposal"}
          />
        </div>
      </section>
    </>
  );
};
export default WholeRegistrationTele;
