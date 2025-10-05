import React from "react";

function Navbar({darkMode, setDarkMode}) {
  return (
    <div className={`${
            darkMode ? "bg-gradient-to-br from-[#0F172A] to-[#1E293B]" : "bg-gradient-to-bl from-[#9a69ee] to-[#C084FC]"
          }  w-full`}>
      <div className="container  mx-auto w-full flex justify-center items-center gap-4 sm:gap-6">
        <ul className="flex items-center gap-3 sm:gap-5  italic">
          <li className={`text-md py-8 px-2 text-[#E0F2FE] ${
            darkMode ? "hover:bg-[#1E293B]" : "hover:bg-[#9a69ee]"} cursor-pointer transition-all ease-in-out duration-300 font-semibold `}>
            Home
          </li>
          <li className={`text-md py-8 px-2 text-[#E0F2FE] ${
            darkMode ? "hover:bg-[#1E293B]" : "hover:bg-[#9a69ee]"} cursor-pointer transition-all ease-in-out duration-300 font-semibold `}>
             <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/khalid-raja-0aa797187/">About </a>
          </li>
          <li className={`text-md py-8 px-2 text-[#E0F2FE] ${
            darkMode ? "hover:bg-[#1E293B]" : "hover:bg-[#9a69ee]"} cursor-pointer transition-all ease-in-out duration-300 font-semibold `}>
             <a target="_blank" rel="noopener noreferrer" href="https://khalid-raza03.github.io/my-portfolio-app/#contacts">Contact</a>
          </li>
        </ul>
        <button 
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        className="flex w-10 h-10 p-1 rounded-full bg-white hover:bg-gray-200 transition-colors items-center justify-center">
          <img src={darkMode ? '/sun.png': '/moon.png'} className="h-7 w-7" alt="dark-mode-toggle" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
