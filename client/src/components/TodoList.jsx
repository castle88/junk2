import { Stack } from '@mui/material'
import TodoItem from './TodoItem'

export default function TodoList({ todos }) {
	console.log(todos)
	console.log(todos[0])
  return (
    <Stack direction="column" spaceing={2}>
	{todos.map(todo => (
		<TodoItem key={todo._id + Date.now().toString()} todo={todo} />
	))}
    </Stack>
  )
}
