import { verifyJwtToken } from "@/libs/auth";
import { atom } from "jotai";
import Cookies from "universal-cookie";

const initLoginState = async () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  
  if(token) {
    const verifiedToken = await verifyJwtToken(token);
    if(verifiedToken){
      return verifiedToken;
    }
  }
  return false;
}

export const articleAtoms = atom<any>([]);
export const isLoggedInAtom = atom<any>(initLoginState());
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
isLoggedInAtom.debugLabel = "isLoggedInAtom";
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