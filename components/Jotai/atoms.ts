
import { atom } from "jotai";

export const articleAtoms = atom<any>([]);
export const groupText = atom<any>("");
export const groupName = atom<any>("");
export const groupFile = atom<any>(null);
export const communityListAtom = atom<any>([]);
export const community_selected = atom<any>(null);
export const isModalOpenAtom = atom<any>(false);
export const commentContentAtom = atom<any>(false);
export const isModalTitleAtom = atom<any>("");
export const tweetUsers = atom<any>([]);
export const tweetsList = atom<any>([]);

articleAtoms.debugLabel = "articleAtoms";
groupText.debugLabel = "groupText";
groupName.debugLabel = "groupName";
groupFile.debugLabel = "groupFile";
communityListAtom.debugLabel = "communityListAtom";
community_selected.debugLabel = "community_selected";
isModalOpenAtom.debugLabel = "isModalOpenAtom";
isModalTitleAtom.debugLabel = "isModalTitleAtom";
commentContentAtom.debugLabel = "commentContentAtom";
tweetUsers.debugLabel = "tweetUsers";
tweetsList.debugLabel = "tweetsList";
