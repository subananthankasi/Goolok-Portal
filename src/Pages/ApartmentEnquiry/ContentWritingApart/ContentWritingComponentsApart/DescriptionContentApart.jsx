import { useEffect, useState } from 'react'
import { Editor } from "primereact/editor";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProjectDetailsContentApart from './ProjectDetailsContentApart';
import InteriorFeatureApart from './InteriorFeatureApart';
import GeneralFeatureContentApart from './GeneralFeatureContentApart';
import ExteriorFeatureContentApart from './ExteriorFeatureContentApart';
import InvestmentStrategyContentApart from './InvestmentStrategyContentApart';
import { CWDescAndFeatureGetThunk } from '../../../../Redux/Actions/Enquiry/ContentWritingThunk/CWDescriptionFeatureThunk';
import API_BASE_URL from '../../../../Api/api';
import Toast from '../../../../Utils/Toast';

const DescriptionContentApart = ({ eid, id, status }) => {

    const [amenities, setAmenities] = useState([])
    const [triggerChild, setTriggerChild] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [highlights, setHighlights] = useState('')
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CWDescAndFeatureGetThunk(eid))
    }, [])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/landamenities`)
                setAmenities(response.data?.[0]?.amenities)
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()
        setTriggerChild(prev => !prev);
        Toast({ message: 'Successfully Submited', type: "success" })
        // setLoading(true)
    }

    const cwData = useSelector((state) => state.CWDescFeatureData?.get?.data?.[0]?.amenities)
    const descriptionValue = useSelector((state) => state.CWDescFeatureData?.get?.data?.[0]?.description)
    const highlightsValue = useSelector((state) => state.CWDescFeatureData?.get?.data?.[0]?.highlights)
    const titleValue = useSelector((state) => state.CWDescFeatureData?.get?.data?.[0]?.title)


    const idvalue = useSelector((state) => state.CWDescFeatureData?.get?.data?.[0]?.id)

    const [selectedIds, setSelectedIds] = useState([]);

    // old data update 
    useEffect(() => {
        if (!!cwData) {
            const data = JSON.parse(cwData) || []
            setSelectedIds(data || [])

        } else {
        }
    }, [cwData]);


    useEffect(() => {
        if (descriptionValue) {
            setDescription(descriptionValue)
        }

    }, [descriptionValue])

    useEffect(() => {
        if (highlightsValue) {
            setHighlights(highlightsValue)
        }

    }, [highlightsValue])

    useEffect(() => {
        if (titleValue) {
            setTitle(titleValue)
        }

    }, [titleValue])

    const integerIds = selectedIds?.map(id => parseInt(id));


    const updateData = {
        title: title,
        highlights: highlights,
        description: description,
        enqid: eid,
        amenities: integerIds ? integerIds : null,
        id: idvalue ? idvalue : null
    }

    useEffect(() => {
        const updateDataAsync = async () => {
            if (triggerChild) {
                try {
                    await axios.post(`${API_BASE_URL}/contentdpt`, updateData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(() => {
                            dispatch(CWDescAndFeatureGetThunk(eid))
                        })

                } catch (error) {
                    alert(error.response.data.messages.error);
                }
            }
        };

        updateDataAsync();
    }, [triggerChild]);


    const staffid = JSON.parse(localStorage.getItem('token'));

    return (
        <>
            <div className="card shadow border-0">
                <div className="card shadow border-0 p-4">
                    <form>
                        <div className='form-group'>
                            <label htmlFor="" className='form-label'> Title :</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                className='form-control w-25'
                                placeholder='Enter Title...'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="" className='form-label'>Nearby Highlights :</label>
                            <input
                                type="text"
                                id='title'
                                name='highlights'
                                className='form-control w-25'
                                placeholder='Enter highlights...'
                                value={highlights}
                                onChange={(e) => setHighlights(e.target.value)}
                            />

                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="" className='form-label'>Description :</label>
                            <Editor
                                value={description}
                                name="description"
                                onTextChange={(value) => {
                                    const plainText = value.htmlValue
                                        ? value.htmlValue.replace(/<[^>]*>/g, '')
                                        : value;
                                    setDescription(plainText);
                                }}
                                style={{ height: '300px' }}
                                className="mt-2"
                                placeholder="Text here ..."
                            />
                        </div>
                        {(status === "pending" || status === "complete") && staffid.Login === "staff" && enquiryDoumentData?.status !== "booking" && (
                            <div className='d-flex justify-content-end mt-3'>
                                <Button variant="contained" type="submit" onClick={handleSubmit} >
                                    Save
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <ProjectDetailsContentApart eid={eid} id={id} status={status} />
            <GeneralFeatureContentApart eid={eid} id={id} status={status} />
            <InteriorFeatureApart eid={eid} id={id} status={status} />
            <ExteriorFeatureContentApart eid={eid} id={id} status={status} />
            <InvestmentStrategyContentApart eid={eid} id={id} status={status} />

        </>
    )
}

export default DescriptionContentApart