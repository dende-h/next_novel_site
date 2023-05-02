/* eslint-disable no-useless-escape */
import { Box, useMediaQuery } from "@chakra-ui/react";
import { FC, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useSplitTextIntoPages } from "../hooks/useSplitTextIntoPages";
import Page from "../components/Page";

type Props = {
	text: string;
	writingHorizontally: boolean;
};

const rubyRegex = /[｜|]([^《｜|]+)《([^》]+)》/g;

function addRubyTags(text: string) {
	return text.replace(rubyRegex, "<ruby>$1<rt>$2</rt></ruby>");
}

function addLinkTags(text: string) {
	const linkRegex = /\[([^\]]+)\]\((http[^\)]+)\)/g;
	const escapedText = text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/\//g, "&#x2F;");
	return escapedText.replace(linkRegex, function (match, p1, p2) {
		const rubyText = addRubyTags(p1);
		return `<a href="${p2}" style="text-decoration: underline; color: blue;">${rubyText}</a>`;
	});
}

function addBrTags(text: string) {
	return text.replace(/\r?\n/g, "<br>");
}

const css = {
	writingMode: "vertical-rl",
	textOrientation: "upright"
};

export const NovelBookViewer: FC<Props> = ({ text }) => {
	const aText = addLinkTags(text);
	const rubyText = addRubyTags(aText);
	const brText = addBrTags(rubyText);

	const [containerHeight, setContainerHeight] = useState(0);
	const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
	const fontSize = isLargerThanMd ? 16 : 14;
	const lineHeight = 1.5;
	const pages = useSplitTextIntoPages(brText, containerHeight, fontSize, lineHeight);

	return (
		<div style={{ position: "relative" }}>
			<Box
				sx={css}
				display="inline-block"
				position="absolute"
				fontSize={{ base: "14px", md: "16px", lg: "18px" }}
				fontFamily={"Noto Serif JP"}
				lineHeight="1.5em"
				width="100%"
				height="100%"
				margin="10px"
				ref={(el) => {
					if (el) {
						setContainerHeight(el.offsetHeight);
					}
				}}
			/>
			<HTMLFlipBook
				width={300}
				height={500}
				size="fixed"
				minWidth={300}
				maxWidth={300}
				minHeight={500}
				maxHeight={500}
				drawShadow
				flippingTime={1000}
				usePortrait
				startZIndex={0}
				autoSize
				maxShadowOpacity={1}
				showCover={false}
				mobileScrollSupport
				swipeDistance={30}
				clickEventForward
				useMouseEvents
				renderOnlyPageLengthChange={false}
				className={"htmlflip"}
				style={undefined}
				startPage={0}
				showPageCorners={false}
				disableFlipByClick={false}
			>
				{pages.map((pageText, index) => (
					<Page key={index} number={index.toString()} text={pageText} />
				))}
			</HTMLFlipBook>
		</div>
	);
};
