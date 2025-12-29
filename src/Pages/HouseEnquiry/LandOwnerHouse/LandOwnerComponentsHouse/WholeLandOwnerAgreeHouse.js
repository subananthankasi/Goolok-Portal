import React from 'react'
import LandOwnerDetailsHouse from './LandOwnerDetailsHouse'
import LandOwnerDraftHouse from './LandOwnerDraftHouse'


const WholeLandOwnerAgreeHouse = ({ eid, id, status,pagetype,sub_property }) => {
    return (
        <div>
            <LandOwnerDraftHouse eid={eid} id={id} status={status} pagetype = {pagetype} sub_property={sub_property}/>
            <LandOwnerDetailsHouse eid={eid} id={id} status={status} pagetype = {pagetype} />
        </div>
    )
}

export default WholeLandOwnerAgreeHouse