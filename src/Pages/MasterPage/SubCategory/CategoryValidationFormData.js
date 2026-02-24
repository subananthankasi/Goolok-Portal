export const validateFormData = (formData) => {
  const errors = {};

  // Regular expression to match only letters
  const lettersRegex =/^[A-Za-z\s]+$/;

  if (!formData.category || !formData.category.trim()) {
    errors.category = "Category is required";
  } 

  if (!formData.subcategory || !formData.subcategory.trim()) {
    errors.subcategory = "SubCategory is required";
  } else if (!lettersRegex.test(formData.subcategory.trim())) {
    errors.subcategory = "SubCategory should contain only letters";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};