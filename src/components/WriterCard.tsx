// components/WriterCard.js

import Image from "next/image";
import { useRouter } from "next/router";
import LikeUserButton from "./LikeUserButton";
import { Box, Center, Heading, HStack, useColorModeValue } from "@chakra-ui/react";
import { WritersIntroductionViewer } from "./WritersIntroductionViewer";

const WriterCard = ({ writer }) => {
	const router = useRouter();
	const { user_name, Introduction, image_url } = writer;

	const imageUrl = image_url ? image_url : "/Reterature.png";

	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");

	return (
		<Box
			w={"300px"}
			h={"485px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			_hover={{ boxShadow: "2xl", transform: "translateY(-4px)", cursor: "pointer" }}
			mb={"2"}
			onClick={() => {
				router.push(`/novels_by_user/${user_name}`);
			}}
			position={"relative"}
		>
			<Center w="100%" h="70%" position="relative">
				<Image src={imageUrl} alt={user_name} fill style={{ objectFit: "contain" }} priority />
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
				<HStack spacing={2}>
					<Heading as={"h4"} fontSize={"md"} fontWeight="bold" lineHeight="shorter" height="1.5rem" overflow="hidden">
						PN:{user_name}
					</Heading>
					<LikeUserButton name={user_name} />
				</HStack>
				<Box fontSize={"12px"} overflowWrap="break-word">
					<WritersIntroductionViewer text={Introduction} />
				</Box>
			</Box>
		</Box>
	);
};

export default WriterCard;
