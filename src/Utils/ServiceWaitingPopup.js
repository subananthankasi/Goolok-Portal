import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";


const ServiceWaitingPopup = ({ visible, onHide, id, fetch }) => {
  const submit = () => { };
  return (
    <div>
      <Dialog
        header="Are you sure you want
              to Take this ?"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={onHide}
      >
        <form autoComplete="off">
          <div className="modal-header">
            <button
              type="button"
              className="btn m-auto"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <TaskAltRoundedIcon sx={{ color: "#ffc107", fontSize: 60 }} />
            </button>
          </div>
          <div>
            {/* <p style={{ fontWeight: "600" }}>
              {" "}
              <ErrorOutlineIcon sx={{ fontSize: 25 }} /> Are you sure you want
              to Take this ?
            </p> */}
          </div>

          <div className="d-flex justify-content-end mt-3 gap-3">
            <Button variant="outlined" color="error" onClick={onHide}>
              No
            </Button>
            <Button variant="contained" onClick={submit}>
              Yes
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default ServiceWaitingPopup;
