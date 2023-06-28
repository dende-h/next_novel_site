// pages/writers.tsx

import { Box, Center, Container, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import WriterCard from "../components/WriterCard";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { supabase } from "../../lib/supabaseClient";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";

export type Writers = {
	id: string;
	user_name: string;
	Introduction: string;
	image_url: string;
};

const WritersPage = ({ user }) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const [isLoading, setIsLoading] = useState(false);

	const writers: Writers[] = user.map((item: Writers) => {
		return { id: item.id, user_name: item.user_name, Introduction: item.Introduction, image_url: item.image_url };
	});

	return (
		<>
			<Seo
				pageTitle="作家一覧"
				pageDescription="投稿している作家の一覧です"
				pageImg={null}
				pagePath="https://next-novel-site.vercel.app/writers"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			{isClient && !isLoading ? (
				<Box minH="100vh" display="flex" flexDirection="column">
					<Header />

					<Container flex="1" maxW={"100%"} py={8} px={4}>
						<Heading as="h1" mb={4} textAlign="center">
							作家一覧
						</Heading>

						{/* 作家一覧 */}
						<SimpleGrid spacing={1} minChildWidth="300px" onClick={() => setIsLoading(true)}>
							{writers.map((writer) => (
								<Center key={writer.id} mt={4}>
									<WriterCard writer={writer} />
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

export default WritersPage;

export async function getStaticProps() {
	const { data, error } = await supabase.from("user").select("*").order("created_at", { ascending: false });

	if (error) console.log("error", error);

	return {
		props: {
			user: data
		},
		revalidate: 60
	};
}
