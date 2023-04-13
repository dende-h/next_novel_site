import React from "react";
import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { HeaderMenu } from "./HeaderMenu";
import { DarkModeSwitch } from "./DarkModeSwitch";

const Header = () => {
	return (
		<Flex
			as="header"
			w="100%"
			h="64px"
			px={4}
			py={2}
			align="center"
			justify="space-between"
			backgroundColor="gray.900"
			color="white"
		>
			<Box>
				<Text fontSize="2xl" fontWeight="bold">
					My Novels
				</Text>
			</Box>
			<Flex align="center">
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<DarkModeSwitch />
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="novels" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							Novels
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/writers" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							Writers
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/like_writers" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							FavoriteWriters
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="contact" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							Contact
						</Text>
					</Link>
				</Box>
				<Box
					as={"a"}
					href={"https://next-novel-editor.vercel.app/"}
					target="_blank"
					rel="noopener noreferrer"
					mr={4}
					display={{ base: "none", lg: "block" }}
					fontSize="lg"
					fontWeight="medium"
				>
					Editor
				</Box>
			</Flex>
			<Box display={{ base: "block", lg: "none" }}>
				<Flex align="center">
					<Box mr={3} display={{ base: "block", lg: "none" }}>
						<DarkModeSwitch />
					</Box>
					<Box mr={3} display={{ base: "block", lg: "none" }}>
						<HeaderMenu />
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default Header;
