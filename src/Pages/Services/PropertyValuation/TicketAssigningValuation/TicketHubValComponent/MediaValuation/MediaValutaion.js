import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ValutionReport from "./ValutionReport";
import PhotoValuation from "./PhotoValuation";
import VideoValution from "./VideoValution";

const MediaValutaion = ({ eid, id, status }) => {
  return (
    <div className="col-12 mt-4">
      <div className="card shadow border-0">
        <div className="card shadow border-0 p-4">
          <TabView>
            <TabPanel header="Property valuation report">
              <ValutionReport eid={eid} id={id} status={status} />
            </TabPanel>
            <TabPanel header="Photo">
              <PhotoValuation eid={eid} id={id} status={status} />
            </TabPanel>
            <TabPanel header="Video">
              <VideoValution eid={eid} id={id} status={status} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default MediaValutaion;
