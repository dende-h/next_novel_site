import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FC, memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { seenNoticeId } from "../Atoms/seenNoticeId";

//お知らせダイアログの識別子。内容を差し替えたらここを更新すると全ユーザーに再表示される
const currentNoticeId = "2026-service-close";

//後継エディタ「コトノハ-leaf-」の紹介ページ
const successorEditorUrl = "https://cotonoha-leaf.org/lp";

export const ServiceNoticeModal: FC = memo(() => {
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const accentColor = useColorModeValue("teal.600", "teal.200");
	const attentionBorderColor = useColorModeValue("orange.400", "orange.300");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [seenId, setSeenId] = useRecoilState(seenNoticeId);

	useEffect(() => {
		if (typeof window !== "undefined" && seenId !== currentNoticeId) {
			onOpen();
		}
	}, []);

	//一度閉じたら同じお知らせは再表示しない
	const onCloseNotice = () => {
		setSeenId(currentNoticeId);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onCloseNotice}
			size="2xl"
			scrollBehavior="inside"
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent backgroundColor={backgroundColor}>
				<ModalCloseButton />
				<ModalHeader fontSize={{ base: "md", md: "lg" }}>サービス終了と新サービスのお知らせ</ModalHeader>
				<ModalBody>
					<Stack divider={<StackDivider />} spacing="4">
						<Text fontSize="sm">いつもLit:Biteをご利用いただき、誠にありがとうございます。</Text>

						<Box>
							<Heading size="sm" mb={2}>
								Lit:Bite・Re:teratureのサービス終了について
							</Heading>
							<Text fontSize="sm">
								誠に勝手ながら、小説閲覧サイト「Lit:Bite」および小説エディタ「Re:terature」は、2026年12月をめどにサービスを終了させていただくことになりました。
							</Text>
							<Text fontSize="sm">終了の正確な日程が決まりましたら、あらためてお知らせいたします。</Text>
						</Box>

						<Box>
							<Heading size="sm" mb={2}>
								新しい投稿サービスを開発中です
							</Heading>
							<Text fontSize="sm">
								Lit:Biteに代わる小説投稿サービスを現在開発しています。公開の準備が整いましたらお知らせいたしますので、いましばらくお待ちください。
							</Text>
						</Box>

						<Box>
							<Heading size="sm" mb={2} color={accentColor}>
								新しい小説エディタ「コトノハ-leaf-」を公開しました
							</Heading>
							<Text fontSize="sm">Re:teratureの後継となる、新しい小説エディタを公開しました。</Text>
							<Text fontSize="sm">
								無料でお使いいただけます。作品を書かれている方は、ぜひ執筆環境の移行先としてお試しください。
							</Text>
							<Button
								as="a"
								href={successorEditorUrl}
								target="_blank"
								rel="noopener noreferrer"
								colorScheme="teal"
								size="sm"
								mt={3}
								rightIcon={<ExternalLinkIcon />}
							>
								コトノハ-leaf-を見る
							</Button>
						</Box>

						<Box borderLeftWidth="4px" borderLeftColor={attentionBorderColor} pl={3}>
							<Heading size="sm" mb={2}>
								公開中の作品のお取り扱いについて
							</Heading>
							<Text fontSize="sm">
								サービス終了後は、Lit:Biteに公開されている作品・コメント・応援の記録をご覧いただけなくなります。
							</Text>
							<Text fontSize="sm" fontWeight="bold">
								作品を投稿されている方は、終了までにRe:teratureのEPUB出力などを利用して、大切な原稿をお手元に保存していただきますようお願いいたします。
							</Text>
						</Box>

						<Text fontSize="sm">これまでご愛顧いただき、心より御礼申し上げます。</Text>
					</Stack>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="teal" variant="outline" onClick={onCloseNotice}>
						閉じる
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
});

ServiceNoticeModal.displayName = "ServiceNoticeModal";
