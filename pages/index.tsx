import { useState } from 'react'
import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react'
import FileUploader from '../components/FileUploader'
import { SparklesCore } from '../components/ui/Sparkles'

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
  <Box position="relative" minH="100vh" overflow="hidden">
    {/* Background layer */}
    <Box position="absolute" inset="0" zIndex={0}>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </Box>

    {/* Centered content */}
    <Box
      position="relative"
      zIndex={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading color="white">PDF Converter</Heading>
        <FileUploader onFileAccepted={setFile} />
        <Button onClick={handleConvert} colorScheme="teal" isDisabled={!file}>
          Convert PDF
        </Button>
      </VStack>
    </Box>
  </Box>
)

}
