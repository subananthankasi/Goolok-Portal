import React from 'react'
import { TabView, TabPanel } from "primereact/tabview";
import MeasurmentSurvey from './MeasurmentSurvey';
import SurveyPhoto from './SurveyPhoto';
import SurveyVideo from './SurveyVideo';



const MediaTicketSurvey = ({ eid, id, status }) => {
    return (
        <div className="col-12 mt-4">
            <div className="card shadow border-0">
                <div className="card shadow border-0 p-4">
                    <TabView>
                        <TabPanel header="Field Survey Measurment">
                            <MeasurmentSurvey eid={eid} id={id} status={status} />
                        </TabPanel>
                        <TabPanel header="Survey Photo">
                            <SurveyPhoto eid={eid} id={id} status={status} />
                        </TabPanel>
                        <TabPanel header="Survey Video">
                            <SurveyVideo eid={eid} id={id} status={status} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    )
}

export default MediaTicketSurvey