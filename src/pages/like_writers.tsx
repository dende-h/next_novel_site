import { Box, Container, Heading, SimpleGrid, Flex, Link, Center } from "@chakra-ui/react";
import WriterCard from "../components/WriterCard";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { heartUserArray } from "../Atoms/heartUserArray";
import { Writers } from "./writers";
import Seo from "../components/Seo";

const WritersPage = ({ user }) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const heartUsers = useRecoilValue<string[]>(heartUserArray);

	const writers: Writers[] = user
		.map((item: Writers) => {
			return { id: item.id, user_name: item.user_name, Introduction: item.Introduction, user_image: item.user_image };
		})
		.filter((item) => {
			return heartUsers.includes(item.user_name);
		});
	const [likeWriters, setLikeWriters] = useState(writers);

	useEffect(() => {
		setLikeWriters((prevState) => {
			return prevState.filter((item) => {
				return heartUsers.includes(item.user_name);
			});
		});
	}, [heartUsers]);

	return (
		<>
			<Seo
				pageTitle="お気に入り作家"
				pageDescription="お気に入りに登録した作家の一覧です"
				pageImg="/meta.jpg"
				pagePath="https://next-novel-site.vercel.app/like_writers"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			{isClient ? (
				<Box minH="100vh" display="flex" flexDirection="column">
					<Header />

					<Container flex="1" maxW="container.lg" py={8}>
						<Heading as="h1" mb={4} textAlign="center">
							お気に入り作家
						</Heading>

						{/* 作家一覧 */}
						<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
							{likeWriters.map((writer) => (
								<WriterCard key={writer.id} writer={writer} />
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
					...is Loading
				</Center>
			)}
		</>
	);
};

export default WritersPage;

export async function getStaticProps() {
	const { data, error } = await supabase.from("user").select("*").order("created_at", { ascending: false });

	if (error) console.log("error", error);

	return {
		props: {
			user: data
		},
		revalidate: 10
	};
}
