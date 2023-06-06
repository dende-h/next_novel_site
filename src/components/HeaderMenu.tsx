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
						<Link href={"/ranking"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								PVランキング
							</MenuItem>
						</Link>
						<Link href={"/novels"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								新規小説一覧
							</MenuItem>
						</Link>
						<Link href={"/like_novels"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								いいねした小説
							</MenuItem>
						</Link>
						<Link href={"/writers"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								作家一覧
							</MenuItem>
						</Link>
						<Link href={"/like_writers"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								お気に入り作家
							</MenuItem>
						</Link>
						<Link href={"/contact"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								お問い合わせ
							</MenuItem>
						</Link>
						{/* 外部サイトへのリンク */}

						<MenuItem
							as={"a"}
							href={"https://novel-editor-ver2.vercel.app/"}
							target="_blank"
							rel="noopener noreferrer"
							bgColor={"gray.800"}
							_hover={{ bgColor: headerMenuHoverColor }}
						>
							Re:terature
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
};
