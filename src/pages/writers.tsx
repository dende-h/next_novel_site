// pages/writers.tsx

import { Box, Container, Heading, SimpleGrid, Flex } from '@chakra-ui/react';
import WriterCard from '../components/WriterCard';
import Header from '../components/Header';


const writers = [
  {
    id: 1,
    name: 'Writer 1',
    thumbnail: 'https://example.com/writer1.jpg',
    genres: ['genre1', 'genre2'],
  },
  {
    id: 2,
    name: 'Writer 2',
    thumbnail: 'https://example.com/writer2.jpg',
    genres: ['genre1', 'genre3'],
  },
  // ... 追加の作家データ
];


const WritersPage = () => {
  return (
    <Box bg="gray.100" minH="100vh" display="flex" flexDirection="column">
      <Header/>

      <Container flex="1" maxW="container.lg" py={8}>
        <Heading as="h1" mb={4} textAlign="center">
          作家一覧
        </Heading>

        {/* 作家一覧 */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
          {writers.map((writer) => (
            <WriterCard key={writer.id} writer={writer} />
          ))}
        </SimpleGrid>
      </Container>

      <Box bg="gray.900" color="white" py={4}> {/* フッター */}
        <Container maxW="container.lg" textAlign="center">
          <Flex justify="center">
            <Box mr={4}>
              <Heading as="h4" fontSize="sm">
                お問い合わせ
              </Heading>
              <Box mt={2}>info@example.com</Box>
            </Box>
            <Box>
              <Heading as="h4" fontSize="sm">
                プライバシーポリシー
              </Heading>
              <Box mt={2}>プライバシーポリシーのリンク</Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default WritersPage;
