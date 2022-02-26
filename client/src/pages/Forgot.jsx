import { Box, Card, CardContent, TextField, Typography, Button, Stack, formControlLabelClasses, formGroupClasses } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Forgot() {
	const { error, setError } = useState('')
	const [sent, setSent] = useState(false)
	const [formFields, setFormFields] = useState({
		email: '',
	})
	const { email } = formFields

	const navigate = useNavigate()


	const handleChange = (e) => {
		setFormFields((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const config = {
			headers: {
				'Content-Type': 'application/json',
			}
		}
		try{
			const { data } = await axios.post('http://localhost:3333/api/auth/forgotPassword', { email }, config)
			//setError('Email has been sent')
			console.log(data.token)
			
			if(data) setSent(true)
			
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
				<Typography variant='h4' component='h2' gutterBottom>Forgot Password</Typography>
				{error !== '' && <Typography variant='body'>{error}</Typography>}
				{sent && <Typography variant='body'>Password reset email sent</Typography>}
				<TextField label='email' type='email' name='email' value={email} onChange={handleChange} />
				{error !== '' && <Typography>{error}</Typography>}
				<Button type='submit' variant='contained'>Submit</Button>
			</Stack>
			<Button onClick={() => navigate('/login')}>Login</Button>
		</CardContent>
	</Card>
    </Box>
  )
}

export default Forgot