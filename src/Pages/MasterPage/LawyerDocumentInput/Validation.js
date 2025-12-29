 

  export const validateFormData = (formData) => {
    const errors = {};
   
    const lettersRegex = /^[A-Za-z\s]+$/; 
  
    if (!formData.document || !formData.document.trim()) {
      errors.document = "Document is required";
    } 

    if (!formData.subname || !formData.subname.trim()) {
        errors.subname = "Input field name is required";
      } else if (!lettersRegex.test(formData.subname.trim())) {
        errors.subname = "Input field name contain only letters";
      }

  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };


   

  export const validateFormDataUpdate = (formData) => {
    const errors = {};
   
    const lettersRegex = /^[A-Za-z\s]+$/; 
  
    if (!formData.document || !formData.document.trim()) {
      errors.document = "Document is required";
    } 

    if (!formData.documentsub || !formData.documentsub.trim()) {
        errors.documentsub = "is required";
      } else if (!lettersRegex.test(formData.documentsub.trim())) {
        errors.documentsub = "contain only letters";
      }

  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };

