export default function validateForm(formData) {
  let errors = {};

  if (!formData.fullName) errors.fullName = 'Full Name is required';
  if (!formData.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
  if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
  else if (!/^\d+$/.test(formData.phoneNumber)) errors.phoneNumber = 'Phone Number is invalid';

  if (formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') {
    if (!formData.relevantExperience) errors.relevantExperience = 'Relevant Experience is required';
    else if (formData.relevantExperience <= 0) errors.relevantExperience = 'Relevant Experience must be greater than 0';
  }

  if (formData.applyingForPosition === 'Designer') {
    if (!formData.portfolioUrl) errors.portfolioUrl = 'Portfolio URL is required';
    else if (!/^https?:\/\/.+\..+/.test(formData.portfolioUrl)) errors.portfolioUrl = 'Portfolio URL is invalid';
  }

  if (formData.applyingForPosition === 'Manager') {
    if (!formData.managementExperience) errors.managementExperience = 'Management Experience is required';
  }

  if (!formData.additionalSkills || formData.additionalSkills.length === 0) errors.additionalSkills = 'At least one skill must be selected';

  if (!formData.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';
  else {
    const interviewTime = new Date(formData.preferredInterviewTime);
    const now = new Date();
    if (interviewTime <= now) errors.preferredInterviewTime = 'Preferred Interview Time must be in the future';
  }

  return errors;
}
