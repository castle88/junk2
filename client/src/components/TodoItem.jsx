import { Card, CardHeader, Stack, IconButton } from '@mui/material'
import { DeleteForever, CheckCircle } from '@mui/icons-material/';
import axios from 'axios'

export default function TodoItem({ todo, todos, setTodos }) {

	const handleDelete = async () => {
		const config = { 
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authtoken')}`
			}
		}
		try{
			const { data } = await axios.delete(`http://localhost:3333/api/todos/delete/${todo._id}`, config)

			setTodos((prev) => {
				const newTodos = prev.filter(x => x._id !== data.todo)
				return newTodos
			})
		}catch(err){
			console.log(err)
		}
	}

	const handleUpdate = async () => {
		const config = { 
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authtoken')}`
			}
		}
		try{
			const { data } = await axios.put(`http://localhost:3333/api/todos/update`, { todo }, config)
			
			setTodos((prev) => {
				const newTodos = prev.map(x => x._id === todo._id ? { ...todo, complete: !todo.complete } : x)
				return newTodos
			})
		}catch(err){
			console.log(err)
		}
	}

	const todoAction = <Stack direction='row' spacing={2}>
		<IconButton onClick={handleUpdate} sx={{ml:2}} color='success'>
			<CheckCircle />
		</IconButton>
		<IconButton onClick={handleDelete} color='error'>
			<DeleteForever />
		</IconButton>
	</Stack>
  return (
    <Card sx={{ mb: 2, maxWidth: 360, backgroundColor: `${todo.complete && '#333'}` }}>
	<CardHeader title={todo.todo} action={todoAction} />
    </Card>
  )
}
