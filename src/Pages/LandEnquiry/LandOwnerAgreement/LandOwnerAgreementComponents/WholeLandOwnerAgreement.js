import React from 'react'
import { LandOwnerAgreement } from './LandOwnerAgreement'
import LandOwnerDetails from './LandOwnerDetails'
import LandOwnerAddedTable from './LandOwnerAddedTable'

const WholeLandOwnerAgreement = ({decryEid,decryId,decryStatus}) => {
    return (
        <>
            <LandOwnerAgreement
                eid={decryEid}
                id={decryId}
                status={decryStatus}
            />
            <LandOwnerDetails
                eid={decryEid}
                id={decryId}
                status={decryStatus}
            />
            <LandOwnerAddedTable
                eid={decryEid}
                id={decryId}
                status={decryStatus}
            />
        </>
    )
}

export default WholeLandOwnerAgreement