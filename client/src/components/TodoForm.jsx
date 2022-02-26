import { Card, CardContent, TextField, Button, Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'

export default function TodoForm() {
	const [todo, setTodo] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e) => {
		setTodo(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authtoken')}`
			}
		}
		try{
			const { data } = await axios.post('http://localhost:3333/api/todos/create', {
				newTodo: todo,
			}, config)
			
			if(data.success) {
				setSuccess(data.message)
				setTimeout(() => setSuccess(''), 3000)
			}
		}catch(err){
			console.log(err)
			setError('error submitting todo')
			setTimeout(() => setError(''), 3000)
		}
	}

  return (
    <Card sx={{maxWidth: 360}}>
	<CardContent>
		<Stack direction='column' spacing={2} component='form' onSubmit={handleSubmit}>
			<Typography variant='h4' component='h2'>Create a new Todo</Typography>
			{error !== '' && <Typography variant='body'>{error}</Typography>}
			{success !== '' && <Typography variant='body'>{success}</Typography>}
			<TextField name='todo' type='text' label='todo' placeholder='Enter a new Todo' value={todo} onChange={handleChange} />
			<Button type='submit' variant='contained'>Submit</Button>
		</Stack>
		
	</CardContent>
    </Card>
  )
}
