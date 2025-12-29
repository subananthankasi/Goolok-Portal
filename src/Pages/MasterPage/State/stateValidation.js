 
  export const validateFormData = (formData) => {
    const errors = {};
   
    const lettersRegex = /^[A-Za-z\s]+$/;
  
    if (!formData.state_name || !formData.state_name.trim()) {
      errors.state_name = "State name is required";
    } else if (!lettersRegex.test(formData.state_name.trim())) {
      errors.state_name = "State name should contain only letters";
    }
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };


  export const validateFormDataBulk= (formData) => {  
    if (!formData) {
        return { isValid: false, errorMessage: "upload excel sheet" };
    }
     
    return { isValid: true };
  };