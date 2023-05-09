import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const commentsArray = atom({
	key: "commentsArray",
	default: [],
	effects_UNSTABLE: [persistAtom]
});
