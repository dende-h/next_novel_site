// components/WriterCard.js

import Image from "next/image";
import { useRouter } from "next/router";
import LikeUserButton from "./LikeUserButton";
import { Box, Heading, HStack, useColorModeValue } from "@chakra-ui/react";
import { WritersIntroductionViewer } from "./WritersIntroductionViewer";
import { Writers } from "../pages/writers";

type Props = {
	writer: Writers;
	index: number;
};

const WriterCard = (props: Props) => {
	const router = useRouter();
	const { writer, index } = props;
	const { user_name, Introduction, image_url } = writer;

	const imageUrl = image_url ? image_url : "/Reterature.png";

	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");

	return (
		<Box
			w={{ base: "350px", md: "400px" }}
			h={"120px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			_hover={{ boxShadow: "2xl", transform: "translateY(-4px)", cursor: "pointer" }}
			mb={"4"}
			onClick={() => {
				router.push(`/novels_by_user/${encodeURIComponent(user_name)}`);
			}}
			position="relative"
			display="flex"
			flexDirection="row"
			overflow="hidden"
		>
			<Box w={"30%"} h="100%" overflow="hidden" position="relative">
				<Image
					src={imageUrl}
					alt={user_name}
					fill
					style={{ objectFit: "contain" }}
					priority={index < 3}
					sizes="(max-width: 30em) 100vw, (max-width: 50em) 50vw, 400px"
				/>
			</Box>
			<Box w={"70%"} h="100%" p="2" backgroundColor={backgroundCardFooterColor} overflowY="hidden">
				<HStack spacing={2}>
					<Heading
						as={"h4"}
						fontSize={"sm"}
						fontWeight="bold"
						lineHeight="shorter"
						height="1rem"
						overflow="hidden"
						my={"auto"}
					>
						{user_name}
					</Heading>
					<LikeUserButton name={user_name} />
				</HStack>
				<Box fontSize={"12px"}>
					<WritersIntroductionViewer text={Introduction} />
				</Box>
			</Box>
		</Box>
	);
};

export default WriterCard;
