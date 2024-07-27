"use client"
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get('/api');
    setTodos(response.data.todos);
  }

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', {params: {mongoId: id}});
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  const completeTodo = async (id) => {
    try {
      const response = await axios.put('/api', {},{
        params: {mongoId: id}
      });
      toast.success(response.data.msg);
      await fetchTodos();
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({...form, [name]: value}));
    
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // api code

      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({title: "", description: ""});
      await fetchTodos();
    } catch (error) {
      toast.error('Something went wrong');
      
    }
  }
  return (
    <>
    <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input
        onChange={onChangeHandler}
        value={formData.title}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
        onChange={onChangeHandler}
        value={formData.description}
          name="description"
          placeholder="Enter description"
          className="px-3 py-2 border-2 w-full"
          id=""
        ></textarea>
        <button type="submit" className="bg-red-500 text-white px-3 py-2">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-14 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-gray-50  dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((items, index)=>{
              return <Todo key={index} title = {items.title} id= {index} description = {items.description} isCompleted = {items.isCompleted} mongoId = {items._id} deleteTodo = {deleteTodo} completeTodo = {completeTodo} />
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
