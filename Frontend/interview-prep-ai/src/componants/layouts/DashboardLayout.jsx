import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar.jsx'



const DashboardLayout = ({children}) => {
    const {user} = useContext(UserContext)
    console.log("User in DashboardLayout:" , user);

  return (
    <div>
        <Navbar/>

        {user && <div>{children}</div>}
      {/* <div>{children}</div> */}
    </div>
  );
};
export default DashboardLayout;
