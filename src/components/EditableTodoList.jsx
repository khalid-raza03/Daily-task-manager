import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

function EditableTodoList({ darkMode }) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [{ name: "sample todo", description: "description" }];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const closeMessage = () => {
    setShowMessage(false);
    setTimeout(() => setMessage(""), 500);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setMessage({ msg: "todo removed", type: "blank" });
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
  };

  const updateTodo = (updatedTodo) => {
    const newTodos = [...todos];
    newTodos[editingIndex] = updatedTodo;
    setTodos(newTodos);
    setEditingIndex(null);
    setMessage({ msg: "Todo updated", type: "success" });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div
      className={`container mx-auto w-full flex justify-center transition-all duration-700 ease-in-out ${
        darkMode ? "pt-4" : "pt-3"
      } `}
    >
      <div className="items-center flex-col flex gap-4   md:gap-6 justify-center max-w-3xl w-full relative p-2 sm:p-4 md:p-6">
        <h2
          className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wide ${
            darkMode ? "text-purple-300" : "text-purple-500"
          } mb-3 font-serif `}
        >
          To-do List
        </h2>

        {/* warning or success message */}
        {message && (
          <span
            className={`flex justify-between text-left text-xs sm:text-sm w-[90%] sm:w-3/4 px-2 py-1 rounded text-white transition-all duration-300 ease-in-out transform absolute top-14 sm:-top-2 left-1/2 -translate-x-1/2 z-10
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
              className="font-bold text-white text-md hover:bg-black hover:bg-opacity-20 px-1 rounded-md"
            >
              ×
            </button>{" "}
          </span>
        )}

        {/* adding new todo */}
        <TodoForm
          todos={todos}
          setTodos={setTodos}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          editingTodo={editingIndex !== null ? todos[editingIndex] : null}
          onUpdateTodo={updateTodo}
          onCancelEdit={cancelEdit}
          darkMode={darkMode}
        />

        {/* todo list */}
        <ul
          className={`mt-2 rounded-md ${darkMode ? "bg-[#1E3A8A]" : "bg-[#E9D5FF]"}  p-3 sm:px-4 sm:py-6 w-full h-full max-h-[340px]  sm:max-h-[450px] overflow-y-scroll scrollbar-custom shadow-lg ${
            darkMode ? "shadow-[#22d3ee]" : "shadow-purple-400"
          }`}
        >
          {todos.length === 0 ? (
            <li className="text-center text-slate-500 py-4 text-sm sm:text-xl">
              Your todo is empty ! Add and manage your todos here
            </li>
          ) : (
            todos.map((todo, index) => (
              <li
                key={index}
                className="border-b border-white p-2 flex gap-3 justify-between items-center"
              >
                <div className="flex-1 flex flex-col gap-y-3">
                  <div className={`${darkMode ? "text-[#ffffff]" : "text-[#3B0764]"} text-base sm:text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap`}>
                    ({index + 1}) {todo.name}
                  </div>
                  {todo.description && (
                    <div className={`${darkMode ? "text-slate-300" : "text-[#69239e]"}  italic text-xs sm:text-sm text-wrap max-w-md mt-3 leading-6 tracking-wide`}>
                      {todo.description}
                    </div>
                  )}
                  {todo.deadline && (
                    <div className="text-[#26a1f4]  text-xs sm:text-sm mt-2 font-medium">
                      📌 {new Date(todo.deadline).toLocaleString()}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => editTodo(index)}
                  className=" p-2  flex-shrink-0 bg-[#26a1f4] rounded-full"
                >
                  <img
                    src="/edit.png"
                    alt="Delete"
                    className="  w-6 hover:scale-125 transition-transform duration-300 ease-in-out"
                  />
                </button>
                <button
                  onClick={() => removeTodo(index)}
                  className="bg-white border border-purple-600 text-white p-3 rounded-full transition-all duration-300 ease-in-out flex-shrink-0"
                >
                  <img
                    src="/dustbin.svg"
                    alt="Delete"
                    className="w-6 h-6 hover:scale-125 transition-transform duration-300 ease-in-out"
                  />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default EditableTodoList;
