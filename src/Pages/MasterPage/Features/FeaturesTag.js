import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import Features from './InteriorFeatures';
import ExteriorFeatures from './ExteriorFeatures';
import GeneralFeature from './GeneralFeature';

const FeaturesTag = () => {
    return (
        <>
          
                <TabView>
                    <TabPanel header="Interior Features" >
                        <Features />

                    </TabPanel>
                    <TabPanel header="Exterior Features">
                        <ExteriorFeatures />

                    </TabPanel>
                    <TabPanel header="General Features">
                        <GeneralFeature />

                    </TabPanel>
                </TabView>
            

        </>
    )
}

export default FeaturesTag