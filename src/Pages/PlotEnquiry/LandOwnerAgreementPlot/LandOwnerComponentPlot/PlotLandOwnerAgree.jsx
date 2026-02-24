import React from 'react'
import LandOwnerDetailsPlot from './LandOwnerDetailsPlot'
import LandOwnerDraftPlot from './LandOwnerDraftPlot'
import { ProjectDetailsOwnerPlot } from './ProjectDetailsOwnerPlot'
// import ProjectDetailsOwnerPlot from './ProjectDetailsOwnerPlot'





const PlotLandOwnerAgree = ({ eid, id, status,pagetype,sub_property }) => {
    return (
        <div>
             <LandOwnerDraftPlot eid={eid} id={id} status={status} pagetype = {pagetype} sub_property = {sub_property}    />
            <LandOwnerDetailsPlot eid={eid} id={id} status={status} pagetype = {pagetype} />
             <ProjectDetailsOwnerPlot eid={eid} id={id} status={status} pagetype = {pagetype}/> 
             
        </div>
    )
}

export default PlotLandOwnerAgree