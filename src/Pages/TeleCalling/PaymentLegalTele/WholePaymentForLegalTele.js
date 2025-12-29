import React from "react";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { LegalDetailsTele } from "./LegalDetailsTele";
import FollowupDateTele from "../Document Verification/FollowupDateTele";
import { Header } from "../../Enquiry/Reusable/Header";

const WholePaymentForLegalTele = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decrystatus = decryptData(status);
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
        <Header eid={decryEid} />
        <LegalDetailsTele eid={decryEid} id={decryId} status={decrystatus} />
        <FollowupDateTele
          eid={decryEid}
          id={decryId}
          telePageType={"paymentforlegal"}
        />
      </div>
      </div>
    </section>
  );
};

export default WholePaymentForLegalTele;
