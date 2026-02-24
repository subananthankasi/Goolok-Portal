import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import OwnerDateTele from './OwnerDateTele';
import CustomerDateTele from './CustomerDateTele';



const RegTikcketDateWholeTele = ({ eid, id, status, bookingno, bookingid,pagetype }) => {

    return (
        <>
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between">
                            <h6>Registration Date  </h6>

                        </div>

                        <hr />

                        <TabView>
                            <TabPanel header="Land Owner Date Fixing">
                                <OwnerDateTele eid={eid} id={id} status={status} bookingno={bookingno} bookingid={bookingid} pagetype = {pagetype}/>
                            </TabPanel>
                            <TabPanel header="Customer Date Fixing">
                                <CustomerDateTele eid={eid} id={id} status={status} bookingno={bookingno} bookingid={bookingid} pagetype = {pagetype}/>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RegTikcketDateWholeTele