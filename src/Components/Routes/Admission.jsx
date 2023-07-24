import axios from "axios";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Admission = () => {
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
        <div className="grid w-[96%] mx-auto grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center ">
          {colleges.map((college) => (
            <div
              className="card border border-gray-300 p-5 flex items-center gap-2"
              key={college.collegeName}
            >
                <p className="text-xl font-semibold">{college.collegeName}</p>
              <Link
                to={`/admission-form/`}
                className="py-1 px-2 bg-orange-900 text-white"
                state={college.collegeName}
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admission;
