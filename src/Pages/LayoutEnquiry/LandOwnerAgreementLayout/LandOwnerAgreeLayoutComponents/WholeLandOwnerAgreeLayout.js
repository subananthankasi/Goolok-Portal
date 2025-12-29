import React from 'react'
import LandOwnerDraftLayout from './LandOwnerDraftLayout'
import LandOwnerAgreeDetailsLayout from './LandOwnerAgreeDetailsLayout'
import { ProjectDetailsLandOwnerLayout } from './ProjectDetailsLandOwnerLayout'





const WholeLandOwnerAgreeLayout = ({ eid, id, status,pagetype,sub_property }) => {
    return (
        <div>
            <LandOwnerDraftLayout eid={eid} id={id} status={status} pagetype = {pagetype} />
            <LandOwnerAgreeDetailsLayout eid={eid} id={id} status={status} pagetype = {pagetype} />
            <ProjectDetailsLandOwnerLayout eid={eid} id={id} status={status} pagetype = {pagetype}/> 
        </div>
    )
}

export default WholeLandOwnerAgreeLayout