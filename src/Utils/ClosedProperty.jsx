import React from 'react'
import { Dialog } from 'primereact/dialog';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closedPropertyThunk } from '../Redux/Actions/Enquiry/ClosedPropertyThunk';
const ClosedProperty = ({ visible, onHide, id, fetch }) => {

    const [remark, setRemark] = useState("")
    const dispatch = useDispatch()

    const submit = () => {
        const payload = {
            id: id,
            remark: remark
        }
        dispatch(closedPropertyThunk(payload))
        fetch()
        onHide()
    }
    return (
        <div>
            <Dialog header="Confirm to closed" visible={visible} style={{ width: '30vw' }} onHide={onHide}>
                <form autoComplete="off">
                    <div>
                        <p style={{ fontWeight: "600" }}> <ErrorOutlineIcon sx={{ fontSize: 25 }} /> Are you sure you want to proceed to closed ?</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="docname" className="form-label">Remark :  </label>
                        <textarea
                            type="text"
                            name="remark"
                            className="form-control"
                            placeholder="Enter remark...."
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                        />

                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-3">
                        <Button variant="outlined" color="error" onClick={onHide} >No</Button>
                        <Button variant="contained" onClick={submit}>Yes</Button>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default ClosedProperty