import React, { useRef, useState } from 'react'
// import MediaDeptResuble from '../Reusable/MediaDepartment/MediaDeptResuble';
// import { mediaDptConfirmThunk } from '../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptConfirmThunk';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";
import { mediaDptConfirmThunk } from '../../../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptConfirmThunk';
import { TabView, TabPanel } from 'primereact/tabview';
import AddPhotosApart from './AddPhotosApart';
import AddAttachmentsApart from './AddAttachmentsApart';
import AddVideosApart from './AddVideosApart';
import Toast from '../../../../../Utils/Toast';
const WholeMediaDptApart = ({ eid, id, status, pagetype }) => {

    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useRef()



    const confirmLoading = useSelector((state) => state.mediaDptConfirm?.loading)
    const handleConfirm = async () => {
        const payload = {
            enqid: eid,
            id: id
        }
        try {
            const response = await dispatch(mediaDptConfirmThunk(payload))
            Toast({ message: "Successfully Submited", type: "success" });
            navigate("/apart_media_department#Complete");

        }
        catch (error) {
            console.error(error)
            Toast({ message: "Try Again", type: "error" });
        }
    }


    return (
        <>
            <Toast ref={toast} />
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between">
                            <h6>Media Department</h6>
                        </div>

                        <hr />
                        <TabView>
                            <TabPanel header="Videos">
                                <AddVideosApart eid={eid} id={id} status={status} pagetype={pagetype} />
                            </TabPanel>
                            <TabPanel header="Gallery">
                                <AddPhotosApart eid={eid} id={id} status={status} pagetype={pagetype} />
                            </TabPanel>
                            <TabPanel header="Attachments">
                                <AddAttachmentsApart eid={eid} id={id} status={status} pagetype={pagetype} />

                            </TabPanel>
                        </TabView>
                        {(staffid.logintype == "staff") && status === "pending" && pagetype !== "reminder" && (
                            <div className="text-end mt-3">
                                <button
                                    onClick={handleConfirm}
                                    className="btn1"
                                    disabled={confirmLoading}
                                >
                                    {confirmLoading ? (
                                        <ThreeDots
                                            visible={true}
                                            height="10"
                                            width="40"
                                            color="#ffffff"
                                            radius="18"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{
                                                justifyContent: "center",
                                                fontSize: "12px",
                                            }}
                                            wrapperClass=""
                                        />
                                    ) : (
                                        "Confirm "
                                    )}
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default WholeMediaDptApart