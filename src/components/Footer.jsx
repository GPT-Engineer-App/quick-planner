import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" mt={8} textAlign="center">
      <Text>Made with ❤️ by Your Name - {new Date().getFullYear()}</Text>
    </Box>
  );
};

export default Footer;
