import {
	Box,
	Heading,
	Text,
	Tab,
	Tabs,
	TabList,
	VStack,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useBreakpointValue,
	Select,
	Container
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Seo from "../components/Seo";

type RankingData = {
	pagePath: string;
	uniquePageviews: string;
	title?: string;
	imageUrl?: string;
	userName?: string;
};

export default function RankingPage() {
	const [rankingData, setRankingData] = useState<RankingData[]>([]);
	const [tabIndex, setTabIndex] = useState(0);
	const baseURL = "https://next-novel-site.vercel.app";
	const periods = ["allTime", "monthly", "weekly", "daily"];

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/ranking?period=${periods[tabIndex]}`);
			const data: RankingData[] = await res.json();

			if (!Array.isArray(data)) {
				console.error("Data is not an array:", data);
				return;
			}

			// Get all the ids in an array
			const ids = data.map((item) => item.pagePath.replace(/\/novels\//, ""));

			// Fetch novel titles from Supabase
			const { data: novelsData, error } = await supabase
				.from("drafts")
				.select("id,title,image_url,user_name")
				.in("id", ids);

			if (error) {
				console.error("Error fetching novel data:", error);
				return;
			}

			// Transform novelsData to a map for quick lookups
			const novelsDataMap = novelsData.reduce((acc, novel) => {
				acc[novel.id] = novel;
				return acc;
			}, {});

			// Update the data items with the title, image url and user name
			const finalData = data
				.map((item) => {
					const id = item.pagePath.replace(/\/novels\//, "");
					const novelData = novelsDataMap[id];
					if (novelData) {
						item.title = novelData.title;
						item.imageUrl = novelData.image_url;
						item.userName = novelData.user_name;
						return item;
					} else {
						console.warn(`No data found for novel with id ${id}`);
						return null;
					}
				})
				.filter((item) => item !== null);

			setRankingData(finalData);
		};

		fetchData();
	}, [tabIndex]);
	const handleTabsChange = (index: number) => {
		setTabIndex(index);
	};

	const isSmallScreen = useBreakpointValue({ base: true, md: false });

	return (
		<>
			<Seo
				pageTitle="ランキング"
				pageDescription="期間別PV数のランキングを閲覧できます"
				pageImg={null}
				pagePath="https://next-novel-site.vercel.app/ranking"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Box minH="100vh" display="flex" flexDirection="column">
				<Header />

				<Container flex="1" maxW={"100%"} py={8} px={4}>
					<Box maxW={"7xl"} mx={"auto"} pt={5} px={{ base: 2, sm: 5, md: 7 }}>
						<Heading
							as="h1"
							mb={4}
							textAlign={"center"}
							fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
							color={"gray.700"}
						>
							Novel Ranking
						</Heading>
						<Box borderRadius="lg" overflow="hidden" boxShadow="lg" bg="gray.100" p={5}>
							{isSmallScreen ? (
								<Select defaultValue={"allTime"} mb={4} onChange={(e) => handleTabsChange(e.target.selectedIndex)}>
									<option value="allTime">All Time</option>
									<option value="monthly">Last 30 days</option>
									<option value="weekly">Last 7 days</option>
									<option value="daily">Last 24 hours</option>
								</Select>
							) : (
								<Tabs variant="enclosed" index={tabIndex} onChange={handleTabsChange}>
									<TabList borderColor={"gray.500"}>
										<Tab>All Time</Tab>
										<Tab>Last 30 days</Tab>
										<Tab>Last 7 days</Tab>
										<Tab>Last 24 hours</Tab>
									</TabList>
								</Tabs>
							)}
							<Box bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.300" overflow="hidden" mt={4}>
								<Table variant="simple" size="sm">
									<Thead bg="gray.50">
										<Tr>
											<Th textAlign="center" color="gray.500" fontWeight="semibold">
												Ranking
											</Th>
											{!isSmallScreen && (
												<Th textAlign="center" color="gray.500" fontWeight="semibold">
													Image
												</Th>
											)}
											<Th textAlign="center" color="gray.500" fontWeight="semibold">
												Information
											</Th>
											<Th textAlign="center" color="gray.500" fontWeight="semibold">
												PV Count
											</Th>
										</Tr>
									</Thead>
									<Tbody>
										{rankingData.slice(0, 50).map((item, index) => (
											<Tr key={index}>
												<Td textAlign="center">{index + 1}</Td>
												{!isSmallScreen &&
													(item.imageUrl ? (
														<Td display="flex" justifyContent="center">
															<Image alt={"image"} src={item.imageUrl} width={45} height={73} />
														</Td>
													) : (
														<Td textAlign="center">
															<Text>No Image</Text>
														</Td>
													))}
												<Td>
													<VStack align="start" spacing={1}>
														<Link href={`${baseURL}${item.pagePath}`}>
															<Text fontWeight="bold" color="blue" fontSize={{ base: "11px", md: "12px", lg: "14px" }}>
																{item.title}
															</Text>
														</Link>
														<Text fontSize="sm" color="gray.500">
															by {item.userName}
														</Text>
													</VStack>
												</Td>
												<Td textAlign="center">{item.uniquePageviews}</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</Box>
						</Box>
					</Box>
				</Container>

				<Box bg="gray.900" color="white" py={4}>
					{/* フッター */}
					<Footer />
				</Box>
			</Box>
		</>
	);
}
