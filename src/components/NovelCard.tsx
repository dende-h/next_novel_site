import { Box, Text, Badge, Center, useColorModeValue, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCalcCharCount } from "../hooks/useCalcCharCount";
import { novels } from "../pages/novels";
import LikeButton from "./LikeButton";

type Props = {
	novel: novels;
};

const NovelCard = (props: Props) => {
	const { novel } = props;
	const router = useRouter();
	const imageUrl = novel.thumbnail ? novel.thumbnail : "/android-chrome-256x256.png";
	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");
	const { calcCharCount, charCount } = useCalcCharCount();
	useEffect(() => {
		calcCharCount(novel.body);
	}, []);

	return (
		<>
			<Box
				w={"300px"}
				h={"485px"}
				borderWidth={1}
				borderRadius="md"
				boxShadow="md"
				transition="all 0.5s"
				_hover={{ boxShadow: "2xl", transform: "translateY(-4px)", cursor: "pointer" }}
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
					<Text fontSize={"sm"} fontWeight="bold" lineHeight="shorter" height="3rem" overflow="hidden">
						{novel.title}
					</Text>

					<Text fontSize={"xs"} overflow="hidden">
						作者：{novel.author}
					</Text>

					<Text fontSize={"xs"} mb={"1"} overflow="hidden">
						更新：{novel.created_at}
					</Text>

					<Box>
						{novel.tags.map((tag: string, index: number) => (
							<Badge key={index} colorScheme="teal" mr={"1"} fontSize={"sm"} lineHeight="none" overflow="hidden">
								{tag}
							</Badge>
						))}
					</Box>
					<Flex>
						<Text fontSize={"xs"} my={"auto"} mr={3}>
							{charCount}文字
						</Text>
						<LikeButton id={novel.id} title={novel.title} good_mark={novel.good_mark} />
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default NovelCard;
