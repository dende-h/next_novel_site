import { HStack, IconButton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
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
				icon={<FaHeart />}
				aria-label="お気に入り"
				onClick={(e) => handleClick(e)}
				size={"sm"}
				colorScheme={isLikes ? "yellow" : "gray"}
				variant="ghost"
				borderRadius={"full"}
			/>
		</HStack>
	);
};

export default LikeUserButton;
