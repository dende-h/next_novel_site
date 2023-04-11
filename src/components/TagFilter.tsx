// components/TagFilter.tsx

import { Box, Flex, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { MouseEvent } from "react";

const TagFilter = ({ tags, selectedTags, onTagSelect, onTagRemove }) => {
	const onRemove = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, tag: string) => {
		onTagRemove(tag);
		e.stopPropagation();
	};

	return (
		<Box mb={4}>
			<Flex wrap="wrap">
				{tags.map((tag) => (
					<Tag
						key={tag}
						size="md"
						variant="subtle"
						colorScheme={selectedTags.includes(tag) ? "teal" : "gray"}
						mr={2}
						mb={2}
						onClick={() => onTagSelect(tag)}
						cursor="pointer"
					>
						<TagLabel>{tag}</TagLabel>
						{selectedTags.includes(tag) && <TagCloseButton onClick={(e) => onRemove(e, tag)} />}
					</Tag>
				))}
			</Flex>
		</Box>
	);
};

export default TagFilter;
