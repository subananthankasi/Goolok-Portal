import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";
import { Toast } from 'primereact/toast';
import { TabPanel, TabView } from 'primereact/tabview';
import AddVideos from './AddVideos';
import AddPhotos from './AddPhotos';
import AddBrouchers from './AddBrouchers';
import { mediaDptConfirmThunk } from '../../../../Redux/Actions/Enquiry/MediaDptEnq/MediaDptConfirmThunk';
import ConfirmationModal from '../../../../Utils/ConfirmationModal';

const WholeMediaDptLand = ({ eid, id, status, pagetype }) => {

    const staffid = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useRef()
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);


    const confirmLoading = useSelector((state) => state.mediaDptConfirm?.loading)
    const handleConfirm = async () => {
        const payload = {
            enqid: eid,
            id: id
        }
        try {
            const response = await dispatch(mediaDptConfirmThunk(payload))
            if (mediaDptConfirmThunk.fulfilled.match(response)) {
                const message = response.payload.data;
                toast.current.show({ severity: 'success', summary: 'Successfully Submited', detail: ' Success', life: 3000 });
                navigate("/mediaDepartment#Complete");

            } else if (mediaDptConfirmThunk.rejected.match(response)) {
                const errorPayload = response.payload.reason?.response?.data?.messages?.error
                toast.current.show({ severity: 'error', summary: errorPayload, detail: ' Rejected', life: 3000 });
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Toast ref={toast} />
            <ConfirmationModal
                isOpen={verifyConfirm}
                closeModal={() => setIsVerifyConfirm(false)}
                onConfirm={handleConfirm}
                message={"Are you sure this has been verified?"}
                loading={confirmLoading}
            />
            <div className="col-12 mt-4">
                <div className="card shadow border-0">
                    <div className="card shadow border-0 p-4">
                        <div className="d-flex justify-content-between">
                            <h6>Media Department</h6>
                        </div>
                        <hr />
                        {/* <MediaDeptResuble eid={eid} status={status} pagetype={pagetype} /> */}
                        <TabView>
                            <TabPanel header="Videos">
                                <AddVideos eid={eid} status={status} pagetype={pagetype} />
                            </TabPanel>
                            <TabPanel header="Gallery">
                                <AddPhotos eid={eid} status={status} pagetype={pagetype} />
                            </TabPanel>
                            <TabPanel header="Attachments">
                                <AddBrouchers eid={eid} status={status} pagetype={pagetype} />
                            </TabPanel>
                        </TabView>
                        {(staffid.logintype == "staff" && status == "pending") && (
                            <div className="text-end mt-3">
                                <button
                                    onClick={() => setIsVerifyConfirm(true)}
                                    className="btn1"
                                    disabled={confirmLoading}
                                >
                                    {confirmLoading ? (
                                        <ThreeDots
                                            visible={true}
                                            height="15"
                                            width="50"
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

export default WholeMediaDptLand