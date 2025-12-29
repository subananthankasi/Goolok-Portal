import React from "react";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import AddService from "../../Services/ServiceConfirm/ServiceComponent/AddService";
import FollowupDateTele from "../Document Verification/FollowupDateTele";
import InvoiceComponent from "../../Services/InvoiceService/InvoiceComponet/InvoiceComponent";

const WholeServicePaymentTele = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryid = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />
          <FollowupDateTele
            eid={decryEid}
            id={decryid}
            telePageType={"servicepayment"}
          />
          <InvoiceComponent id={decryid} eid={decryEid} status={decryStatus} />
        </div>
      </div>
    </section>
  );
};

export default WholeServicePaymentTele;
