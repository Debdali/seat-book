import { Box, Flex, Heading } from '@chakra-ui/react'
import StyleColorMode from './StyleColorMode'

export default function Header() {
	return (
		<Heading size="lg">
			<Flex justify={'space-between'} align={'center'} p="5">
				<Box as="span" width={'50px'} />
				<Box as="span" color={'primary'}>
					Seat Booking
				</Box>
				<StyleColorMode />
			</Flex>
		</Heading>
	)
}
