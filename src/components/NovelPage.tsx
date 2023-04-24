import {
	Box,
	Image,
	Heading,
	Text,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	useDisclosure,
	Badge
} from "@chakra-ui/react";
import React from "react";
import { NovelViewer } from "./NovelViwer";

// 小説の情報を受け取るprops
type NovelProps = {
	title: string;
	author: string;
	authorBio: string;
	body: string;
	coverImage: string;
	tags: string[];
	likes: number;
	lastUpdated: string;
};

const NovelPage = ({ title, author, authorBio, body, coverImage, tags, likes, lastUpdated }: NovelProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const css = { writingMode: "vertical-rl", textOrientation: "upright" };

	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const textBackgroundColor = useColorModeValue("gray.100", "gray.500");

	return (
		<>
			<Box bg={backgroundColor} px={4} py={8}>
				<Box maxW="600px" mx="auto">
					<Image src={coverImage} alt={`${title}の表紙`} borderRadius="md" mb={6} />

					<Box mb={6}>
						<Heading as="h1" fontSize="2xl" mb={2}>
							{title}
						</Heading>
						<Text fontSize="md" fontWeight="semibold" mb={4}>
							作者：{author}
						</Text>
						<Text fontSize="md" mb={4}>
							{authorBio}
						</Text>
						<Box>
							{tags.map((tag: string, index: number) => (
								<Badge key={index} colorScheme="teal" mr={"1"} fontSize={"sm"} lineHeight="none" overflow="hidden">
									{tag}
								</Badge>
							))}
						</Box>
					</Box>

					<Box mb={6}>
						<Text fontSize="md" fontWeight="semibold" mb={2}>
							いいね数: {likes}
						</Text>
						<Text fontSize="md" fontWeight="semibold" mb={2}>
							最終更新日: {lastUpdated}
						</Text>
					</Box>

					<Button colorScheme="gray" mb={6} onClick={onOpen}>
						小説を読む
					</Button>
				</Box>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} size="full">
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} position={"relative"}>
					<ModalHeader
						maxW={"300px"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontFamily={"Noto Serif JP"}
						marginX={"auto"}
						fontSize={{ base: "14px", md: "16px", lg: "18px" }}
					>
						{title}
					</ModalHeader>
					<ModalCloseButton position={"absolute"} top={1} left={1} />
					<ModalBody>
						<Box
							sx={css}
							bgColor={textBackgroundColor}
							borderRadius={"md"}
							margin={"0"}
							marginLeft={"auto"}
							w={"100%"}
							h={"80%"}
							p={6}
							overflowX={"scroll"}
							position={"relative"}
						>
							<NovelViewer text={body} />
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme={"teal"} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default NovelPage;
