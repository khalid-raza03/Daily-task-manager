import { useState, useEffect } from "react";

function TodoForm({
  todos,
  setTodos,
  setMessage,
  setShowMessage,
  editingTodo,
  onUpdateTodo,
  onCancelEdit,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
      setDesc(editingTodo.description);
      setDeadline(editingTodo.deadline || "");
      setIsModalOpen(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setName("");
      setDesc("");
      setDeadline("");
    }
  }, [editingTodo]);

  const handleSubmit = () => {
    if (name && desc) {
      const todoData = { name, description: desc, deadline };
      if (editingTodo) {
        onUpdateTodo(todoData);
      } else {
        setTodos([...todos, todoData]);
        setMessage({ msg: "todo added successfully", type: "success" });
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
      setName("");
      setDesc("");
      setDeadline("");
      setIsAnimating(false);
      setTimeout(() => setIsModalOpen(false), 300);
    } else {
      setMessage({
        msg: "first add name and description for your todo",
        type: "blank",
      });
      setShowMessage(true);
      setIsAnimating(false);
      setTimeout(() => setIsModalOpen(false), 300);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  const handleCancel = () => {
    onCancelEdit();
    setIsAnimating(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setTimeout(() => setIsAnimating(true), 10);
        }}
        className=" hover:scale-125 transition-transform duration-300 ease-in-out fixed bottom-10 right-4"
      >
        <img src="/plus.png" alt="Add Todo" className="w-12 h-12  bg-white p-1 rounded-full" />
      </button>
      {isModalOpen && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
          isAnimating ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
        }`}>
          <div className={`flex gap-5 w-[90%] sm:w-3/4 lg:w-1/2 items-center flex-wrap justify-between flex-col backdrop-blur-lg bg-emerald-500/70 border border-white/20 shadow-xl px-4 py-16 rounded-lg relative transition-all duration-300 ease-in-out transform ${
            isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <button
              onClick={() => {
                setIsAnimating(false);
                setTimeout(() => setIsModalOpen(false), 300);
              }}
              className="absolute top-2 right-2 text-lg font-bold text-gray-500 bg-white px-4 py-2 rounded-full hover:text-gray-800 hover:scale-90 transition-all duration-200 ease-in-out"
            >
              ✖
            </button>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-3">
              Enter Your Todo Details
            </h3>
               <div className="md:w-2/3 sm:w-3/4 w-full  flex justify-start flex-col">
              <label
                htmlFor="deadlineInput"
                className="text-start text-white  sm:font-medium sm:mb-2 mb-1 text-sm md:text-lg"
              >
                Enter Name
              </label>
                <input
              name="todoInput"
              className="px-4 py-3  w-full rounded-xl border sm:text-sm text-xs border-green-400 flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={name}
              placeholder="Enter your todo name..."
              onChange={(e) => setName(e.target.value)}
            />
            </div>
          
            <div className="md:w-2/3 sm:w-3/4 w-full flex justify-start flex-col">
              <label
                htmlFor="deadlineInput"
                className="text-start text-white sm:font-medium sm:mb-2 mb-1 text-sm md:text-lg"
              >
                Enter Description
              </label>

                <input
              name="todoInput"
              className="px-4 py-5  w-full rounded-xl border sm:text-sm text-xs  border-green-400 flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={desc}
              placeholder="Enter todo description..."
              onChange={(e) => setDesc(e.target.value)}
            />
            </div>
          
            <div className="md:w-2/3 sm:w-3/4 w-full flex justify-start flex-col">
              <label
                htmlFor="deadlineInput"
                className="text-start text-white sm:font-medium sm:mb-2 mb-1 text-sm md:text-lg"
              >
                Set deadline 
              </label>

                 <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Set deadline of your todo..."
              className="px-4 py-3 w-full rounded-xl border sm:text-sm text-xs text-[#26a1f4] font-bold  border-green-400 flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            </div>
         
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="rounded-lg px-8 py-2 bg-emerald-600/80 text-white border border-emerald-500 hover:bg-white hover:text-emerald-500  transition-all duration-300 ease-in-out hover:scale-90 "
              >
                {editingTodo ? "Update" : "Add"}
              </button>
              {editingTodo && (
                <button
                  onClick={handleCancel}
                  className="rounded-md px-6 py-1 bg-gray-400 text-white border border-gray-400 transition-all duration-300 ease-in-out hover:scale-95 hover:bg-white hover:text-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoForm;
