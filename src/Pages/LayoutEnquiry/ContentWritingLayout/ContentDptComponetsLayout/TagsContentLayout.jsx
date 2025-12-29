import React, { useState, useEffect, } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import { Editor } from "primereact/editor";
import axios from 'axios';
import Button from '@mui/material/Button';
import Toast from '../../../../Utils/Toast';
import { suitableGetThunk } from '../../../../Redux/Actions/MasterPage/TagsThunk/SuitableThunk';
import { propertyGetThunk } from '../../../../Redux/Actions/MasterPage/TagsThunk/PropertyThunk';
import { tagsGetThunk } from '../../../../Redux/Actions/Enquiry/ContentWritingThunk/TagsThunk';
import API_BASE_URL from '../../../../Api/api';



const TagsContentLayout = ({ eid, id, status }) => {
    const dispatch = useDispatch()
    const [triggerChild, setTriggerChild] = useState(false);
    const staffid = JSON.parse(sessionStorage.getItem('token'));
    const enquiryDoumentData = useSelector(
        (state) => state.Enquiry.enquiryDocument
    );


    const onSubmit = async (values) => {
        setTriggerChild(prev => !prev);
        Toast({ message: 'Successfully Submited', type: "success" })
    }



    const getData = useSelector((state) => state.nearByData?.get?.data)

    useEffect(() => {
        dispatch(suitableGetThunk())
        dispatch(propertyGetThunk())
        dispatch(tagsGetThunk(eid))
    }, [])

    const propertytag = useSelector((state) => state.propertyData?.get?.data)
    const suitableTag = useSelector((state) => state.suitableData?.get?.data)


    const suitableOption = suitableTag?.map((item) => ({
        name: item.suitable_tag,
        code: item.id
    })) || [];
    const propertyOption = propertytag?.map((item) => ({
        name: item.property_tag,
        code: item.id
    })) || [];


    const [suitData, setSuitData] = useState([])
    const [propData, setPropData] = useState([])
    const [selectedSuId, setSelectedSuId] = useState([]);
    const [selectedPropId, setSelectedPropId] = useState([]);


    const suitGetData = useSelector((state) => state.tagData?.get?.data?.[0]?.suitable_tags)
    const propGetData = useSelector((state) => state.tagData?.get?.data?.[0]?.property_tags)
    const idValue = useSelector((state) => state.tagData?.get?.data?.[0]?.id)
    const seo = useSelector((state) => state.tagData?.get?.data?.[0]?.seo_tags)


    useEffect(() => {
        if (seo) {
            formik.setFieldValue('seoTags', seo)
        }

    }, [seo])


    //.........................................................
    useEffect(() => {
        if (suitableTag) {
            setSuitData(suitableTag)
        }
    }, [suitableTag])

    useEffect(() => {
        if (!!suitGetData) {
            const data = JSON.parse(suitGetData) || []
            setSelectedSuId(data || [])
        } else {
        }
    }, [propGetData]);

    useEffect(() => {
        if (propertytag) {
            setPropData(propertytag)
        }
    }, [propertytag])

    useEffect(() => {
        if (!!propGetData) {
            const data = JSON.parse(propGetData) || []
            setSelectedPropId(data || [])
        } else {
        }
    }, [propGetData]);

    const formik = useFormik({
        initialValues: {
            suitableTags: [],
            propertyTags: [],
            seoTags: '',
            enqid: eid,
            id: null

        },
        onSubmit
    })
    const glintegerIds = selectedSuId?.map(id => parseInt(id));

    const updateData = {
        suitableTags: selectedSuId || [],
        propertyTags: selectedPropId || [],
        seoTags: formik.values.seoTags,
        enqid: eid,
        id: idValue || null

    }

    useEffect(() => {
        const updateDataAsync = async () => {
            if (triggerChild) {

                try {
                    await axios.post(`${API_BASE_URL}/contentdpt/createtags`, updateData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(() => {
                            dispatch(tagsGetThunk(eid))
                        })

                } catch (error) {
                    alert(error.response.data.messages.error);

                }
            }
        };

        updateDataAsync();
    }, [triggerChild]);

    useEffect(() => {
        if (suitableTag) {
            const initialSelectedValues = formik.values.suitableTags.length
                ? formik.values.suitableTags
                : JSON.parse(suitGetData || '[]');
            setSelectedSuId(initialSelectedValues);
            formik.setFieldValue('suitableTags', initialSelectedValues);
        }
    }, [suitableTag]);

    const handleChangeSuitable = (e) => {
        const selectedValues = e.value.map((item) => item.code);
        setSelectedSuId(selectedValues);
        formik.setFieldValue('suitableTags', selectedValues);
    };

    useEffect(() => {
        if (propertytag) {
            const initialSelectedValues = formik.values.propertyTags.length
                ? formik.values.propertyTags
                : JSON.parse(propGetData || '[]');
            setSelectedPropId(initialSelectedValues);
            formik.setFieldValue('propertyTags', initialSelectedValues);
        }
    }, [propertytag]);

    const handleChangeProperty = (e) => {
        const selectedValues = e.value.map((item) => item.code);
        setSelectedPropId(selectedValues);
        formik.setFieldValue('propertyTags', selectedValues);
    };



    return (
        <>
            <div className="card shadow border-0 mb-3">
                <div className="card shadow border-0 p-4">
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className='container'>
                            <div className='form-group'>
                                <label htmlFor="suitableTags" className='form-label'>Suitable Tags : </label>
                                <MultiSelect
                                    value={suitableOption.filter((option) => selectedSuId.includes(option.code))}
                                    name="suitableTags"
                                    onChange={handleChangeSuitable}
                                    options={suitableOption}
                                    optionLabel="name"
                                    filter
                                    display="chip"
                                    placeholder="Select Suitable Tags"
                                    maxSelectedLabels={3}
                                    // className="w-full md:w-20rem"
                                    className="w-full md:w-20rem custom-multiselect"
                                    style={{ width: '100%', height: '100px' }}
                                />

                            </div>
                            <div className="mt-2 col-md-12">
                                <label className="form-label" htmlFor="interiorFeature">
                                    Property Tags :
                                </label>
                                <MultiSelect
                                    value={propertyOption.filter((option) => selectedPropId.includes(option.code))}
                                    name="propertyTags"
                                    onChange={handleChangeProperty}
                                    options={propertyOption}
                                    optionLabel="name"
                                    filter
                                    display="chip"
                                    placeholder="Select Property tags"
                                    maxSelectedLabels={3}
                                    className="w-full md:w-20rem"
                                    style={{ width: '100%', height: '100px' }}
                                />
                            </div>
                            <div className="mt-2 col-md-12">
                                <label className="form-label" htmlFor="interiorFeature">
                                    Seo Tags :
                                </label>
                                <Editor
                                    value={formik.values.seoTags}
                                    name="seoTags"
                                    onTextChange={(value) => {
                                        const plainText = value.htmlValue
                                            ? value.htmlValue.replace(/<[^>]*>/g, '')
                                            : value;
                                        formik.setFieldValue('seoTags', plainText);
                                    }}
                                    onChange={formik.handleChange}
                                    style={{ height: '300px' }}
                                    className="mt-2"
                                    placeholder="Text here ..."
                                />
                            </div>
                            {(status == "pending" || status == "complete") && staffid.Login == "staff" && enquiryDoumentData?.status !== "booking" && (
                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <div>
                                        <Button variant="contained" type="submit" >
                                            Save
                                        </Button>
                                        {/* <Button label="Submit" icon="pi pi-upload" type="submit" size="small" style={{ borderRadius: '7px' }} /> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TagsContentLayout