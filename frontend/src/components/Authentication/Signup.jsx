import React, { useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  FormLabel,
  Button,
  InputRightElement,
  InputGroup,
  useToast,
  Divider,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // Simulated UI-only response for testing until backend model is ready:
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Signup successful (Demo)",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/chats");
    }, 600);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl id="signup-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup-email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="signup-confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        mt={2}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>

      <HStack my={2}>
        <Divider />
        <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
          OR
        </Text>
        <Divider />
      </HStack>

      <Button
        width="100%"
        colorScheme="red"
        variant="outline"
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </Button>

      <Button
        width="100%"
        colorScheme="gray"
        variant="solid"
        bg="gray.800"
        color="white"
        _hover={{ bg: "gray.700" }}
        onClick={handleGithubLogin}
      >
        Continue with GitHub
      </Button>
    </VStack>
  );
}

export default Signup;
