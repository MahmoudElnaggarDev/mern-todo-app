import { useEffect } from "react";
import Todo from "../components/Todo";
import NavbarWithForm from "../components/NavbarWithForm";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TodoList = () => {
  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <>
      <NavbarWithForm />
      <div className="w-full p-4 md:px-24 lg:px-48 pt-48 md:pt-44 pb-8 min-h-screen overflow-hidden bg-[#eeeeee]">
        {todos && todos.map((todo) => <Todo key={todo._id} todo={todo} />)}
      </div>
    </>
  );
};

export default TodoList;
