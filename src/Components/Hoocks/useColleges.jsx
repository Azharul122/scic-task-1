// // import { useContext } from "react";
// // import { AuthContext } from "../../Providers/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
// import { FaSpinner } from "react-icons/fa";

// const useColleges = () => {
//   //   const { user } = useContext(AuthContext);
//   const {
//     isLoading,

//     data: collegesData = [],
//     refetch,
//   } = useQuery({
//     queryKey: ["collegesData"],
//     queryFn: async () => {
//       if (isLoading) {
//         <FaSpinner></FaSpinner>;
//       }
//       const res = await fetch("http://localhost:4000/colleges/");
//       const data = await res.json();

//       return data;
//     },
//   });
//   return [collegesData, refetch];
// };

// export default useColleges;
