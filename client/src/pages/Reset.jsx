import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, TextField, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Reset() {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [message, setMessage] = useState('')
	const [formFields, setFormFields] = useState({
		password: '',
		password2: ''
	})
	const { password, password2 } = formFields
	
	const { resetToken } = useParams()

	const navigate = useNavigate()


	const handleChange = (e) => {
		setFormFields((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value }
		})
	}

	const formReset = () => {
		setFormFields((prev) => {
			return {
				...prev,
				password: '',
				password2: ''
			}
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if(password !== password2){
			setError('Passwords do not match')
		}else{
			formReset()
			const config = {
				headers: {
					"Content-Type": "application/json"
				}
			}
			try{
				
				const { data } = await axios.put(`http://localhost:3333/api/auth/resetPassword/${resetToken}`, { password }, config)
				
				console.log(data)
				setSuccess(data.success)
				setMessage(data.data)

				setTimeout(() => {
					navigate('/login')
				}, 5000)
			}catch(err){
				setError(err.response.data.error)
				setTimeout(() => {
					setError('')
				}, 5000)
			}
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
			<Stack mb={2} component='form' onSubmit={handleSubmit} direction='column' spacing={2}>
				<Typography variant='h4' component='h2' gutterBottom>Reset Password</Typography>
				{error !== '' && <Typography variant='body'>{error}</Typography>}
				{success && <Typography variant='body'>{message}</Typography>}
				<TextField label='password' type='password' name='password' value={password} onChange={handleChange} />
				<TextField label='confirm password' type='password' name='password2' value={password2} onChange={handleChange} />
				<Button type='submit' variant='contained'>Submit</Button>
			</Stack>
			<Button onClick={() => navigate('/login')}>Login</Button>
		</CardContent>
	</Card>
    </Box>
  )
}
