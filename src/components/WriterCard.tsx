// components/WriterCard.js

import Image from "next/image";
import { useRouter } from "next/router";
import LikeUserButton from "./LikeUserButton";
import { Box, Center, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const WriterCard = ({ writer }) => {
	const router = useRouter();
	const { user_name, Introduction, user_image } = writer;

	const imageUrl = user_image ? user_image : "/ilastya.png";

	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");

	return (
		<Box
			w={"300px"}
			h={"485px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			_hover={{ boxShadow: "2xl", transform: "translateY(-4px)" }}
			mb={"2"}
			onClick={() => {
				router.push(`/novels/${user_name}`);
			}}
			position={"relative"}
		>
			<Center w="100%" h="75%" position="relative">
				<Image src={imageUrl} alt={user_name} object-fit="contain" width={300} height={485} />
			</Center>

			<Box
				h="30%"
				p="1"
				borderBottomLeftRadius="md"
				borderBottomRightRadius="md"
				backgroundColor={backgroundCardFooterColor}
			>
				<Heading
					as={"h4"}
					fontSize={"md"}
					fontWeight="bold"
					mb={"1"}
					lineHeight="shorter"
					height="1.5rem"
					overflow="hidden"
				>
					{user_name}
				</Heading>
				<Text fontSize={"xs"} overflowWrap="break-word">
					{Introduction}
				</Text>
				<Box position={"absolute"} bottom={0} right={1}>
					<LikeUserButton name={user_name} />
				</Box>
			</Box>
		</Box>
	);
};

export default WriterCard;
