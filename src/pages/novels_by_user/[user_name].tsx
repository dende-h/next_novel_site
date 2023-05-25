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
	Spinner
} from "@chakra-ui/react";
import NovelCard from "../../components/NovelCard";
import TagFilter from "../../components/TagFilter";
import Header from "../../components/Header";
import { supabase } from "../../../lib/supabaseClient";
import format from "date-fns/format";
import { useState } from "react";
import React from "react";
import { Footer } from "../../components/Footer";
import { novels } from "../novels";
import Seo from "../../components/Seo";

export type Draft = {
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
};

const NovelsByUser = ({ drafts }) => {
	const router = useRouter();
	const userName = router.query.user_name;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const novels: novels[] = drafts
		.filter((item) => {
			return item.user_name === userName;
		})
		.map((item: Draft) => {
			const formatDate = format(new Date(item.created_at), "yyyy/MM/dd-HH:mm");

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

	const [isLoading, setIsLoading] = useState(false);

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
			{!isLoading ? (
				<Box minH="100vh" display="flex" flexDirection="column">
					<Header />

					<Container flex="1" maxW="container.lg" py={8}>
						<Heading as="h1" mb={4} textAlign="center">
							{userName}の小説一覧
						</Heading>

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
							{(selectTags.length > 0 ? filterNovels : novels).map((novel) => (
								<Center mt={4} key={novel.id}>
									<NovelCard novel={novel} />
								</Center>
							))}
						</SimpleGrid>
					</Container>

					<Box bg="gray.900" color="white" py={4}>
						{/* フッター */}
						<Footer />
					</Box>
				</Box>
			) : (
				<Center bg="gray.100" minH="100vh">
					<Spinner />
				</Center>
			)}
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
	const { data, error } = await supabase.from("drafts").select("*").order("created_at", { ascending: false });

	if (error) console.log("error", error);

	return {
		props: {
			drafts: data
		},
		revalidate: 10
	};
}
