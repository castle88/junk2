import { Stack } from '@mui/material'
import TodoItem from './TodoItem'

export default function TodoList({ todos, setTodos }) {

  return (
    <Stack direction="column" spaceing={2}>
	{todos.map(todo => (
		<TodoItem key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />
	))}
    </Stack>
  )
}
