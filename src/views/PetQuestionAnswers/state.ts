import { atom } from "jotai";

type PetQuestionAnswersAtomType = { open: boolean; petId: null | string };

export const petQuestionAnswersAtom = atom<PetQuestionAnswersAtomType>({
  open: false,
  petId: null,
});
