import { useState } from 'react'
import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react'
import FileUploader from '../components/FileUploader'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()

  const handleConvert = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      toast({ title: 'PDF converted!', status: 'success' })
    } else {
      toast({ title: 'Conversion failed.', status: 'error' })
    }
  }

  return (
    <Box p={8} position="relative" minH="100vh">
      <VStack spacing={6}>
        <Heading>PDF Converter</Heading>
        <FileUploader onFileAccepted={setFile} />
        <Button onClick={handleConvert} colorScheme="teal" isDisabled={!file}>
          Convert PDF
        </Button>
      </VStack>
    </Box>
  )
}
