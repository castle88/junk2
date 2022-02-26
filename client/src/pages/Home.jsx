import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { Box, Stack } from '@mui/material'

function Home() {
  const [error, setError] = useState('')
  const [privateData, setPrivateData] = useState('')

  const navigate = useNavigate()

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'hsl(0, 0%, 50%)'
  }

  useEffect(() => {
    if(!localStorage.getItem('authtoken')) navigate('/login')

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`
        }
      } 
      try{
        const { data } = await axios.get('http://localhost:3333/api/todos/', config)
        
        setPrivateData(data.username)
      }catch(err){
        console.log(err)
        localStorage.removeItem('authtoken')
        setError('You are not authorized please login')
      }
    }

    fetchPrivateData()
  }, [navigate])
  if(error) {
    setTimeout(()=>navigate('/login'), 3000)
    return <div>{error}</div>
  }
  return (
    <Box sx={pageStyle}>
      <Stack direction='column'>
        <TodoList todos={privateData} />
        <TodoForm />
      </Stack>
    </Box>
  )
}

export default Home