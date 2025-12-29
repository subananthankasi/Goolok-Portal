import React from 'react'
import { TabView, TabPanel } from "primereact/tabview";
import CustomerFollowSurvey from './CustomerFollowSurvey';
import SurveyorFollowSurvey from './SurveyorFollowSurvey';


const SurveyDateConfirmation = ({ eid, id, status }) => {
    return (
        <div className="col-12 mt-4">
            <div className="card shadow border-0">
                <div className="card shadow border-0 p-4">
                    <TabView>
                        <TabPanel header="Customer followup">
                            <CustomerFollowSurvey eid={eid} id={id} status={status} />
                        </TabPanel>
                        <TabPanel header="Surveyor followup">
                            <SurveyorFollowSurvey eid={eid} id={id} status={status} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    )
}

export default SurveyDateConfirmation