import { ChakraProvider } from "@chakra-ui/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RecoilRoot } from "recoil";
import GoogleAnalytics from "../components/GoogleAnalytics";
import theme from "../theme";
import { AppProps } from "next/app";
import usePageView from "../hooks/usePageView";
import { useEffect } from "react";
const SiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAOTCHA_KEY;

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.getRegistrations().then((registrations) => {
				for (const registration of registrations) {
					registration.unregister();
				}
			});
		}
	}, []);
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
