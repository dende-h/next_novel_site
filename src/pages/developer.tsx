/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
	Icon,
	Button,
	IconButton,
	Spacer,
	Divider,
	List,
	ListItem,
	ListIcon,
	Flex,
	UnorderedList
} from "@chakra-ui/react";
import { FaHeart, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Seo from "../components/Seo";
import Image from "next/image";
import { MdSettings } from "react-icons/md";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

const ShortNovelVillage: React.FC = () => {
	return (
		<>
			<Seo
				pageTitle="開発者情報"
				pageDescription="当サイト運営開発者の情報"
				pageImg={null}
				pagePath="https://next-novel-site.vercel.app/developer"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Header />
			<Container maxW="xl" centerContent mt={8}>
				<VStack spacing={8} align="center">
					<HStack>
						<Image src={"/logo.png"} alt={"logoImage"} width={36} height={36} priority />
						<Heading as="h1" size="lg" fontWeight="bold">
							開発者プロフィール
						</Heading>
					</HStack>

					<Text fontSize="md" textAlign="center" color="gray.500">
						当サイトを開発、運営する管理人のプロフィールページです
					</Text>
				</VStack>
				<Box mt={8} maxW="2xl" w="full" px={4}>
					<Heading as="h2" size="md" textAlign="left" mb={2} borderBottom={"1px"} borderColor={"gray.400"}>
						◆ dende-hプロフィール
					</Heading>
					<UnorderedList>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>開発者名</Text>
							<Text>dende-h</Text>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>作家活動ペンネーム</Text>
							<Text>でんで</Text>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>自己紹介</Text>
							<Text>
								趣味で小説を書いています。普段は会社員でSEとして働いています。作家活動している方の公開の場を少しでも広げたくて当サイトを開発いたしました。
							</Text>
							<Text>
								<Text
									as="a"
									href="https://novel-editor-ver2.vercel.app/"
									color="blue.500"
									borderBottom={"1px"}
									borderColor={"blue.500"}
								>
									小説用のエディター
								</Text>
								も開発しております。当サイトはそのエディターから公開できるWEBサイトです。
							</Text>
							<Text>皆さまの創作活動を支援できるよう頑張ります。</Text>
							<Link href={"https://twitter.com/dendeiriamaka1"} passHref>
								<Text color="blue.500">Twitterしております</Text>
							</Link>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>問い合わせ</Text>
							<Link href="/contact" passHref>
								<Text color="blue.500">contactフォーム</Text>
							</Link>
						</ListItem>
					</UnorderedList>
					<Heading as="h2" size="md" textAlign="left" mt={8} mb={2} borderBottom={"1px"} borderColor={"gray.400"}>
						◆ サイト更新情報
					</Heading>
					<Box pb={6}>
						<List>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/14</Text>
								</HStack>
								<Text>一覧から個別頁へ遷移後、ブラウザバック時に元の位置に戻るように修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/13</Text>
								</HStack>
								<Text>一部のユーザーの小説一覧ページへ遷移出来ない問題の修正、ポリシー修正、開発者紹介追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/28</Text>
								</HStack>
								<Text>まえがき、あとがきの表示機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/23</Text>
								</HStack>
								<Text>小説一覧のカードのUI変更</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/07</Text>
								</HStack>
								<Text>PVランキングページ実装、ダークモードカラー調整</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/26</Text>
								</HStack>
								<Text>一部レイアウト変更、ポリシー修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/25</Text>
								</HStack>
								<Text>作者小説一覧ページへのリンク追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/18</Text>
								</HStack>
								<Text>文字数追加表示、小説カードレイアウト修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/09</Text>
								</HStack>
								<Text>小説のリンクコピーボタン実装、Twitterカード設定追加、コメント投稿機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/01</Text>
								</HStack>
								<Text>リロードボタンの追加、一部レイアウト変更、横書き縦書きビュー追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/28</Text>
								</HStack>
								<Text>各種設定等不具合の修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/26</Text>
								</HStack>
								<Text>いいね小説ページ追加、ポリシー修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/24</Text>
								</HStack>
								<Text>小説の個別ページ追加、フッターの修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/23</Text>
								</HStack>
								<Text>ユーザーイメージ取得不具合修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/17</Text>
								</HStack>
								<Text>プライバシーポリシー修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/14</Text>
								</HStack>
								<Text>Googleアナリティクス導入、ページ遷移のパス修正、ファビコン変更</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/13</Text>
								</HStack>
								<Text>いいねボタン、ユーザーお気に入りボタンの実装</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/12</Text>
								</HStack>
								<Text>サイトリリース</Text>
							</ListItem>
						</List>
					</Box>
				</Box>
			</Container>
			<Box bg="gray.900" color="white" py={4}>
				{/* フッター */}
				<Footer />
			</Box>
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
