import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import AddVideos from './AddVideos';
import AddPhotos from './AddPhotos';
import AddBrouchers from './AddBrouchers';



const MediaDeptResuble = ({ eid, status ,pagetype }) => {

    return (
        <>
            <TabView>
                <TabPanel header="Videos">
                    <AddVideos eid={eid} status={status} pagetype= {pagetype} />
                </TabPanel>
                <TabPanel header="Gallery">
                    <AddPhotos eid={eid} status={status} pagetype= {pagetype} />
                </TabPanel>
                <TabPanel header="Attachments">
                    <AddBrouchers eid={eid} status={status} pagetype= {pagetype} />
                </TabPanel>
            </TabView>
        </>
    )
}

export default MediaDeptResuble