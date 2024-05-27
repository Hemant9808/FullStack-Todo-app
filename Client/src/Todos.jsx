import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { removeTodo } from "./features/TodoSlice";
import { list } from "postcss";
export default function Todos() {
  const [todos, setTodos] = useState([]);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setdDescription] = useState("");
  const [id, setId] = useState("");
  const [editTodo, setEditTodo] = useState("");

  const deleteTodo = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "delete",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("todo deleted");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // const dispatch = useDispatch()
  // const todos = useSelector(state=>state.todos)
  useEffect(() => {
    const fetchtodos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/getTodos");
        const data = await response.json();
        setTodos(data);
        setCount(data.length);
      } catch {
        console.error("Error fetching todos:", error);
      }
    };
    fetchtodos();
  }, []);

  const fetchTodoByid = async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/getTodoById/${id}`,
      { method: "get" }
    );
    const data = await response.json();
    setEditTodo(data);
    console.log(editTodo);
    setdDescription(data.description);
    setTitle(data.title);
    setId(id);
    console.log(id);
    setOpen(true);
  };

  const updateTodo = async () => {
    try {
      const todo = { title, description };
      console.log("updatetodo se hu", todo);
      console.log("updatetodo se hu", id);
      const response = await fetch(
        `http://localhost:4000/api/updateTodo/${id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, description: description }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedTodo = await response.json();
      console.log("Success:", todo);

      alert("To-Do updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update To-Do");
    }
  };

  // const upadateTodo = async (id) => {
  //   const todo = { title, description };
  //   console.log(todo);
  //   console.log(id);
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:4000/api/updateTodo/${id}`,todo
  //     );
  //     // console.log("Success:", response.data);

  //   } catch (error) {
  //     console.error("Error:", error);

  //   }
  // };

  return (
    <div>
      <div className="p-4 h-auto">
        <li className=" grid h-auto lg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-5 mt-[90%] md:mt-[25%] sm:mt-[50%]   ">
        {todos.map((todo) => (
          <div className="bg-black h-[250px] rounded-lg col-span-1 p-2 flex flex-col gap-2">
            <div className="bg-blue-700 p-1 text-gray-300 rounded-lg h-auto text-xl font-semibold flex justify-between"><div>{todo.title} </div> <div className="bg-gray-900 rounded-[13px] flex justify-center items-center px-2"><input
          className="bg-black "
          type="checkbox"
       
        /></div> </div>
            <div className="bg-[#57A6A1] p-1  rounded-lg h-full text-[16px] text-gray-800 font-semibold text-wrap overflow-hidden "> {todo.description}</div>
            <div>
                <button
                  className="bg-red-700 px-5 text-gray-300 py-1 rounded-md"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>{" "}
                <button
                  className="bg-blue-700 text-gray-300 px-5 py-1 rounded-md"
                  onClick={() => {
                    fetchTodoByid(todo._id);
                  }}
                >
                  Edit
                </button>
              </div>
          </div>
        ))}
          </li>
        
      </div>
      <Transition show={open}>
        {editTodo && (
          <Dialog className="absolute bg-gray-700 z-10 w-" onClose={setOpen}>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-gray-400 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-gray-500 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                      
                        <div className="mt-3 w-[100%] text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-xl font-semibold text-white leading-6"
                          >
                            Upadte Todo
                          </DialogTitle>
                          <div className="mt-2   w-[100%]">
                            <form
                              // onSubmit={upadateTodo}
                              className="flex flex-col gap-5"
                            >
                              <input
                                className="bg-gray-700 text-white  w-[100%] rounded-md min-h-[40px] p-3"
                                placeholder="title"
                                required="true"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                              ></input>
                              <textarea
                                className="bg-gray-700 text-white rounded-md min-h-[200px] p-3 "
                                placeholder="description"
                                required="true"
                                value={description}
                                onChange={(e) => {
                                  setdDescription(e.target.value);
                                }}
                              ></textarea>

                              <button
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                                // type="submit"
                                onClick={updateTodo}
                              >
                                Update
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        data-autofocus
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        )}
      </Transition>
    </div>
  );
}
