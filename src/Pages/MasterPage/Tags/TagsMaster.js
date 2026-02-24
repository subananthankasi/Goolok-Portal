import { TabView, TabPanel } from 'primereact/tabview';
import Suitable from './Suitable';
import Property from './Property';


const Tag = () => {
    return (
        <>
            <TabView>
                <TabPanel header="Suitable " >
                    <Suitable/>
                </TabPanel>
                <TabPanel header="Property">
                    <Property/>
                </TabPanel>
            </TabView>
        </>
    )
}

export default Tag