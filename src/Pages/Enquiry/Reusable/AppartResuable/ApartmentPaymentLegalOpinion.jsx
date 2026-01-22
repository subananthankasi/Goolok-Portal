import  { useEffect, useState, useRef } from "react";
import { Table } from 'rsuite';
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";
import customStyle from "../../../../Utils/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import jsPDF from "jspdf";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from "@mui/icons-material/Visibility";
import html2canvas from "html2canvas";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { fetchCategory } from "../../../../Redux/Actions/MasterPage/CategoryAction";
import { fetchSubCategory } from "../../../../Redux/Actions/MasterPage/SubCategoryAction";
import logos from "../../../../Assets/images/Goolok Final Logo.png"


export const ApartmentPaymentLegalOpinion = ({ eid, id, status,pagetype }) => {

    const staffid = JSON.parse(localStorage.getItem("token"));
    const contentRef = useRef();
    const [invoiceData, setInvoiceData] = useState([]);
  
    const columns = [
      {
        name: "S.no",
        cell: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Invoice date",
        selector: (row) => row.invoice_date,
        sortable: true,
      },
      {
        name: "Invoice Number",
        selector: (row) => row.invoice_id,
        sortable: true,
      },
      {
        name: "Particular",
        selector: (row) => row.particular,
        sortable: true,
        wrap: true,
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: "Payment status",
        cell: (row) => (
          <>
            <button
              type="button"
              className={`badge rounded-pill btnhover btn p-2 ${row.status == 'pending' ? "bg-danger" : "bg-success"} `}
              style={{ width: "60px" }}
            >
              {row.status}
            </button>
          </>
        ),
        sortable: true,
      },
      // {
      //   name: "Download",
      //   cell: (row) => (
      //     <>
      //       <button
      //         type="button"
      //         className="btn btn-outline-primary delete"
      //         onClick={() => downloadPdf(row.id)}
  
      //       >
      //         <FileDownloadIcon />
      //       </button>
      //     </>
      //   ),
      //   sortable: true,
      // },
      {
        name: "View",
        cell: (row) => (
          <>
            <button
              type="button"
              className="btn-primary btn btn-sm"
              onClick={() => setIsModalViewInvoice(true)}
            >
              <VisibilityIcon />
            </button>
          </>
        ),
        sortable: true,
      },
      ...(staffid.logintype == "staff" && (status === "pending" || status === "complete")) &&  pagetype !== "reminder" ? [
        {
          name: "Edit",
          cell: (row) => (
            <>
              <button
                type="button"
                className="btn-info btn btn-sm"
                onClick={() => setIsModalInvoice(true)}
              >
                <EditIcon />
              </button>
            </>
          ),
          sortable: true,
        }] : [],
      {
        name: "Invoice",
        cell: (row) => (
          <>
            <button type="button" className="btn1 btn-sm" onClick={() => downloadPdf(row.id)}>
              <FileDownloadIcon />
            </button>
          </>
        ),
        sortable: true,
      },
    ];
  
    const downloadPdf = () => {

      const input = contentRef.current;
  
      input.style.display = "block";
  
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("invoice.pdf");
      });
  
  
      input.style.display = "none";
    };
  
    const calculateTotals = () => {
      const subtotal = [invoiceData]?.reduce((acc, item) => {
        const chargesTotal = item.amount
  
        return acc + (chargesTotal || 0);
      }, 0);
  
      const gst = subtotal * 0;
      // const total = subtotal + gst;
      const total = subtotal;
  
  
  
      const currencyFormatter = new Intl.NumberFormat("en-US", {
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  
      return {
        subtotal: currencyFormatter.format(subtotal),
        gst: currencyFormatter.format(gst),
        total: currencyFormatter.format(total),
      };
    };
    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/invoicedpt/${eid}`)
        setData(response.data)
  
      } catch (error) {
  
      } finally {
        setloading(false)
      }
    }

  
  
    useEffect(() => {
      fetchData()
    }, [])
  
  
  
  
    // fetch edit data 
    const [editAndViewData, setEditAndViewData] = useState({})
    const fetchEditandView = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/invoicedpt/${eid}/edit`)
        setEditAndViewData(response.data)
        setInvoiceData(response.data)
        // setInvoiceData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
  
      }
    }
    useEffect(() => {
      fetchEditandView()
    }, [])
  
    //  add more
    const [isModalInvoice, setIsModalInvoice] = useState(false);
    const [isModalViewInvoice, setIsModalViewInvoice] = useState(false);
  
    const [visible, setVisible] = useState(false);
  
    const { Column, HeaderCell, Cell } = Table;
  
    return (
      <>
        <AddInvoice
          isOpen={isModalInvoice}
          closeModal={() => setIsModalInvoice(false)}
          id={id}
          eid={eid}
          fetchData={fetchData}
          editAndViewData={editAndViewData}
          fetchEditandView={fetchEditandView}
        />
        <ViewInvoice
          isOpen={isModalViewInvoice}
          closeModal={() => setIsModalViewInvoice(false)}
          editAndViewData={editAndViewData}
        />
        {!loading ?
          <div className="col-12 mt-4">
            <div className="card shadow border-0">
              <div className="card shadow border-0 p-4">
                <div className="d-flex justify-content-between">
                  <h6>Payment for Legal opinion and Field survey</h6>
                  {/* <div className="ms-2">
                  <a
                    href="javascript:void(0)"
                    onClick={() => setIsModalInvoice(true)}
                    className="btn1 me-2"
                  >
                    + Add Invoice
                  </a>
                </div> */}
                </div>
  
                <hr />
  
  
                {!data.invoice_id && staffid.logintype == "staff" ?
                  <div className="container" style={{ maxWidth: "350px" }}>
                    <div className="p-4 text-center" >
                      <a
                        href="#0"
                        onClick={() => setIsModalInvoice(true)}
                        className="btn1"
                      >
                        + Add Invoice
                      </a>
                    </div>
                  </div> :
                  <DataTable
                    persistTableHead={true}
                    columns={columns}
                    data={[data]}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                  />
                }
  
  
  
  
                <div className="mt-3"></div>
              </div>
            </div>
          </div>
          : ""}
        {/* <Dialog visible={visible} style={{ width: '62rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Add Invoice" modal className="p-fluid" onHide={() => setVisible(false)} >
          <>
            <style>{styles}</style>
            <div className="d-flex justify-content-end">
              <button
                className="btn1"
                onClick={() => {
                  setData([
                    { id: data.length + 1, catogory: '', subcategory: '', description: '', amount: '', status: 'EDIT' },
                    ...data
                  ]);
                }}
              >
                Add Invoice
              </button>
            </div>
  
            <hr />
            <Table height={420} data={data}>
              <Column flexGrow={1}>
                <HeaderCell>Category</HeaderCell>
                <EditableCell
                  dataKey="catogory"
                  dataType="select"
                  // onChange={handleChange}
                  onChange={(id, key, value) => {
                    handleCategory(value);
                    handleChange(id, key, value);
                  }}
                  onEdit={handleEdit}
                  options={categoryOptions}
                />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>sub Category</HeaderCell>
                <EditableCell
                  dataKey="subcategory"
                  dataType="select"
                  onChange={handleChange}
                  onEdit={handleEdit}
                  options={subCategoryOptions}
                />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>Description</HeaderCell>
                <EditableCell
                  dataKey="description"
                  dataType="string"
                  onChange={handleChange}
                  onEdit={handleEdit}
                />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>Amount</HeaderCell>
                <EditableCell
                  dataKey="amount"
                  dataType="string"
                  onChange={handleChange}
                  onEdit={handleEdit}
                />
              </Column>
              <Column width={100}>
                <HeaderCell>Action</HeaderCell>
                <ActionCell dataKey="id" onEdit={handleEdit} onRemove={handleRemove} />
              </Column>
            </Table>
  
          </>
        </Dialog> */}
  
        <article className="p-5" ref={contentRef} style={{ background: "#fff", display: "none" }} >
          <h1 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h1>
          <hr />
          <div className="d-flex justify-content-between ">
            <div className="mt-5 mb-5">
              <img src={logos} alt="goolok" style={{ width: "150px", height: "50px" }} />
              <nav className="header--logo mt-3">
                <div className="header--logo-text">Goolok Pvt ltd</div>
                <div className="logo--address">
                  2nd Floor, 129, <br />
                  <strong>Nungambakkam, Chennai, </strong>
                  <br />
                  <strong>Tamil Nadu 600034</strong>
                </div>
              </nav>
            </div>
            {[invoiceData].map((item) => {
              return (
                <div className="mt-5 mb-5">
                  <p className="p-0 m-0"><b>Invoice no : </b> {item.invoice_id}  </p>
                  <p className="p-0 m-0"><b> Name: </b> {item.customer}  </p>
                  <hr />
                 <div className="mt-1">
                  <h6 className="p-0">Customer Details :</h6>
                 <p className="p-0 m-0"><b> Date:</b> {item.invoice_date} </p>
                  <p className="p-0 m-0"><b>  Email:</b>{item.email_id} </p>
                  <p className="p-0 m-0"><b>  Mobile:</b>{item.mobile} </p>
                 </div>
                  
                </div>
              )
            })}
  
          </div>
          <section className="line-items  ">
            <table className="items--table w-100 mt-5 p-2 table-bordered">
              <thead className="p-2">
                <tr className="p-3">
                  <th className="p-2 text-center">S.NO</th>
                  <th className='text-center'>Qty</th>
                  <th className='text-center'>Description</th>
                  <th className='text-center'> Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.quantity?.map((item, index) => (
                  <>
                    <tr className="p-3">
                      <td className="p-2 text-center"> {index + 1} </td>
                      <td className='text-center'>1</td>
                      <td className='text-center'>{item.remark} </td>
                      <td className='text-center'>₹ {item.amount} </td>
                    </tr>
                  </>
                ))}
  
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" className='text-end p-2'>Sub Total</td>
                  <td colSpan="2" className='text-center'>{calculateTotals().subtotal} </td>
                </tr>
                <tr>
                  <td colspan="3" className='text-end p-2'> GST(0%)</td>
                  <td colSpan="2" className='text-center'>0.00 </td>
                </tr>
                <tr>
                  <td colspan="3" className='text-end p-2' style={{ fontWeight: "600" }}>Total</td>
                  <td colSpan="2" className='text-center' style={{ fontWeight: "600" }}>₹ {calculateTotals().total} </td>
                </tr>
  
              </tfoot>
            </table>
            <div className="mt-5 mb-5 w-50">
              <h6 className="fw-bold">Terms & Conditions</h6>
              <p>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
            </div>
            <div className="mt-5">
              <h4 className="text-center mt-5">Thank You For Your Bussiness ! </h4>
            </div>
          </section>
  
        </article>
      </>
    );
  };
  
  
  //Add invoice
  const AddInvoice = ({ isOpen, closeModal, eid, id, fetchData, editAndViewData, fetchEditandView }) => {
  
  
    // table column 
    const columns = [
      {
        name: "S.no",
        cell: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.cname,
        sortable: true,
      },
      {
        name: "SubCategory",
        selector: (row) => row.subname,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.remark,
        sortable: true,
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: "Action",
        cell: (row, index) => (
          <div className="d-flex">
            <button
              className="btn btn-outline-danger delete"
              data-tooltip-id="delete"
              onClick={() => handleDelete(index, row.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        ),
        sortable: true,
      },
    ];
  
    // category
    const [selectedCat, setSelectedCat] = useState({});
  
    const handleCategory = (selectedOption) => {
      setSelectedSubCat(null);
      setSelectedCat(selectedOption);
    };
  
    const CategoryData = useSelector((state) => state.Category.CategoryData);
    const dispatch = useDispatch();
    useEffect(() => {
      if (isOpen) {
        dispatch(fetchCategory());
      }
    }, [isOpen]);
  
    const options = CategoryData.map((data) => ({
      value: data.id,
      label: data.category,
    }));

  
    // subcategory
    const [selectedSubCat, setSelectedSubCat] = useState({});
    const handleSubCategory = (selectedOption) => {
      setSelectedSubCat(selectedOption);
    };
    const SubCategoryData = useSelector(
      (state) => state.SubCategory.SubCategoryData
    );
  
    useEffect(() => {
      if (isOpen) {
        dispatch(fetchSubCategory());
      }
    }, [isOpen]);
    const filterData = SubCategoryData?.filter(
      (data) => data.category_id === selectedCat?.value
    );
    const optionsSub = filterData.map((data) => ({
      value: data.id,
      label: data.subcategory,
    }));
  
  
  
  
  
    // insert over all data
    const [formData, setFormData] = useState({
      invoiceid: "",
      total: "",
      invoicedate: "",
      id: "",
      particular: "",
      quantity: [],
    });
  
    // multiple add data 
    const [quantityData, setQuantityData] = useState({
      category: "",
      subcategory: "",
      remark: "",
      amount: "",
    });
  
    // data store in state
    const [data, setData] = useState([]);
    const totalAmount = data.reduce((sum, item) => sum + Number(item?.amount), 0);
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setQuantityData({ ...quantityData, [name]: value });
    };
  
  
  
  
    // default value 
    useEffect(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: id,
        invoiceid: editAndViewData?.invoice_id ? editAndViewData.invoice_id : `INV${id?.toString().padStart(4, "1000")}`,
        invoicedate: editAndViewData?.invoice_date ? editAndViewData.invoice_date : new Date().toISOString().substring(0, 10),
        particular: editAndViewData?.particular || "",
      }));
    }, [id, editAndViewData]);
  
  
  
  
    //  multi value update 
    // useEffect(() => {
  
    //   if (editAndViewData?.quantity?.length) {
    //     setData(() => editAndViewData.quantity);
    //   }
    //   setQuantityData({
    //     ...quantityData,
    //     category: selectedCat ? selectedCat.value : "",
    //     subcategory: selectedSubCat ? selectedSubCat.value : "",
    //     cname: selectedCat ? selectedCat.label : "",
    //     subname: selectedSubCat ? selectedSubCat.label : "",
    //   });
    // }, [selectedCat, selectedSubCat, editAndViewData]);
  
    useEffect(() => {
      if (editAndViewData?.quantity?.length) {
        setData(() => editAndViewData.quantity);
      }
    }, [editAndViewData]);
  
    useEffect(() => {
      setQuantityData({
        ...quantityData,
        category: selectedCat ? selectedCat.value : "",
        subcategory: selectedSubCat ? selectedSubCat.value : "",
        cname: selectedCat ? selectedCat.label : "",
        subname: selectedSubCat ? selectedSubCat.label : "",
      });
    }, [selectedCat, selectedSubCat]);

  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const newErrors = {};
  
      //  if (!quantityData.category) newErrors.category = "Please fill out this field.";
  
      if (!quantityData.category) newErrors.category = "Category is required.";
      if (!quantityData.subcategory)
        newErrors.subcategory = "Subcategory is required.";
      if (!quantityData.remark.trim()) {
        newErrors.remark = "Remark is required.";
      } else if (quantityData.remark.trim().length < 5) {
        newErrors.remark = "Remark should be at least 5 characters long.";
      }
      if (!quantityData.amount.trim()) {
        newErrors.amount = "Amount is required.";
      } else if (isNaN(quantityData.amount) || Number(quantityData.amount) <= 0) {
        newErrors.amount = "Amount must be a valid number greater than zero.";
      }
  
      setError(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }
  
      const newEntry = {
        ...quantityData,
        // id: null,
        enqid: eid,
        invoiceid: id,
        sno: data.length + 1,
      };
      setData((prevArray) => [...prevArray, newEntry]);
      setQuantityData({
        ...quantityData,
        remark: "",
        amount: "",
      });
    };
  
    const [deletedIds, setDeletedIds] = useState([]);
    // delete the row  form table 
    const handleDelete = async (deleteIndex, id) => {
  
      if (id) {
        try {
          // await axios.delete(`${API_BASE_URL}/invoicedpt/${id}`)
          setData((prevData) => prevData.filter((_, index) => index !== deleteIndex));
          Toast({ message: "Successfully deleted", type: "success" });
        } catch (error) {
          Toast({ message: "Error to delete! try again", type: "error" });
        }
      } else {
        setData((prevData) => prevData.filter((_, index) => index !== deleteIndex));
      }
    };


    // add multi quantity value in main data 
    useEffect(() => {
      setFormData({
        ...formData,
        quantity: data,
        total: totalAmount,
      });
    }, [data, totalAmount]);
  
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      const newErrors = {};
  
      if (formData.particular.trim() === "") {
        newErrors.particular = "Please fill out this field.";
      }
  
      setError(newErrors);
  
      if (Object.keys(newErrors).length > 0) {
        return;
      }
  
      setLoading(true);
      try {
        await axios.post(`${API_BASE_URL}/invoicedpt`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        Toast({ message: "Successfully add", type: "success" });
      } catch (error) {
        Toast({ message: "Error to add! try again", type: "error" });
      } finally {
        handleclose()
      }
    };
  
  
  
    const handleclose = () => {
      fetchData()
      fetchEditandView()
      setLoading(false);
      setData([])
      closeModal()
      setFormData({
        ...formData,
        particular: "",
      })
      setSelectedCat(null)
      setSelectedSubCat(null)
    }
  
    return (
      <>
        <div
          className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="d-flex" style={{ alignItems: "center" }}>
                <h4 className="page_subheading m-3">Add Invoice</h4>
                <button
                  type="button"
                  className="close closebutton"
                  onClick={handleclose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <hr className="m-0" />
              <div className="card-body p-3">
  
                <div className="mt-3 mb-4 row">
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">Invoice Number</label>
                      </div>
                      <div className="col-lg">
                        <input
                          className="form-control"
                          type="text"
                          value={formData.invoiceid}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
  
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">Date</label>
                      </div>
                      <div className="col-lg">
                        <input
                          className="form-control"
                          type="date"
                          value={formData.invoicedate}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
  
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">Particular</label>
                      </div>
                      <div className="col-lg">
                        <input
                          className="form-control"
                          name="particular"
                          type="text"
                          value={formData.particular}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              particular: e.target.value,
                            })
                          }
                        />
                        {error.particular && (
                          <div className="validation_msg">
                            {" "}
                            {error.particular}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="row">
                  <DataTable
                    persistTableHead={true}
                    columns={columns}
                    data={data}
                    customStyles={customStyle}
                    pagination
                    // selectableRows
                    fixedHeader
                  />
                  <div className="text-end">
                    <label><b>Total amount : {totalAmount}</b></label>
                  </div>
                </div>
  
                <div className="mt-3 mb-4 row">
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">Category</label>
                      </div>
                      <div className="col-lg">
                        <Select
                          options={options}
                          onChange={handleCategory}
                          value={selectedCat}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "#e7e7e7"
                                : "#e7e7e7",
                              fontSize: "13px",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: "12px",
                              color: "black",
                            }),
                          }}
                        />
                        {error.category && (
                          <div className="validation_msg">
                            {" "}
                            {error.category}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
  
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">sub Category</label>
                      </div>
                      <div className="col-lg">
                        <Select
                          options={optionsSub}
                          onChange={handleSubCategory}
                          value={selectedSubCat}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused
                                ? "#e7e7e7"
                                : "#e7e7e7",
                              fontSize: "13px",
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: "12px",
                              color: "black",
                            }),
                          }}
                        />
                        {error.subcategory && (
                          <div className="validation_msg">
                            {" "}
                            {error.subcategory}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
  
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">Description</label>
                      </div>
                      <div className="col-lg">
                        <textarea
                          id="message"
                          name="remark"
                          rows="2"
                          style={{ width: "100%" }}
                          value={quantityData.remark}
                          onChange={handleChange}
                        ></textarea>
                        {error.remark && (
                          <div className="validation_msg"> {error.remark} </div>
                        )}
                      </div>
                    </div>
                  </div>
  
                  <div className="col-lg-4 mb-2">
                    <div className="row">
                      <div className="col-auto">
                        <label className="form-label">Amount</label>
                      </div>
                      <div className="col-lg">
                        <input
                          className="form-control"
                          type="text"
                          name="amount"
                          value={quantityData.amount}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, "");
                            handleChange({ target: { name: "amount", value: numericValue } });
                          }}
                          onKeyPress={(e) => {
                            if (!/^[0-9]$/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {error.amount && (
                          <div className="validation_msg"> {error.amount} </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex justify-content-end">
                      <button className="btn1 me-1">Clear</button>
                      <button className="btn1" onClick={handleSubmit}>
                        {" "}
                        Add{" "}
                      </button>
                    </div>
                  </div>
  
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn1"
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" />
                          <span className="ms-2">wait...</span>
                        </>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  const ViewInvoice = ({ isOpen, closeModal, editAndViewData }) => {
  
    const columns = [
      {
        name: "S.no",
        cell: (row, index) => index + 1,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.cname,
        sortable: true,
      },
      {
        name: "SubCategory",
        selector: (row) => row.subname,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.remark,
        sortable: true,
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
      },
    ];
  
  
    return (
      <>
        <div
          className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="d-flex" style={{ alignItems: "center" }}>
                <h4 className="page_subheading m-3">Invoice Details</h4>
                <button
                  type="button"
                  className="close closebutton"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <hr className="m-0" />
              <div className="card-body p-3">
                <form>
                  <div className="row">
                    <DataTable
                      persistTableHead={true}
                      columns={columns}
                      data={editAndViewData.quantity}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      fixedHeader
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  function toValueString(value, dataType) {
    return dataType === 'date' ? value?.toLocaleDateString() : value;
  }
  
  // const fieldMap = {
  //   string: Input,
  //   number: InputNumber,
  //   date: DatePicker
  // };
  
  // const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, options, ...props }) => {
  
  //   const editing = rowData.status === 'EDIT';
  
  //   const Field = dataType === 'select' ? Select : fieldMap[dataType];
  //   const value = rowData[dataKey];
  //   const text = toValueString(value, dataType);
  
  
  //   return (
  //     <Cell
  //       {...props}
  //       className={editing ? 'table-cell-editing' : ''}
  //       onDoubleClick={() => {
  //         onEdit?.(rowData.id);
  //       }}
  //     >
  //       {editing ? (
  //         <Field
  //           defaultValue={dataType === 'select' ? options.find(option => option.value === value) : value}
  //           onChange={value => {
  //             onChange?.(rowData.id, dataKey, dataType === 'select' ? value.value : value);
  //           }}
  //           options={dataType === 'select' ? options : undefined}
  //         />
  
  //       ) : (
  //         text
  //       )}
  //     </Cell>
  //   );
  // };
  
  
  // const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, options, ...props }) => {
  //   const editing = rowData.status === 'EDIT';
  //   const value = rowData[dataKey];
  
  
  //   return (
  //     <Cell
  //       {...props}
  //       className={editing ? 'table-cell-editing' : ''}
  //       onDoubleClick={() => onEdit?.(rowData.id)}
  //     >
  //       {editing ? (
  //         dataType === 'select' ? (
  //           <select
  //             value={value || ""}
  //             className="form-select"
  //             onChange={(e) => onChange?.(rowData.id, dataKey, e.target.value)}
  //           >
  //             <option value="">Select...</option>
  //             {options?.map((option) => (
  //               <option key={option.value} value={option.value}>
  //                 {option.label}
  //               </option>
  //             ))}
  //           </select>
  //         ) : (
  //           <input
  //             type="text"
  //             className="form-control"
  //             defaultValue={value}
  //             onChange={(e) => onChange?.(rowData.id, dataKey, e.target.value)}
  //           />
  //         )
  //       ) : (
  //         options?.find(option => option.value === value)?.label || value
  //       )}
  //     </Cell>
  //   );
  // };
  
  
  // const ActionCell = ({ rowData, dataKey, onEdit, onRemove, ...props }) => {
  //   return (
  //     <Cell {...props} style={{ padding: '6px', display: 'flex', gap: '4px' }}>
  //       <IconButton
  //         appearance="subtle"
  //         icon={rowData.status === 'EDIT' ? <VscSave /> : <VscEdit />}
  //         onClick={() => {
  //           onEdit(rowData.id);
  //         }}
  //       />
  //       <IconButton
  //         appearance="subtle"
  //         icon={<VscRemove />}
  //         onClick={() => {
  //           onRemove(rowData.id);
  //         }}
  //       />
  //     </Cell>
  //   );
  // };