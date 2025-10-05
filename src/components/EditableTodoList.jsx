import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

function EditableTodoList({ darkMode }) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      const parsedTodos = JSON.parse(saved);
      return parsedTodos.map((todo) => ({
        ...todo,
        completed: todo.completed ?? false,
      }));
    }
    return [
      {
        id: Date.now(),
        name: "sample todo",
        description: "description",
        completed: false,
      },
    ];
  });

  const generateId = () => Date.now() + Math.random();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [manageTodo , setmanageTodo] = useState(true);

  const closeMessage = () => {
    setShowMessage(false);
    setTimeout(() => setMessage(""), 500);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setMessage({ msg: "todo removed", type: "blank" });
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const editTodo = (id) => {
    setEditingId(id);
  };

  const updateTodo = (updatedTodo) => {
    const newTodos = todos.map((todo) =>
      todo.id === editingId ? { ...updatedTodo, id: editingId } : todo
    );
    setTodos(newTodos);
    setEditingId(null);
    setMessage({ msg: "Todo updated", type: "success" });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div
      className={`container mx-auto w-full flex justify-center transition-all duration-700 ease-in-out ${
        darkMode ? "pt-4" : "pt-3"
      } `}
    >
      <div className="items-center flex-col flex gap-4   md:gap-6 justify-center max-w-3xl w-full relative p-2 sm:p-4 md:p-6">
        <h2
          className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wide bg-gradient-to-r from-purple-600 to-[#26a1f4] text-transparent bg-clip-text mb-3 font-serif `}
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
          editingTodo={
            editingId !== null
              ? todos.find((todo) => todo.id === editingId)
              : null
          }
          generateId={generateId}
          onUpdateTodo={updateTodo}
          onCancelEdit={cancelEdit}
          darkMode={darkMode}
        />

        {/* todo list */}
        <ul
          className={`mt-2 rounded-xl ${
            darkMode ? "bg-[#1E3A8A]" : "bg-[#E9D5FF]"
          }  p-3 sm:px-4 sm:py-6 w-full h-full max-h-[340px] min-h-[250px]  sm:max-h-[450px] overflow-y-scroll scrollbar-custom shadow-lg ${
            darkMode ? "shadow-[#22d3ee]" : "shadow-purple-400"
          }`}
        >
          {todos.length === 0 ? (
            <li className="text-center text-purple-600-700 py-4 text-sm sm:text-2xl">
              Your todo is empty ! Add and manage your todos here
            </li>
          ) : (
            todos.map((todo, index) => (
              <li
                key={todo.id}
                className={`border-b border-white p-2 flex gap-3 transition-all duration-300 ease-in-out justify-between rounded-xl  items-center ${
                  todo.completed ? "show" : ""
                } completed-todo  `}
              >
                <div className="flex-1 flex flex-col gap-y-3">
                  <div
                    className={`${
                      darkMode ? "text-[#ffffff]" : "text-[#3B0764]"
                    }  ${
                      todo.completed
                        ? "line-through text-gray-700 italic"
                        : "no-underline"
                    } text-base sm:text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap`}
                  >
                    ({index + 1}) {todo.name}
                  </div>
                  {todo.description && (
                    <div
                      className={`${
                        darkMode ? "text-slate-300" : "text-[#69239e]"
                      } ${
                        todo.completed
                          ? "line-through   italic"
                          : "no-underline"
                      }  italic text-xs sm:text-sm text-wrap max-w-md mt-3 leading-6 tracking-wide`}
                    >
                      {todo.description}
                    </div>
                  )}
                  {todo.deadline && (
                    <div
                      className={`  text-xs sm:text-sm mt-2 font-medium ${
                        todo.completed ? "text-white" : "text-[#26a1f4]"
                      }`}
                    >
                      📌 {new Date(todo.deadline).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Desktop buttons - for sm and larger screen*/}
                <div className="hidden sm:flex gap-2">
                  <button
                    className="p-3 flex-shrink-0 bg-white rounded-full"
                    title="mark done"
                    onClick={() => toggleComplete(todo.id)}
                  >
                    <img
                      src={todo.completed ? "/remove.png" : "/checkmark.png"}
                      alt="checkmark"
                      className="w-6 hover:scale-125 transition-transform duration-300 ease-in-out"
                    />
                  </button>
                  <button
                    title="Edit todo"
                    onClick={() => editTodo(todo.id)}
                    className="p-3 flex-shrink-0 bg-[#26a1f4] rounded-full border border-white"
                  >
                    <img
                      src="/edit.png"
                      alt="Edit"
                      className="w-6 hover:scale-125 transition-transform duration-300 ease-in-out"
                    />
                  </button>
                  <button
                    title="Delete todo"
                    onClick={() => removeTodo(todo.id)}
                    className="bg-white border border-purple-600 text-white p-3 rounded-full transition-all duration-300 ease-in-out flex-shrink-0"
                  >
                    <img
                      src="/dustbin.svg"
                      alt="Delete"
                      className="w-6 h-6 hover:scale-125 transition-transform duration-300 ease-in-out"
                    />
                  </button>
                </div>

                {/* Mobile dropdown - for mobile screen */}
                <div className="sm:hidden relative">
                  <button
                    title="manage todo options"
                    onClick={() => setDropdownOpen(dropdownOpen === todo.id ? null : todo.id)}
                    className="hover:scale-125 transition-transform duration-300 ease-in-out"
                  >
                    <img
                      src="/dots.png"
                      alt="manage todo options"
                      className="w-6 h-6 bg-white p-1 rounded-full"
                    />
                  </button>
                  
                  {dropdownOpen === todo.id && (
                    <div className="absolute right-7 -top-[52px] bg-white rounded-lg shadow-lg border p-2  min-w-[120px] z-40">
                      <button
                        onClick={() => {
                          toggleComplete(todo.id);
                          setDropdownOpen(null);
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-left text-sm"
                      >
                        <img src={todo.completed ? "/remove.png" : "/checkmark.png"} alt="toggle" className="w-4 h-4" />
                        {todo.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        onClick={() => {
                          editTodo(todo.id);
                          setDropdownOpen(null);
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-left text-sm"
                      >
                        <img src="/edit.png" alt="edit" className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          removeTodo(todo.id);
                          console.log("deleting");
                          
                          setDropdownOpen(null);
                        }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-left text-sm text-red-600"
                      >
                        <img src="/dustbin.svg" alt="delete" className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default EditableTodoList;
