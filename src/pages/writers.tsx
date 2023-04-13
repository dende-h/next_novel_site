// pages/writers.tsx

import { Box, Container, Heading, SimpleGrid, Flex, Link, Center } from "@chakra-ui/react";
import WriterCard from "../components/WriterCard";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { supabase } from "../../lib/supabaseClient";

export type Writers = {
	id: string;
	user_name: string;
	Introduction: string;
	user_image: string;
};

const WritersPage = ({ user }) => {
	const writers: Writers[] = user.map((item: Writers) => {
		return { id: item.id, user_name: item.user_name, Introduction: item.Introduction, user_image: item.user_image };
	});

	return (
		<Box minH="100vh" display="flex" flexDirection="column">
			<Header />

			<Container flex="1" maxW="container.lg" py={8}>
				<Heading as="h1" mb={4} textAlign="center">
					作家一覧
				</Heading>

				{/* 作家一覧 */}
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
					{writers.map((writer) => (
						<WriterCard key={writer.id} writer={writer} />
					))}
				</SimpleGrid>
			</Container>

			<Box bg="gray.900" color="white" py={4}>
				{/* フッター */}
				<Footer />
			</Box>
		</Box>
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
