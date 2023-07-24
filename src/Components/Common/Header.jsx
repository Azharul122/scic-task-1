import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const openMenu = () => {
    document.getElementById("moadal").classList.remove("hidden");
    document.getElementById("close").classList.remove("hidden");
    document.getElementById("humbarger").classList.add("hidden");
  };
  const closeMenu = () => {
    document.getElementById("moadal").classList.add("hidden");
    document.getElementById("close").classList.add("hidden");
    document.getElementById("humbarger").classList.remove("hidden");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then((error) => {
        console.log(error);
      });
  };

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [filterClasses,setFilterClasses]=useState([])
  // http://localhost:4000/reviews

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/colleges/");
        setColleges(response.data);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

  // const shorClasses=[...classes].sort((a, b) => b.NOS-a.NOS)
  // setFilterClasses(shorClasses)
  // console.log(colleges);

  // if (isLoading) {
  //   return <Spinner></Spinner>;
  // }

  return (
    <div>
      <section className="relative bg-orange-900 py-5">
        <div className="w-[90%] md:w-[80%] flex items-center justify-between mx-auto ">
          <p className="NavbarTitle text-xl gradient-text">Gradient</p>
          <ul className="menu text-white flex gap-2 flex-row ">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/College"}>All Colleges</Link>
            </li>
            <li>
              <Link to={"/Admission"}>Addmission</Link>
            </li>
            <li>
              <Link to={"/my-college"}>My College</Link>
            </li>
          </ul>

          <FontAwesomeIcon
            id="humbarger"
            icon={faBars}
            className="text-3xl font-bold cursor-pointer md:hidden text-[#C9A44C]"
            onClick={openMenu}
          />
          <FontAwesomeIcon
            id="close"
            icon={faXmark}
            className="text-4xl font-bold cursor-pointer hidden text-[#C9A44C]"
            onClick={closeMenu}
          />
          {/*  */}

          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search By Toy Name"
                className="input input-bordered"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* <div className="flex md:flex gap-5 items-center justify-center py-5">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text" name='search' id='search'
                placeholder="Search By Toy Name"
                className="input input-bordered"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-square" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}

          <div className="profile">
            {user ? (
              <div className="flex gap-2 items-center">
                <p className="text-white shadow-lg">{user?.displayName}</p>
                <Link
                  to={"/login"}
                  className="text-white"
                  onClick={handleLogOut}
                >
                  Log Out
                </Link>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-white py-2 px-3 bg-[rgba(0,0,0,0.2)]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        {/* Moadl */}
        <div
          id="moadal"
          className="moadal absolute top-[100px] bg-black z-40 h-[50vh] w-[90%] left-1/2 -translate-x-1/2 hidden"
        >
          <div className=" flex justify-center items-center w-full h-full ">
            <ul className=" text-white  gap-2 ">
              <li className="mb-6" onClick={closeMenu}>
                <Link to={"/"}>Home</Link>
              </li>
              <li className="mb-6" onClick={closeMenu}>
                <Link to={"/College"}>All Colleges</Link>
              </li>
              <li className="mb-6" onClick={closeMenu}>
                <Link to={"/Admission"}>Addmission</Link>
              </li>
              <li className="mb-6" onClick={closeMenu}>
                <Link to={"/my-college"}>My College</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className=" search absolute top-[90px]  w-[96%]   left-1/2 -translate-x-1/2 bg-black z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {search &&
            colleges
              .filter((c) => c.collegeName.toLowerCase().includes(search))
              .map((college) => (
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
                  <p className="">
                    Admission Date: {college.admissionDates.fall}
                  </p>
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
      </div>
    </div>
  );
};

export default Header;
