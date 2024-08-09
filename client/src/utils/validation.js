function validateFormData(formData) {
    const errors = {};
  
    // Check if 'name' is present
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Name is required";
    }
  
    // Check if 'categoryId' is present
    if (!formData.categoryId || formData.categoryId.trim() === "") {
      errors.categoryId = "Category ID is required";
    }
  
    // Check if 'fabric' is present
    if (!formData.fabric || formData.fabric.trim() === "") {
      errors.fabric = "Fabric is required";
    }
  
    // Check if 'description' is present
    if (!formData.description || formData.description.trim() === "") {
      errors.description = "Description is required";
    }
  
    // Check if 'images' array is not empty
    // if (!formData.images || formData.images.length === 0) {
    //   errors.images = "At least two image is required";
    // }
  
    // Check if 'sizes' array is not empty
    if (!formData.sizes || formData.sizes.length === 0) {
      errors.sizes = "At least one size is required";
    }
  
    // Return errors object. If it's empty, there are no validation errors.
    return errors;
  }

  export default validateFormData;