import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const SkeletonWriterCard = () => {
	return (
		<Box
			w={{ base: "350px", md: "400px" }}
			h={"150px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			mb={"4"}
			position="relative"
			display="flex"
			flexDirection="row"
			overflow="hidden"
		>
			<Skeleton startColor="blue.500" endColor="green.500" w={"30%"} h="100%" />

			<Box w={"70%"} h="100%" p="2">
				<SkeletonText mt="4" noOfLines={2} spacing="4" />
				<SkeletonCircle size="10" />
			</Box>
		</Box>
	);
};

export default SkeletonWriterCard;
