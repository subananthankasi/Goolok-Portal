export const VillageValidateFormDatas = (formData) => {  
    if (!formData) {
        return { isValid: false, errorMessage: "Fill the all fields" };
    }
    if (!formData.village_state || !formData.village_district || !formData.village_taluk || !formData.village_name || !formData.status) {
        return { isValid: false, errorMessage: "All fields are required" };
    }
    if (!formData.village_state.trim() || !formData.village_district.trim() || !formData.village_taluk.trim() ||  !formData.village_name.trim() || !formData.status.trim()) {
        return { isValid: false, errorMessage: "All fields are required" };
    }
    return { isValid: true };
};





export const VillageValidateFormData = (formData) => {
    const errors = {};
  
    const lettersRegex = /^[A-Za-z\s]+$/;


    if (!formData) {
      return { isValid: false, errorMessage: "Fill the all fields" };
    }
  
    if (!formData.village_state || !formData.village_state.trim()) {
      errors.village_state = "State name is required";
    }
  
    if (!formData.village_district || !formData.village_district.trim()) {
      errors.village_district = "District is required";
    }
  
    if (!formData.village_taluk || !formData.village_taluk.trim()) {
      errors.village_taluk = "Taluk is required";
    }
  
    if (!formData.village_name || !formData.village_name.trim()) {
      errors.village_name = "Village name is required";
    }else if (!lettersRegex.test(formData.village_name.trim())) {
        errors.village_name = "Village name should contain only letters";
      }
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };

  