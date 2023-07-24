import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdmissionForm = () => {
  const [error, setError] = useState("");
  const location = useLocation();
  const nevigate = useNavigate();
  const collegeName = location.state;
  console.log(collegeName);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !photo || !email || !password) {
      return setError("All fields must requird");
    } else if (password.length < 6) {
      return setError("Password must be 6 charcter or more");
    } else {
      nevigate("/login");
    }
  };

  return (
    <div>
      <div className="text-center">
        <p className="py-5 text-red-500" id="messageDiv">
          {error}
        </p>
      </div>

      <div className="pb-5 flex justify-center items-center text-center">
        <form
          className="w-[80%] md:w-[50%] mx-auto shadow shadow-lg shadow-slate-800 px-5 py-4 bg-orange-800"
          onSubmit={handleRegister}
        >
          <p className="text-white py-5 font-['EB Garamond', serif]">
            You are selected: <p className="font-bold text-lg">{collegeName}</p>
          </p>
          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            className="mb-5 input input-bordered w-full max-w-xs pl-1" 
            required
          />
          <br />
          <input
            type="text"
            name="photo"
            placeholder="image field"
            className="mb-5 input input-bordered w-full max-w-xs pl-1"
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Candidate email"
            className="mb-5 input input-bordered w-full max-w-xs pl-1"
          />
          <br />
          <input
            type="number"
            name="password"
            placeholder="Phone number"
            className="mb-5 input input-bordered w-full max-w-xs pl-1"
          />
          <br />
          <input
            type="text"
            name="password"
            placeholder="Address"
            className="mb-5 input input-bordered w-full max-w-xs pl-1"
          />
          <br />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Datr Of Birth"
            className="mb-5 input input-bordered w-full max-w-xs pl-1"
          />
          <br />
          <Link to={"/my-college"} state={collegeName}>
            Submit
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
