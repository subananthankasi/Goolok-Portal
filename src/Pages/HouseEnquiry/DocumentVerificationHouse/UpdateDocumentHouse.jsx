import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../Enquiry/Reusable/Header";
import { decryptData } from "../../../Utils/encrypt";
import WholeDocHouse from "./HouseDocComponents/WholeDocHouse";

function UpdateDocumentHouse() {
  const { eid, id, status } = useParams();
  const decryptedEid = decryptData(eid);
  const decryptedId = decryptData(id);
  const decryptedStatus = decryptData(status);

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={decryptedEid} />

            <WholeDocHouse
              eid={decryptedEid}
              id={decryptedId}
              status={decryptedStatus}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateDocumentHouse;
