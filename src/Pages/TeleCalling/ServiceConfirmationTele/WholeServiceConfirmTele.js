import React from "react";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import AddService from "../../Services/ServiceConfirm/ServiceComponent/AddService";
import FollowupDateTele from "../Document Verification/FollowupDateTele";

const WholeServiceConfirmTele = () => {
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryid = decryptData(id);
  const decryStatus = decryptData(status);

  return (
    <section className="section">
      <div className="container-fluid">
        <div className="row">
          <Header eid={decryEid} />
          <AddService eid={decryEid} id={decryid} status={status} />
          <FollowupDateTele
            eid={decryEid}
            id={decryid}
            telePageType={"serviceconfirmation"}
          />
        </div>
      </div>
    </section>
  );
};

export default WholeServiceConfirmTele;
