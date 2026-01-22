import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import WholeDocumentLand from "./LandDocumentComponents/WholeDocumentLand";
import { Header } from "../../Enquiry/Reusable/Header";



function UpdateDocLand() {
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
                        <WholeDocumentLand eid={decryptedEid} id={decryptedId} status={decryptedStatus} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default UpdateDocLand;
