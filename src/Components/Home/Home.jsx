import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome, FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Help.css";
import Spinner from "../Spinner/Spinner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [filterClasses,setFilterClasses]=useState([])
  // http://localhost:5000/reviews

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/colleges/");
        setColleges(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews/");
        setReviews(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // const shorClasses=[...classes].sort((a, b) => b.NOS-a.NOS)
  // setFilterClasses(shorClasses)
  // console.log(colleges);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      {/* Colleges section */}
      <section>
        <div className="grid w-[96%] mx-auto grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center ">
          {colleges.slice(0, 3).map((college) => (
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

      {/* Graduate Gallery */}
      <section className="py-10">
        <div className="grid w-[96%] mx-auto grid-cols-1 md:grid-cols-4 gap-3 justify-center items-center ">
          {colleges.map((college) => (
            <div className="groupPhoto relative h-[300px]" key={college._id}>
              <img
                src={college.groupPhoto[0]}
                alt=""
                className="w-full h-full"
              />
              <div className="GPconntent absolute h-full w-full bg-[rgba(0,0,0,0.8)] top-0 flex justify-center items-center right-[100%]">
                <p className="text-white">{college.collegeName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}

      <section className="py-10">
        <div className="grid w-[96%] mx-auto grid-cols-1 md:grid-cols-3 gap-3 justify-center items-center">
         {
          reviews.map(review=>(
            <div className="review border border-gray-400" key={review._id}>
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                  <svg
                    className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">
                      "{review.feadback}"
                    </p>
                  </blockquote>
                  <figcaption className="flex items-center justify-center mt-6 space-x-3">
                 
                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                      <div className="pr-3 font-medium text-gray-900 dark:text-white flex items-center gap-1">
                       <FaStar className="text-orange-700"></FaStar> {review.rating}
                      </div>
                      <div className="pl-3 text-sm font-light text-white">
                        <div className="flex items-center gap-1"><FaHome></FaHome> {review.collegeName}</div>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </div>
          ))
         }
        </div>
      </section>
    </div>
  );
};

export default Home;
