// hooks/useSplitTextIntoPages.tsx
import { useEffect, useState } from "react";

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

export const useSplitTextIntoPages = (text: string, containerHeight: number, fontSize: number, lineHeight: number) => {
	const [pages, setPages] = useState<string[]>([]);

	useEffect(() => {
		if (containerHeight > 0) {
			const newPages = splitTextIntoPages(text, containerHeight, fontSize, lineHeight);
			setPages(newPages);
		}
	}, [containerHeight, text, fontSize, lineHeight]);

	return pages;
};
