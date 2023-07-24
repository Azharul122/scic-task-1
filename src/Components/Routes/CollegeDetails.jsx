// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(college);
  fetch(`http://localhost:5000/college/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setIsLoading(false);
      setCollege(data);
    });

  //     const [colleges, setColleges] = useState();
  //     // const [filterClasses,setFilterClasses]=useState([])

  //     useEffect(() => {
  //       const fetchData = async () => {
  //         try {
  //           const response = await axios.get(`http://localhost:5000/colleges/${id}`);
  //           setColleges(response.data);
  //           setIsLoading(false);
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       };

  //       fetchData();
  //     }, []);
  // console.log(colleges.collegeName)
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <section>
        <div className="w-[96%] mx-auto">
          <p className="text-3xl font-semibold py-3">{college.collegeName}</p>
          <img
            src={college.collegeImage}
            alt=""
            className="w-full md:w-[50%] mx-auto"
          />
          <p className="text-lg font-semibold">Addmission</p>
          <p className="">Fall season: {college.admissionDates.fall}</p>
          <p className="">Spring season: {college.admissionDates.spring}</p>

          <p className="text-lg font-semibold">Sports:</p>
          <p className="">
            {college.sports.map((sport) => (
              <div className="" key={sport.name}>
              <p className="font-semibold pl-5">{sport.name} </p>
              <p className="pl-5">{sport.description}</p>
            </div>
            ))}
          </p>

          <p className="text-lg font-semibold">Events:</p>
          <p className="">
            {college.events.map((event) => (
              <div className="" key={event.name}>
                <p className="font-semibold pl-5">{event.name} </p>
                <p className="pl-5">{event.details}</p>
              </div>
            ))}
          </p>

          <p className="text-lg font-semibold">Admission Process:</p>
          <p>{college.admissionProcess}</p>

          <p className="text-lg font-semibold">Research Works:</p>
          <p>{college.researchWorks}</p>
        </div>
      </section>
    </div>
  );
};

export default CollegeDetails;
