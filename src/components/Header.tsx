import React from "react";
import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { HeaderMenu } from "./HeaderMenu";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { TbReload } from "react-icons/tb";
import Link from "next/link";

const Header = () => {
	const handleReload = () => {
		if (typeof window !== "undefined") {
			window.location.reload();
		}
	};
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
				<Link href="/novels" passHref>
					<Text as={"h1"} fontSize="2xl" fontWeight="bold">
						Lit:Bite
					</Text>
				</Link>
			</Box>
			<Flex align="center">
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/ranking" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							Ranking
						</Text>
					</Link>
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/novels" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							New
						</Text>
					</Link>
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/like_novels" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							GoodMark
						</Text>
					</Link>
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/writers" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							Writers
						</Text>
					</Link>
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/like_writers" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							Favorite
						</Text>
					</Link>
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/contact" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							Contact
						</Text>
					</Link>
				</Box>

				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Link href="/developer" passHref>
						<Text
							fontSize="md"
							fontWeight="medium"
							fontFamily={"serif"}
							_hover={{
								color: "blue.400",
								transform: "rotate(360deg)"
							}}
							transition="0.5s"
						>
							Developer
						</Text>
					</Link>
				</Box>

				<Box
					as={"a"}
					href={"https://novel-editor-ver2.vercel.app/"}
					target="_blank"
					rel="noopener noreferrer"
					mr={4}
					display={{ base: "none", lg: "block" }}
					fontSize="lg"
					fontWeight="bold"
					color={"teal.300"}
					fontFamily={"serif"}
				>
					Re:terature
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<Tooltip label={"最新状態に更新"} placement={"right-end"}>
						<IconButton
							icon={<TbReload />}
							aria-label="reload"
							colorScheme="telegram"
							onClick={handleReload}
							fontSize={25}
						/>
					</Tooltip>
				</Box>
				<Box mr={3} display={{ base: "none", lg: "block" }}>
					<DarkModeSwitch />
				</Box>
			</Flex>
			<Box display={{ base: "block", lg: "none" }}>
				<Flex align="center">
					<Box mr={3} display={{ base: "block", lg: "none" }}>
						<Tooltip label={"最新状態に更新"} placement={"right-end"}>
							<IconButton
								icon={<TbReload />}
								aria-label="reload"
								colorScheme="telegram"
								onClick={handleReload}
								fontSize={25}
							/>
						</Tooltip>
					</Box>
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
