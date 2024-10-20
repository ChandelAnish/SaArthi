import 'flowbite'
import React, { useState } from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom'
import { userDetailsSliceAction } from '../store/UserDetails';
import Cookies from 'js-cookie';
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaHandsAslInterpreting } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import axios from 'axios';


export default function Dashboard() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userDetails = useLoaderData()
    dispatch(userDetailsSliceAction.getUserDetails(userDetails))

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    //logout
    async function deleteSaArthiToken() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/deleteToken`, {
                withCredentials: true
            });
            console.log('Token deleted successfully:', response.data);
            
            // Attempt to delete the cookie client-side
            document.cookie = "SaArthi_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost; secure; samesite=none;";
            
            return response.data;
        } catch (error) {
            console.error('Error deleting token:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
            throw error; // Re-throw the error so it can be handled by the caller if needed
        }
    }

    const handleLogout = async() => {
        // Delete the cookie
        await deleteSaArthiToken()

        // Navigate to the login page
        navigate('/login');
    };

    const { toggleDarkMode } = useOutletContext();

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="/SaArthi-logo.jpg" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">SaArthi</span>
                            </a>

                            {/* toggle dark btn */}
                            <div>
                                <label className="inline-flex items-center cursor-pointer">

                                    <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300"><MdOutlineLightMode /></span>

                                    <input type="checkbox" value="" className="sr-only peer" onClick={toggleDarkMode} />

                                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"><MdDarkMode /></span>
                                </label>
                            </div>

                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded={isDropdownOpen ? "true" : "false"} onClick={toggleDropdown} data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src={`${userDetails.profileImageURL}`} alt="user photo" />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            {userDetails.name}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            {userDetails.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" onClick={handleLogout} >Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">

                        <li>
                            <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaHandsAslInterpreting className='text-2xl' />
                                <span className="ms-3">Transcribe</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/chat" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdMarkUnreadChatAlt className='text-lg' />
                                <span className="ms-3">Chat</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaUserAlt className='text-xl' />
                                <span className="ms-3">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={handleLogout}>
                                <TbLogout2 className='text-xl font-black' />
                                <span className="ms-3">Logout</span>
                            </p>
                        </li>

                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <Outlet />
                </div>
            </div>

        </>
    )
}


//loader function
export const getLoggedUserDetails = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/loggedUserDetails`, {
            credentials: "include"
        });
        const userDetails = await response.json();
        if (userDetails.login === false) {
            window.open('/login', '_parent')
            return {};
        }
        delete userDetails.iat;
        return userDetails;
    } catch (error) {
        console.log("error occurred : ", error)
        return {};
    }
}