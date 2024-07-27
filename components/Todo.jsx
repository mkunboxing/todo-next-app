import React from "react";

const Todo = ({id, title, description, mongoId, isCompleted, deleteTodo, completeTodo}) => {
  return (
    <tr className="border-b text-black">
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap text-black"
      >
        {id+1}
      </th>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>{title}</td>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>{description}</td>
      <td className="px-6 py-4">{isCompleted?"Completed":"Pending"}</td>
      <td className="px-6 py-4 flex gap-1">
        <button onClick={() => deleteTodo(mongoId)} className="py-2 px-4 bg-red-500 text-white">Delete</button>
      {isCompleted?"" :<button onClick={() => completeTodo(mongoId)} className="py-2 px-4 bg-green-500 text-white">Done</button>}</td>
    </tr>
  );
};

export default Todo;
