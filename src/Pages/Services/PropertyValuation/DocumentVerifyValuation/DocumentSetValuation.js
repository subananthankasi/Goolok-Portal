import React from "react";
import { useParams } from "react-router-dom";
import UpdateDocValuation from "./UpdateDocValuation";
import { Header } from "../../../Enquiry/Reusable/Header";

const DocumentSetValuation = () => {
  const { eid, id, status } = useParams();

  return (
    <section className="section">
      <div className="container-fluid">
        <Header eid={eid} />
        <UpdateDocValuation />
      </div>
    </section>
  );
};

export default DocumentSetValuation;
