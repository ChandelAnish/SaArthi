// import React from 'react'
// import SideBar from './SideBar'
// import { useOutletContext } from 'react-router-dom'

// export default function Dashboard() {

//   const { toggleDarkMode } = useOutletContext();

//   return (
//     <div>
//       <SideBar toggleDarkMode={toggleDarkMode}/>
//     </div>
//   )
// }

// //loader function
// export const getLoggedUserDetails = async () => {

//   try {
//     const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/loggedUserDetails`, {
//       credentials: "include"
//     });
//     const userDetails = await response.json();
//     if (userDetails.login === false) {
//       window.open('/login', '_parent')
//       return {};
//     }
//     delete userDetails.iat;
//     return userDetails;
//   } catch (error) {
//     console.log("error occurred : ", error)
//     return {};
//   }
// }
