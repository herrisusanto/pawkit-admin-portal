import React from "react";
import { theme } from "antd";

const Services: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        margin: "16px 0",
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      Services
    </div>
  );
};

export default Services;
