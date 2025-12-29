import React from "react";
import { useParams } from "react-router-dom";
import UploadDocumentsTele from "./UploadDocumentsTele";
import FollowupDateTele from "./FollowupDateTele";
import { Header } from "../../Enquiry/Reusable/Header";

const WholeDocTelecalling = () => {
  const { eid, id, status } = useParams();
  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid = {eid} />
            <UploadDocumentsTele eid={eid} id={id} />
            <FollowupDateTele eid={eid} id={id} telePageType = {"documentverification"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default WholeDocTelecalling;
