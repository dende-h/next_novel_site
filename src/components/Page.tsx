/* eslint-disable react/display-name */
// components/Page.tsx
import React from "react";
import { Box } from "@chakra-ui/react";

const css = {
	writingMode: "vertical-rl",
	textOrientation: "upright"
};

const Page = React.forwardRef<HTMLDivElement, { number: string; text: string }>(({ text }, ref) => {
	return (
		<Box
			className="ruby-text"
			ref={ref}
			dangerouslySetInnerHTML={{ __html: text }}
			fontSize={{ base: "14px", md: "16px", lg: "18px" }}
			fontFamily={"Noto Serif JP"}
			lineHeight="1.5em"
			margin="10px"
			sx={css}
		/>
	);
});

export default Page;
