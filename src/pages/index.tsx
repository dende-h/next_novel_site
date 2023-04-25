// pages/index.tsx
import React from "react";
import { Box, Container, Heading, Text, VStack, HStack, Icon, Button, IconButton, Spacer } from "@chakra-ui/react";
import { FaHeart, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Seo from "../components/Seo";
import Image from "next/image";

const ShortNovelVillage: React.FC = () => {
	return (
		<>
			<Seo
				pageTitle="イントロダクション"
				pageDescription="世界中の才能ある作家が創作した短編小説の数々を発見し、楽しむことができます。掌編、ショートショート、短編までの短い物語専門の小説サイトです。会員登録不要で無料で閲覧できます。"
				pageImg="/meta.jpg"
				pagePath="https://next-novel-site.vercel.app/"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Container maxW="xl" centerContent mt={8}>
				<VStack spacing={8} align="center">
					<Image src={"/logo.png"} alt={"logoImage"} width={300} height={300} />
					<Heading as="h1" size="2xl" fontWeight="bold">
						Welcome to Lit:Bite
					</Heading>
					<Text fontSize="2xl" textAlign="center" color="gray.500">
						世界中の才能ある作家が創作した短編小説の数々を発見し、楽しむことができます。
					</Text>
					<Box>
						<Link href="/novels" passHref>
							<Button
								colorScheme="purple"
								size="lg"
								borderRadius="full"
								px={12}
								py={6}
								fontSize="xl"
								fontWeight="bold"
								rightIcon={<Icon as={FaChevronRight} boxSize={6} />}
								_hover={{ bg: "purple.500" }}
								_focus={{ boxShadow: "outline" }}
							>
								Start Reading
							</Button>
						</Link>
					</Box>
				</VStack>
				<Box mt={16} maxW="2xl" w="full" px={4}>
					<Heading as="h2" size="xl" textAlign="center" mb={8}>
						Features
					</Heading>
					<HStack spacing={8}>
						<Box textAlign="center">
							<IconButton
								icon={<Icon as={FaHeart} boxSize={12} color="purple.500" />}
								aria-label="Like"
								variant="ghost"
								size="lg"
								_hover={{ color: "purple.500" }}
							/>
							<Text mt={2} fontWeight="bold">
								Like Stories
							</Text>
							<Text mt={2} color="gray.500">
								作者への感謝の気持ちを込めて、「いいね！」を押してください。
							</Text>
						</Box>
						<Spacer />
						<Box textAlign="center">
							<IconButton
								icon={<Icon as={FaHeart} boxSize={12} color="purple.500" />}
								aria-label="Like"
								variant="ghost"
								size="lg"
								_hover={{ color: "purple.500" }}
							/>
							<Text mt={2} fontWeight="bold">
								Favorite Writers
							</Text>
							<Text mt={2} color="gray.500">
								お気に入りの作者を登録して、その作者を応援することができます。
							</Text>
						</Box>
					</HStack>
				</Box>
			</Container>
		</>
	);
};

export default ShortNovelVillage;

export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
