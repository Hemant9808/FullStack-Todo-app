import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./features/TodoSlice";
import axios from "axios";
export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setdDescription] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  //  const  addTodoHandler=(e)=>{
  //       e.preventDefault();
  //       dispatch(addTodo(input));
  //       setinput('');

  //  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setTitle("");
    setdDescription("");
    const todo = { title, description };

    try {
      const response = await axios.post("https://full-stack-todo-app-weld.vercel.app/api/todo", todo);
      console.log("Success:", response.data);

      alert("To-Do added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add To-Do");
    }
  };

  return (
    <div className=" fixed w-full bg-gray-900 shadow-lg flex items-center justify-center p-5">
      <form className="flex flex-col md:w-[40%] w-[90%]  gap-5" onSubmit={handleSubmit}>
        <input
          className="bg-gray-700 rounded-md text-white min-h-[40px] p-3"
          placeholder="title"
          required="true"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          className="bg-gray-700 rounded-md text-white min-h-[200px] p-3 "
          placeholder="description"
          required="true"
          value={description}
          onChange={(e) => setdDescription(e.target.value)}
        ></textarea>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
