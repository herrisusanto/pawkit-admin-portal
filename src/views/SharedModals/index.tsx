import React from "react";

const PetDetails = React.lazy(() => import("../PetDetails"));
const TimeslotFormModal = React.lazy(() => import("../TimeslotFormModal"));
const ServiceFormModal = React.lazy(() => import("../ServiceFormModal"));
const DisclaimerFormModal = React.lazy(() => import("../DisclaimerFormModal"));

const SharedModals = () => {
  return (
    <React.Suspense>
      <PetDetails />
      <TimeslotFormModal />
      <ServiceFormModal />
      <DisclaimerFormModal />
    </React.Suspense>
  );
};

export default SharedModals;
