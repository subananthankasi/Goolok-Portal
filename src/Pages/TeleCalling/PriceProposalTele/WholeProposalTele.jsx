import React from "react";
import { ProposalDetailsTele } from "./ProposalDetailsTele";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import FollowupDateTele from "../Document Verification/FollowupDateTele";
import { Header } from "../../Enquiry/Reusable/Header";

const WholeProposalTele = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decrystatus = decryptData(status);
  return (
    <section className="section">
      <div className="container">
        <Header eid={decryEid} />
        <ProposalDetailsTele eid ={decryEid} id={decryId} status= {decrystatus} />
        <FollowupDateTele
          eid={decryEid}
          id={decryId}
          telePageType={"priceproposal"}
        />
      </div>
    </section>
  );
};

export default WholeProposalTele;
