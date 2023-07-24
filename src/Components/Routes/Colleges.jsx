
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Colleges = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  // const [filterClasses,setFilterClasses]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/colleges/");
        setColleges(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
    return (
        <div>
            <section>
        <div className="grid w-[96%] mx-auto grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center ">
          {colleges.map((college) => (
            <div
              className="card border border-gray-300 p-5"
              key={college.collegeName}
            >
              <img
                src={college.collegeImage}
                alt=""
                className="w-full h-[200px] md:h-[300px]"
              />
              <p className="text-lg font-semibold">{college.collegeName}</p>
              <p className="">Admission Date: {college.admissionDates.fall}</p>
              <p className="">
                Sports:
                {college.sports.map((sport) => (
                  <span key={sport.name}>{sport.name} </span>
                ))}
              </p>

              <p className="">
                Events:
                {college.events.map((event) => (
                  <span key={event.name}>{event.name} </span>
                ))}
              </p>

              <p>{college.researchHistory}</p>
              <Link
                to={`/colleges/${college._id}`}
                className="py-1 px-2 bg-orange-900 text-white"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </section>
        </div>
    );
};

export default Colleges;