import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useParams } from "react-router-dom";
import { decryptData } from "../../../Utils/encrypt";
import { Header } from "../../Enquiry/Reusable/Header";
import {WholeInvoiceComponentAP} from "./InvoiceComponentAP/WholeInvoiceComponentAP";
import WholeDocumentAP from "../DocumentVerificationAP/DocumentComponetsAP/WholeDocumentAP";


const UpdateInvoiceVerifyAp = () => {
    const { eid, id, status } = useParams();

    const decryptedEid = decryptData(eid);
    const decryptedId = decryptData(id);
    const decryptedStatus = decryptData(status);

    return (
        <section className="section">
            <div className="container-fluid">
                <div className="row">
                    <Header eid={decryptedEid} />
                    <TabView>
                        <TabPanel header="Current">
                            <WholeInvoiceComponentAP id={decryptedEid} status={decryptedStatus} />
                        </TabPanel>
                        <TabPanel header="Remainder">
                            <WholeDocumentAP
                                eid={decryptedEid}
                                id={decryptedId}
                                status={decryptedStatus}
                                pagetype={"reminder"}
                            />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </section>
    );
};

export default UpdateInvoiceVerifyAp;
