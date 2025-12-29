import React from 'react'
import AdminTicketTele from './AdminTicketTele';
import StaffTicketsTele from './StaffTicketsTele';

const RegistrationTicketTele = () => {
   const staffid = JSON.parse(sessionStorage.getItem("token"));
  return (
    <div>
    {staffid.Login ==="admin" ?(<AdminTicketTele/> ):(<StaffTicketsTele/> )}
    </div>
  )
}

export default RegistrationTicketTele