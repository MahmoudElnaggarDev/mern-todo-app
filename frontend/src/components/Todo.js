import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Todo = ({ todo }) => {
  const [todoChecked, setTodoChecked] = useState(false);
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  useEffect(() => {
    setTodoChecked(todo.checked);
  }, [todo]);

  const toggleChecked = async () => {
    await fetch(`/api/todos/${todo._id}`, {
      method: "PATCH",
      body: JSON.stringify({ checked: !todoChecked }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    setTodoChecked(!todoChecked);
  };

  const deleteTodo = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/todos/${todo._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  return (
    <div
      className={
        todoChecked
          ? "w-full pr-5 mt-4 flex justify-between items-center gap-6 bg-gray-200 rounded-lg shadow-md"
          : "w-full pr-5 mt-4 flex justify-between items-center gap-6 bg-white rounded-lg shadow-md"
      }
    >
      <div
        className="w-full pl-5 py-4 h-max flex justify-start items-center gap-6 cursor-pointer"
        onClick={toggleChecked}
      >
        <input
          className="cursor-pointer"
          type="checkbox"
          onChange={toggleChecked}
          checked={todoChecked}
        />
        <p className="font-poppins-md">{todo.title}</p>
      </div>

      <button onClick={deleteTodo}>
        <IoTrash className="material-symbols-rounded text-gray-300 hover:text-gray-600 duration-150 z-20" />
      </button>
    </div>
  );
};

export default Todo;
