import React from "react";
import { InvoiceDetailsTele } from "./InvoiceDetailsTele";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import FollowupDateTele from "../Document Verification/FollowupDateTele";
import { Header } from "../../Enquiry/Reusable/Header";

const WholeAdvanceTele = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decrystatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
      <Header eid={decryEid} />
        <InvoiceDetailsTele id={decryEid} status={decrystatus} />
        <FollowupDateTele
          eid={decryEid}
          id={decryId}
          telePageType={"advance"}
        />
      </div>
      </div>
    </section>
  );
};

export default WholeAdvanceTele;
