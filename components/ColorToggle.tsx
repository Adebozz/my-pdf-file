'use client'

import { IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ColorToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
    />
  )
}
