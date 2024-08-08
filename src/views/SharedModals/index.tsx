import React from "react";

const PetQuestionAnswers = React.lazy(() => import("../PetQuestionAnswers"));

const SharedModals = () => {
  return (
    <React.Suspense>
      <PetQuestionAnswers />
    </React.Suspense>
  );
};

export default SharedModals;
