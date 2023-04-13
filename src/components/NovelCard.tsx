import {
	Box,
	Text,
	Badge,
	Center,
	useDisclosure,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	HStack,
	Flex
} from "@chakra-ui/react";
import Image from "next/image";
import { novels } from "../pages/novels";
import LikeButton from "./LikeButton";
import { NovelViewer } from "./NovelViwer";

type Props = {
	novel: novels;
};

const NovelCard = (props: Props) => {
	const { novel } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const css = { writingMode: "vertical-rl", textOrientation: "upright" };

	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const textBackgroundColor = useColorModeValue("gray.100", "gray.500");

	return (
		<>
			<Box
				w={"300px"}
				h={"485px"}
				borderWidth={1}
				borderRadius="md"
				boxShadow="md"
				transition="all 0.5s"
				_hover={{ boxShadow: "2xl", transform: "translateY(-4px)" }}
				mb={"4"}
				onClick={onOpen}
			>
				<Center w="100%" h="75%" position="relative">
					<Image src={novel.thumbnail} alt={novel.title} object-fit="contain" width={300} height={485} />
				</Center>

				<Box h="30%" p="2" borderBottomLeftRadius="md" borderBottomRightRadius="md" backgroundColor="gray.50">
					<Text fontSize={"sm"} fontWeight="bold" mb={"1"} lineHeight="shorter" height="1.5rem" overflow="hidden">
						{novel.title}
					</Text>
					<Text color="gray.600" fontSize={"xs"} overflow="hidden">
						作者：{novel.author}
					</Text>
					<Text color="gray.600" fontSize={"xs"} mb={"2"} overflow="hidden">
						更新：{novel.created_at}
					</Text>

					<Box>
						{novel.tags.map((tag: string, index: number) => (
							<Badge key={index} colorScheme="teal" mr={"1"} fontSize={"sm"} lineHeight="none" overflow="hidden">
								{tag}
							</Badge>
						))}
					</Box>
					<Box ml={"60%"}>
						<LikeButton id={novel.id} title={novel.title} good_mark={novel.good_mark} />
					</Box>
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
						{novel.title}
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
							<NovelViewer text={novel.body} />
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

export default NovelCard;
