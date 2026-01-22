import { useRef, useState } from 'react'
import Description from './UpdateStageComponents/Description';
import { useNavigate } from 'react-router-dom';
import TagsCW from './UpdateStageComponents/TagsCW';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";
import { Toast } from 'primereact/toast';
import { contentDptConfirmThunk } from '../../../Redux/Actions/Enquiry/ContentWritingThunk/ContentDptConfirmThunk';
import Localities from './UpdateStageComponents/Localities';
import ConfirmationModal from '../../../Utils/ConfirmationModal';


const ContentWritingUpdateStage = ({ eid, id, status }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const staffid = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch()
  const toast = useRef()


  const [verifyConfirm, setIsVerifyConfirm] = useState(false);
  const confirmLoading = useSelector((state) => state.contentDptConfirmData?.loading)

  const handleConfirm = async () => {
    const payload = {
      enqid: eid,
      id: id
    }

    try {
      const response = await dispatch(contentDptConfirmThunk(payload))
      if (contentDptConfirmThunk.fulfilled.match(response)) {
        toast.current.show({ severity: 'success', summary: 'Successfully Submited', detail: ' Success', life: 3000 });
        navigate("/contentWriting#Complete");

      } else if (contentDptConfirmThunk.rejected.match(response)) {
        const errorPayload = response.payload.reason?.response?.data?.messages?.error

        toast.current.show({ severity: 'error', summary: errorPayload, detail: ' Rejected', life: 3000 });

      }
    }
    catch (error) {
      console.error(error)
    }
  }

  return (

    <section className="mt-3">
      <Toast ref={toast} />
      <ConfirmationModal
        isOpen={verifyConfirm}
        closeModal={() => setIsVerifyConfirm(false)}
        onConfirm={handleConfirm}
        message={"Are you sure this has been verified?"}
        loading={confirmLoading}
      />
      <div className="container-fluid p-0">
        <div className="row">

          <div className="col-12">
            <div className="card">
              <div className="card-heder mb-3 p-3">
                <h6>Content Writing</h6>
                <hr />
                <div className="d-flex bottom1">
                  <div>
                    <nav className="nav">
                      <a
                        className={`nav-link link1 ${step === 1 ? "active1" : ""
                          }`}
                        href="#"
                        onClick={() => setStep(1)}
                      >
                        Description & Features
                      </a>
                      <a
                        className={`nav-link link1 ${step === 2 ? "active1" : ""
                          }`}
                        href="#"
                        onClick={() => setStep(2)}
                      >
                        Localities
                      </a>
                      <a
                        className={`nav-link link1 ${step === 3 ? "active1" : ""
                          }`}
                        href="#"
                        onClick={() => setStep(3)}
                      >
                        Tags
                      </a>


                    </nav>
                  </div>


                </div>
              </div>
              <div className="card-body p-3">
                {step === 1 && (
                  <div className="row">
                    <Description eid={eid} id={id} status={status} />

                  </div>
                )}

                {step === 2 && (
                  <div className="row">
                    <Localities eid={eid} id={id} status={status} />
                  </div>
                )}
                {step === 3 && (
                  <div className="row">
                    <TagsCW eid={eid} id={id} status={status} />
                  </div>
                )}


              </div>

            </div>
          </div>

        </div>
      </div>

      {(staffid.logintype == "staff" && status == "pending") && (
        <div className="text-end mt-3 mb-3">
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
    </section>
  )
}

export default ContentWritingUpdateStage