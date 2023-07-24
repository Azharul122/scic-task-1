import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Colleges from "./Components/Routes/Colleges";
import Admission from "./Components/Routes/Admission";
import MyCollege from "./Components/Routes/MyCollege";
import Common from "./Components/Common/Common";
import CollegeDetails from "./Components/Routes/CollegeDetails";
import AuthProvider from "./Components/Providers/AuthProvider";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import AdmissionForm from "./Components/Pages/AdmissionForm";
import PrivateRoute from "./Components/Routes/PrivateRoute;";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Common></Common>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      },
      {
        path:"College",
        element:<Colleges></Colleges>
      },
      {
        path:"colleges/:id",
        element:<PrivateRoute><CollegeDetails></CollegeDetails></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:5000/colleges/${params.id}`)
      },
      {
        path:"Admission",
        element:<Admission></Admission>
      },
      {
        path:"admission-form",
        element:<AdmissionForm></AdmissionForm>
      },
      {
        path:"my-college",
        element:<MyCollege></MyCollege>
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
