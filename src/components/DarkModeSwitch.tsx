import { useColorMode, IconButton, Tooltip } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";
	const tooltipLabel = colorMode === "light" ? "ダークモードへ切り替えます" : "ライトモードへ切り替えます";
	return (
		<Tooltip label={tooltipLabel} placement={"right-end"}>
			<IconButton
				icon={isDark ? <SunIcon /> : <MoonIcon />}
				aria-label="Toggle Theme"
				colorScheme="green"
				onClick={toggleColorMode}
			/>
		</Tooltip>
	);
};
