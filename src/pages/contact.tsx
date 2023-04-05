import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
	VStack,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Button,
	Box,
	FormErrorMessage,
	Container,
	Flex
} from "@chakra-ui/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

type FormValues = {
	name: string;
	email: string;
	message: string;
	googleReCaptchaToken: string;
};

export default function Contact() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({ mode: "onChange" });
	const { executeRecaptcha } = useGoogleReCaptcha();

	const onSubmit = handleSubmit(async (data) => {
		if (!executeRecaptcha) return;
		const token = await executeRecaptcha("submit");
		data.googleReCaptchaToken = token;

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		try {
			const response = await fetch("https://dende-h.form.newt.so/v1/OlfVLFc0t", {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json"
				}
			});

			if (response.ok) {
				router.push("/thanks");
			} else {
				router.push("/error");
			}
		} catch (err) {
			router.push("/error");
		}
	});
	return (
		<>
			<Head>
				<title>お問い合わせフォーム</title>
				<meta name="description" content="問い合わせフォームです" />
			</Head>
			<Header/>
			<Box p="6" w="100%" h={"90vh"}>
				
				<VStack spacing="6">
					<Heading as="h1" size="xl">
						Contact Form
					</Heading>
					<form onSubmit={onSubmit}>
						<VStack align="stretch" spacing="4">
							<FormControl isInvalid={Boolean(errors.name)}>
								<FormLabel htmlFor="name" fontSize={{ base: "md", md: "lg" }}>
									Name
								</FormLabel>
								<Input
									id="name"
									placeholder="お名前"
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
							<FormControl isInvalid={Boolean(errors.email)}>
								<FormLabel htmlFor="email" fontSize={{ base: "md", md: "lg" }}>
									Email
								</FormLabel>
								<Input
									id="email"
									placeholder="email"
									type="email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^\S+@\S+$/i,
											message: "Invalid email format"
										}
									})}
									size="lg"
									variant="filled"
									shadow="md"
									_hover={{ shadow: "lg" }}
									_focus={{ outline: "none", shadow: "lg" }}
								/>
								{errors?.email && (
									<FormErrorMessage id="error-email" aria-live="assertive">
										{errors.email.message}
									</FormErrorMessage>
								)}
							</FormControl>
							<FormControl w={{ base: "320px", md: "400px", lg: "550px" }}>
								<FormLabel htmlFor="message" fontSize={{ base: "md", md: "lg" }}>
									Message
								</FormLabel>
								<Textarea
									id="message"
									name="message"
									placeholder="お問い合わせ内容を入力してください"
									{...register("message")}
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
							>
								Submit
							</Button>
						</VStack>
					</form>
				</VStack>
			</Box>
			<Box bg="gray.900" color="white" py={4}> {/* フッター */}
        <Container maxW="container.lg" textAlign="center">
          <Flex justify="center">
            <Box mr={4}>
              <Heading as="h4" fontSize="sm">
                お問い合わせ
              </Heading>
              <Box mt={2}>info@example.com</Box>
            </Box>
            <Box>
              <Heading as="h4" fontSize="sm">
                プライバシーポリシー
              </Heading>
              <Box mt={2}>プライバシーポリシーのリンク</Box>
            </Box>
          </Flex>
        </Container>
      </Box>
		</>
	);
}

export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
