import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  return (
    <Box
      minH="100vh"
      w="100%"
      bgGradient="linear(to-br, gray.900, blue.900, purple.900)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="xl" centerContent>
        {/* Header Box */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
          bg="white"
          w="100%"
          m="20px 0 15px 0"
          borderRadius="xl"
          boxShadow="xl"
        >
          <Text fontSize="4xl" fontWeight="bold" fontFamily="sans-serif" color="gray.800">
            GIT.AI
          </Text>
        </Box>

        {/* Auth Tabs Container */}
        <Box
          bg="white"
          w="100%"
          p={6}
          borderRadius="xl"
          boxShadow="xl"
          color="black"
        >
          <Tabs isFitted variant="soft-rounded" colorScheme="blue">
            <TabList mb="1em">
              <Tab fontWeight="semibold">Login</Tab>
              <Tab fontWeight="semibold">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}

export default Homepage;
