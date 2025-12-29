import React, { useEffect, useState } from "react"; 
import DataTable from "react-data-table-component";
import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from "../../../../Utils/Toast";

const ViewMarketResearch = ({ isOpen, closeModal, id }) => {
  const [data, setData] = useState([]); 


  const columns = [
    {
      name: "S.no",
      selector: (row,index) => index + 1,
      sortable: true,
      wrap: true,
    },
    {
      name: "Name ",
      selector: (row) => row.owner_name,
      wrap: true,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Directions",
      selector: (row) => row.direction,
      wrap: true,
      width: "180px",
      sortable: true,
    },
    {
      name: "Per sqft ",
      selector: (row) => row.per_sqft,
      wrap: true,
      sortable: true,
    },
    {
      name: "Distance Km ",
      selector: (row) => row.distance ,
      wrap: true,
      sortable: true,
    },
    {
      name: "Mobile No1 ",
      selector: (row) => row.mobile,
      wrap: true,
      sortable: true,
    },
    {
      name: "Mobile No2",
      selector: (row) => row.mobilef,
      wrap: true,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex"> 
           <button className="btn btn-outline-danger delete"  onClick={() => handleDelete(row.id)} data-tooltip-id="delete"><DeleteIcon/></button>
      </div>
      ),
    },
  ];


  useEffect(() => {
    if (isOpen && id) {
      const fetchData = async () => { 
        try {
          const response = await axios.get(`${API_BASE_URL}/market/${id}`);
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
          await axios.delete(`${API_BASE_URL}/survey/${id}`);
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
            <h4 className="page_subheading m-3">Market Research Report</h4> 
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

export default ViewMarketResearch;
