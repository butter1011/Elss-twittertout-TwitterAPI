import { atom } from "jotai";

export const isAddOpen = atom<any>(false);
export const isDeleteOpen = atom<any>(false);
export const loadspinner = atom<any>(false);

isAddOpen.debugLabel = "isAddOpen";
isDeleteOpen.debugLabel = "isDeleteOpen";
loadspinner.debugLabel = 'loadspinner';
