export const StaffValidation = (formData) => {

    const errors = {}; 

    const password = /^[0-9a-zA-Z]{6}$/ 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lettersRegex = /^[A-Za-z\s]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^\d{12}$/;
   

    if (!formData) {
      return { isValid: false, errorMessage: "Form data is undefined" };
    }
  
    if (!formData.staffId || !formData.staffId.trim()) {
      errors.staffId = "Staff ID is required";
    }
  
    if (!formData.staffName || !formData.staffName.trim()) {
      errors.staffName = "Staff name is required";
    } else if (!lettersRegex.test(formData.staffName.trim())) {
      errors.staffName = "Staff name should contain only letters";
    }
  
    if (!formData.staffEmail || !formData.staffEmail.trim()) {
      errors.staffEmail = "Staff email is required";
    } else if (!emailRegex.test(formData.staffEmail.trim())) {
      errors.staffEmail = "Invalid email format";
    }

 if (!formData.staffAadhaar || !formData.staffAadhaar.trim()) {
  errors.staffAadhaar = "Aadhaar number is required";
} else {
  const digitsOnly = formData.staffAadhaar.replace(/\s/g, ""); 

  if (!aadhaarRegex.test(digitsOnly)) {
    errors.staffAadhaar = "Aadhaar number must be 12 digits";
  }
}
      // else if (!aadhaarRegex.test(formData.staffAadhaar.trim())) {
      //   errors.staffAadhaar = " Aadhaar number must be 12 digits";
      // }

  
    if (!formData.staffMobile || !formData.staffMobile.trim()) {
      errors.staffMobile = "Staff mobile number is required";
    } else if (!mobileRegex.test(formData.staffMobile.trim())) {
      errors.staffMobile = "Invalid mobile number format";
    }
  
    if (!formData.staffAddress || !formData.staffAddress.trim()) {
      errors.staffAddress = "Staff address is required";
    }

  
    if (!formData.staffDistrict || !formData.staffDistrict.trim()) {
      errors.staffDistrict = "District is required";
    }
  
    if (!formData.staffTaluk || !formData.staffTaluk.trim()) {
      errors.staffTaluk = "Taluk is required";
    }
  
    if (!formData.staffVillage || !formData.staffVillage.trim()) {
      errors.staffVillage = "Village is required";
    }
  
    if (!formData.staffPincode || !formData.staffPincode.trim()) {
      errors.staffPincode = "Pincode is required";
    }  
  
    if (!formData.staffState || !formData.staffState.trim()) {
      errors.staffState = "State is required";
    }
  
    if (!formData.staffGroup || !formData.staffGroup.trim()) {
      errors.staffGroup = "Group is required";
    }
    if (!formData.staffBranch || !formData.staffBranch.trim()) {
        errors.staffBranch = "Branch is required";
      } 
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }

    if (!formData.staffPassword || !formData.staffPassword.trim()) {
        errors.staffPassword = "Staff password is required";
      } else if (!password.test(formData.staffPassword.trim())) {
        errors.staffPassword = "Password must contain 6 letters";
      }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };
  