import { IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function StyleColorMode() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label="Search database"
			icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
			size="md"
			onClick={toggleColorMode}
		/>
	)
}

export default StyleColorMode
