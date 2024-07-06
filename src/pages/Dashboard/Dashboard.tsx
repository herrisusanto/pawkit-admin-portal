import React from "react";
import { Col, Flex, Row, Typography, theme } from "antd";
import TotalOrderIcon from "../../assets/total_order_icon.svg";
import TotalSalesIcon from "../../assets/total_sales_icon.svg";
import TotalUserIcon from "../../assets/total_user_icon.svg";

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        margin: "16px 0",
        minHeight: 360,
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <div
            style={{
              padding: "16px",
              minHeight: 165,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Flex justify="space-between">
              <div>
                <Typography.Text>Total Bookings</Typography.Text>
                <Typography.Title level={4}>10000</Typography.Title>
              </div>
              <img src={TotalOrderIcon} />
            </Flex>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              padding: "16px",
              minHeight: 165,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Flex justify="space-between">
              <div>
                <Typography.Text>Total Revenue</Typography.Text>
                <Typography.Title level={4}>SG$140,000</Typography.Title>
              </div>
              <img src={TotalSalesIcon} />
            </Flex>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              padding: "16px",
              minHeight: 165,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Flex justify="space-between">
              <div>
                <Typography.Text>Total User</Typography.Text>
                <Typography.Title level={4}>10000</Typography.Title>
              </div>
              <img src={TotalUserIcon} />
            </Flex>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
