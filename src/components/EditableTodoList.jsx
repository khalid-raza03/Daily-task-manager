import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

function EditableTodoList({ darkMode }) {
  //state for todos with local storage persistence
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
        description: "This is sample description",
        completed: false,
      },
    ];
  });

  const generateId = () => Date.now() + Math.random();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // states for other purpose
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const closeMessage = () => {
    setShowMessage(false);
    setTimeout(() => setMessage(""), 500);
  };

  // helper function to show message with timeout
  const showMessageWithTimeout = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    showMessageWithTimeout({ msg: "todo removed", type: "blank" });
  };

  const editTodo = (id) => {
    // Store which todo is being edited
    setEditingId(id);
  };

  const updateTodo = (updatedTodo) => {
    const newTodos = todos.map((todo) =>
      todo.id === editingId ? { ...updatedTodo, id: editingId } : todo
    );
    setTodos(newTodos);
    setEditingId(null);
    showMessageWithTimeout({ msg: "Todo updated", type: "success" });
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
      <div className="items-center flex-col flex gap-4   md:gap-6 justify-center max-w-4xl w-full relative p-2 sm:p-4 md:p-6">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide bg-gradient-to-r from-[#fb9005d7]  to-[#f7c380] text-transparent bg-clip-text mb-3 font-serif `}
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
            darkMode ? "bg-slate-800/40 " : "bg-transparent"
          }  p-3 sm:px-4 sm:py-6 w-full h-full max-h-[340px] min-h-[250px] backdrop-blur-lg  sm:max-h-[450px] overflow-y-scroll scrollbar-custom shadow-md ${
            darkMode ? "shadow-[#cccccc82]" : "shadow-[#0000003d]"
          }`}
        >
          {todos.length === 0 ? (
            <li
              className={`text-center ${
                darkMode ? "text-white" : "text-[#fb910583]"
              } py-4 text-sm sm:text-2xl`}
            >
              Your todo is empty ! Add and manage your todos here
            </li>
          ) : (
            todos.map((todo, index) => (
              <li
                key={todo.id}
                className={`border-b border-white ${
                  darkMode ? "bg-slate-600/50" : "bg-[#fec57a83]/20 "
                } py-3 px-4 my-2 flex sm:flex-row flex-col gap-3 transition-all duration-300 ease-in-out justify-between rounded-xl items-start sm:items-center ${
                  todo.completed && darkMode
                    ? "show after:bg-[#cccccc]/75"
                    : todo.completed && !darkMode
                    ? "show after:bg-[#fec57a83]/50"
                    : ""
                } completed-todo  `}
              >
                <div className="flex-1 flex flex-col gap-y-3">
                  {/* todo name */}
                  <div
                    className={`${
                      darkMode ? "text-[#ffffff]" : "text-[#3B0764]"
                    }  text-base sm:text-lg md:text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap`}
                  >
                    <span
                      className={` ${
                        todo.completed ? "line-through italic" : "no-underline"
                      }`}
                    >
                      ({index + 1}) {todo.name}
                    </span>{" "}
                    <span className="text-xs italic text-slate-500">
                      #{Math.floor(todo.id)}
                    </span>
                  </div>
                  {/* todo description */}
                  {todo.description && (
                    <div
                      className={`${
                        darkMode ? "text-slate-300" : "text-slate-800"
                      } ${
                        todo.completed
                          ? "line-through   italic"
                          : "no-underline"
                      }  italic text-xs md:text-sm text-wrap max-w-md mt-3 leading-4 tracking-tight text-justify`}
                    >
                      {todo.description}
                    </div>
                  )}
                  {/* todo deadline */}
                  {todo.deadline && (
                    <div
                      className={`  text-xs sm:text-sm mt-2 font-medium ${
                        todo.completed ? "text-white" : "text-[#3B82F6]"
                      }`}
                    >
                      📌 {new Date(todo.deadline).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Desktop buttons - for sm and larger screen*/}
                <div className="hidden sm:flex flex-col gap-3">
                  <div className=" gap-2 flex items-center">
                    <button
                      className="p-3 flex-shrink-0 bg-white rounded-full"
                      title="mark done"
                      onClick={() => toggleComplete(todo.id)}
                    >
                      <img
                        src={todo.completed ? "/remove.png" : "/checkmark.png"}
                        alt="checkmark"
                        className="w-7 hover:scale-125 transition-transform duration-300 ease-in-out "
                      />
                    </button>
                    <button
                      title="Edit todo"
                      onClick={() => editTodo(todo.id)}
                      className="p-3 flex-shrink-0 bg-[#3B82F6] hover:bg-[#2563EB] rounded-full border border-white"
                    >
                      <img
                        src="/edit.png"
                        alt="Edit"
                        className="w-7 hover:scale-125 transition-transform duration-300 ease-in-out "
                      />
                    </button>
                    <button
                      title="Delete todo"
                      onClick={() => removeTodo(todo.id)}
                      className="bg-white border border-purple-600 text-white p-3 rounded-full transition-all duration-300 ease-in-out flex-shrink-0"
                    >
                      <img
                        src="/dustbin.png"
                        alt="Delete"
                        className="w-7 h-7 hover:scale-125 transition-transform duration-300 ease-in-out "
                      />
                    </button>
                    
                  </div>
                  <span
                      className={`text-sm md:text-lg px-4 font-mono font-bold ${
                        todo.completed ? "text-green-600 " : "text-orange-600"
                      }   italic`}
                    >
                      {todo.completed ? "DONE" : "ONGOING"}
                    </span>
                </div>

                {/* Mobile dropdown - for mobile screen */}
                <div className="sm:hidden relative flex flex-row-reverse justify-between w-full items-center">
                  <button
                    title="manage todo options"
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === todo.id ? null : todo.id)
                    }
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
                        <img
                          src={
                            todo.completed ? "/remove.png" : "/checkmark.png"
                          }
                          alt="toggle"
                          className="w-4 h-4"
                        />
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
                        <img
                          src="/dustbin.png"
                          alt="delete"
                          className="w-4 h-4"
                        />
                        Delete
                      </button>
                    </div>
                  )}
                  <span
                      className={`text-md px-4 font-mono font-bold ${
                        todo.completed ? "text-green-600 " : "text-orange-600"
                      }   italic`}
                    >
                      {todo.completed ? "DONE" : "ONGOING"}
                    </span>
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
