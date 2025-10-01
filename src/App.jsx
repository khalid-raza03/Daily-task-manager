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
    <div className={`min-h-screen flex flex-col items-center transition-all duration-300 ease-in-out justify-start pt-0 ${darkMode ? 'bg-slate-700' : 'bg-amber-100'}  `}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <EditableTodoList darkMode={darkMode} />
    </div>
  );
}

export default App;
