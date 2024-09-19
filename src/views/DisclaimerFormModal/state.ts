import { atom } from "jotai";

type DisclaimerFormModalAtomType = {
  open: boolean;
  serviceId?: string | null;
  name?: string | null;
};

export const disclaimerFormModalAtom = atom<DisclaimerFormModalAtomType>({
  open: false,
  serviceId: null,
  name: null,
});
