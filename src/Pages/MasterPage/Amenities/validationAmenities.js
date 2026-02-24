export const validateFormData = (formData) => {
  const errors = {};



  if (!formData.property || !formData.property.trim()) {
    errors.property = "Property type is required";
  }
  if (!formData.subtitle || !formData.subtitle.trim()) {
    errors.subtitle = "Amenities sub heading is required";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};


export const validateFormDataAmenities = (formData) => {
  const errors = {};

  if (!formData.propertyid || !formData.propertyid.trim()) {
    errors.propertyid = "Property type is required";
  }
  // if (!formData.subid || !formData.subid.trim()) {
  //   errors.subid = "Amenities sub heading is required";
  // }  
  if (!formData.amenities || !formData.amenities.trim()) {
    errors.amenities = "Amenities is required";
  }
  if (!formData.icon || !formData.icon.trim()) {
    errors.icon = "Amenities icon is required";
  }

  if (!formData.status || !formData.status.trim()) {
    errors.status = "Status is required";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
};
