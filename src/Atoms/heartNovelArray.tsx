import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../components/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "heartNovelArray",
	version: 2,
	storeName: "heartNovelArray"
});

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localforage
});

const defaultValue: string[] = [];

export const heartNovelArray = atom({
	key: "heartNovelArray",
	default: defaultValue,
	effects_UNSTABLE: [persistAtom]
});
