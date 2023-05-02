/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-useless-escape */
import { Box, useMediaQuery } from "@chakra-ui/react";
import { FC, useState } from "react";
import HTMLFlipBook from "react-pageflip";
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

function splitTextIntoPages(text: string, containerHeight: number, fontSize: number, lineHeight: number) {
	const lines = text.split("<br>");
	const maxLinesPerPage = Math.floor(containerHeight / (fontSize * lineHeight));
	const pages: string[] = [];

	let currentPageLines: string[] = [];
	let currentPageLineCount = 0;

	for (const line of lines) {
		if (currentPageLineCount + 1 > maxLinesPerPage) {
			pages.push(currentPageLines.join("<br>"));
			currentPageLines = [];
			currentPageLineCount = 0;
		}

		currentPageLines.push(line);
		currentPageLineCount++;
	}

	if (currentPageLines.length > 0) {
		pages.push(currentPageLines.join("<br>"));
	}
	return pages;
}

export const NovelBookViewer: FC<Props> = ({ text }) => {
	const aText = addLinkTags(text);
	const rubyText = addRubyTags(aText);
	const brText = addBrTags(rubyText);

	const [containerHeight, setContainerHeight] = useState(0);
	const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
	const fontSize = isLargerThanMd ? 16 : 14;
	const lineHeight = 1.5;
	const pages = splitTextIntoPages(brText, containerHeight, fontSize, lineHeight);
	console.log(pages);
	return (
		<Box position="relative">
			{/* @ts-ignore */}
			<HTMLFlipBook width={300} height={700}>
				{pages.map((pageText, index) => (
					<Page key={index} number={index.toString()} text={pageText} />
				))}
			</HTMLFlipBook>
		</Box>
	);
};
