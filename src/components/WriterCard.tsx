// components/WriterCard.js

import { Box, Heading, Text, Center } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const WriterCard = ({ writer }) => {
	const router = useRouter();
	const { name, introduction, thumbnail } = writer;

	const imageUrl = thumbnail ? thumbnail : "/ilastya.png";

	return (
		<Box
			w={"300px"}
			h={"485px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			_hover={{ boxShadow: "2xl", transform: "translateY(-4px)" }}
			mb={"4"}
			onClick={() => {
				router.push(`/novels/${name}`);
			}}
		>
			<Center w="100%" h="75%" position="relative">
				<Image src={imageUrl} alt={name} object-fit="contain" width={300} height={485} />
			</Center>

			<Box h="30%" p="2" borderBottomLeftRadius="md" borderBottomRightRadius="md" backgroundColor="gray.50">
				<Heading
					as={"h4"}
					fontSize={"md"}
					fontWeight="bold"
					mb={"1"}
					lineHeight="shorter"
					height="1.5rem"
					overflow="hidden"
				>
					{name}
				</Heading>
				<Text color="gray.600" fontSize={"xs"} overflowWrap="break-word">
					{introduction}
				</Text>
			</Box>
		</Box>
	);
};

export default WriterCard;
