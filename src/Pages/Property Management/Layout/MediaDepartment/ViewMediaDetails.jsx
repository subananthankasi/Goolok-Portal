import React, { useEffect, useState } from "react"; 
import DataTable from "react-data-table-component";
import customStyle from "../../../../Utils/tableStyle";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../../../Api/api";
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from "../../../../Utils/Toast";

const ViewMediaDetails = ({ isOpen, closeModal, id,status,staffid }) => {

  const [data, setData] = useState([]); 
 
  const columns = [
    {
      name: "S.no",
      selector: (row,index) => index + 1,
      sortable: true,
      wrap: true,
    },  
    {
      name: "Media",
      cell: (row) => {
        let tag;
        switch (row.type) {
          case 'image': 
            tag =  <img src={`${IMG_PATH}/property/${row.source_name}`} style={{ width: "150px", height: "100%"}} alt=""></img>; 
            break;
          case 'video': 
            tag = (
              <video width="200px" controls>
                <source src={`${IMG_PATH}/property/${row.source_name}`} type="video/mp4" />   
                Your browser does not support the video tag.
              </video>
            );
            break;
          case 'link': 
            tag =    <img src={row.source_link} style={{ width: "150px", height: "100%"}} alt=""></img>;  
            break;
          default: 
            tag = 'No Data'; 
            break;
        }
        
        return (
          <>
            {tag}
          </>
        );
      },
      wrap: true,
      sortable: true,
    }, 
    {
      name: "Description",
      selector: (row) => row.source_remark,
      wrap: true,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-danger delete"
            data-tooltip-id="delete"
            onClick={() => handleDeleteMedia(row.id)}
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
            const response = await axios.get(`${API_BASE_URL}/media/${id}`, {
                headers: { 
                  'Gl-Status':status,  
                  'Gl-Type':staffid.logintype, 
                  'Gl-Out':staffid.loginid,  
                },
            });
          setData(response.data);
        } catch (err) {
          console.error(err.message);
        }  
      };

      fetchData();
    }
  }, [isOpen, id]);  


  const handleDeleteMedia = async(id) => { 
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
    try {
          await axios.get(`${API_BASE_URL}/uploadremove/${id}`);
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
            <h4 className="page_subheading m-3">Media Details Report</h4> 
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

export default ViewMediaDetails;
