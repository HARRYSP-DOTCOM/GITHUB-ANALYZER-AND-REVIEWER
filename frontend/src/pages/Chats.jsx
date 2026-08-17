import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Chats() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      w="100%"
      bgGradient="linear(to-br, gray.900, blue.900, purple.900)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      color="white"
    >
      <Box
        bg="white"
        color="gray.800"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        textAlign="center"
        maxW="lg"
        w="100%"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={3}>
          Welcome to GIT.AI Dashboard
        </Text>
        <Text color="gray.600" mb={6}>
          Backend & Models will be integrated soon.
        </Text>
        <Button colorScheme="blue" onClick={() => navigate("/")}>
          Back to Login
        </Button>
      </Box>
    </Box>
  );
}

export default Chats;
