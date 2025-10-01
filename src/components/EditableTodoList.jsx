import React, { useState } from "react";

function EditableTodoList({darkMode}) {
  const [todos, setTodos] = useState(["Learn React", "Build App"]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const addTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setMessage({ msg: "todo added succesfully", type: "success" });
      setShowMessage(true);
      setInput("");
    } else {
      setMessage({ msg: "first add some text for your todo", type: "blank" });
      setShowMessage(true);
    }

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const closeMessage = () => {
    setShowMessage(false);
    setTimeout(() => setMessage(""), 500);
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setMessage({ msg: "todo removed", type: "blank" });
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className={`container mx-auto w-full flex justify-center transition-all duration-700 ease-in-out ${darkMode ? 'pt-6' : 'pt-3'} `}>
      <div className="items-center flex-col flex gap-10   md:gap-6 justify-center max-w-2xl w-full relative p-2 sm:p-5 md:p-10">
      <h2 className="text-lg sm:text-4xl lg:text-5xl font-bold tracking-wide text-emerald-300  mb-3 font-serif text-shadow">
        Todo List
      </h2>
      {/* warning or success message */}
      {message && (
        <span
          className={`flex justify-between text-left text-sm w-3/4 px-2 py-1 rounded text-white transition-all duration-300 ease-in-out transform absolute -top-2 left-1/2 -translate-x-1/2 z-10
       ${message.type === "success" ? "bg-green-500" : "bg-red-500"}
       ${
         showMessage
           ? "opacity-100 translate-y-0 scale-100"
           : "opacity-0 -translate-y-4 scale-95"
       }
       `}
        >
          {message.msg}{" "}
          <button
            onClick={closeMessage}
            className="font-bold text-white hover:bg-black hover:bg-opacity-20 px-1 rounded"
          >
            ×
          </button>{" "}
        </span>
      )}

      {/* adding new todo */}
      <div className="flex gap-3 w-full item-center justify-between ">
        <input
          name="todoInput"
          className="px-4 py-2 w-3/4 rounded-lg border  border-green-400 flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={input}
          placeholder="Enter your todo here..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="rounded-md px-6 py-1 bg-green-400 text-white border border-green-400 transition-all duration-300 ease-in-out hover:scale-95 hover:bg-white hover:text-green-400 "
        >
          Add
        </button>
      </div>

      {/* todo list */}
      <ul className={`mt-2 rounded-md bg-green-300 px-4 py-6 w-full h-full max-h-80 overflow-y-scroll scrollbar-custom shadow-lg ${darkMode ? 'shadow-white' : 'shadow-slate-500'}`}>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="border-b border-white p-2 flex gap-3 justify-between items-center"
          >
            <span className="text-black font-semibold flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
              ({index + 1}) {todo}
            </span>

            <button
              onClick={() => removeTodo(index)}
              className="bg-white border border-red-600 hover:bg-red-300 text-white p-3 rounded-full transition-all duration-300 ease-in-out flex-shrink-0"
            >
              <img
                src="/dustbin.svg"
                alt="Delete"
                className="w-6 h-6 hover:scale-125 transition-transform duration-300 ease-in-out"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>

    
  );
}

export default EditableTodoList;
