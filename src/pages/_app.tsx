import { ChakraProvider } from "@chakra-ui/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RecoilRoot } from "recoil";
import GoogleAnalytics from "../components/GoogleAnalytics";
import theme from "../theme";
import { type AppProps } from "next/app";
import usePageView from "../hooks/usePageView";
const SiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAOTCHA_KEY;

function MyApp({ Component, pageProps }: AppProps) {
	usePageView();
	return (
		<ChakraProvider theme={theme}>
			<RecoilRoot>
				<GoogleReCaptchaProvider reCaptchaKey={SiteKey} language="ja">
					<GoogleAnalytics />
					<Component {...pageProps} />
				</GoogleReCaptchaProvider>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
