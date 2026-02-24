export const TalukvalidateFormDatas = (formData) => {
  if (!formData) {
    return { isValid: false, errorMessage: "Please Enter the all field" };
  }
  if (!formData.taluk_state || !formData.taluk_name || !formData.taluk_district || !formData.status) {
    return { isValid: false, errorMessage: "All fields are required" };
  }
  if (!formData.taluk_state.trim() || !formData.taluk_name.trim() || !formData.taluk_district.trim() || !formData.status.trim()) {
    return { isValid: false, errorMessage: "All fields are required" };
  }
  return { isValid: true };
};


export const TalukvalidateFormData = (formData) => {
  const errors = {};

  const lettersRegex = /^[A-Za-z\s]+$/;


  if (!formData) {
    errors.Message = "Form data is undefined"
    return { isValid: false };
  }

  if (!formData.taluk_state || !formData.taluk_state.trim()) {
    errors.taluk_state = "State name is required";
  }

  if (!formData.taluk_name || !formData.taluk_name.trim()) {
    errors.taluk_name = "Taluk name is required";
  } else if (!lettersRegex.test(formData.taluk_name.trim())) {
    errors.taluk_name = "Taluk should contain only letters";
  }

  if (!formData.taluk_district || !formData.taluk_district.trim()) {
    errors.taluk_district = "District is required";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
