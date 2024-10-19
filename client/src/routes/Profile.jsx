import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userDetailsSliceAction } from '../store/UserDetails';

const Profile = () => {
  const user = useSelector((store) => store.userDetails);
  const dispatch = useDispatch()

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [warning, setWarning] = useState('');


  useEffect(()=>{
    console.log(user)
  })

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    // Check if the current password is correct
    if (currentPassword !== user.password) {
      setWarning('Current password is incorrect.');
      return;
    }

    // Clear warning if the password is correct
    setWarning('');
    
    // Update user password
    const updatedUserInfo = {
      password: newPassword, // Update the new password
    };

    // Send request to update user info
    axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/updateUserInfo`, updatedUserInfo, {withCredentials: true})
      .then((response) => {
        console.log('User information updated successfully:', response.data);
        // Reset fields after successful update
        setIsChangingPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setWarning('User details Updated');
        dispatch(userDetailsSliceAction.getUserDetails({...user,password: newPassword}))
      })
      .catch((error) => {
        console.error('Error updating user information:', error);
        setWarning('Failed to update user information. Please try again.');
      });
  };

  if (!user) {
    return <div className="text-center p-4 text-xl">Loading user data...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-800 p-4">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg p-8 w-full">
        {/* Left side - Profile Picture */}
        <div className="md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
          <img
            src={user.profileImageURL || 'https://via.placeholder.com/300'}
            alt="Profile"
            className="rounded-full w-64 h-64 object-cover border-8 border-blue-500 dark:border-blue-400"
          />
        </div>

        {/* Right side - User Information */}
        <div className="md:w-2/3 md:pl-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">{user.name || 'No Name'}</h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">{user.email || 'No Email'}</p>

          {/* Password Change Section */}
          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl mb-6"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="mb-6">
              {warning && <p className={(warning === 'User details Updated')? "text-green-500" :"text-red-500"}>{warning}</p>}
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="border rounded-lg p-3 mr-2 dark:bg-gray-700 dark:text-white text-xl w-full mb-3"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="border rounded-lg p-3 mr-2 dark:bg-gray-700 dark:text-white text-xl w-full mb-3"
              />
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl ${
                  currentPassword !== user.password ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentPassword !== user.password} // Disable if the password is incorrect
              >
                Save New Password
              </button>
            </form>
          )}

          {/* Disability Display (uneditable) */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-xl">
              Disability:
            </label>
            <p className="border rounded-lg p-3 w-full dark:bg-gray-700 dark:text-white text-xl">
              {user.disability || 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
