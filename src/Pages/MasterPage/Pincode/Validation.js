export const PincodeValidateFormDatas = (formData) => {  
    if (!formData) {
        return { isValid: false, errorMessage: "Fill the all fields" };
    }
    if (!formData.pin_state || !formData.pin_district || !formData.pin_taluk || !formData.pin_village || !formData.pincode || !formData.status) {
        return { isValid: false, errorMessage: "All fields are required" };
    }
    if (!formData.pin_state.trim() || !formData.pin_district.trim() || !formData.pin_taluk.trim() ||  !formData.pin_village.trim() || !formData.pincode || !formData.status.trim()) {
        return { isValid: false, errorMessage: "All fields are required" };
    }
    return { isValid: true };
};

export const PincodeValidateFormData = (formData) => {
    const errors = {};
  
    const pincodeRegex = /^\d{6}$/;

    if (!formData) {
      return { isValid: false, errorMessage: "Fill the all fields" };
    }
  
    if (!formData.pin_state || !formData.pin_state.trim()) {
      errors.pin_state = "State is required";
    }
  
    if (!formData.pin_district || !formData.pin_district.trim()) {
      errors.pin_district = "District is required";
    }
  
    if (!formData.pin_taluk || !formData.pin_taluk.trim()) {
      errors.pin_taluk = "Taluk is required";
    }
  
    if (!formData.pin_village || !formData.pin_village.trim()) {
      errors.pin_village = "Village is required";
    }
  
    if (!formData.pincode || !formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(formData.pincode.trim())) {
        errors.pincode = "Pincode must be 6 digits";
      }
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };

  