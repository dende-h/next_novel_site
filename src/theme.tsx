import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = {
	sm: "40em",
	md: "52em",
	lg: "64em",
	xl: "80em"
};

const theme = extendTheme({
	semanticTokens: {
		colors: {
			text: {
				default: "#16161D",
				_dark: "#ade3b8"
			},
			heroGradientStart: {
				default: "#7928CA",
				_dark: "#e3a7f9"
			},
			heroGradientEnd: {
				default: "#FF0080",
				_dark: "#fbec8f"
			}
		},
		radii: {
			button: "12px"
		}
	},
	colors: {
		black: "#16161D"
	},
	fonts: {
		heading: `'Raleway', sans-serif`,
		body: `'Open Sans', sans-serif`
	},
	breakpoints,
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				color: mode("gray.700", "gray.100")(props),
				bg: mode("gray.200", "gray.800")(props),
				fontFamily: "body"
			},
			heading: {
				color: mode("gray.800", "gray.100")(props),
				fontFamily: "heading"
			},
			input: {
				color: mode("gray.600", "gray.200")(props),
				bgColor: mode("gray.200", "gray.500")(props),
				fontFamily: "body"
			},
			textarea: {
				color: mode("gray.600", "gray.200")(props),
				bgColor: mode("gray.200", "gray.500")(props),
				fontFamily: "body"
			}
		})
	}
});

export default theme;
