import { useRouter } from "next/router";
import { Box, Container, Heading } from "@chakra-ui/react";
import Header from "../../components/Header";
import { supabase } from "../../../lib/supabaseClient";
import format from "date-fns/format";
import React from "react";
import { Footer } from "../../components/Footer";
import { novels } from "../novels";
import Seo from "../../components/Seo";
import { Writers } from "../writers";
import { Draft } from "../novels_by_user/[user_name]";
import NovelPage from "../../components/NovelPage";

const Novel = ({ drafts, user }) => {
	const router = useRouter();
	const draftId = router.query.id;
	const novel: novels = drafts
		.filter((item) => {
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
				good_mark: item.good_mark
			};
		})[0];

	const author: Writers = user.filter((item) => {
		return item.user_name === novel.author;
	})[0];

	const imageUrl = novel.thumbnail ? novel.thumbnail : "/book.png";

	return (
		<>
			<Seo
				pageTitle={`${novel.title}`}
				pageDescription={`小説『${novel.title}』作者【${author.user_name}】`}
				pageImg="/meta.jpg"
				pagePath={`https://next-novel-site.vercel.app/novels/${draftId}`}
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Box minH="100vh" display="flex" flexDirection="column">
				<Header />

				<Container flex="1" maxW="container.lg" py={8}>
					<Heading as="h1" mb={4} textAlign="center">
						{novel.title}
					</Heading>

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
					/>
				</Container>

				<Box bg="gray.900" color="white" py={4}>
					{/* フッター */}
					<Footer />
				</Box>
			</Box>
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
		.order("created_at", { ascending: false });
	const { data: user, error: userFetchErr } = await supabase
		.from("user")
		.select("*")
		.order("created_at", { ascending: false });
	if (draftFetchErr) console.log("error", draftFetchErr);
	if (userFetchErr) console.log("error", userFetchErr);
	return {
		props: {
			drafts: drafts,
			user: user
		},
		revalidate: 10
	};
}
