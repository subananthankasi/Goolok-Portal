import React from 'react'
import './SuccessMessage.css';

const SuccessMessage = ({ message, type }) => {
    return (
        <>

            <div class="container">
                <div class="circle-border"></div>
                <div class="circle">
                    <div class="success"></div>
                </div>
            </div>
        </>
    )
}

export default SuccessMessage