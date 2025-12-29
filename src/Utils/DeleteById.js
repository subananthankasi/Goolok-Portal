// import Toast from "./Toast";

// export const DeleteById = async (id, action, dispatch) => {
//   const shouldDelete = window.confirm("Are you sure you want to delete?");
//   if (shouldDelete) {
//     try {
//       Toast({ message: "Successfully Deleted", type: "success" }); 
//       await dispatch(action(id));
//     } catch (error) {
//       Toast({ message: "Failed to delete item", type: "warning" });   
//       console.error("Error deleting item:", error);
//     }
//   }
// };


 
import Toast from "./Toast";
import { confirmDialog } from 'primereact/confirmdialog';
 
export const DeleteById = async (id, action, dispatch) => {
 
 
 

  const confirm1 = () => {
    confirmDialog({
        message: 'Are you sure you want to delete this item?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        acceptClassName: 'custom-accept-button', 
        accept,
        reject
    });
};


const accept = async() => {
  try {
    await dispatch(action(id));
    Toast({ message: "Successfully Deleted", type: "success" }); 
  } catch (error) {
    Toast({ message: "Failed to delete item", type: "error" });    
  }}


  const reject = () => {
    
 }
 confirm1()
 
};