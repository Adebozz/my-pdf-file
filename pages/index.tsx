import { useState } from 'react'
import { Box, Heading, Button, useToast } from '@chakra-ui/react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleConvert = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      toast({
        title: 'PDF converted!',
        status: 'success',
        duration: 3000,
      })
      // handle preview...
    } else {
      toast({
        title: 'Conversion failed.',
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <Box p={8}>
      <Heading mb={4}>PDF Converter</Heading>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleConvert} mt={4} colorScheme="teal">
        Convert PDF
      </Button>
    </Box>
  )
}
