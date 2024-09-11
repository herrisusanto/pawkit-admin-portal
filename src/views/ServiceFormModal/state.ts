import { atom } from "jotai";

type ServiceFormModalAtomType = {
  open: boolean;
  serviceId?: null | string;
};

export const serviceFormModalAtom = atom<ServiceFormModalAtomType>({
  open: false,
  serviceId: null,
});
