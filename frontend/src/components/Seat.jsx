import { Badge, Text } from '@chakra-ui/react'
import React from 'react'

export default function Seat({ seatNumber, isBooked }) {
	return (
		<Badge
			h="fit-content"
			w="50px"
			display={'flex'}
			justifyContent={'center'}
			p="1"
			colorScheme={isBooked ? 'red' : 'green'}
			rounded={'md'}
		>
			<Text align={'center'} fontSize="md" fontWeight={'bold'} as="b">
				{seatNumber}
			</Text>
		</Badge>
	)
}
