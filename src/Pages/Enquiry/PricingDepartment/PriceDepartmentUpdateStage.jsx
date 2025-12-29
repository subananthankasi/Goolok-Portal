import React from 'react'
import PricingDepartment from '../Reusable/PricingDepartmentResubale/PricingDepartment';
import { useParams } from 'react-router-dom';

const PriceDepartment = (props) => {
  const {  id } = useParams();

  return (
    <>
      <div className="col-12 mt-4">
        <div className="card shadow border-0">
          <div className="card shadow border-0 p-4">
            <PricingDepartment eid={props.eid} status = {props.status} id = {id} pagetype ={props.pagetype} discountPage = {props.discountPage} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PriceDepartment