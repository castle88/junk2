import { Box, Card, CardContent, TextField, Typography, Button, Stack } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
	const [error, setError] = useState('')
	const [formFields, setFormFields] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const { email, password } = formFields

	const handleChange = (e) => {
		setFormFields((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try{
			const { data } = await axios.post(
				'http://localhost:3333/api/auth/login', formFields, config
			)

			localStorage.setItem('authtoken', data.token)

			navigate('/')
		}catch(err){
			setError(err.response.data.error)
			setTimeout(() => {
				setError('')
			}, 5000)
		}
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
				<Typography variant='h4' component='h2' gutterBottom>Login</Typography>
				{error !== '' && <Typography variant='body'>{error}</Typography>}
				<TextField label='email' type='email' name='email' value={email} onChange={handleChange} />
				<TextField label='password' type='password' name='password' value={password} onChange={handleChange} />
				<Button type='submit' variant='contained'>Submit</Button>
			</Stack>
			<Button onClick={() => navigate('/forgotPassword')}>Forgot Password?</Button>
			<Button onClick={() => navigate('/register')}>Register</Button>
		</CardContent>
	</Card>
    </Box>
  )
}

export default Login