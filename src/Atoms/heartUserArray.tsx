import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../components/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "heartUserArray",
	version: 2,
	storeName: "heartUserArray"
});

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localforage
});

const defaultValue: string[] = [];

export const heartUserArray = atom({
	key: "heartUserArray",
	default: defaultValue,
	effects_UNSTABLE: [persistAtom]
});
