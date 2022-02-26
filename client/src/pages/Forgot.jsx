import { Box, Card, CardContent, TextField, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Forgot() {
	const [formFields, setFormFields] = useState({
		username: '',
		email: '',
	})

	const navigate = useNavigate()

	const { username, email } = formFields

	const handleChange = (e) => {
		setFormFields((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		console.log(formFields)
	}

	const centerBox = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		backgroundColor: 'hsl(0, 0%, 50%)'
	}

  return (
    <Box sx={centerBox}>
	<Card>
		<CardContent>
			<Stack component='form' onSubmit={handleSubmit} direction='column' spacing={2}>
				<Typography variant='h4' component='h2' gutterBottom>Forgot Password</Typography>
				<TextField label='username' type='text' name='username' value={username} onChange={handleChange} />
				<TextField label='email' type='email' name='email' value={email} onChange={handleChange} />
				<Button type='submit' variant='contained'>Submit</Button>
			</Stack>
			<Button onClick={() => navigate('/login')}>Login</Button>
		</CardContent>
	</Card>
    </Box>
  )
}

export default Forgot