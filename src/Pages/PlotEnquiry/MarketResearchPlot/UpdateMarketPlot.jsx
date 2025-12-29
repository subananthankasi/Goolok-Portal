import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { useParams } from 'react-router-dom';
import { Header } from '../../Enquiry/Reusable/Header';
import { decryptData } from '../../../Utils/encrypt';


import WholeDocPlot from '../DocumentPlot/DocumentPlotComponents/WholeDocPlot';
import { WholeInvoicePlot } from '../InvoicePlot/InvoicePlotComponent/WholeInvoicePlot';
import LocationSelectPlot from '../LocationPlot/LocationPlotComponent/LocationSelectPlot';
import { PlotMarketResearch } from './MarketPlotComponent/PlotMarketResearch';
// import ApartMarketResearch from './MarketResearchApartComponent/ApartMarketResearch';

const UpdateMarketPlot = () => {
  
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
                <PlotMarketResearch 
                eid={decryEid} marketid ={decryId} status={decryStatus}/>
              </TabPanel>
              
              <TabPanel header="Remainder">
              <WholeDocPlot
                eid={decryEid}
                id={decryId}
                status={decryStatus}
                pagetype={"reminder"}
              />
              <WholeInvoicePlot id={decryEid} status={"success"} />
              <LocationSelectPlot
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

export default UpdateMarketPlot