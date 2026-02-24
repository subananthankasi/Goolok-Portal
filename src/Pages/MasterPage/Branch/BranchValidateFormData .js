export const BranchValidateFormData = (formData) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lettersRegex = /^[A-Za-z\s]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData) {
      return { isValid: false, errorMessage: "Form data is undefined" };
    }
  

    if (!formData.branch_state || !formData.branch_state.trim()) {
      errors.branch_state = "State name is required";
    }
  
    if (!formData.branch_district || !formData.branch_district.trim()) {
      errors.branch_district = "District is required";
    }
  
    if (!formData.branch_taluk || !formData.branch_taluk.trim()) {
      errors.branch_taluk = "Taluk is required";
    }
  
    if (!formData.branch_village || !formData.branch_village.trim()) {
      errors.branch_village = "Village is required";
    }
  
    if (!formData.branch_pincode || !formData.branch_pincode.trim()) {
      errors.branch_pincode = "Pincode is required";
    }  
  
    if (!formData.branch_name || !formData.branch_name.trim()) {
      errors.branch_name = "Branch name is required";
    }else if (!lettersRegex.test(formData.branch_name.trim())) {
        errors.branch_name = "Branch Name should contain only letters";
      }
  
    if (!formData.short_name || !formData.short_name.trim()) {
      errors.short_name = "Short name is required";
    }else if (!lettersRegex.test(formData.short_name.trim())) {
    errors.short_name = "short name should contain only letters";
  }
  
    if (!formData.contact_person || !formData.contact_person.trim()) {
      errors.contact_person = "Contact person is required";
    }
  
    if (!formData.mobile || !formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    }else if (!mobileRegex.test(formData.mobile.trim())) {
    errors.mobile = "Mobile Number should contain 10 digit";
  }
  
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email is required";
    }else if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Enter valid email";
      }
  
    if (!formData.geo_location || !formData.geo_location.trim()) {
      errors.geo_location = "Geo location is required";
    }
  
    if (!formData.status || !formData.status.trim()) {
      errors.status = "Status is required";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };
  