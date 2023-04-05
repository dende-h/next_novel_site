// components/WriterCard.js

import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';

const WriterCard = ({ writer }) => {
  const { id, name, thumbnail, genres } = writer;

  return (
    <Box
      bg="white"
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'lg' }}
    >
      <Flex direction="column" alignItems="center">
        <Box w="120px" h="120px" borderRadius="full" overflow="hidden">
          <Image src={thumbnail} alt={`Thumbnail of ${name}`} objectFit="cover" w="100%" h="100%" />
        </Box>
        <Heading as="h3" fontSize="lg" mt={2} textAlign="center" color="gray.800">
          {name}
        </Heading>
        <Text color="gray.600" mt={1} textAlign="center">
          {genres.join(', ')}
        </Text>
      </Flex>
    </Box>
  );
};

export default WriterCard;
