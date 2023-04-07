import { Box,  Text, Flex, Badge, Center } from '@chakra-ui/react';
import Image from 'next/image';

const NovelCard = ({ novel }) => {
  return (
    <Box
      w="300px"
      borderWidth={1}
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'xl' }}
    >
     <Center>
									<Box
										w="200px"
										h="282px"
										display="flex"
										justifyContent="center"
										alignItems="center"
										position={"relative"}
									>
										<Image
											src={novel.thumbnail}
											alt={novel.title}
											object-fit="contain"
											width={200}
											height={282}
										/>
									</Box>
								</Center>
      <Box p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {novel.title}
        </Text>
        <Text color="gray.600" mb={2}>
          作者：{novel.author}
        </Text>
        <Text color="gray.600" mb={6}>
          更新：{novel.created_at}
        </Text>

        <Flex justify="space-between" alignItems="flex-end">
          <Box>
            {novel.tags.map((tag, index) => (
              <Badge key={index} colorScheme="teal" mr={1}>
                {tag}
              </Badge>
            ))}
          </Box>
          <Box>
          <Text color="gray.600" mb={6}>
        いいね：{novel.good_mark}
        </Text>
            {/* お気に入りボタンなどのアクションボタンをここに配置 */}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default NovelCard;
