import React, { useState } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import profile from "../../Assets/images/user-profile.jpg";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./EditModal";
import ModalTypes from "./ModalTypes";
import Accordion from "react-bootstrap/Accordion";
import { Editor } from "primereact/editor";

function View() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [text, setText] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
       <EditModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="page_heading">Ticket Information</h4>
                </div>
                <div className="card-body">
                  <label className="ticket-heading">
                    Vero Molestias Voluptatem Sunt Natus Quo Quidem Sed.
                  </label>
                  <div className="ticket-info d-flex mt-2">
                    <div className="data-ino">
                      <QueryBuilderIcon /> &nbsp;&nbsp; Created At
                      &nbsp;&nbsp;Wed, 15&nbsp;&nbsp; Feb 2017, 07:29
                      AM&nbsp;&nbsp; (7 years ago)
                    </div>
                  </div>
                  <p className="mt-4 ticket-description p-2">
                    Et praesentium beatae ea ullam nisi eos. Animi earum harum
                    quisquam magni voluptas voluptatem veritatis. Ut laudantium
                    inventore qui ipsa. Repellendus voluptatem non nam
                    consequatur sit tempore et. Omnis voluptates est facere
                    labore. Amet quibusdam et soluta delectus. Sint at
                    consequatur facere in et. Deserunt impedit expedita rerum a
                    quibusdam eveniet aliquam. Quis quos veniam aliquam aliquam.
                    Dolore illo sint ut vel. Consequatur consequatur est
                    distinctio voluptas iusto quo. Necessitatibus temporibus eos
                    hic praesentium id in nisi. Cupiditate est enim sed
                    cupiditate repudiandae quia. Et amet quia neque voluptates
                    sed cupiditate libero accusamus. Perspiciatis sit quod eum
                    nesciunt sed. Esse aperiam autem tempora. Aliquam ullam
                    fugit praesentium magnam hic dolor voluptatibus. Quo dolor
                    hic labore labore. Facere id et a inventore ducimus impedit.
                    Est nemo accusamus eius minus magnam quaerat. Maxime esse
                    hic nostrum animi. Consequatur vero iste porro ut quod iste.
                    Expedita nihil non ex qui omnis quasi enim dolor. Aut
                    reprehenderit non velit eaque accusantium culpa non. Ratione
                    nobis provident necessitatibus exercitationem voluptas
                    beatae. Eligendi est magni quisquam voluptas unde quibusdam.
                    Illo possimus magnam saepe et unde et mollitia. Qui dolores
                    tempora reprehenderit error maxime ex et. Nulla est fugit ea
                    labore. Ratione in in ut eos est ut possimus accusantium. Et
                    provident sapiente assumenda minus consectetur. Praesentium
                    deleniti rerum et consectetur. Officiis soluta omnis
                    deserunt voluptate.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <Accordion defaultActiveKey="1">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <EditIcon />
                      &nbsp;&nbsp;&nbsp;Replay Ticket
                    </Accordion.Header>
                    <Accordion.Body>
                    <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '200px' }} />
                    <div className="text-end mt-5">
                          <button className="btn1 light btn-info me-1">Clear</button>
                          <button className="btn1 light btn-danger">Replay ticket</button>
                        </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div className="card mt-5">
                <div className="card-header">
                  <h4 className="page_heading ">Conversations</h4>
                </div>
                <div className="card-body">
                  <div className="d-lg-flex">
                    <img
                      src={profile}
                      className="media-object brround avatar-lg me-3"
                      alt="default"
                    />
                    <div className="d-flex">
                      <div className="media-body">
                        <h4 className="mt-1 mb-1 page_heading ">
                          Adrain Hermann
                          <span className="badge badge-primary-light badge-md ms-2">
                            Manager
                          </span>
                        </h4>
                        <div className="ticket-info d-flex mt-1">
                          <div className="data-ino">
                            <QueryBuilderIcon /> &nbsp;&nbsp; Created At
                            &nbsp;&nbsp;Wed, 15&nbsp;&nbsp; Feb 2017, 07:29
                            AM&nbsp;&nbsp; (7 years ago)
                          </div>
                        </div>
                        <p className="mt-3 ticket-description  ">
                          Et praesentium beatae ea ullam nisi eos. Animi earum
                          harum quisquam magni voluptase. Et praesentium beatae
                          ea ullam nisi eos. Animi earum harum quisquam magni
                          voluptase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="card-body">
                  <div className="d-lg-flex">
                    <img
                      src={profile}
                      className="media-object brround avatar-lg me-3"
                      alt="default"
                    />
                    <div className="d-flex">
                      <div className="media-body">
                        <h4 className="mt-1 mb-1 page_heading ">
                          Adrain Hermann
                          <span className="badge badge-primary-light badge-md ms-2">
                            Manager
                          </span>
                        </h4>
                        <div className="ticket-info d-flex mt-1">
                          <div className="data-ino">
                            <QueryBuilderIcon /> &nbsp;&nbsp; Created At
                            &nbsp;&nbsp;Wed, 15&nbsp;&nbsp; Feb 2017, 07:29
                            AM&nbsp;&nbsp; (7 years ago)
                          </div>
                        </div>
                        <p className="mt-3 ticket-description  ">
                          Et praesentium beatae ea ullam nisi eos. Animi earum
                          harum quisquam magni voluptase. Et praesentium beatae
                          ea ullam nisi eos. Animi earum harum quisquam magni
                          voluptase.
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex">
                    <h4 className="page_heading">Ticket Information</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-lg-12  mb-4">
                    <div className="table-responsive tr-lastchild">
                      <table className="table mb-0 table-information">
                        <tbody>
                          <tr>
                            <td>
                              <span className="w-50">Ticket ID</span>
                            </td>
                            <td>:</td>
                            <td>
                              <span className="font-weight-semibold">
                                #SP-11
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="w-50">Category</span>
                            </td>
                            <td>:</td>
                            <td>
                              <span className="font-weight-semibold">nisi</span>
                              <a
                                href="javascript:void(0)"
                                data-id="SP-11"
                                className="p-1   rounded border border-primary br-7 text-white bg-primary ms-2"
                                onClick={() => openModal(ModalTypes.Category)}
                              >
                                <EditIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="w-50">Priority</span>
                            </td>
                            <td>:</td>
                            <td id="priorityid">
                              <span className="badge badge-danger-light">
                                High
                              </span>
                              <a
                                href="javascript:void(0)"
                                id="priority"
                                className="p-1 border rounded border-primary br-7 text-white bg-primary ms-2"
                                onClick={() => openModal(ModalTypes.Priority)}
                              >
                                <EditIcon />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="w-50">Open Date</span>
                            </td>
                            <td>:</td>
                            <td>
                              <span className="font-weight-semibold">
                                20 Apr, 2017
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="w-50">Status</span>
                            </td>
                            <td>:</td>
                            <td>
                              <span className="badge badge-burnt-orange">
                                New
                              </span>
                              <a
                                href="javascript:void(0)"
                                id="priority"
                                className="p-1 border rounded border-primary br-7 text-white bg-primary ms-2"
                                onClick={() => openModal(ModalTypes.Status)}
                              >
                                <EditIcon />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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

export default View;
