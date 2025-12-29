import React from "react";
import UpdateDocumentGoogleMap from "./UpdateDocumentGoogleMap";
import { useParams } from "react-router-dom";
import { Header } from "../../../Enquiry/Reusable/Header";

const DocumentSetGoogleMap = () => {
  const { eid, id, status } = useParams();
  return (
    <section className="section">
      <div className="container-fluid">
        <Header eid={eid} />
        <UpdateDocumentGoogleMap />
      </div>
    </section>
  );
};

export default DocumentSetGoogleMap;
