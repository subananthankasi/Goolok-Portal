import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";  
import "react-toastify/dist/ReactToastify.css"; 
import Topbar from "../../../Components/topbar/topbar";
import Footerbar from "../../../Components/footer/footer";

function LandPartPayment() {
 
  return (
    <>
      <Topbar /> 
      <section className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header mb-3">
      <h4 className="page_heading">Land Part Payment</h4>
                  
                </div>
                <div className="card-body p-3">
           
 
                    <div className="row">
                    <div>
      <h4 className="page_heading ticket-heading">Land Details</h4>

      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Land Name</label>
              </div>
              <div className="col-5">
                <input type="text" className="form-control" id="lastName" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Branch</label>
              </div>
              <div className="col-5">
              <select id="inputState" className="form-select">
                  <option value="Enable">Branch 1</option>
                  <option value="Disable">Branch 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
         
      </div>

      
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Trans Type</label>
              </div>
              <div className="col-5">
                <select id="inputState" className="form-select">
                  <option value="Enable">Type 1</option>
                  <option value="Disable">Type 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
     
      </div>
  
      <hr className="mt-5"/>

      <h4 className="page_heading ticket-heading">Payment Details</h4>

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Payment From</label>
              </div>
              <div className="col-5">
               <select id="inputState" className="form-select">
                  <option value="Enable">Indian Overseas Bank</option>
                  <option value="Disable">State Bank of India</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              {/* <div className="col-4">
                <label className="form-label">Date</label>
              </div> */}
              <div className="col-8">
                <input type="date" className="form-control" id="lastName" /> 
              </div>
            </div>
          </div>
        </div>
  
      </div>

      <div className="row">
      <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Cheque Name</label>
              </div>
              <div className="col-5">
                <input type="text" className="form-control" id="lastName"/> 
              </div>
            </div>
          </div>
        </div>
        </div>

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Amount</label>
              </div>
              <div className="col-5">
                <input type="number" className="form-control" id="lastName" value="0.00" /> 
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Discount</label>
              </div>
              <div className="col-5">
                <input type="number" className="form-control" id="lastName" value="0.00"/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Balance</label>
              </div>
              <div className="col-5">
                <input type="number" className="form-control" id="lastName" value="0.00"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Payment Mode</label>
              </div>
              <div className="col-5">
              <select id="inputState" className="form-select">
                  <option value="Enable">Mode 1</option>
                  <option value="Disable">Mode 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Bank Name</label>
              </div>
              <div className="col-5">
                <select id="inputState" className="form-select">
                  <option value="Enable">Indian Overseas Bank</option>
                  <option value="Disable">State Bank of India</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Bank Branch</label>
              </div>
              <div className="col-5">
                <input type="text" className="form-control" id="lastName" />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">No.</label>
              </div>
              <div className="col-5">
                <input type="text" className="form-control" id="lastName" /> 
              </div>
            </div>
          </div>
        </div>

 
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Date</label>
              </div>
              <div className="col-5">
                <input type="date" className="form-control" id="lastName" /> 
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-4">
          <div className="form-group mt-3">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Narration</label>
              </div>
              <div className="col-5">
                <textarea type="text" className="form-control" id="lastName" /> 
              </div>
            </div>
          </div>
        </div>
  
      </div>

    </div>

                      <div className="text-end py-3 px-3">
                        <button className="btn1 me-1" >
                          Clear
                        </button>
                        <button className="btn1"  >
                          Submit
                        </button>
                      </div>
                    </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footerbar />
    </>
  );
}

export default LandPartPayment;
