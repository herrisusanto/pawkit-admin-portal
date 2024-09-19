import { Breadcrumb, Spin, Tabs } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const ServiceTimeslots = React.lazy(() => import("../ServiceTimeslots"));
const ServiceDisclaimers = React.lazy(
  () => import("../../views/ServiceDisclaimers")
);

export const ServiceDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          {
            title: "Services",
            className: "hover:cursor-pointer",
            onClick: () => {
              navigate("/services");
            },
          },
          { title: "Details" },
        ]}
      />
      <React.Suspense fallback={<Spin />}>
        <Tabs
          items={[
            {
              key: "timeslots",
              label: "Timeslots",
              children: <ServiceTimeslots />,
            },
            {
              key: "disclaimer",
              label: "Disclaimer",
              children: <ServiceDisclaimers />,
            },
          ]}
        />
      </React.Suspense>
    </div>
  );
};

export default ServiceDetails;
