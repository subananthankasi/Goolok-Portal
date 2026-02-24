export const DistrictvalidateFormDatas= (formData) => {  
  if (!formData || !formData.state_type || !formData.district || !formData.status) {
      return { isValid: false, errorMessage: "All fields are required" };
  }
  if (!formData.state_type.trim() || !formData.district.trim() || !formData.status.trim()) {
      return { isValid: false, errorMessage: "All fields are required" };
  }
  return { isValid: true };
};


export const DistrictvalidateFormData = (formData) => {
  const errors = {};

  const lettersRegex = /^[A-Za-z\s]+$/;
  

  if (!formData.state_type || !formData.state_type.trim()) {
    errors.state_type = "State name is required";
  } 

  if (!formData.district || !formData.district.trim()) {
    errors.district = "District is required";
  } else if (!lettersRegex.test(formData.district.trim())) {
    errors.district = "District should contain only letters";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
