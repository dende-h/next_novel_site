import { AddIcon } from "@chakra-ui/icons";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Box,
	Button,
	FormLabel,
	Input,
	Textarea,
	useDisclosure,
	FormErrorMessage,
	FormControl,
	Heading,
	VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";

type FormValues = {
	name: string;
	comment: string;
	googleReCaptchaToken: string;
};

type Props = { novelId: string; comments: [{ id: string; name: string; comment: string; novel_id: string }] };

export const CommentsViewer = (props: Props) => {
	const { novelId, comments } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isSend, setIsSend] = useState<boolean>(false);
	const firstField = React.useRef();
	const [commentState, setIsCommentState] = useState(comments);

	console.log(commentState);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({ mode: "onChange" });
	const { executeRecaptcha } = useGoogleReCaptcha();

	// Supabaseデータベースにコメントを追加する関数を追加
	const addCommentToDatabase = async (name, comment, ipAddress, novelId) => {
		try {
			const { error } = await supabase.from("comments").insert([
				{
					name: name,
					comment: comment,
					ip_address: ipAddress,
					novel_id: novelId
				}
			]);
			const { data, error: fetchError } = await supabase
				.from("comments")
				.select("*")
				.eq("novel_id", novelId)
				.order("created_at", { ascending: false });
			if (error) {
				console.error("Error while adding comment to the database:", error);
			} else {
				setIsSend(true);
			}
		} catch (error) {
			console.error("Error while adding comment to the database:", error);
		}
	};
	// IPアドレスを取得する関数を追加
	const getIpAddress = async () => {
		try {
			const response = await fetch("https://api.ipify.org?format=json");
			const result = await response.json();
			return result.ip;
		} catch (error) {
			console.error("Error while fetching IP address:", error);
		}
	};

	const onSubmit = handleSubmit(async (data) => {
		setIsSend(true);
		if (!executeRecaptcha) {
			setIsSend(false);
			return;
		}
		const token = await executeRecaptcha("submit");
		data.googleReCaptchaToken = token;
		// IPアドレスを取得します。
		const ipAddress = await getIpAddress();
		console.log(token);
		console.log(data.name);
		console.log(data.comment);
		// ここでreCAPTCHAトークンの検証を行います。
		try {
			const response = await fetch("/api/recaptcha", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ recaptchaToken: token })
			});

			const result = await response.json();

			console.log(result);

			// reCAPTCHAトークンが正常であれば、コメントをデータベースに送信します。
			if (result.success) {
				await addCommentToDatabase(data.name, data.comment, ipAddress, novelId);
			} else {
				console.error("reCAPTCHA verification failed");
			}
		} catch (error) {
			console.log(error.message);
		}
		setIsSend(false);
	});
	return (
		<>
			<Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen} w={"250px"}>
				コメントする
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="right"
				initialFocusRef={firstField}
				onClose={onClose}
				size={{ base: "md", md: "lg", lg: "xl" }}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">Send comments</DrawerHeader>
					<DrawerBody>
						<Box p="6" w="100%" h={"90vh"}>
							<VStack spacing="6">
								<Heading as="h1" size="xl">
									Contact Form
								</Heading>
								<form onSubmit={onSubmit}>
									<VStack align="stretch" spacing="4">
										<FormControl isInvalid={Boolean(errors.name)}>
											<FormLabel htmlFor="name" fontSize={{ base: "md", md: "lg" }}>
												HandleName
											</FormLabel>
											<Input
												id="name"
												placeholder="ハンドルネームを投稿してください"
												{...register("name", { required: "Name is required" })}
												aria-describedby="error-name-required"
												size="lg"
												variant="filled"
												shadow="md"
												_hover={{ shadow: "lg" }}
												_focus={{ outline: "none", shadow: "lg" }}
											/>
											{errors?.name && (
												<FormErrorMessage id="error-name-required" aria-live="assertive">
													{errors.name.message}
												</FormErrorMessage>
											)}
										</FormControl>
										<FormControl w={{ base: "320px", md: "400px", lg: "550px" }}>
											<FormLabel htmlFor="message" fontSize={{ base: "md", md: "lg" }}>
												Comment
											</FormLabel>
											<Textarea
												id="message"
												name="comment"
												placeholder="コメントを入力してください"
												{...register("comment")}
												size="lg"
												variant="filled"
												shadow="md"
												_hover={{ shadow: "lg" }}
												_focus={{ outline: "none", shadow: "lg" }}
												minH={"150px"}
											></Textarea>
										</FormControl>
										<Button
											type="submit"
											size="lg"
											colorScheme={"teal"}
											w={{ base: "100%", lg: "auto" }}
											alignSelf={{ base: "center", lg: "flex-end" }}
											isDisabled={isSend}
										>
											Submit
										</Button>
									</VStack>
								</form>
							</VStack>
						</Box>
					</DrawerBody>
					<DrawerFooter borderTopWidth="1px">
						<Button variant="outline" mr={3} onClick={onClose} isDisabled={isSend}>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};
