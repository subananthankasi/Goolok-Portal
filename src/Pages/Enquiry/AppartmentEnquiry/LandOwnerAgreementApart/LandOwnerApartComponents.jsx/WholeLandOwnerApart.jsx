import React from 'react'
import LandOwnerDetailsApart from './LandOwnerDetailsApart'
import ProjectDetailsOwnerApart from './ProjectDetailsOwnerApart'




const WholeLandOwnerApart = ({ eid, id, status,pagetype }) => {
    return (
        <div>
            <ProjectDetailsOwnerApart eid={eid} id={id} status={status} pagetype = {pagetype}/>

            <LandOwnerDetailsApart eid={eid} id={id} status={status} pagetype = {pagetype} />
            
        </div>
    )
}

export default WholeLandOwnerApart