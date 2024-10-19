import Alert from '@/components/common/Alert';
import FileUpload from '@/components/FileUpload';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
    const password = useRef();
    const confirmPassword = useRef();
    const [warningMsg, setWarningMsg] = useState();
    const [confirmPasswordWarningMsg, setConfirmPasswordWarningMsg] = useState();
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [text, setText] = useState("Upload Profile Image");
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [filePath, setFilePath] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticatedUser  = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/authenticatedUser`,{withCredentials: true})
                console.log(response.data)
                navigate('/')
            } catch (error) {
                console.log(error)
                console.log(error.response.data)
            }
        }
        authenticatedUser()
    });

    const handelImageUpload = async (e) => {
        setText("Upload Profile Image");
        setAlertMsg(null);
        const file = e.target.files[0];
        console.log(file);
        const data = new FormData();
        data.set('profileImage', file);
        console.log(data);
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/upload-img`, data);
            setText("Profile Image Loaded");
            // console.log(response.data);
            setFilePath(response.data.filePath);
            // console.log(response.data.filePath);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setText("Failed To Load Image");
            console.log("Some Error Occurred :\n",error);
        }
    };

    const checkPassword = () => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        setWarningMsg('');
        if (pattern.test(password.current.value)) {
            setWarningMsg("strong password");
        } else {
            setWarningMsg("password must contain at least 8 characters, combination of uppercase, numbers & special characters.");
        }
    };

    const validatePassword = () => {
        setConfirmPasswordWarningMsg('');
        if (password.current.value === confirmPassword.current.value) {
            setConfirmPasswordWarningMsg("password matched");
            setPasswordValidation(true);
            return;
        }
        setConfirmPasswordWarningMsg("password doesn't match");
    };

    const handelOnFormSubmit = async (e) => {
        e.preventDefault();
        setAlertMsg(null);
        if (filePath) {
            setText("Profile Image Loaded");
        } else {
            setText("Upload Profile Image");
        }
        const name = e.target.name.value;
        const email = e.target.email.value;
        const disability = e.target.disability.value;
        const passwordValue = e.target.password.value;
        
        const userDetails = { name, email, disability, password: passwordValue, profileImgName: filePath };
        console.log(filePath)
        
        try {
            setSubmit(true);
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, userDetails);
            setSubmit(false);
            console.log(response.data.newUser.profileImageURL)
            if (response.data.newUser.profileImageURL) {
                setText("Image Uploaded");
                if(response.data.signup){
                    navigate('/login')
                }
            }
        } catch (error) {
            setSubmit(false);
            setAlertMsg(`Error Occurred: ${error.response.data.msg}`);
            setText("Failed to Upload Image");
            console.log("error posting the user details :\n",error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='grid xs:grid-cols-1 xs:gap-10 lg:grid-cols-2 items-center justify-center w-3/4 mx-auto'>
                <div>
                    {alertMsg && <Alert msg={alertMsg} />}
                    <FileUpload setText={setText} filePath={filePath} loading={loading} handelImageUpload={handelImageUpload} setFilePath={setFilePath} setAlertMsg={setAlertMsg} />
                    <div>
                        <h4
                            className={`text-sm text-center mt-6 ${text === "Image Uploaded"
                                ? "text-green-500"
                                : (text === "Failed to Upload Image" || text === "Failed To Load Image")
                                    ? "text-red-500"
                                    : text === "Profile Image Loaded"
                                        ? "text-yellow-500"
                                        : "dark:text-white"
                                }`}
                        >
                            {text}
                        </h4>
                    </div>
                </div>

                <div>
                    <h1 className='dark:text-white text-4xl text-center mb-6'>Join Us in Breaking Barriers!</h1>
                    <form className="max-w-sm mx-auto" onSubmit={handelOnFormSubmit}>

                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="text" id="name" name='name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Rahul Kumar" required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email" name='email' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="profession" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disability</label>
                            <select id="disability" name='disability' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value={"None"} >None</option>
                                <option value={"Deaf"} >Deaf</option>
                                <option value={"Blind"} >Blind</option>
                                <option value={"Mute"} >Mute</option>
                                <option value={"Deaf_and_Mute"} >Deaf and Mute</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password" name='password' ref={password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={checkPassword} />
                            <div>
                                <p className={`${(warningMsg === "strong password") ? "text-lime-500" : "text-red-500"} text-xs`}>{warningMsg}</p>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" id="confirm-password" ref={confirmPassword} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={validatePassword} />
                            <div>
                                <p className={`${(confirmPasswordWarningMsg === "password matched") ? "text-lime-500" : "text-red-500"} text-xs`}>{confirmPasswordWarningMsg}</p>
                            </div>
                        </div>

                        <div className="flex items-start mb-1">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">I agree with the terms and conditions</label>
                        </div>

                        <button type="submit" disabled={submit} className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
