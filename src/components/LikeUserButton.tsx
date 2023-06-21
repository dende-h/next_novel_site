import { HStack, IconButton } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { MouseEvent, useEffect, useState } from "react";
import { heartUserArray } from "../Atoms/heartUserArray";

type Props = { name: string };

const LikeUserButton = (props: Props) => {
	const { name } = props;
	const [likesUser, setLikesUser] = useRecoilState<string[]>(heartUserArray);
	const [isLikes, setIslikes] = useState(() => likesUser.includes(name));
	useEffect(() => {
		setIslikes(() => likesUser.includes(name));
	}, [likesUser]);

	const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation();
		if (isLikes) {
			const newLikesUser = [...likesUser].filter((item) => {
				return item !== name;
			});
			setLikesUser(newLikesUser);
		} else {
			const newLikesUser = [...likesUser, name];
			setLikesUser(newLikesUser);
		}
	};

	return (
		<HStack spacing={0}>
			<IconButton
				icon={<FaStar />}
				aria-label="お気に入り"
				onClick={(e) => handleClick(e)}
				size={"xs"}
				colorScheme={isLikes ? "yellow" : "gray"}
				borderRadius={"full"}
			/>
		</HStack>
	);
};

export default LikeUserButton;
