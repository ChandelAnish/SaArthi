import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.userDetails);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Implement password change logic here, including current password verification
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
  };

  if (!user) {
    return <div className="text-center p-4 text-xl">Loading user data...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg p-8 w-full">
        {/* Left side - Profile Picture */}
        <div className="md:w-1/3 flex justify-center items-center mb-8 md:mb-0"> {/* Center vertically */}
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
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
              >
                Save New Password
              </button>
            </form>
          )}

          {/* Disability Dropdown */}
          <div className="mb-6">
            <label htmlFor="disability" className="block text-gray-700 dark:text-gray-300 mb-2 text-xl">
              Disability:
            </label>
            <select
              id="disability"
              className="border rounded-lg p-3 w-full dark:bg-gray-700 dark:text-white text-xl"
              defaultValue={user.disability || ''}
            >
              <option value="">Select a disability</option>
              <option value="deaf">Deaf</option>
              <option value="mute">Mute</option>
              <option value="blind">Blind</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
