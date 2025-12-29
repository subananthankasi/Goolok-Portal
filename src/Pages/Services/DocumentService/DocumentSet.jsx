import React from 'react'
import UpdateServiceDocument from './UpdateServiceDocument';
import { Header } from '../../Enquiry/Reusable/Header';
import { useParams } from 'react-router-dom';
// import { decryptData } from '../../../Utils/encrypt';

const DocumentSet = () => {
    // const { eid, status } = useParams();
    const { eid, id, status } = useParams();

    return (
        <section className="section">
            <div className="container-fluid">
                <Header eid={eid} />
                <UpdateServiceDocument />
            </div>
        </section>
    )
}

export default DocumentSet