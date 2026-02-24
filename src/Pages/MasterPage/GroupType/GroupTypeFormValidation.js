export const validateFormData = (formData) => {
  const errors = {};

  // Regular expression to match only letters
  const lettersRegex =/^[A-Za-z\s]+$/;

  if (!formData.group_name || !formData.group_name.trim()) {
    errors.group_name = "Group name is required";
  } else if (!lettersRegex.test(formData.group_name.trim())) {
    errors.group_name = "Group name should contain only letters";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }
if (!formData.pagename || formData.pagename.length === 0) {
  errors.pagename = "Allow Pages is required";
}

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
