import { Box, Center, Flex, Container, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Footer = () => (
	<Container maxW="container.lg" textAlign="center">
		<Flex justify="center">
			<Link href="/contact" passHref>
				<Box mr={4}>
					<Heading as="h4" fontSize="sm">
						お問い合わせ
					</Heading>
				</Box>
			</Link>
			<Link href="/policy" passHref>
				<Box mr={4}>
					<Heading as="h4" fontSize="sm">
						プライバシーポリシー
					</Heading>
				</Box>
			</Link>
			<Link href="/developer" passHref>
				<Box>
					<Heading as="h4" fontSize="sm">
						開発者
					</Heading>
				</Box>
			</Link>
		</Flex>
		<Center>©2023 dende-h</Center>
	</Container>
);
