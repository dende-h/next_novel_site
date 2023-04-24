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
	useColorModeValue
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { novels } from "../pages/novels";
import LikeButton from "./LikeButton";
import { NovelViewer } from "./NovelViwer";

type Props = {
	novel: novels;
};

const NovelCard = (props: Props) => {
	const { novel } = props;
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const css = { writingMode: "vertical-rl", textOrientation: "upright" };

	const imageUrl = novel.thumbnail ? novel.thumbnail : "/book.png";

	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");
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
				onClick={() => router.push(`/novels/${novel.id}`)}
			>
				<Center w="100%" h="75%" position="relative">
					<Image src={imageUrl} alt={novel.title} object-fit="contain" width={300} height={485} />
				</Center>

				<Box
					h="30%"
					p="2"
					borderBottomLeftRadius="md"
					borderBottomRightRadius="md"
					backgroundColor={backgroundCardFooterColor}
				>
					<Text fontSize={"sm"} fontWeight="bold" mb={"1"} lineHeight="shorter" height="1.5rem" overflow="hidden">
						{novel.title}
					</Text>
					<Text fontSize={"xs"} overflow="hidden">
						作者：{novel.author}
					</Text>
					<Text fontSize={"xs"} mb={"2"} overflow="hidden">
						更新：{novel.created_at}
					</Text>

					<Box>
						{novel.tags.map((tag: string, index: number) => (
							<Badge key={index} colorScheme="teal" mr={"1"} fontSize={"sm"} lineHeight="none" overflow="hidden">
								{tag}
							</Badge>
						))}
					</Box>
					<Center>
						<LikeButton id={novel.id} title={novel.title} good_mark={novel.good_mark} />
					</Center>
				</Box>
			</Box>
		</>
	);
};

export default NovelCard;
