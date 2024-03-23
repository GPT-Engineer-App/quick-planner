import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={8}>
      <Heading as="h1" size="xl">
        Awesome Todo App
      </Heading>
    </Box>
  );
};

export default Header;
