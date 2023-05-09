import {
	Box,
	Heading,
	Text,
	Button,
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
	HStack,
	VStack,
	IconButton,
	useClipboard,
	useToast,
	Avatar,
	Flex
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LikeButton from "./LikeButton";
import { NovelBookViewer } from "./NovelBookViewer";
import { NovelViewer } from "./NovelViwer";
import { BsShareFill } from "react-icons/bs";
import { CommentsViewer } from "./ComentsViewer";
import { useRecoilValue } from "recoil";
import { commentsArray } from "../Atoms/commentsArray";
import format from "date-fns/format";

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
	const comments = useRecoilValue(commentsArray);
	const router = useRouter();
	const currentPath = router.asPath;
	const { onCopy, hasCopied } = useClipboard(`https://next-novel-site.vercel.app${currentPath}`);
	const toast = useToast();
	const [displayMode, setDisplayMode] = useState<string | null>(null);
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const textBackgroundColor = useColorModeValue("gray.100", "gray.500");
	const css = {
		writingMode: "vertical-rl",
		textOrientation: "upright"
	};
	const onCopyLink = () => {
		onCopy();
		toast({
			title: "LinkURL Copied!",
			status: "success",
			duration: 1000,
			isClosable: true,
			position: "top"
		});
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

						<HStack spacing={5}>
							<Text fontSize={{ base: "xs", lg: "md" }} fontWeight="semibold" mb={2}>
								最終更新日: {lastUpdated}
							</Text>
							<IconButton
								aria-label={"shere"}
								size={"sm"}
								icon={<BsShareFill />}
								borderRadius={"full"}
								colorScheme="twitter"
								onClick={onCopyLink}
							/>
						</HStack>
					</Box>
					<VStack>
						<Button
							width={{ base: "300px", md: "450px" }}
							colorScheme="gray"
							onClick={() => {
								setDisplayMode("horizontalScroll");
								onOpen();
							}}
						>
							横スクロール読み（スマホ推奨）
						</Button>
						<Button
							width={{ base: "300px", md: "450px" }}
							colorScheme="gray"
							onClick={() => {
								setDisplayMode("verticalScroll");
								onOpen();
							}}
						>
							縦スクロール読み（PC推奨）
						</Button>
						<CommentsViewer novelId={id} />
						<VStack spacing={2}>
							{comments.map((item) => {
								return (
									<Flex
										key={item.id}
										width={{ base: "350px", md: "600px" }}
										borderRadius="md"
										borderWidth="1px"
										p={4}
										mb={2}
										alignItems="flex-start"
										bgColor={textBackgroundColor}
										boxShadow="md"
									>
										<Avatar size="md" name={item.name} src={item.avatarUrl || ""} mr={4} />
										<Box>
											<Text fontSize="md" fontWeight="bold">
												{item.name}
											</Text>
											<Text wordBreak="break-word">{item.comment}</Text>
											<Text fontSize="xs" color="gray.500" mt={1}>
												{format(new Date(item.created_at), "yyyy/MM/dd-HH:mm")}
											</Text>
										</Box>
									</Flex>
								);
							})}
						</VStack>

						{/* <Button
							w={"250px"}
							colorScheme="gray"
							onClick={() => {
								setDisplayMode("bookView");
								onOpen();
							}}
						>
							縦読みブックビューワー
						</Button> */}
					</VStack>
				</Box>
			</Box>
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
						h={"auto"}
						p={8}
					>
						<Text as={"h3"} fontSize={{ base: "12px", md: "14px", lg: "16px" }}>
							{title}
						</Text>
					</DrawerHeader>
					<DrawerBody h={"100%"} overflowY={"auto"} overflowX={"scroll"}>
						<Box
							sx={displayMode === "verticalScroll" ? css : undefined}
							bgColor={textBackgroundColor}
							borderRadius={"md"}
							margin={"0"}
							marginLeft={"auto"}
							w={"100%"}
							h={"95%"}
							p={{ base: 2, md: 6 }}
							overflowX={"scroll"}
							position={"relative"}
						>
							{displayMode === "horizontalScroll" && <NovelViewer text={body} writingHorizontally={true} />}
							{displayMode === "verticalScroll" && <NovelViewer text={body} writingHorizontally={false} />}
							{displayMode === "bookView" && <NovelBookViewer text={body} writingHorizontally={false} />}
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
