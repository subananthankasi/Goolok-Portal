export const validateContactFormData = (formData) => {
    const errors = {};
    
    const lettersRegex = /^[A-Za-z\s]+$/; 
    const mobileRegex = /^[6-9]\d{9}$/;  
    
    if (!formData.contact_name || !formData.contact_name.trim()) {
      errors.contact_name = "Contact name is required";
    } else if (!lettersRegex.test(formData.contact_name.trim())) {
      errors.contact_name = "Contact name can only contain letters and spaces";
    } 

    if (!formData.contact_phone || !formData.contact_phone.trim()) {
      errors.contact_phone = "Mobile number is required";
    } else if (!mobileRegex.test(formData.contact_phone.trim())) {
      errors.contact_phone = "Invalid mobile number format";
    }
    
    if (!formData.remark || !formData.remark.trim()) {
        errors.remark = "Remark is required";
      }
    
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };
  



  export const validateBankFormData = (formData) => {
    const errors = {};
    
    const lettersRegex = /^[A-Za-z\s]+$/; 
    const mobileRegex = /^[6-9]\d{9}$/;  
    
    if (!formData.account_name || !formData.account_name.trim()) {
        errors.account_name = "Account name is required";
      } else if (!lettersRegex.test(formData.account_name.trim())) {
        errors.account_name = "Account name can only contain letters and spaces";
      } 

    if (!formData.account_bank || !formData.account_bank.trim()) {
      errors.account_bank = "Bank name is required";
    } else if (!lettersRegex.test(formData.account_bank.trim())) {
      errors.account_bank = "Bank name can only contain letters and spaces";
    } 
    if (!formData.account_branch || !formData.account_branch.trim()) {
      errors.account_branch = "Branch name is required";
    } else if (!lettersRegex.test(formData.account_branch.trim())) {
      errors.account_branch = "Branch name can only contain letters and spaces";
    } 

    if (!formData.account_ifsc || !formData.account_ifsc.trim()) {
      errors.account_ifsc = "IFSC number is required";
    }  
    
    if (!formData.account_no || !formData.account_no.trim()) {
        errors.account_no = "Account number is required";
      } else if (!/^\d+$/.test(formData.account_no)) {
        errors.account_no = "Account number should contain only numbers";
      }
    
  
    if (Object.keys(errors).length > 0) {
      return { isValid: false, errors };
    }
  
    return { isValid: true, errors: {} };
  };