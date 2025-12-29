export const validateLandFormData = (formData) => {
    const errors = {};
   
    const lettersRegex = /^[A-Za-z\s]+$/;
  
    if (!formData.property || !formData.property.trim()) {
      errors.property = "*is required";
    }  

    if (!formData.vendor || !formData.vendor.trim()) {
      errors.vendor = "Vendor is required";
    }  
  
    if (!formData.contactname || !formData.contactname.trim()) {
      errors.contactname = "Name is required";
    } else if (!lettersRegex.test(formData.contactname.trim())) {
      errors.contactname = "Name can only contain letters and spaces";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };