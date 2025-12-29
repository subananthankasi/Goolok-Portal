import React from 'react'
import { useParams } from 'react-router-dom';
import { Header } from '../Reusable/Header';
import { DocumentVerification } from '../Reusable/DocumentVerification';
import { decryptData } from '../../../Utils/encrypt';
import DocumentFileUploads from './DocumentFileUploads';

function DocumentVerificationCompleted() {
  const { eid, status } = useParams();
  const decryEid = decryptData(eid);
  return (
    <section className="section">
      <div className="container-fluid">
        <Header eid={decryEid} />
        <DocumentFileUploads />
      </div>
    </section>
  )
}

export default DocumentVerificationCompleted