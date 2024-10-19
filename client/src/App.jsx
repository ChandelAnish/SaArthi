import 'flowbite';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <Outlet context={{ toggleDarkMode }} />
    </div>
  );
}
