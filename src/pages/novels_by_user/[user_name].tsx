import { useRouter } from "next/router";
import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Center,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
	useColorModeValue,
	Spinner,
	HStack
} from "@chakra-ui/react";
import NovelCard from "../../components/NovelCard";
import TagFilter from "../../components/TagFilter";
import Header from "../../components/Header";
import { supabase } from "../../../lib/supabaseClient";
import format from "date-fns/format";
import { useState } from "react";
import React from "react";
import { Footer } from "../../components/Footer";
import { Novels } from "../novels";
import Seo from "../../components/Seo";
import SkeletonNovelCard from "../../components/SkeletonNovelCard";
import { Writers } from "../writers";
import Image from "next/image";
import LikeUserButton from "../../components/LikeUserButton";
import { WritersIntroductionViewer } from "../../components/WritersIntroductionViewer";

export type Draft = {
	last_edit_time: string;
	created_at: string;
	id: string;
	title: string;
	user_name: string;
	image_url: string;
	tag1: string;
	tag2: string;
	tag3: string;
	tag4: string;
	body: string;
	good_mark: number;
	preface: string | null;
	postscript: string | null;
};

const NovelsByUser = ({ drafts, comments, writers }) => {
	const router = useRouter();
	const userName = router.query.user_name as string;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const novels: Novels[] = drafts
		.filter((item) => {
			return item.user_name === decodeURIComponent(userName);
		})
		.map((item: Draft) => {
			const formatDate = format(new Date(item.last_edit_time), "yyyy/MM/dd-HH:mm");

			return {
				id: item.id,
				title: item.title,
				author: item.user_name,
				created_at: formatDate,
				thumbnail: item.image_url,
				tags: [item.tag1, item.tag2, item.tag3, item.tag4],
				body: item.body,
				good_mark: item.good_mark
			};
		});

	const draftTagsArray: string[][] = novels.map((item) => item.tags);

	const allDraftTagsArray = draftTagsArray.reduce((a, b) => {
		return a.concat(b);
	}, []);
	const filterDuplicatesAllDraftTags = allDraftTagsArray.filter((item, index) => {
		return allDraftTagsArray.indexOf(item) === index && item !== null;
	});

	const [selectTags, setSelectTags] = useState<string[]>([]);

	const filterNovels = novels.filter((item) => {
		const tagIncludes = item.tags.filter((item) => {
			return selectTags.includes(item);
		});
		return tagIncludes.length > 0;
	});

	const writer: Writers = writers?.filter((item) => {
		return item.user_name === userName;
	})[0];

	const [isLoading, setIsLoading] = useState(false);

	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");

	return (
		<>
			<Seo
				pageTitle={`${userName}の小説一覧`}
				pageDescription={`ペンネーム${userName}さんの投稿している一覧です`}
				pageImg={null}
				pagePath={`https://next-novel-site.vercel.app/novels/${userName}`}
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Box minH="100vh" display="flex" flexDirection="column" overflowY={"scroll"}>
				<Header />
				<Container flex="1" maxW={"100%"} py={8} px={4}>
					<Heading as="h1" mb={4} textAlign="center">
						{userName}の小説一覧
					</Heading>
					<HStack
						h={{ base: "200px", md: "300px" }}
						spacing={0}
						w={{ base: "350px", md: "600px" }}
						mx={"auto"}
						mb={"8"}
						backgroundColor={backgroundCardFooterColor}
						boxShadow={"lg"}
					>
						<Box w={"30%"} h="100%" overflow="hidden" position="relative">
							<Image
								src={writer.image_url}
								alt={userName}
								fill
								style={{ objectFit: "contain" }}
								priority
								sizes="(max-width: 30em) 100vw, (max-width: 50em) 50vw, 400px"
							/>
						</Box>
						<Box w={"70%"} h="100%" p="2" overflowY="hidden">
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
									{userName}
								</Heading>
								<LikeUserButton name={userName} />
							</HStack>
							<Box fontSize={"12px"}>
								<WritersIntroductionViewer text={writer.Introduction} />
							</Box>
						</Box>
					</HStack>

					{/* タグフィルター */}
					<Button ref={btnRef} colorScheme="blackAlpha" onClick={onOpen}>
						タグで絞り込む
					</Button>
					<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader bgColor={backgroundColor}>タグを選択して絞り込む</DrawerHeader>

							<DrawerBody bgColor={backgroundColor}>
								<TagFilter
									tags={filterDuplicatesAllDraftTags} // タグのリスト
									selectedTags={selectTags} // 選択されたタグのリスト
									onTagSelect={(tag: string) => setSelectTags([...selectTags, tag])} // タグが選択されたときに呼び出されるコールバック関数
									onTagRemove={(tag: string) =>
										setSelectTags(
											selectTags.filter((item: string) => {
												return item !== tag;
											})
										)
									} // タグが削除されたときに呼び出されるコールバック関数
								/>
							</DrawerBody>

							<DrawerFooter bgColor={backgroundColor}>
								<Button colorScheme={"blue"} variant="ghost" mr={3} onClick={onClose}>
									Cancel
								</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>

					{/* 小説一覧 */}
					<SimpleGrid spacing={1} minChildWidth="300px" onClick={() => setIsLoading(true)}>
						{(selectTags.length > 0 ? filterNovels : novels).map((novel, index) => (
							<Center mt={4} key={novel.id}>
								{!isLoading ? (
									<NovelCard
										index={index}
										novel={novel}
										commentNum={
											comments.filter((item) => {
												return novel.id === item.novel_id;
											}).length
										}
									/>
								) : (
									<SkeletonNovelCard />
								)}
							</Center>
						))}
					</SimpleGrid>
				</Container>

				<Box bg="gray.900" color="white" py={4}>
					{/* フッター */}
					<Footer />
				</Box>
			</Box>
		</>
	);
};

export default NovelsByUser;

export async function getStaticPaths() {
	const { data, error } = await supabase.from("user").select("*");

	if (error) console.log("error", error);

	const paths = data.map((user) => ({
		params: { user_name: user.user_name }
	}));

	return { paths, fallback: "blocking" };
}

export async function getStaticProps() {
	const { data, error } = await supabase.from("drafts").select("*").order("last_edit_time", { ascending: false });

	if (error) console.log("error", error);
	const { data: comments, error: commentsFetchErr } = await supabase
		.from("comments")
		.select("*")
		.order("created_at", { ascending: false });

	if (commentsFetchErr) console.log("error", commentsFetchErr);

	const { data: writers, error: writersFetchEr } = await supabase
		.from("user")
		.select("*")
		.order("created_at", { ascending: false });

	if (writersFetchEr) console.log("error", writersFetchEr);
	return {
		props: {
			drafts: data,
			comments: comments,
			writers: writers
		},
		revalidate: 10
	};
}
