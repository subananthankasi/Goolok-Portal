export const validateFormData = (formData) => {
  const errors = {};

  // Regular expression to match only letters
  const lettersRegex =/^[A-Za-z\s]+$/;

  if (!formData.category || !formData.category.trim()) {
    errors.category = "Category is required";
  } else if (!lettersRegex.test(formData.category.trim())) {
    errors.category = "Category should contain only letters";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};