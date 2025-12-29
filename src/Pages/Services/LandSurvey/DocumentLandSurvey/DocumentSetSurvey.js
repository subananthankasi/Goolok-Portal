import React from 'react'
import { useParams } from 'react-router-dom';
import UpdateDocumentSurvey from './UpdateDocumentSurvey';
import { Header } from '../../../Enquiry/Reusable/Header';

const DocumentSetSurvey = () => {
    const { eid, id, status } = useParams();

    return (
        <section className="section">
            <div className="container-fluid">
                <Header eid={eid} />
                <UpdateDocumentSurvey />
            </div>
        </section>
    )
}

export default DocumentSetSurvey