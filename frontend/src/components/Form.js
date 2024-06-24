import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Form = () => {
  const [todo, setTodo] = useState("");
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const addTodo = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in");
      return;
    }

    if (!todo) {
      return;
    }

    const newTodo = { title: todo, checked: false };

    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setTodo("");
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form className="w-full py-4 px-4 md:px-24 lg:px-48 flex justify-between items-center gap-4 md:gap-6">
      <input
        className="w-full py-2 px-4 font-bold font-poppins-sb text-gray-600 bg-[#eeeeee] rounded-md outline-none focus:ring focus:ring-blue-400 duration-150"
        placeholder="Enter a Todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button
        className="py-2 px-4 flex justify-between items-center gap-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-900 active:ring active:ring-blue-400 duration-150"
        onClick={addTodo}
      >
        Add
        <FaPlus />
      </button>
    </form>
  );
};

export default Form;
