import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export const HeaderMenu = () => {
	const headerMenuHoverColor = useColorModeValue("gray.500", "gray.700");
	const headerBgColor = useColorModeValue("gray.800", "gray.400");

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						as={Button}
						rightIcon={isOpen ? <ChevronUpIcon boxSize={4} /> : <ChevronDownIcon boxSize={4} />}
						bg={headerBgColor}
						borderRadius="md"
						_hover={{ bg: "gray.500", color: "white" }}
						_active={{ bg: "gray.500", color: "white" }}
						size={"sm"}
					>
						{isOpen ? "Close" : "Menu"}
					</MenuButton>
					<MenuList
						bgColor={"gray.800"}
						color="white"
						borderRadius="md"
						boxShadow="md"
						p={2}
						_focus={{ outline: "none" }}
					>
						<Link href={"/novels"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Novels
							</MenuItem>
						</Link>
						<Link href={"/like_novels"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								LikeNovels
							</MenuItem>
						</Link>
						<Link href={"/writers"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Writers
							</MenuItem>
						</Link>
						<Link href={"/like_writers"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								LikeWriters
							</MenuItem>
						</Link>
						<Link href={"/contact"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Contact
							</MenuItem>
						</Link>
						{/* 外部サイトへのリンク */}

						<MenuItem
							as={"a"}
							href={"https://next-novel-editor.vercel.app/"}
							target="_blank"
							rel="noopener noreferrer"
							bgColor={"gray.800"}
							_hover={{ bgColor: headerMenuHoverColor }}
						>
							Editor
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
};
