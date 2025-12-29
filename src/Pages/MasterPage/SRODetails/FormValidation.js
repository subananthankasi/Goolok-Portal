export const FormValidation = (formData) => {
  const errors = {};

 
  const lettersRegex = /^[A-Za-z\s]+$/;  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;  
 

  // Validation for each field
  if (!formData.sroAddress || !formData.sroAddress.trim()) {
    errors.sroAddress = "Address is required";
  }

  if (!formData.sroArea || !formData.sroArea.trim()) {
    errors.sroArea = "Area is required";
  }

  if (!formData.sroDistrict || !formData.sroDistrict.trim()) {
    errors.sroDistrict = "District is required";
  }  

  if (!formData.sroEmail || !formData.sroEmail.trim()) {
    errors.sroEmail = "Email is required";
  } else if (!emailRegex.test(formData.sroEmail.trim())) {
    errors.sroEmail = "Invalid email format";
  }

  if (!formData.sroLandline || !formData.sroLandline.trim()) {
    errors.sroLandline = "Landline is required";
  } else if (!phoneRegex.test(formData.sroLandline.trim())) {
    errors.sroLandline = "Landline should be a 10 digit number";
  }

  if (!formData.sroLocation || !formData.sroLocation.trim()) {
    errors.sroLocation = "Location is required";
  }

  if (!formData.sroMobile || !formData.sroMobile.trim()) {
    errors.sroMobile = "Mobile number is required";
  } else if (!phoneRegex.test(formData.sroMobile.trim())) {
    errors.sroMobile = "Mobile number should be a 10 digit number";
  }

  if (!formData.sroPincode || !formData.sroPincode.trim()) {
    errors.sroPincode = "Pincode is required";
  }  

  if (!formData.sroState || !formData.sroState.trim()) {
    errors.sroState = "State is required";
  }  

  if (!formData.sroTaluk || !formData.sroTaluk.trim()) {
    errors.sroTaluk = "Taluk is required";
  }   

  if (!formData.sroTitle || !formData.sroTitle.trim()) {
    errors.sroTitle = "Title is required";
  } else if (!lettersRegex.test(formData.sroTitle.trim())) {
    errors.sroTitle = "Title should contain only letters";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
