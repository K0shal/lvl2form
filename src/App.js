import React,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFormValidation from './useFormValidation';
import validateForm from './validateForm';

const initialState={
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  relevantExperience: '',
  portfolioURL: '',
  managementExperience: '',
  additionalSkills: {
    JavaScript: false,
    CSS: false,
    Python: false,
  },
  preferredInterviewTime: '',
};

const App=() => {


  const { formData,errors,handleChange,handleSubmit }=useFormValidation(initialState,validateForm);

  const [showSummary,setShowSummary]=useState(false);





  const onSubmit=(e) => {
    handleSubmit(e);
    if (Object.keys(errors).length===0) {
      setShowSummary(true);
    }
  };


  return (
    <div className="container mt-5">
      <h1>Job Application Form</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName&&<div className="text-danger">{errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email&&<div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber&&<div className="text-danger">{errors.phoneNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">Applying for Position</label>
          <select className="form-control" id="position" name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {(formData.position==='Developer'||formData.position==='Designer')&&(
          <div className="mb-3">
            <label htmlFor="relevantExperience" className="form-label">Relevant Experience (Years)</label>
            <input type="number" className="form-control" id="relevantExperience" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
            {errors.relevantExperience&&<div className="text-danger">{errors.relevantExperience}</div>}
          </div>
        )}

        {formData.position==='Designer'&&(
          <div className="mb-3">
            <label htmlFor="portfolioURL" className="form-label">Portfolio URL</label>
            <input type="text" className="form-control" id="portfolioURL" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL&&<div className="text-danger">{errors.portfolioURL}</div>}
          </div>
        )}

        {formData.position==='Manager'&&(
          <div className="mb-3">
            <label htmlFor="managementExperience" className="form-label">Management Experience</label>
            <textarea className="form-control" id="managementExperience" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
            {errors.managementExperience&&<div className="text-danger">{errors.managementExperience}</div>}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Additional Skills</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="JavaScript" id="JavaScript" checked={formData.additionalSkills.JavaScript} onChange={handleChange} />
            <label className="form-check-label" htmlFor="JavaScript">JavaScript</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="CSS" id="CSS" checked={formData.additionalSkills.CSS} onChange={handleChange} />
            <label className="form-check-label" htmlFor="CSS">CSS</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="Python" id="Python" checked={formData.additionalSkills.Python} onChange={handleChange} />
            <label className="form-check-label" htmlFor="Python">Python</label>
          </div>
          {errors.additionalSkills&&<div className="text-danger">{errors.additionalSkills}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="preferredInterviewTime" className="form-label">Preferred Interview Time</label>
          <input type="datetime-local" className="form-control" id="preferredInterviewTime" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
          {errors.preferredInterviewTime&&<div className="text-danger">{errors.preferredInterviewTime}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {showSummary&&(
        <div className="mt-5">
          <h2>Application Summary</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Position:</strong> {formData.position}</p>
          {(formData.position==='Developer'||formData.position==='Designer')&&(
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
          )}
          {formData.position==='Designer'&&(
            <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
          )}
          {formData.position==='Manager'&&(
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default App;
