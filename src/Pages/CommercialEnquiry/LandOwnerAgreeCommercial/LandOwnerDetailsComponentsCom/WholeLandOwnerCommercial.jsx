import React from "react";
import AgreementPeriodOwnerCom from "./AgreementPeriodOwnerCom";
import { LandProjectDetailsOwnerCom } from "./LandProjectDetailsOwnerCom";
import { OtherProjectDetailsOwnerCom } from "./OtherProjectDetailsOwnerCom";
import LandOwnerDraftCom from "./LandOwnerDraftCom";

const WholeLandOwnerCommercial = ({ eid, id, status, pagetype, subtype }) => {

  return (
    <div>
      <LandOwnerDraftCom
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
        subtype={subtype}
      />

      <AgreementPeriodOwnerCom
        eid={eid}
        id={id}
        status={status}
        pagetype={pagetype}
      />
      {subtype === "Land" ? (
        <LandProjectDetailsOwnerCom
          eid={eid}
          id={id}
          status={status}
          pagetype={pagetype}
          subtype={subtype}
        />
      ) : (
        <OtherProjectDetailsOwnerCom
          eid={eid}
          id={id}
          status={status}
          pagetype={pagetype}
          subtype={subtype}
        />
      )}
    </div>
  );
};

export default WholeLandOwnerCommercial;
