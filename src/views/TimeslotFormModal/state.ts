import { atom } from "jotai";

type TimeslotFormModalAtomType = {
  open: boolean;
  serviceId: null | string;
  timeslotId: null | string;
};

export const timeslotFormModalAtom = atom<TimeslotFormModalAtomType>({
  open: false,
  serviceId: null,
  timeslotId: null,
});
