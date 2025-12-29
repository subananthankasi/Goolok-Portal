import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { useParams } from 'react-router-dom';
import { decryptData } from '../../../../Utils/encrypt';
import { Header } from '../../Reusable/Header';
import { ApartMarketResearch } from './MarketResearchApartComponent/ApartMarketResearch';
import WholeComponentDocApart from '../ApartDocumentVerification/ApartDocComponents/WholeComponentDocApart';
import { InvoiceApart } from '../InvoiceVerifiCationApart/InvoiceComponentApart/InvoiceApart';
import LocationSelectApart from '../LocationVerificationApart/LocationApartComponent/LocationSelectApart';
// import ApartMarketResearch from './MarketResearchApartComponent/ApartMarketResearch';

const UpdateMarketResearchApart = () => {
  
  const { eid, id, status } = useParams();
  const decryEid = decryptData(eid);
  const decryId = decryptData(id);
  const decryStatus = decryptData(status);
  return (
    <>
      <section className="section">
        <div className="container-fluid">
          <div className="row">

            <Header eid={decryEid} />
            <TabView>
              <TabPanel header="Current">
                <ApartMarketResearch eid={decryEid} marketid ={decryId} status={decryStatus}/>
              </TabPanel>
              <TabPanel header="Remainder">
              <WholeComponentDocApart
                eid={decryEid}
                id={decryId}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <InvoiceApart id={decryEid} status={"success"} />
              <LocationSelectApart
                eid={decryEid}
                status={decryStatus}
                id={decryId}
                pagetype={"reminder"}
              />
            </TabPanel>
            </TabView>
          </div>
        </div>
      </section>
    </>
   
  )
}

export default UpdateMarketResearchApart