export const ValidationVendor = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersRegex = /^[A-Za-z\s]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const aadhaarRegex = /^\d{12}$/;

  if (!formData) {
    return { isValid: false, errorMessage: "Form data is undefined" };
  }

  // if (!formData.vendorId || !formData.vendorId.trim()) {
  //   errors.vendorId = "Vendor ID is required";
  // }

  if (!formData.vendorName || !formData.vendorName.trim()) {
    errors.vendorName = "Vendor namer is required";
  } else if (!lettersRegex.test(formData.vendorName.trim())) {
    errors.vendorName = "Vendor name must be letters";
  }


  // if (!formData.vendorAadhaar || !formData.vendorAadhaar.trim()) {
  //   errors.vendorAadhaar = "Aadhaar number is required";
  // } else if (!aadhaarRegex.test(formData.vendorAadhaar.trim())) {
  //   errors.vendorAadhaar = "Aadhaar number must be 12 digits";
  // }
  if (!formData.vendorAadhaar || !formData.vendorAadhaar.trim()) {
    errors.vendorAadhaar = "Aadhaar number is required";
  } else {
    const digitsOnly = formData.vendorAadhaar.replace(/\s/g, "");

    if (!aadhaarRegex.test(digitsOnly)) {
      errors.vendorAadhaar = "Aadhaar number must be 12 digits";
    }
  }


  if (!formData.vendorEmail || !formData.vendorEmail.trim()) {
    errors.vendorEmail = "Email is required";
  } else if (!emailRegex.test(formData.vendorEmail.trim())) {
    errors.vendorEmail = "Invalid email format";
  }

  // if (!formData.vendorMobile || !formData.vendorMobile.trim()) {
  //   errors.vendorMobile = "Mobile number is required";
  // } else if (!mobileRegex.test(formData.vendorMobile.trim())) {
  //   errors.vendorMobile = "Invalid mobile number format";
  // }
  if (!formData.vendorMobile || !formData.vendorMobile.trim()) {
    errors.vendorMobile = "Staff mobile number is required";
  } else if (!mobileRegex.test(formData.vendorMobile.trim())) {
    errors.vendorMobile = "Invalid mobile number format";
  }

  if (!formData.vendorAddress || !formData.vendorAddress.trim()) {
    errors.vendorAddress = "Address is required";
  }

  if (!formData.vendorDistrict || !formData.vendorDistrict.trim()) {
    errors.vendorDistrict = "District is required";
  }

  if (!formData.vendorTaluk || !formData.vendorTaluk.trim()) {
    errors.vendorTaluk = "Taluk is required";
  }

  if (!formData.vendorVillage || !formData.vendorVillage.trim()) {
    errors.vendorVillage = "Village is required";
  }

  if (!formData.vendorPincode || !formData.vendorPincode.trim()) {
    errors.vendorPincode = "Pincode is required";
  }

  if (!formData.vendorState || !formData.vendorState.trim()) {
    errors.vendorState = "State is required";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
