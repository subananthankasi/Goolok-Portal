import { useParams } from "react-router-dom";
import WholeComponentDocApart from "./ApartDocComponents/WholeComponentDocApart";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";

function UpdateDocApart() {
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
            <WholeComponentDocApart eid={decryptedEid} id={decryptedId} status={decryptedStatus} />
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateDocApart;
