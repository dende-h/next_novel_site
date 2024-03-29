/* eslint-disable no-irregular-whitespace */
import { useRouter } from "next/router";
import { Box, Center, Container } from "@chakra-ui/react";
import Header from "../../components/Header";
import { supabase } from "../../../lib/supabaseClient";
import format from "date-fns/format";
import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Novels } from "../novels";
import Seo from "../../components/Seo";
import { Writers } from "../writers";
import { Draft } from "../novels_by_user/[user_name]";
import NovelPage from "../../components/NovelPage";
import { useSetRecoilState } from "recoil";
import { commentsArray } from "../../Atoms/commentsArray";

const Novel = ({ drafts, user, comments }) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);
	const router = useRouter();
	const draftId = router.query.id;
	const displayCharacters = 40;
	const commentsOnSingleNovel = comments?.filter((item) => {
		return item.novel_id === draftId;
	});
	const setCommentsState = useSetRecoilState(commentsArray);

	useEffect(() => {
		setCommentsState(commentsOnSingleNovel);
	}, []);

	const novel: Novels = drafts
		?.filter((item) => {
			return item.id === draftId;
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
				good_mark: item.good_mark,
				preface: item.preface ? item.preface : null,
				postscript: item.postscript ? item.postscript : null
			};
		})[0];

	const author: Writers = user?.filter((item) => {
		return item.user_name === novel.author;
	})[0];

	const imageUrl = novel.thumbnail ? novel.thumbnail : "/android-chrome-256x256.png";

	const introductionBody = [...novel.body]?.filter((char) => {
		return !char.match(/(\s+|　)/g); //空白文字、全角半角スペース、改行は除外
	});

	const pageDescriptionText = introductionBody
		.filter((_, index) => {
			return index < displayCharacters;
		})
		.join("");

	return (
		<>
			<Seo
				pageTitle={`${novel.title}`}
				pageDescription={`${pageDescriptionText}』...`}
				pageImg={imageUrl}
				pagePath={`https://next-novel-site.vercel.app/novels/${draftId}`}
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			{isClient ? (
				<Box minH="100vh" display="flex" flexDirection="column">
					<Header />

					<Container flex="1" maxW="container.lg" py={8}>
						<NovelPage
							id={novel.id}
							title={novel.title}
							author={author.user_name}
							authorBio={author.Introduction}
							body={novel.body}
							coverImage={imageUrl}
							tags={novel.tags}
							likes={novel.good_mark}
							lastUpdated={novel.created_at}
							preface={novel.preface}
							postscript={novel.postscript}
						/>
					</Container>

					<Box bg="gray.900" color="white" py={4}>
						{/* フッター */}
						<Footer />
					</Box>
				</Box>
			) : (
				<Center bg="gray.100" minH="100vh">
					...is Loading
				</Center>
			)}
		</>
	);
};

export default Novel;

export async function getStaticPaths() {
	const { data, error } = await supabase.from("drafts").select("*");

	if (error) console.log("error", error);

	const paths = data.map((draft) => ({
		params: { id: draft.id }
	}));

	return { paths, fallback: "blocking" };
}

export async function getStaticProps() {
	const { data: drafts, error: draftFetchErr } = await supabase
		.from("drafts")
		.select("*")
		.order("last_edit_time", { ascending: false });
	const { data: user, error: userFetchErr } = await supabase
		.from("user")
		.select("*")
		.order("created_at", { ascending: false });
	const { data: comments, error: commentsFetchErr } = await supabase
		.from("comments")
		.select("*")
		.order("created_at", { ascending: false });
	if (draftFetchErr) console.log("error", draftFetchErr);
	if (userFetchErr) console.log("error", userFetchErr);
	if (commentsFetchErr) console.log("error", commentsFetchErr);

	return {
		props: {
			drafts: drafts,
			user: user,
			comments: comments
		},
		revalidate: 10
	};
}
