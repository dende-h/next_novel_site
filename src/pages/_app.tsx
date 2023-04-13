import { ChakraProvider } from "@chakra-ui/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RecoilRoot } from "recoil";

import theme from "../theme";
import { AppProps } from "next/app";

const SiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAOTCHA_KEY;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<RecoilRoot>
				<GoogleReCaptchaProvider reCaptchaKey={SiteKey} language="ja">
					<Component {...pageProps} />
				</GoogleReCaptchaProvider>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
