export default function validateForm(formData) {
    let errors = {};
  
    if (!formData?.fullName) errors.fullName = 'Full Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    else if (!/^\d+$/.test(formData.phoneNumber)) errors.phoneNumber = 'Phone Number is invalid';
  
    if (formData.position === 'Developer' || formData.position === 'Designer') {
      if (!formData.relevantExperience) errors.relevantExperience = 'Relevant Experience is required';
      else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0) errors.relevantExperience = 'Experience must be a number greater than 0';
    }
  
    if (formData.position === 'Designer') {
      if (!formData.portfolioURL) errors.portfolioURL = 'Portfolio URL is required';
      else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL)) errors.portfolioURL = 'URL is invalid';
    }
  
    if (formData.position === 'Manager' && !formData.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
  
    if (!Object.values(formData.additionalSkills).some(skill => skill)) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
  
    if (!formData.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';
  
    return errors;
  }
  