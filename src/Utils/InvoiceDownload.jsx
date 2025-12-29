import React from 'react'
import logo from "../Assets/images/Goolok Final Logo.png"
const InvoiceDownload = ({ ref, invoiceData }) => {
    const calculateTotals = () => {
        const subtotal = invoiceData?.reduce((acc, item) => {
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
    return (
        <article className="p-5" ref={ref} style={{ background: "#fff", display: "none" }} >
            {/* <h1 className="text-center">INVOICE</h1> */}
            <div className="d-flex justify-content-between ">
                <div>
                    <img src={logo} alt="goolok" style={{ width: "150px", height: "50px" }} />
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
                {invoiceData?.map((item) => {
                    return (
                        <div className="">
                            <h1 style={{ fontWeight: "800" }}> INVOICE </h1>
                            <p className="p-0 m-0"><b>Invoice No : </b> {item.invoice_id}  </p>
                            <p className="p-0 m-0"><b> Name: </b> {item.customer}  </p>
                            <p className="p-0 m-0"><b> Date:</b> {item.invoice_date} </p>
                            <p className="p-0 m-0"><b>  Email:</b>{item.email_id} </p>
                            <p className="p-0 m-0"><b>  Mobile:</b>{item.mobile} </p>

                        </div>
                    )
                })}

            </div>
            <section className="line-items ">
                <table className="items--table w-100 mt-5 p-2">
                    <thead className="p-2">
                        <tr className="">
                            <th className="p-2">S.NO</th>
                            <th>Qty</th>
                            <th>Description</th>
                            <th>Advance Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData?.map((item, index) => (
                            <>
                                <tr >
                                    <td className="p-2"> 1</td>
                                    <td>1</td>
                                    <td>Advance payment</td>
                                    <td className='text-center'>₹ {item.amount} </td>
                                </tr>
                            </>
                        ))}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" className='text-end'>Sub Total</td>
                            <td colSpan="2" className='text-center'>{calculateTotals().subtotal} </td>
                        </tr>
                        <tr>
                            <td colspan="3" className='text-end'> GST(0%)</td>
                            <td colSpan="2" className='text-center'>0.00</td> {/**{calculateTotals().gst} */}
                        </tr>
                        <tr>
                            <td colspan="3" className='text-end'>Total</td>
                            <td colSpan="2" className='text-center'>{calculateTotals().total} </td>
                        </tr>

                    </tfoot>
                </table>
            </section>

            <div className="row align-items-center mt-5 ">
                {invoiceData?.map((item) => {
                    return (
                        <div className="col-7 mt-5">
                            <h5>Payment Instructions</h5>
                            <p>
                                Ensure to reference Invoice Number <b>{item.invoice_id} </b> in your payment.
                                Thank you for your prompt attention to this matter.
                            </p>
                        </div>
                    )
                })}

                <div className="col-5 text-end mt-5">
                    {/* {invoiceData.invoice_status == "pending" ? 
        <InvoicePaymentGateway invoiceData ={invoiceData} fetchInvoice={fetchInvoice}/> :
        ( */}
                    {/* <div className="text-end">
          <img
            src={paid}
            style={{ width: "150px", height: "150px" }} />
        </div> */}
                    {/* )} */}


                </div>
            </div>
        </article>
    )
}

export default InvoiceDownload