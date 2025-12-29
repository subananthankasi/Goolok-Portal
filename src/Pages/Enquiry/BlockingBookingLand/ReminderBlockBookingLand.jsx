import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../../../Api/api';
import axios from 'axios';


const tableStyle = {
    width: '70%',
    margin: '20px auto',
    border: '1px solid #000'
};

const headerStyle = {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
    textAlign: 'center'
};


const cellStyle = {
    border: '1px solid #000',
    padding: '8px'
};

const ReminderBlockBookingLand = ({block_id}) => {
    const staffid = JSON.parse(sessionStorage.getItem("token"));
    const [getData, setGetData] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/blocking/${staffid.loginid}/edit`, {
                headers: {
                    "Pr-Root": "land",
                },
            }
            );

            setGetData(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="card shadow border-0 mt-3">
            <div className="card shadow border-0 p-4">
                <div className="d-flex justify-content-between">
                    <h6>Blocking & Booking</h6>
                </div>
                <hr />
                <div>
                    <table className="table table-bordered w-100" style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Booking Id </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Category  </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Sub Category </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Advance Amount </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Blocking Amount </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Payment Mode </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Cleared Date </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Age  </th>
                                <th style={{ ...cellStyle, ...headerStyle }}> &nbsp;&nbsp; Status </th>

                            </tr>
                        </thead>
                        <tbody>
                            {getData.length > 0 ? (
                                getData.map((item, index) => (
                                    <tr key={index}>
                                        <td style={cellStyle}>{item.booking_id}</td>
                                        <td style={cellStyle}>{item.property_type}</td>
                                        <td style={cellStyle}>{item.subpro_name}</td>
                                        <td style={cellStyle} className='text-center'>{item.advance}</td>
                                        <td style={cellStyle}>{item.blocking_amount}</td>
                                        <td style={cellStyle}>{item.pay_mode}</td>
                                        <td style={cellStyle}>{item.cleared_date}</td>
                                        <td style={cellStyle}>{item.age}</td>
                                        <td style={cellStyle} className='text-success fw-bold'>{item.status}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center p-3">No Data Available</td>
                                </tr>)}

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReminderBlockBookingLand