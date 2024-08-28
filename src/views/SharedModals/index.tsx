import React from "react";

const PetDetails = React.lazy(() => import("../PetDetails"));
const TimeslotFormModal = React.lazy(() => import("../TimeslotFormModal"));

const SharedModals = () => {
  return (
    <React.Suspense>
      <PetDetails />
      <TimeslotFormModal />
    </React.Suspense>
  );
};

export default SharedModals;
