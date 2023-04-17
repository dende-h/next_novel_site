import { Box, Center, Flex, Container, Heading, Link } from "@chakra-ui/react";

export const Footer = () => (
	<Container maxW="container.lg" textAlign="center">
		<Flex justify="center">
			<Link href="contact" _hover={{ textDecoration: "none" }}>
				<Box mr={4}>
					<Heading as="h4" fontSize="sm">
						お問い合わせ
					</Heading>
				</Box>
			</Link>
			<Link href="policy" _hover={{ textDecoration: "none" }}>
				<Box>
					<Heading as="h4" fontSize="sm">
						プライバシーポリシー
					</Heading>
				</Box>
			</Link>
		</Flex>
		<Center>©2022 dende-h</Center>
	</Container>
);
