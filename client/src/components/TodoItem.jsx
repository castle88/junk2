import { Card, CardHeader, Stack, IconButton } from '@mui/material'
import { DeleteForever, CheckCircle } from '@mui/icons-material/';
import { useState } from 'react'

export default function TodoList({ todo }) {
	const todoAction = <Stack direction='row' spacing={2}>
		<IconButton sx={{ml:2}} color='success'>
			<CheckCircle />
		</IconButton>
		<IconButton color='error'>
			<DeleteForever />
		</IconButton>
	</Stack>

  return (
    <Card sx={{ mb: 2, maxWidth: 360 }}>
	<CardHeader title={todo.todo} action={todoAction} />
    </Card>
  )
}
