import EditableTodoList from "./components/EditableTodoList";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

//function for filling data in components
function App() {
   const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col items-center  transition-all duration-300 ease-in-out justify-start pt-0 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#cccccc]'}  `}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <EditableTodoList darkMode={darkMode} />
      
      <div className="text-center text-xs sm:text-md text-[#1E40AF] mt-10  bg-white rounded-2xl px-6 py-2 ">
        <p>Made with ❤️ by <a className="text-[#26a1f4] font-bold" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/khalid-raja-0aa797187/">Khalid Raja</a></p>
      </div>
    </div>
  );
}

export default App;
