 

  export const validateFormData = (formData) => {
    const errors = {};
   
    const lettersRegex = /^[A-Za-z\s]+$/;
  
    if (!formData.document || !formData.document.trim()) {
      errors.document = "Document is required";
    } else if (!lettersRegex.test(formData.document.trim())) {
      errors.document = "Document should contain only letters";
    }
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };




   

  export const validateUpdateFormData = (formData) => {
    const errors = {};
   
    const lettersRegex = /^[A-Za-z\s]+$/;
  
    if (!formData.property_type || !formData.property_type.trim()) {
      errors.property_type = "Property type is required";
    } else if (!lettersRegex.test(formData.property_type.trim())) {
      errors.property_type = "Property type should contain only letters";
    }
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };

 