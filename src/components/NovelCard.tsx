// components/NovelCard.tsx

import { Box, Image, Text, Flex, Badge } from '@chakra-ui/react';

const NovelCard = ({ novel }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'lg' }}
    >
      <Image src={novel.thumbnail} alt={novel.title} h={64} objectFit="cover" mb={4} />

      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {novel.title}
      </Text>
      <Text color="gray.600" mb={2}>
        {novel.author}
      </Text>
      <Text color="gray.600" mb={2}>
        {novel.genre}
      </Text>

      <Flex justify="space-between">
        <Box>
          {novel.tags.map((tag) => (
            <Badge key={tag} colorScheme="teal" mr={1}>
              {tag}
            </Badge>
          ))}
        </Box>
        <Box>
          {/* お気に入りボタンなどのアクションボタンをここに配置 */}
        </Box>
      </Flex>
    </Box>
  );
};

export default NovelCard;
