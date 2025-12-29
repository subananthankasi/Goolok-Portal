import React from 'react'
import { TabView, TabPanel } from "primereact/tabview";
import CustomerFollowValution from './CustomerFollowValution';
import ValuatorFollowValuation from './ValuatorFollowValuation';
// import CustomerFollowSurvey from './CustomerFollowSurvey';
// import SurveyorFollowSurvey from './SurveyorFollowSurvey';


const ValutionDateConfirmations = ({ eid, id, status }) => {
    return (
        <div className="col-12 mt-4">
            <div className="card shadow border-0">
                <div className="card shadow border-0 p-4">
                    <TabView>
                        <TabPanel header="Customer followup">
                            <CustomerFollowValution eid={eid} id={id} status={status} />
                        </TabPanel>
                        <TabPanel header="Valuator followup">
                            <ValuatorFollowValuation eid={eid} id={id} status={status} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    )
}

export default ValutionDateConfirmations