import React, { useEffect, useState} from "react";
import axios from "axios";
import API_BASE_URL from "../../../../Api/api";
import Toast from "../../../../Utils/Toast";


function Amenities({id,save,oldData,status}) { 
   
  const [amenitiesData,setAmenitiesData] = useState([])
 
  useEffect(()=>{
    const fetch = async()=>{
      try{
        const response = await axios.get(`${API_BASE_URL}/landamenities`)
        setAmenitiesData(response.data)
      }catch(error){
        console.error(error)
      }
    }
    fetch()
  },[])




  const [selectedIds, setSelectedIds] = useState([]);
   

  // old data update 
  useEffect(() => { 
    if(!!oldData){  
      const data = JSON.parse(oldData)  
      setSelectedIds(data)  
    }else{
    }
  }, [oldData]); 

  const handleCheckboxChange = (amenityId) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(amenityId)
        ? prevSelectedIds.filter((id) => id !== amenityId)  
        : [...prevSelectedIds, amenityId]  
    );
  };
  const integerIds = selectedIds.map(id => parseInt(id)); 
  const updateData = {
    id:id,
    amenities:integerIds?integerIds:""
  }
 
  useEffect(() => {
    const updateDataAsync = async () => {
      if (save) {
          if(integerIds.length != 0){
            try {
              await axios.post(`${API_BASE_URL}/addamenities`, updateData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              Toast({ message: "Successfully Updated", type: "success" });
            } catch (error) { 
              console.error("Error updating data:", error);
              Toast({ message: "Update failed", type: "error" }); 
            } 
          }else{
            alert("Please Select Amenities")
          } 
      }   
    };

    updateDataAsync();
  }, [save]);

 
 
  const staffid = JSON.parse(sessionStorage.getItem('token')); 
  return (
    <div>
 
     
  <div className={`${staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? "d-none" :"d-block"}`}> 
    <div className="row">
      {amenitiesData.map((item) => (
        <React.Fragment key={item.subtitle.id}>
          <h6 className="mt-3 mb-3">{item.subtitle.subamenities}</h6>
          <hr />
          {item.amenities.map((amenity) => (
            <div className="col-md-6 col-lg-3 mt-2" key={amenity.id}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox" 
                  onChange={() => handleCheckboxChange(amenity.id)}
                  checked={selectedIds.includes(amenity.id)}  
                />
                <label
                  className="form-check-label amenitiesBox"
                  htmlFor={`checkbox-${amenity.id}`}
                >
                  {amenity.amenities}
                </label>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))} 
      </div>
    </div>
      
     
     
          
  <div className={`${staffid.logintype === "admin" || status ==="pending" || status ==="complete" ? "d-block" :"d-none"}`}> 
  <div className="row">
  {amenitiesData.map((item) => (
    <React.Fragment key={item.subtitle.id}>
      <h6 className="mt-3 mb-3">{item.subtitle.subamenities}</h6>
      <hr />
      {item.amenities
        .filter((amenity) => selectedIds.includes(amenity.id))  
        .map((amenity) => (
          <div className="col-md-6 col-lg-3 mt-2" key={amenity.id}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox" 
                checked={selectedIds.includes(amenity.id)}  
              />
              <label
                className="form-check-label amenitiesBox"
                htmlFor={`checkbox-${amenity.id}`}
              >
                {amenity.amenities}
              </label>
            </div>
          </div>
        ))}
    </React.Fragment>
  ))}
</div>

    </div>

    


      </div>
 
  );
}

export default Amenities;
