import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../Enquiry/Reusable/Header";
import UpdateLegalDoc from "./UpdateLegalDoc";

const DocumentSetLegal = () => {
  const { eid, id, status } = useParams();
  return (
    <section className="section">
      <div className="container-fluid">
        <Header eid={eid} />
        <UpdateLegalDoc />
      </div>
    </section>
  );
};

export default DocumentSetLegal;
