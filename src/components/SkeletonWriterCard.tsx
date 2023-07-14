import { Box, Center, Skeleton, SkeletonText, useColorModeValue } from "@chakra-ui/react";

const SkeletonWriterCard = () => {
	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");

	return (
		<Box
			w={"300px"}
			h={"485px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			mb={"2"}
			position={"relative"}
		>
			<Center w="100%" h="70%" position="relative">
				<Skeleton startColor="pink.500" endColor="orange.500" w="100%" h="100%" />
			</Center>

			<Box
				h="30%"
				p="2"
				borderBottomLeftRadius="md"
				borderBottomRightRadius="md"
				backgroundColor={backgroundCardFooterColor}
				position="relative"
				overflowY={"scroll"}
			>
				<SkeletonText mt="4" noOfLines={1} spacing="4" />
				<SkeletonText mt="4" noOfLines={4} spacing="4" />
			</Box>
		</Box>
	);
};

export default SkeletonWriterCard;
