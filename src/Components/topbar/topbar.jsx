import '../topbar/topbar.css'
import logo from '../../Assets/images/logo.png'
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Topbar(){

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
 
  return(
  <>
  <nav className="navbar navbar-expand-lg " style={{position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: '#2f4f4f '}}>
  <div className="container-fluid">
    <Link to="/dashboard"><img src={logo} className="mx-3" width="170px" /></Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse mx-4" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto "> 
        <li className="nav-item ">
        <Link to="/dashboard">  <a className="nav-link  text-white" href="" role="button"  >
              Dashboard 
          </a></Link> 
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Master Page
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/property_type" className="dropdown-item"> Property Type</Link> </li> 
            <li><Link to="/property_documnent" className="dropdown-item">Property Documnent</Link> </li>  
            <li><Link to="/SRO_Details" className="dropdown-item">SRO Details</Link> </li>  
            <li><Link to="/state" className="dropdown-item">State</Link> </li>  
            <li><Link to="/district_city" className="dropdown-item">District/City</Link> </li>  
            <li><Link to="/taluk" className="dropdown-item">Taluk</Link> </li>  
            <li><Link to="/village" className="dropdown-item">Village</Link> </li>  
            <li><Link to="/pincode" className="dropdown-item">Pincode</Link></li>  
            <li><Link to="/branch" className="dropdown-item">Branch</Link></li>  
            <li><Link to="/group_type" className="dropdown-item">Group Type</Link></li>  
            <li><a className="dropdown-item" href="#">Staff Credentials</a></li>  
            <li className="nav-item dropdown"> 
             <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Staff</a>
                <ul className="dropdown-menu">
                <li><Link to="/new_staff" className="dropdown-item">New Staff</Link></li> 
            <li><Link to="/staff_report" className="dropdown-item">Staff Report</Link></li>  
            <li><Link to="/disable_staff" className="dropdown-item">Disabled Staff</Link></li>  
               </ul>
             </li> 
            </li>

            <li className="nav-item dropdown"> 
             <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Vendor</a>
                <ul className="dropdown-menu">
                  <li><Link to="/new_vendors" className="dropdown-item">New Vendor</Link></li>  
                  <li><Link to="/vendor_report" className="dropdown-item">Vendor Report</Link></li>  
                   <li><Link to="/disable_vendor_report" className="dropdown-item">Disabled Report</Link></li>  
               </ul>
             </li> 
            </li>
            <li><Link to="/unit" className="dropdown-item">Unit</Link></li>  
          </ul>
        </li>
         

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Project
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/live_property" className="dropdown-item" href="#">Live property</Link></li>    
            <li><Link to="/closed_property" className="dropdown-item" href="#">Closed Property </Link></li>    
            <li><Link to="/cancel_property" className="dropdown-item" href="#">Cancel Property </Link></li>
            {/* <li><Link to="/new_project" className="dropdown-item">New Project</Link></li>  */}
            {/* <li><Link to="/project_list" className="dropdown-item">Project List</Link></li>  
            <li><Link to="/block_managements" className="dropdown-item">Block Management</Link></li>   
            <li><Link to="/area_management" className="dropdown-item">Area Management</Link></li>    
            <li className="nav-item dropdown"> 
             <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Land Purchase</a>
                <ul className="dropdown-menu">
                  <li><Link to="/newLand_purchase" className="dropdown-item">New Land Purchase</Link></li>   
                  <li><Link to="/landPart_payment" className="dropdown-item">Land Part Payment</Link></li>   
                  <li><Link to="/land_purchase_list" className="dropdown-item">Land Purchase List</Link></li>  
               </ul>
             </li> 
            </li>  */}
          </ul>
        </li>

 
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Plot
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/block_management" className="dropdown-item">Block Mangement</Link></li>   
            <li><Link to="/area_managements" className="dropdown-item">Area Management</Link></li>  
            <li><Link to="/cancel_plot" className="dropdown-item">Cancel Plot</Link></li>   
            <li><Link to="/wallet" className="dropdown-item">Wallet</Link></li>  
{/* 
            <li><Link to="/plot_cancellation" className="dropdown-item">Plot Cancellation</Link></li>   
            <li className="nav-item dropdown"> 
             <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Cancel Plot Refund</a>
                <ul className="dropdown-menu">
                  <li><Link to="/refund_amount_approve" className="dropdown-item">Refund Amount Approve</Link></li>   
                  <li><Link to="/cancel_plot_refund_approval" className="dropdown-item">Cancel Plot Refund Approval</Link></li>   
                  <li><Link to="/refund_cash_issue" className="dropdown-item">Refund Cash Issue</Link></li>  
                  <li><Link to="/refund_cheque_issue" className="dropdown-item">Refund Cheque Issue</Link></li>  
               </ul>
             </li> 
            </li>
            <li><Link to="/plot_rebooking" className="dropdown-item">Plot Rebooking</Link></li>   
            <li><Link to="/edit_plot" className="dropdown-item">Edit Plot Sq.Ft</Link></li>    */}
          </ul>
        </li>

        <li className="nav-item  dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Property Management
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/new_property" className="dropdown-item">New Property</Link></li>    
            <li><Link to="/pending_property" className="dropdown-item">Pending Property</Link></li> 
            <li><Link to="/field_survey_report" className="dropdown-item">Field Survey Department</Link></li>    
            <li><Link to="/LandOwner_Agreement_Report" className="dropdown-item">Land Owner Agreement</Link></li>  
            <li><Link to="/admin_department_report" className="dropdown-item" href="#">Admin Department</Link></li>       
            <li><Link to="/media_department_report"className="dropdown-item" href="#">Media Department </Link></li>        
            <li><Link to="/Content_writing_report" className="dropdown-item" href="#">Content writing Department </Link></li>       
            <li><Link to="/Awaiting_Confirmation" className="dropdown-item" href="#">Awaiting Confirmation </Link></li>    
            <li><a className="dropdown-item" href="#">Report</a></li>    
            <li><a className="dropdown-item" href="#">Property Oneliner</a></li>    
          </ul>
        </li>
        

        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          CRM
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/enquiry" className="dropdown-item">New Enquiry</Link></li>   
            <li><Link to="/enquiry_funnel" className="dropdown-item">Enquiry Funnel</Link></li>    
            <li><Link to="/notification" className="dropdown-item">Notification</Link></li>  
            <li><Link to="/calendar" className="dropdown-item">Calendar</Link></li>   
            <li><Link to="/success" className="dropdown-item">Success</Link></li>   
            <li><Link to="/dropped" className="dropdown-item">Dropped</Link></li>      
          </ul>
        </li> */}
        <li className="nav-item  dropdown">
         <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Customer 
          </a>
          <ul className="dropdown-menu bg-white"> 
            <li><Link to="/Customer" className="dropdown-item" href="#">Customer</Link></li> 
            <li><Link to="/CustomerReport" className="dropdown-item" href="#"> Report</Link></li> 
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Accounts
          </a>

          <ul className="dropdown-menu bg-white">
            <li><Link to="/success_payment" className="dropdown-item">Success Payment</Link></li>   
            <li><Link to="/failure_payment" className="dropdown-item">Failure Payment</Link></li>   
            <li><Link to="/receipt" className="dropdown-item">Receipt</Link></li>   
            <li><Link to="/credit_notes" className="dropdown-item">Credit Notes</Link></li>   
            <li><Link to="/debit_notes" className="dropdown-item">Debit Notes</Link></li>   
            <li><Link to="/payments" className="dropdown-item">Payments</Link></li>   
            <li><Link to="/ledger" className="dropdown-item">Ledger</Link></li>    
            <li><Link to="/daybook" className="dropdown-item">Day Book</Link></li>    
            <li><Link to="/cashbook" className="dropdown-item">Cash Book</Link></li>    
            <li><Link to="/bankbook" className="dropdown-item">Bank Book</Link></li>      
            {/* <li className="nav-item dropdown"> 
             <li className="dropdown-submenu"><a className="dropdown-item dropdown-toggle" href="#">Online Payment</a>
                <ul className="dropdown-menu">
                  <li><Link to="/success_payments" className="dropdown-item">Success Payment</Link></li>   
                  <li><Link to="/failed_payments" className="dropdown-item">Failed Payment</Link></li>   
                  <li><Link to="/cancel_payments" className="dropdown-item">Cancel Payment</Link></li>  
               </ul>
             </li> 
            </li>
            <li><a className="dropdown-item" href="#">Invoices </a></li>  */} 
            {/* <li><a className="dropdown-item" href="#">Trial Balance </a></li>   
            <li><a className="dropdown-item" href="#">Profit or Loss</a></li>     */}
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Payments
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/pending_payment" className="dropdown-item">Pending Payment</Link></li>   
            <li><Link to="/fully_paid" className="dropdown-item">Fully Paid</Link></li>   
            <li><Link to="/cancel_payment" className="dropdown-item">Cancel Payment</Link></li>   

          </ul>
        </li>
        {/* billing */}
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Billing
          </a>
          <ul className="dropdown-menu bg-white">
            <li><Link to="/ServiceInvoice" className="dropdown-item">Service Invoice</Link></li>   
            <li><Link to="/PendingInvoice" className="dropdown-item">Pending Invoice</Link></li>   
            <li><Link to="/SuccessInvoice" className="dropdown-item">Success Invoice</Link></li>    
            <li><Link to="/Category" className="dropdown-item">Category</Link></li>   
            <li><Link to="/SubCategory" className="dropdown-item">SubCategory</Link></li>   

          </ul>
        </li>

        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Help Desk 
          </a> 
          <ul className="dropdown-menu bg-white"> 
            <li><Link to="/create_ticket" className="dropdown-item" href="#">Create Tickets </Link></li>   
            <li><Link to="/recent_ticket" className="dropdown-item" href="#">Recent Tickets </Link></li>   
            <li><Link to="/total_ticket" className="dropdown-item" href="#">Total Tickets </Link></li>   
            <li><Link to="/active_ticket" className="dropdown-item" href="#">Active Tickets </Link></li>   
            <li><Link to="/closed_ticket" className="dropdown-item" href="#">Closed Tickets </Link></li>   
            <li><Link to="/hold_ticket" className="dropdown-item" href="#">On-Hold Tickets </Link></li>   
            <li><Link to="/overdue_ticket" className="dropdown-item" href="#">Overdue Tickets </Link></li>   
            <li><Link to="/assigned_ticket" className="dropdown-item" href="#">Assigned Tickets</Link></li>    
          </ul>
        </li>

 
      </ul>

      <form className="d-flex list-unstyled" role="search">
        <li className="nav-item dropdown ">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul className="logout dropdown-menu">
            <li><a className="dropdown-item  " href="#" onClick={handleLogout}>Log out</a></li>
          </ul>
        </li>
      </form>

    </div>
  </div>
</nav>

      </>
);
}
export default Topbar;