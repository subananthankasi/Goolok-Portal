export const validateMedia = (formData) => {
    const errors = {};
     
    if (!formData.source_link  && !formData.source_name && !formData.filename) {
      errors.anyone = "Upload anyone";
    }   
    if (!formData.source_remark || !formData.source_remark.trim()) {
        errors.source_remark = "Remark is required";
      }
    
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };
  

  export const validateDescription = (formData) => {
    const errors = {};
     
    if (!formData.content) {
      errors.content = "Description is required";
    }   
    if (!formData.content_tag) {
        errors.content_tag = "Tag is required";
      }
    if (!formData.meta_tag) {
        errors.meta_tag = "Meta Tag is required";
      }
    if (!formData.select_lang) {
        errors.select_lang = "Select Language";
      }
    
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };
  