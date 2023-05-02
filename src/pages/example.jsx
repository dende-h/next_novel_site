/* eslint-disable react/display-name */
import React from "react";
import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useSplitTextIntoPages } from "../hooks/useSplitTextIntoPages";

const Page = React.forwardRef((props, ref) => {
	return (
		<div className="demoPage" ref={ref}>
			<h1>Page Header</h1>
			<p>{props.children}</p>
			<p>Page number: {props.number}</p>
		</div>
	);
});

const MyBook = (props) => {
	const [containerHeight, setContainerHeight] = useState(0);
	const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
	const fontSize = isLargerThanMd ? 16 : 14;
	const lineHeight = 1.5;

	const sampleText = `｜僕《ぼく》の名前はジョバンニ。名字《みょうじ》はわからない。どこで生れたかとうんと昔《むかし》の事であるから、もうわからない。僕《ぼく》はほんとうにびっくりするような事があって、ひとりで泣いていたら、こんなに大きくなってしまった。こんどはもう泣かないと思ったら、すぐまた泣いてしまう。そして泣いていると、だれかがわけもわからないで、また泣いてしまう。僕《ぼく》は泣いていると、だれかがわけもわからないで、また泣いてしまう。僕《ぼく》は泣いていると、だれかがわけもわからないで、また泣いてしまう。`;

	const pages = useSplitTextIntoPages(sampleText, containerHeight, fontSize, lineHeight);

	return (
		<Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center" bg="white">
			<HTMLFlipBook width={300} height={500}>
				{pages.map((pageText, index) => (
					<Page key={index} number={index.toString()} text={pageText} />
				))}
			</HTMLFlipBook>
		</Box>
	);
};
export default MyBook;
