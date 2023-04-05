import React from 'react';
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const Header = () => {
  return (
    <Flex
      as="header"
      w="100%"
      h="64px"
      px={4}
      py={2}
      align="center"
      justify="space-between"
      backgroundColor="gray.800"
      color="white"
    >
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          My Novels
        </Text>
      </Box>
      <Flex align="center">
        <Box mr={4}>
          <Link href="#" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="lg" fontWeight="medium">
              Home
            </Text>
          </Link>
        </Box>
        <Box mr={4}>
          <Link href="/writers" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="lg" fontWeight="medium">
              Writers
            </Text>
          </Link>
        </Box>
        <Box mr={4}>
          <Link href="#" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="lg" fontWeight="medium">
              Contact
            </Text>
          </Link>
        </Box>
        <IconButton
          icon={<FiMenu />}
          aria-label="Toggle menu"
          fontSize="xl"
          variant="ghost"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
