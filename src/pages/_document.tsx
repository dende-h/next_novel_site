import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" sizes="180x180" href="/android-chrome-180x180.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/android-chrome-16x16.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/android-chrome-36x36.png" />
					<link rel="icon" type="image/png" sizes="48x48" href="/android-chrome-48x48.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/android-chrome-96x96.png" />
					<link rel="icon" type="image/png" sizes="128x128" href="/android-chrome-128x128.png" />
					<link rel="icon" type="image/png" sizes="144x144" href="/android-chrome-144x144.png" />
					<link rel="icon" type="image/png" sizes="152x152" href="/android-chrome-152x152.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
					<link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png" />
					<link rel="icon" type="image/png" sizes="384x384" href="/android-chrome-384x384.png" />
					<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
					<meta name="theme-color" content="#808080" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
					<meta name="msapplication-TileColor" content="#808080" />
					<meta name="msapplication-TileImage" content="/android-chrome-144x144.png" />
					<meta name="application-name" content="Lit:Bite" />
					<meta name="description" content="短編小説編集アプリRe:teratureから投稿された小説が読めるNovelサイトです" />
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9778569212499788"
						crossOrigin="anonymous"
					></script>
				</Head>
				<body>
					{/* Make Color mode to persists when you refresh the page. */}
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
