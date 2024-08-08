import { atom } from "jotai";

type PetDetailsAtomType = { open: boolean; petId: null | string };

export const petDetailsAtom = atom<PetDetailsAtomType>({
  open: false,
  petId: null,
});
