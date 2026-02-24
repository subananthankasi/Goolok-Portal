export const validateFormData = (formData) => {
  const errors = {};

  const lettersRegex = /^[A-Za-z\s]+$/;

  if (!formData.property || !formData.property.trim()) {
    errors.property = "Property type is required";
  }

  if (!formData.subproperty || !formData.subproperty.trim()) {
    errors.subproperty = "Sub Property is required";
  } else if (!lettersRegex.test(formData.subproperty.trim())) {
    errors.subproperty = "Sub Property should contain only letters";
  }
  if (!formData.shortform || !formData.shortform.trim()) {
    errors.shortform = "short form is required";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
