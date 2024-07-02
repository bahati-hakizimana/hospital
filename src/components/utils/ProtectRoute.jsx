// import { Outlet, Navigate } from "react-router-dom";

// const ProtectRoute = () =>{
//     const userRole = null
//     return userRole ? <Outlet /> : <Navigate to="/login" />
// }

// export default ProtectRoute




// import { Outlet, Navigate, useLocation } from "react-router-dom";

// const ProtectRoute = ({ allowedRoles }) => {
//   const userRole = localStorage.getItem("userRole"); // assuming you're storing userRole in localStorage after login
//   const location = useLocation();

//   if (!userRole) {
//     // If no role is found, redirect to login
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (!allowedRoles.includes(userRole)) {
//     // If the user's role is not allowed, redirect to unauthorized page or home page
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }
//   if(userRole){
//     <Navigate to="/admin" />
//     <Navigate to="/user" />
//   }

//   // If the user's role is allowed, render the Outlet to continue with the route
//   return <Outlet />;
// };

// export default ProtectRoute;






import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // If user role is not allowed for this route, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  // If user is logged in and role is allowed, render the child routes
  return <Outlet />;
};

export default ProtectRoute;




