import { Box, Text, Badge, Center, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { novels } from "../pages/novels";
import LikeButton from "./LikeButton";

type Props = {
	novel: novels;
};

const NovelCard = (props: Props) => {
	const { novel } = props;
	const router = useRouter();
	const imageUrl = novel.thumbnail ? novel.thumbnail : "/book.png";
	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");

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
					<Image src={imageUrl} alt={novel.title} object-fit="contain" width={300} height={485} priority />
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
