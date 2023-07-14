import { Box, Text, Badge, useColorModeValue, Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCalcCharCount } from "../hooks/useCalcCharCount";
import { Novels } from "../pages/novels";
import LikeButton from "./LikeButton";

type Props = {
	novel: Novels;
	commentNum: number;
	index: number;
};

const NovelCard = (props: Props) => {
	const { novel, commentNum, index } = props;
	const router = useRouter();
	const imageUrl = novel.thumbnail ? novel.thumbnail : "/android-chrome-256x256.png";
	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");
	const { calcCharCount, charCount } = useCalcCharCount();
	useEffect(() => {
		calcCharCount(novel.body);
	}, []);

	return (
		<Box
			w={{ base: "350px", md: "400px" }}
			h={"150px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			_hover={{ boxShadow: "2xl", transform: "translateY(-4px)", cursor: "pointer" }}
			mb={"4"}
			onClick={() => router.push(`/novels/${novel.id}`, undefined, { scroll: false })}
			position="relative"
			display="flex"
			flexDirection="row"
			overflow="hidden"
		>
			<Box w={"30%"} h="100%" overflow="hidden" position="relative">
				<Image
					src={imageUrl}
					alt={novel.title}
					fill
					style={{ objectFit: "contain" }}
					priority={index < 3}
					sizes="(max-width: 30em) 100vw, (max-width: 50em) 50vw, 400px"
				/>
			</Box>

			<Box w={"70%"} h="100%" p="2" backgroundColor={backgroundCardFooterColor}>
				<Text fontSize={"xs"} fontWeight="bold" lineHeight="shorter" height="3rem" overflow="hidden">
					{novel.title}
				</Text>

				<Text fontSize={"xs"} overflow="hidden">
					作者：{novel.author}
				</Text>

				<Text fontSize={"xs"} overflow="hidden">
					更新：{novel.created_at}
				</Text>

				<Box>
					{novel.tags.map((tag: string, index: number) => (
						<Badge key={index} colorScheme="teal" mr={"1"} fontSize={"11px"} lineHeight="none" overflow="hidden">
							{tag}
						</Badge>
					))}
				</Box>
				<Flex>
					<Text fontSize={"xs"} my={"auto"} mr={3}>
						{charCount}文字
					</Text>
					<LikeButton id={novel.id} title={novel.title} good_mark={novel.good_mark} />
					<Spacer />
					<Text fontSize={"xs"} my={"auto"} mr={3}>
						コメント{commentNum}件
					</Text>
				</Flex>
			</Box>
		</Box>
	);
};

export default NovelCard;
