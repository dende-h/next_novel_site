/* eslint-disable react/display-name */
// components/Page.tsx
import React from "react";
import { Box } from "@chakra-ui/react";

const css = {
	writingMode: "vertical-rl",
	textOrientation: "upright"
};

const Page = React.forwardRef<HTMLDivElement, { number: string; text: string }>(({ text, number }, ref) => {
	return (
		<Box ref={ref}>
			<h1>Page Header</h1>
			<Box
				className="ruby-text"
				dangerouslySetInnerHTML={{ __html: text }}
				fontSize={{ base: "14px", md: "16px", lg: "18px" }}
				fontFamily={"Noto Serif JP"}
				lineHeight="1.5em"
				margin="10px"
				sx={css}
			/>
			<p>Page number: {number}</p>
		</Box>
	);
});

export default Page;
