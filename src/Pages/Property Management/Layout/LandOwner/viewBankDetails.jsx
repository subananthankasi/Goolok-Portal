import React, { useEffect, useState } from "react"; 
import DataTable from "react-data-table-component";
import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from "../../../../Utils/Toast";

const ViewBankDetails = ({ isOpen, closeModal, id }) => {
  const [data, setData] = useState([]); 
 

  const columns = [
    {
      name: "sl.no",
      selector: (row,index) => index+1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Account Name",
      selector: (row) => row.account_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row) => row.account_no,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "IFSC Code",
      selector: (row) => row.account_ifsc,
      wrap: true,
      sortable: true,
    },
    {
      name: "Bank Name",
      selector: (row) => row.account_bank,
      wrap: true,
      sortable: true,
    },
    {
      name: "Bank Branch",
      selector: (row) => row.account_branch,
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
            onClick={() => handleDeleteBank(row.id)}
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
          const response = await axios.get(`${API_BASE_URL}/bankdetails/${id}`);
          setData(response.data);
        } catch (err) {
          console.error(err.message);
        }  
      };

      fetchData();
    }
  }, [isOpen, id]);  


  const handleDeleteBank = async(id) => { 
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
    try {
          await axios.delete(`${API_BASE_URL}/bankdelete/${id}`);
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
            <h4 className="page_subheading m-3">Owner Bank Details Report</h4> 
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

export default ViewBankDetails;
