import React, { useState } from "react";
import { Editor } from "primereact/editor"; 


function TicketCreate() {
    const [text, setText] = useState('');
  return (
    <>
       <section className="section">
        <div className="container" style={{maxWidth:'800px'}}>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <div>
                      <h4 className="page_heading">New Ticket Creation</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12 ">
                    <div className="row">
                      <div className="col-md-12 ">
                        <div className="row">
                          <div className="col-sm-12 col-lg-3">
                            <label htmlFor="lastName" className="form-label">
                              Subject
                            </label>
                          </div>
                          <div className="col-sm-12 col-lg-8 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-lg-3">
                            <label htmlFor="lastName" className="form-label">
                              Department
                            </label>
                          </div>
                          <div className="col-sm-12 col-lg-8 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-lg-3">
                            <label htmlFor="lastName" className="form-label">
                              Category
                            </label>
                          </div>
                          <div className="col-sm-12 col-lg-8 mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-lg-3">
                            <label htmlFor="lastName" className="form-label">
                              Description
                            </label>
                          </div>
                          <div className="col-sm-12 col-lg-8 mb-3">
                          <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '200px' }} />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-lg-3">
                            <label htmlFor="lastName" className="form-label">
                              Attachment 1
                            </label>
                          </div>
                          <div className="col-sm-12 col-lg-8 mb-3">
                            <input
                              type="file"
                              className="form-control"
                              id="lastName"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12 col-lg-3">
                            <label htmlFor="lastName" className="form-label">
                              Attachment 2
                            </label>
                          </div>
                          <div className="col-sm-12 col-lg-8 mb-3">
                            <input
                              type="file"
                              className="form-control"
                              id="lastName"
                            />
                          </div>
                        </div>

                        <div className="text-end">
                          <button className="btn1 me-1">Clear</button>
                          <button className="btn1">Create</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </>
  );
}

export default TicketCreate;
