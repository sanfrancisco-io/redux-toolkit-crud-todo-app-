import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useAppDispatch } from "./redux/hooks";
import { createTodo, fetchTodos } from "./redux/slices/todos.slice";

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleSubmit = (values: any) => {
    dispatch(createTodo(values))
  }


  return (
    <div>
      <TodoForm onSubmit={handleSubmit} />
      <TodoList />
    </div>
  );
}

export default App;
