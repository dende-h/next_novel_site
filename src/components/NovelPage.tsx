import {
	Box,
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
	Badge,
	Center,
	DrawerContent,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	DrawerOverlay,
	DrawerFooter,
	HStack
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import LikeButton from "./LikeButton";
import { NovelViewer } from "./NovelViwer";

// 小説の情報を受け取るprops
type NovelProps = {
	id: string;
	title: string;
	author: string;
	authorBio: string;
	body: string;
	coverImage: string;
	tags: string[];
	likes: number;
	lastUpdated: string;
};

const NovelPage = ({ id, title, author, authorBio, body, coverImage, tags, likes, lastUpdated }: NovelProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const css = { writingMode: "vertical-rl", textOrientation: "upright" };
	const [writingHorizontally, setWritingHorizontally] = useState(false);
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const textBackgroundColor = useColorModeValue("gray.100", "gray.500");

	const onOpenX = () => {
		setWritingHorizontally(true);
		onOpen();
	};
	const onOpenY = () => {
		setWritingHorizontally(false);
		onOpen();
	};

	return (
		<>
			<Box bg={backgroundColor} px={4} py={8}>
				<Box maxW="600px" mx="auto">
					<Center w={"100%"} h={"auto"} mb={6} borderRadius="md">
						<Image src={coverImage} alt={`${title}の表紙`} object-fit="contain" width={450} height={728} priority />
					</Center>
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
						<LikeButton id={id} title={title} good_mark={likes} />

						<Text fontSize="md" fontWeight="semibold" mb={2}>
							最終更新日: {lastUpdated}
						</Text>
					</Box>
					<HStack>
						<Button colorScheme="gray" mb={6} onClick={onOpenX}>
							横書きスクロール読み
						</Button>
						<Button colorScheme="gray" mb={6} onClick={onOpenY}>
							縦書きスクロール読み
						</Button>
						<Button colorScheme="gray" mb={6} onClick={onOpen}>
							縦読みブックビュー
						</Button>
					</HStack>
				</Box>
			</Box>
			{/* <Modal isOpen={isOpen} onClose={onClose} size="full">
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
					<ModalBody h={"100%"}>
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
			</Modal> */}
			<Drawer isOpen={isOpen} onClose={onClose} size="full" placement="bottom">
				<DrawerOverlay />
				<DrawerContent backgroundColor={backgroundColor} position={"relative"}>
					<DrawerCloseButton position={"absolute"} top={1} left={1} />
					<DrawerHeader
						maxW={"300px"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontFamily={"Noto Serif JP"}
						marginX={"auto"}
						fontSize={{ base: "12px", md: "14px", lg: "16px" }}
						marginBottom={4}
					>
						{title}
					</DrawerHeader>
					<DrawerBody h={"100%"}>
						<Box
							sx={css}
							bgColor={textBackgroundColor}
							borderRadius={"md"}
							margin={"0"}
							marginLeft={"auto"}
							w={"100%"}
							h={"95%"}
							p={6}
							overflowX={"scroll"}
							position={"relative"}
						>
							<NovelViewer text={body} writingHorizontally={writingHorizontally} />
						</Box>
					</DrawerBody>
					<DrawerFooter>
						<Button colorScheme={"teal"} onClick={onClose}>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NovelPage;
