import {
	Badge,
	Box,
	Flex,
	Grid,
	Heading,
	Spinner,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import Seat from './Seat'

export default function Compartment({ loading, data }) {
	const getBookedSeats = () => {
		if (!data) return <Spinner size={'sm'} m={'0 0 0 5px'} />
		return data?.filter((item) => item.isBooked).length
	}

	const getNotBookedSeats = () => {
		if (!data) return <Spinner size={'sm'} m={'0 0 0 5px'} />
		return data?.filter((item) => !item.isBooked).length
	}

	const renderCompartment = (
		<>
			{!data ? (
				<Box
					h="fit-content"
					minH={'58vh'}
					w="fit-content"
					minW={'450px'}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Spinner size={'xl'} thickness="5px" color="gray.400" />
				</Box>
			) : (
				<Grid
					templateColumns="repeat(7, 1fr)"
					gap={3}
					border={'1px solid'}
					borderColor={'gray.300'}
					minH={'fit-content'}
					h="80vh"
					minW={'450px'}
					w="fit-content"
					rounded={'md'}
					p="2"
					height={'fit-content'}
				>
					{data?.map((item) => (
						<Seat
							key={item._id}
							isBooked={item.isBooked}
							seatNumber={item.seatNumber}
						/>
					))}
				</Grid>
			)}
		</>
	)

	return (
		<Box
			display={'flex'}
			justifyContent={'center'}
			flexDirection={'column'}
			h="full"
			gap="2"
		>
			{loading ? (
				<Heading size="md" textAlign={'center'}>
					Compartment
				</Heading>
			) : (
				<Text textAlign={'center'} as="b">
					Please Wait...
				</Text>
			)}

			{renderCompartment}

			<Flex gap="2" as="b" justify={'space-around'} color={'gray.700'}>
				<Badge
					variant={'solid'}
					colorScheme="red"
					alignItems={'center'}
					justifyContent={'center'}
					display={'flex'}
					alignContent={'center'}
					p={'2'}
					w={'50%'}
					fontSize={'sm'}
				>
					Booked Seats = {getBookedSeats()}
				</Badge>
				<Badge
					variant={'solid'}
					colorScheme="green"
					alignItems={'center'}
					justifyContent={'center'}
					display={'flex'}
					alignContent={'center'}
					p={'2'}
					w={'50%'}
					fontSize={'sm'}
				>
					Available Seats = {getNotBookedSeats()}
				</Badge>
			</Flex>
		</Box>
	)
}
