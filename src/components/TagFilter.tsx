// components/TagFilter.tsx

import { Box, Flex, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

const TagFilter = ({ tags, selectedTags, onTagSelect, onTagRemove }) => {
  return (
    <Box mb={4}>
      <Flex wrap="wrap">
        {tags.map((tag) => (
          <Tag
            key={tag}
            size="lg"
            variant="subtle"
            colorScheme={selectedTags.includes(tag) ? 'teal' : 'gray'}
            mr={2}
            mb={2}
            onClick={() => onTagSelect(tag)}
            cursor="pointer"
          >
            <TagLabel>{tag}</TagLabel>
            {selectedTags.includes(tag) && (
              <TagCloseButton onClick={() => onTagRemove(tag)} />
            )}
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};

export default TagFilter;
