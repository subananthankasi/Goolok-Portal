import React, { useEffect, useState } from "react"; 
import DataTable from "react-data-table-component";
import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from "../../../../Utils/Toast";

const ViewContactDetails = ({ isOpen, closeModal, id }) => {
  const [data, setData] = useState([]); 
 
 const columns = [
  {
    name: "sl.no",
    selector: (row,index) => index +1,
    sortable: true,
    wrap: true,
  },

  {
    name: "Name",
    selector: (row) => row.contact_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.contact_phone,
    wrap: true, 
    sortable: true,
  },
  {
    name: "Remarks",
    selector: (row) => row.remark,
    wrap: true,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="d-flex"> 
        <button
          className="btn btn-outline-danger delete"
          data-tooltip-id="delete"
          onClick={() => handleDelete(row.id)}
        >
          <DeleteIcon />
        </button>
      </div>
    ),
  },
];


  useEffect(() => {
    if (isOpen && id) {
      const fetchData = async () => { 
        try {
          const response = await axios.get(`${API_BASE_URL}/contactdetails/${id}`);
          setData(response.data);
        } catch (err) {
          console.error(err.message);
        }  
      };

      fetchData();
    }
  }, [isOpen, id]);  


  const handleDelete = async(id) => { 
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
    try {
          await axios.delete(`${API_BASE_URL}/agreement/${id}`);
          setData(prevData => prevData.filter(item => item.id !== id));
          Toast({ message: "Successfully Deleted", type: "error" });
      } catch (err) {
        alert(err.message);
      }  
    }
  };

 


  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: 'center' }}>
            <h4 className="page_subheading m-3">Owner Contact Report</h4> 
            <button
              type="button"
              className="close closebutton"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body p-3"> 
            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyle}
              pagination
              persistTableHead={true}
              fixedHeader
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContactDetails;
