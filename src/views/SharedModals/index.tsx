import React from "react";

const PetDetails = React.lazy(() => import("../PetDetails"));
const TimeslotFormModal = React.lazy(() => import("../TimeslotFormModal"));
const ServiceFormModal = React.lazy(() => import("../ServiceFormModal"));

const SharedModals = () => {
  return (
    <React.Suspense>
      <PetDetails />
      <TimeslotFormModal />
      <ServiceFormModal />
    </React.Suspense>
  );
};

export default SharedModals;
