import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../Enquiry/Reusable/Header";
import WholeComponentDocVerifyMissing from "./ComponentDocMissings/WholeComponentDocVerifyMissing";
import { decryptData } from "../../../../Utils/encrypt";





function UpdateDocApart() {

  const { eid,id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryStatus = decryptData(status);
 

  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <Header eid={eid} />
            <WholeComponentDocVerifyMissing eid= {eid} id ={id} status = {status} />
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateDocApart;
