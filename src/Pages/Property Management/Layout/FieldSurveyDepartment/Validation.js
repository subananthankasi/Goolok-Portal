export const validateMarketResearchFormData = (formData) => {
    const errors = {};
    
    const lettersRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^[0-9]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;  
    
    if (!formData.owner_name || !formData.owner_name.trim()) {
      errors.owner_name = "Owner name is required";
    } else if (!lettersRegex.test(formData.owner_name.trim())) {
      errors.owner_name = "Owner name can only contain letters and spaces";
    }
  
    if (!formData.location || !formData.location.trim()) {
      errors.location = "Location is required";
    }
  
    if (!formData.direction || !formData.direction.trim()) {
      errors.direction = "Direction is required";
    }
  
    if (!formData.per_sqft || !formData.per_sqft.trim()) {
      errors.per_sqft = "Price per sqft is required";
    } else if (!numberRegex.test(formData.per_sqft.trim())) {
      errors.per_sqft = "Price per sqft must be a number";
    }
  
    if (!formData.distance || !formData.distance.trim()) {
      errors.distance = "Distance is required";
    } else if (!numberRegex.test(formData.distance.trim())) {
      errors.distance = "Distance must be a number";
    }
  
    if (!formData.mobile || !formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      errors.mobile = "Invalid mobile number format";
    }
  
    if (!formData.mobilef || !formData.mobilef.trim()) {
      errors.mobilef = "Alternate mobile number is required";
    } else if (!mobileRegex.test(formData.mobilef.trim())) {
      errors.mobilef = "Invalid alternate mobile number format";
    }
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };
  