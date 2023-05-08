/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-useless-escape */
import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
	text: string;
	writingHorizontally: boolean;
};

const pageVariants = {
	enter: {
		opacity: 0,
		rotateY: 90
	},
	center: {
		opacity: 1,
		rotateY: 0
	},
	exit: {
		opacity: 0,
		rotateY: -90
	}
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

function splitPages(text: string, maxCharactersPerPage: number): string[] {
	const lines = text.split(/\r?\n/);
	const pages: string[] = [];
	let currentPage = "";

	lines.forEach((line, index) => {
		if (currentPage.length + line.length + (index === 0 ? 0 : 1) > maxCharactersPerPage) {
			pages.push(currentPage);
			currentPage = "";
		}

		if (index !== 0) {
			currentPage += "\n";
		}

		currentPage += line;
	});

	if (currentPage.length > 0) {
		pages.push(currentPage);
	}

	return pages;
}

export const NovelBookViewer: FC<Props> = ({ text }) => {
	const [page, setPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const maxCharactersPerPage = 300; // 任意の値に設定
	const pages = splitPages(text, maxCharactersPerPage);
	const displayedText = pages[currentPage] || "";
	const aText = addLinkTags(displayedText);
	const rubyText = addRubyTags(aText);
	const brText = addBrTags(rubyText);
	return (
		<>
			<AnimatePresence exitBeforeEnter>
				<motion.div
					key={page}
					variants={pageVariants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 0.5, ease: "easeInOut" }}
					style={{ width: "100%", height: "100%" }} // この行を追加
				>
					<Box
						sx={css}
						className="ruby-text"
						dangerouslySetInnerHTML={{ __html: brText }}
						fontSize={{ base: "14px", md: "16px", lg: "18px" }}
						fontFamily={"Noto Serif JP"}
						lineHeight="1.5em"
						margin="10px"
					/>
				</motion.div>
			</AnimatePresence>
			{/* ページ遷移ボタンの実装 */}
			<button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}>前ページ</button>
			<button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1))}>次ページ</button>
		</>
	);
};
