import React from "react";

const PetDetails = React.lazy(() => import("../PetDetails"));

const SharedModals = () => {
  return (
    <React.Suspense>
      <PetDetails />
    </React.Suspense>
  );
};

export default SharedModals;
