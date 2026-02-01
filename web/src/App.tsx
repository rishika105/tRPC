import { trpc } from "../utils/trpc";

function App() {
  const { data, isLoading, error } = trpc.todos.getAllTodos.useQuery();

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Todos</h1>

      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            {todo.isCompleted ? " ✅" : " ❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
