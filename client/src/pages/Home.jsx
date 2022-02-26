import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [error, setError] = useState('')
  const [privateData, setPrivateData] = useState('')

  const navigate = useNavigate()

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
  if(error) return <div>{error}</div>
  return (
    <div>{privateData}</div>
  )
}

export default Home