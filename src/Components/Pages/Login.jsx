import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProvider';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import SectionTitle from '../../Title/SectionTitle';
const Login = () => {

    const navigate = useNavigate()
    const { signIn } = useContext(AuthContext)
    console.log(signIn)
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data,event) => {
        event.preventDefault();
        signIn(data.email,data.password)
        .then(result => {
          const loggeduser = result.user;
          navigate(from)
          console.log(loggeduser)
        })
        .catch(error => {
          const errorMessage = error.message;
          console.log(errorMessage)
  
        })
        console.log(data.password)
      };

      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();
    //   const nevigate = useNavigate();
    
      const handleGoogleSignUp = () => {
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            // const user = result.user;
            navigate(from)
          })
          .then((error) => {
            console.log(error);
          });
      };
      


    const showPassword=()=>{
       document.getElementById("passwordInput").type="text";
        document.getElementById("showPasswordIcon").classList.add("hidden")
        document.getElementById("hidePasswordIcon").classList.remove("hidden")

    }
    const hidePassword=()=>{
        document.getElementById("passwordInput").type="password";
        document.getElementById("showPasswordIcon").classList.remove("hidden")
        document.getElementById("hidePasswordIcon").classList.add("hidden")
    }
    return (
        <div>
             <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
              {/* <SectionTitle heading={"Sign In"}></SectionTitle> */}
                <form className="mt-6 " onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"  {...register("email", { required: true })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                {errors.email?.type==="required" && <p className='text-red-600'>Email is required</p>}

                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                       <div className="relative">
                       <input
                            type="password" id='passwordInput' {...register("password", { required: true,minLength:6,pattern:/^[a-z0-9]+$/ })}
                            className=" block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />

                        <FaEye id='showPasswordIcon' className='text-lg absolute top-[50%] right-5 -translate-y-1/2 cursor-pointer' onClick={showPassword}></FaEye>
                        <FaEyeSlash id='hidePasswordIcon' className='text-lg absolute top-[50%] right-5 -translate-y-1/2 hidden cursor-pointer' onClick={hidePassword}></FaEyeSlash>
                       </div>
                        
                       {errors.password?.type==="required" && <p className='text-red-600'>Password is required</p>}
                    {errors.password?.type==="minLength" && <p className='text-red-600 w-full'>Password must be grater than 6 charcters</p>}
                    {errors.password?.type==="pattern" && <p className='text-red-600 w-full'>Password must not be exist  any special charcters or capital letters</p>}
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 gap-x-2">
                    <button
                    onClick={handleGoogleSignUp}
                        type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                   
              
                </div>

                <p className="mt-8 text-xs font-light text-center text-black">
                    {" "}
                    <p>Don`t have an account?</p>{" "}
                    <Link to={"/register"} className='text-green-500 font-bold'> Sign Up</Link>
                </p>
            </div>
        </div>

        </div>
    );
};

export default Login;