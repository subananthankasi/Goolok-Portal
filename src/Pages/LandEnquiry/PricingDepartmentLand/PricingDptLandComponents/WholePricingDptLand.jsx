import React, { useRef, useState } from 'react'
import PricingDepartmentLand from './PricingDepartmentLand'
import PaymentInstallmentLand from './PaymentInstallmentLand'
import { pricingConfirmThunk } from '../../../../Redux/Actions/Enquiry/pricingConfirmThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import ConfirmationModal from '../../../../Utils/ConfirmationModal';

const WholePricingDptLand = ({ eid, status, id }) => {
    const staffid = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useRef()
    const [verifyConfirm, setIsVerifyConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)


    const handleConfirm = async () => {
        const payload = {
            enqid: eid,
            id: id
        }
        try {
            setConfirmLoading(true)
            const response = await dispatch(pricingConfirmThunk(payload))
            if (pricingConfirmThunk.fulfilled.match(response)) {
                const message = response.payload.data;

                toast.current.show({ severity: 'success', summary: 'Successfully Submited', detail: ' Success', life: 3000 });
                navigate("/PricingDepartment#Complete");
                setConfirmLoading(false)

            } else if (pricingConfirmThunk.rejected.match(response)) {
                const errorPayload = response?.payload?.reason?.response?.data?.messages?.error

                toast.current.show({ severity: 'error', summary: errorPayload, detail: ' Rejected', life: 3000 });

            }
        }
        catch (error) {
            console.error(error)
            setConfirmLoading(false)
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
            <PricingDepartmentLand eid={eid} status={status} />
            <PaymentInstallmentLand eid={eid} status={status} />


            {(staffid.logintype === "staff" && status === "pending") && (
                <div className="ms-2 text-end mt-4">
                    <a
                        href="#0"
                        onClick={() => setIsVerifyConfirm(true)}
                        className="btn1 me-2"
                        disabled={confirmLoading}
                    >
                        {confirmLoading ? "Processing..." : "Confirm"}
                    </a>
                </div>
            )}

        </>
    )
}

export default WholePricingDptLand