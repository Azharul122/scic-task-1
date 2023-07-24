import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import Spinner from "../Spinner/Spinner";


const MyCollege = () => {
  const location = useLocation();
  const collegeName = location.state;
  const {user}=useContext(AuthContext)

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

  const filterCollegege = colleges.find(
    (college) => college.collegeName == collegeName
  );
  // console.log(filterCollegege.collegeName)

  if (isLoading) {
    return <Spinner></Spinner>;
  }

const handleReviw=(event)=>{
    event.preventDefault();
    const form=event.target
    const rating=form.rating.value
    const feadback=form.feadback.value

    const result={rating,feadback,name:user?.displayName,collegeName}
   
    fetch(`http://localhost:4000/review`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(result),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.insertedId) {
           
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thanks For share a valiable information.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });//then data
}

  return (
    <div>
      <section>
        <div className="w-[96%] mx-auto">
          <p className="text-3xl font-semibold py-3">
            {filterCollegege.collegeName}
          </p>
          <img
            src={filterCollegege.collegeImage}
            alt=""
            className="w-full md:w-[50%] mx-auto"
          />

          <p className="text-lg font-semibold">Admission Process:</p>
          <p>{filterCollegege.admissionProcess}</p>

          <section className="bg-white ">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <form action="#" className="space-y-8" onSubmit={handleReviw}>
             
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-black text-black"
                  >
                  Rating
                  </label>
                  <input
                  name="rating"
                    type="text"
                    id="subject"
                    className="block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Rating out of 5"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-black "
                  >
                   Feadback
                  </label>
                  <textarea
                  name="feadback"
                    id="message"
                    rows="6"
                    className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-800 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send message
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MyCollege;
