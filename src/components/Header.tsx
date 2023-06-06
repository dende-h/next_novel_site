import React from "react";
import { Box, Flex, IconButton, Link, Text, Tooltip } from "@chakra-ui/react";
import { HeaderMenu } from "./HeaderMenu";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { TbReload } from "react-icons/tb";

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
				<Link href="/novels" _hover={{ textDecoration: "none" }}>
					<Text as={"h1"} fontSize="2xl" fontWeight="bold">
						Lit:Bite
					</Text>
				</Link>
			</Box>
			<Flex align="center">
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/ranking" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							PVランキング
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/novels" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							新規小説
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/like_novels" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							いいねした小説
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/writers" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							作家一覧
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="/like_writers" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							お気に入り作家
						</Text>
					</Link>
				</Box>
				<Box mr={4} display={{ base: "none", lg: "block" }}>
					<Link href="contact" _hover={{ textDecoration: "none" }}>
						<Text fontSize="lg" fontWeight="medium">
							お問い合わせ
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
