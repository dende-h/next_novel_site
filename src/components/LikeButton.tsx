import { Box, HStack, IconButton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { heartNovelArray } from "../Atoms/heartNovelArray";
import { MouseEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = { id: string; title: string; good_mark: number };

const LikeButton = (props: Props) => {
	const { id, good_mark } = props;
	const [likesNovel, setLikesNovel] = useRecoilState<string[]>(heartNovelArray);
	const [isLikes, setIsLikes] = useState(() => likesNovel.includes(id));
	useEffect(() => {
		setIsLikes(() => likesNovel.includes(id));
	}, [likesNovel]);

	const [goodMark, setGoodMark] = useState(good_mark);
	const handleClick = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		e.stopPropagation();
		if (isLikes) {
			const newLikesNovel = [...likesNovel].filter((item) => {
				return item !== id;
			});
			const { data, error } = await supabase.from("drafts").select("good_mark").eq("id", id);
			if (!error) {
				const newGoodMark = data[0].good_mark - 1;
				setLikesNovel(newLikesNovel);
				setGoodMark(newGoodMark);
				await supabase.from("drafts").update({ good_mark: newGoodMark }).eq("id", id);
			}
		} else {
			const newLikesNovel = [...likesNovel, id];
			const { data, error } = await supabase.from("drafts").select("good_mark").eq("id", id);
			if (!error) {
				const newGoodMark = data[0].good_mark + 1;
				setGoodMark(newGoodMark);
				setLikesNovel(newLikesNovel);
				await supabase.from("drafts").update({ good_mark: newGoodMark }).eq("id", id);
			}
		}
	};

	return (
		<HStack spacing={1}>
			<IconButton
				icon={<FaHeart />}
				aria-label="いいね"
				onClick={(e) => handleClick(e)}
				size={"xs"}
				colorScheme={isLikes ? "red" : "gray"}
				borderRadius={"full"}
			/>
			<Box>{goodMark}</Box>
		</HStack>
	);
};

export default LikeButton;
