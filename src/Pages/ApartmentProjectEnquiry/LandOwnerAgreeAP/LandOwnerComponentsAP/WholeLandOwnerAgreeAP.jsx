import React from "react";
import LandOwnerDraftAP from "./LandOwnerDraftAP";
import AgreementPeriodOwnerAP from "./AgreementPeriodOwnerAP";
import { ProjectDetailsOwnerAP } from "./ProjectDetailsOwnerAP";

const WholeLandOwnerAgreeAP = ({ eid, id, status, pagetype }) => {
  return (
    <div>
      <LandOwnerDraftAP eid={eid} id={id} status={status} pagetype={pagetype} />

      <AgreementPeriodOwnerAP
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      />
      <ProjectDetailsOwnerAP
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      />
    </div>
  );
};

export default WholeLandOwnerAgreeAP;
