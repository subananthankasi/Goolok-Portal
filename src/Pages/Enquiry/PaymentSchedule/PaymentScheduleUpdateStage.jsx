import React from 'react'
import PaymentScheduleResuble from '../Reusable/PaymentScheduleReusable/PaymentScheduleResuble'

const PaymentScheduleUpdateStage = ({eid,status,pagetype}) => {
  return (
   <>
     <div className="col-12 mt-4">
            <div className="card shadow border-0">
              <div className="card shadow border-0 p-4">
                <PaymentScheduleResuble eid = {eid} status = {status} pagetype = {pagetype} />
              </div>
            </div>
          </div>
   </>
  )
}

export default PaymentScheduleUpdateStage