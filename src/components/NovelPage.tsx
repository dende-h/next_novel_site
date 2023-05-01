import { Box, Heading, Text, Badge, Center, Textarea, Icon, VStack, HStack, Flex, Button } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import LikeButton from "./LikeButton";
import { NovelViewer } from "./NovelViwer";

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
	console.log(authorBio);
	const css = { writingMode: "vertical-rl", textOrientation: "upright" };
	const comments = [{ username: "nanasi", content: "素晴らしい作品です", time: "12/11" }];

	return (
		<VStack spacing={4} width="100%" paddingX={4} paddingY={8}>
			<Box>
				<Flex alignItems="flex-start">
					<Box>
						<Center width="75px" height="122px" borderRadius="md">
							<Image src={coverImage} alt={`${title}の表紙`} object-fit="contain" width={150} height={243} priority />
						</Center>
					</Box>
					<VStack alignItems="start" spacing={1} marginLeft={4}>
						<Heading as="h1" fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
							{title}
						</Heading>
						<Text fontSize="md" fontWeight="semibold">
							作者：{author}
						</Text>
						<Box>
							{tags.map((tag: string, index: number) => (
								<Badge key={index} colorScheme="teal" mr={"1"} fontSize={"sm"} lineHeight="none" overflow="hidden">
									{tag}
								</Badge>
							))}
						</Box>
						<Text fontSize="sm" fontWeight="semibold" mb={2}>
							更新日: {lastUpdated}
						</Text>
					</VStack>
				</Flex>
			</Box>

			<Box
				sx={css}
				borderRadius={"md"}
				margin={"0"}
				marginLeft={"auto"}
				width={"100%"}
				maxH={"85%"}
				padding={6}
				overflowX={"scroll"}
				position={"relative"}
				bg="gray.100"
			>
				<NovelViewer text={body} />
			</Box>

			<Box width="100%">
				<LikeButton id={id} title={title} good_mark={likes} />
				<Text fontSize="md" fontWeight="semibold" mb={2}>
					作者コメント: {authorBio}
				</Text>

				<Box
					as="form"
					onSubmit={(e) => {
						e.preventDefault();
						// Submit comment
					}}
				>
					<Flex alignItems="center">
						<Box
							borderRadius="full"
							width="35px"
							height="35px"
							bg="gray.100"
							display="flex"
							alignItems="center"
							justifyContent="center"
							color="gray.500"
							fontSize="sm"
							marginRight={2}
						>
							<Icon as={FaUser} />
						</Box>
						<Textarea
							placeholder="コメントを入力してください"
							fontSize="sm"
							borderRadius="md"
							resize="none"
							border="1px solid"
							borderColor="gray.200"
							_focus={{
								outline: "none",

								BorderColor: "blue.400"
							}}
							paddingLeft={2}
							paddingTop={1}
							flexGrow={1}
						/>
						<Button
							colorScheme="teal"
							size="sm"
							type="submit"
							marginLeft={2}
							paddingLeft={4}
							paddingRight={4}
							fontWeight="medium"
						>
							投稿
						</Button>
					</Flex>
				</Box>
				<Box>
					{comments.map((comment, index) => (
						<Box key={index} display="flex" marginBottom={4}>
							<Box
								borderRadius="full"
								width="35px"
								height="35px"
								bg="gray.100"
								display="flex"
								alignItems="center"
								justifyContent="center"
								color="gray.500"
								fontSize="sm"
								marginRight={2}
							>
								<Icon as={FaUser} />
							</Box>
							<Box flex={1}>
								<Box bg="gray.100" borderRadius="md" padding={2} marginBottom={1} position="relative">
									<Text fontSize="sm" fontWeight="semibold" marginBottom={1}>
										{comment.username}
									</Text>
									<Text fontSize="sm" marginBottom={1}>
										{comment.content}
									</Text>
									<Box position="absolute" right="0" top="0" fontSize="xs">
										{comment.time}
									</Box>
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</VStack>
	);
};

export default NovelPage;
