 

  export const DocumentvalidateFormData = (formData) => {
    const errors = {};
  
    const lettersRegex = /^[A-Za-z\s]+$/;

  
    if (!formData.type || !formData.type.trim()) {
      errors.type = "Please select the propert type";
    } 

    if (!formData.subproperty || !formData.subproperty.trim()) {
      errors.subproperty = "Please select the sub propert type";
    }  
  
    
  if (!formData.document || !formData.document.trim()) {
    errors.document = "Document name is required";
  } else if (!lettersRegex.test(formData.document.trim())) {
    errors.document = "Document name should contain only letters";
  }


    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };



  export const DocumentvalidateFormDataUpdate = (formData) => {
    const errors = {};
  
    // Regular expression to match only letters
    const lettersRegex =/^[A-Za-z\s]+$/;
  
    if (!formData.property_type || !formData.property_type.trim()) {
      errors.property_type = "Please select the propert type";
    }  
  
    
    if (!formData.subproperty || !formData.subproperty.trim()) {
      errors.subproperty = "Please select the sub property type";
    }  
  
    
  if (!formData.document || !formData.document.trim()) {
    errors.document = "Document name is required";
  } else if (!lettersRegex.test(formData.document.trim())) {
    errors.document = "Document name should contain only letters";
  }


    if (!formData.prop_status || !formData.prop_status.trim()) {
      errors.prop_status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };