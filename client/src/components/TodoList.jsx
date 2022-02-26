import React from 'react'
import { Card, CardHeader, Stack, IconButton } from '@mui/material'
import { DeleteForever, CheckCircle } from '@mui/icons-material/';

export default function TodoList({ todos }) {

	const todoAction = <Stack direction='row' spacing={2}>
		<IconButton color='success'>
			<CheckCircle />
		</IconButton>
		<IconButton color='error'>
			<DeleteForever />
		</IconButton>
	</Stack>

  return (
    <Card sx={{ mb: 2, maxWidth: 360 }}>
	<CardHeader title={todos} action={todoAction}>
	</CardHeader>
    </Card>
  )
}
