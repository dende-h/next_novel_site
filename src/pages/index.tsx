// pages/index.tsx

import { Box, Container, Heading, SimpleGrid, Flex } from '@chakra-ui/react';
import NovelCard from '../components/NovelCard';
import TagFilter from '../components/TagFilter';
import Header from '../components/Header';


const novels = [
  {
    id: 1,
    title: 'Novel 1',
    author: 'Author 1',
    genre: 'Genre 1',
    thumbnail: 'https://example.com/novel1.jpg',
    tags: ['tag1', 'tag2'],
  },
  {
    id: 2,
    title: 'Novel 2',
    author: 'Author 2',
    genre: 'Genre 2',
    thumbnail: 'https://example.com/novel2.jpg',
    tags: ['tag1', 'tag3'],
  },
  {
    id: 1,
    title: 'Novel 1',
    author: 'Author 1',
    genre: 'Genre 1',
    thumbnail: 'https://example.com/novel1.jpg',
    tags: ['tag1', 'tag2'],
  },
  {
    id: 2,
    title: 'Novel 2',
    author: 'Author 2',
    genre: 'Genre 2',
    thumbnail: 'https://example.com/novel2.jpg',
    tags: ['tag1', 'tag3'],
  },
  {
    id: 1,
    title: 'Novel 1',
    author: 'Author 1',
    genre: 'Genre 1',
    thumbnail: 'https://example.com/novel1.jpg',
    tags: ['tag1', 'tag2'],
  },
  {
    id: 2,
    title: 'Novel 2',
    author: 'Author 2',
    genre: 'Genre 2',
    thumbnail: 'https://example.com/novel2.jpg',
    tags: ['tag1', 'tag3'],
  },
  {
    id: 1,
    title: 'Novel 1',
    author: 'Author 1',
    genre: 'Genre 1',
    thumbnail: 'https://example.com/novel1.jpg',
    tags: ['tag1', 'tag2'],
  },
  {
    id: 2,
    title: 'Novel 2',
    author: 'Author 2',
    genre: 'Genre 2',
    thumbnail: 'https://example.com/novel2.jpg',
    tags: ['tag1', 'tag3'],
  },
  // ... 追加の小説データ
];


const IndexPage = () => {
  return (
    <Box bg="gray.100" minH="100vh" display="flex" flexDirection="column">
      <Header/>

      <Container flex="1" maxW="container.lg" py={8}>
        <Heading as="h1" mb={4} textAlign="center">
          小説一覧
        </Heading>

        {/* タグフィルター */}
        <TagFilter
          tags={['tag1', 'tag2', 'tag3']} // タグのリスト
          selectedTags={['tag1']} // 選択されたタグのリスト
          onTagSelect={(tag) => console.log(`Tag selected: ${tag}`)} // タグが選択されたときに呼び出されるコールバック関数
          onTagRemove={(tag) => console.log(`Tag removed: ${tag}`)} // タグが削除されたときに呼び出されるコールバック関数
        />

        {/* 小説一覧 */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
          {novels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
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

export default IndexPage;

