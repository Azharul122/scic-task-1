import { Link } from "react-router-dom";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Header = () => {

  const {user,logOut}=useContext(AuthContext)

    const openMenu=()=>{
        document.getElementById("moadal").classList.remove("hidden")
        document.getElementById("close").classList.remove("hidden")
        document.getElementById("humbarger").classList.add("hidden")
    }
    const closeMenu=()=>{
        document.getElementById("moadal").classList.add("hidden")
        document.getElementById("close").classList.add("hidden")
        document.getElementById("humbarger").classList.remove("hidden")
    }

    
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .then((error) => {
        console.log(error);
      });
  };

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
          <div className="profile">
          {
             user?(
              <div className="flex gap-2 items-center">
              <p className="text-white shadow-lg">{user?.displayName}</p>
              <Link to={"/login"} className="text-white" onClick={handleLogOut}>
                Log Out
              </Link>
            </div>
             ):(
              <Link to={"/login"} className="text-white py-2 px-3 bg-[rgba(0,0,0,0.2)]">
              Login
            </Link>
             )
            }
          </div>
        </div>
        {/* Moadl */}
        <div id="moadal" className="moadal absolute top-[100px] bg-black z-40 h-[50vh] w-[90%] left-1/2 -translate-x-1/2 hidden">
         <div className=" flex justify-center items-center w-full h-full ">
         <ul className=" text-white  gap-2 ">
            <li className="mb-6" onClick={closeMenu}> 
              <Link  to={"/"}>Home</Link>
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
        </div>
    );
};

export default Header;