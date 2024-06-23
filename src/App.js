
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useState } from "react";


function App() {

  const [isGuest,setIsGuest]=useState(false);
  const [isError,setIsError]=useState(false);
  const [errorMessages,setErrorMessages]=useState("");
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [formDetails,setFormDetails]=useState({
    name: "",
    email: "",
    age: "",
    guestName: "",
  });

  function validateAge(e) {

    //it must be a number

    if (isNaN(parseInt(e.target.value))||e.target.value<=0) {
      setErrorMessages("Age must be a number greater than 0");
      setIsError(true);
    } else {
      setFormDetails((prev) => {
        return { ...prev,age: e.target.value }
      });
      setErrorMessages("");
      setIsError(false);
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);

  }

  return (
    <div className="col-3  m-auto mt-5">
      {
        isSubmitted?
          <div className="d-flex flex-column justify-content-center">
            <div className="my-3">
              <button onClick={() => {
                setIsSubmitted(false);
              }} className="btn btn-primary mx-3 ">Back</button>
              <div className="alert alert-success d-inline">Form submitted successfully</div>

            </div>
            <div>
              <ul className="list-group">
                <li className="list-group-item">Name: {formDetails.name}</li>
                <li className="list-group-item">Email: {formDetails.email}</li>
                <li className="list-group-item">Age: {formDetails.age}</li>
                {isGuest&&<li className="list-group-item">Guest Name: {formDetails.guestName}</li>}
              </ul>
            </div>
          </div>
          :
          (
            <div className="mt-3">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input onChange={(e) => setFormDetails((prev) => {
                    return { ...prev,name: e.target.value }

                  })} value={formDetails.name} type="text" required className="form-control" id="name" placeholder="Enter name" />
                </div><br />
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input onChange={(e) => setFormDetails((prev) => {
                    return { ...prev,email: e.target.value }

                  })} value={formDetails.email} type="email" className="form-control" id="email" placeholder="Email" required />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input value={formDetails.age} onChange={validateAge} type="text" className="form-control" id="age" placeholder="Age" required />
                  {isError&&<small className="text-danger">{errorMessages}</small>}
                </div><br />
                <label className="form-check-label" htmlFor="guest1">
                  Are you attending with a guest?
                </label>
                <br />
                <div className="form-check form-check-inline" >
                  <input onClick={() => {
                    setIsGuest(true)
                  }} className="form-check-input" type="radio" name="guest" id="guest1" onChange={() => console.log()} checked={isGuest} />
                  <label className="form-check-label" htmlFor="guest1">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" onClick={() => setIsGuest(false)} type="radio" onChange={() => console.log()} name="guest" id="guest2" checked={!isGuest} />
                  <label className="form-check-label" htmlFor="guest2">
                    No
                  </label>
                </div>
                <br />
                <br />
                {isGuest&&(
                  <div className="form-group">
                    <label htmlFor="guestName">Guest Name</label>
                    <input value={formDetails.guestName} onChange={(e) => {
                      setFormDetails((prev) => {
                        return { ...prev,guestName: e.target.value }
                      });
                    }} required={isGuest} type="text" className="form-control" id="guestName" placeholder="Enter guest name" />
                  </div>
                )
                }
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div >
          )
      }
    </div>
  );
}

export default App;
