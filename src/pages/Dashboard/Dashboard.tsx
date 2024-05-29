import React, { useState } from "react";
import {
  DashboardOutlined,
  GroupOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  MenuProps,
  TableProps,
  DatePicker,
  Select,
  Flex,
  Avatar,
  Typography,
} from "antd";
import { Layout, Menu, Table, Tag, theme } from "antd";
import PawkitLogo from "../../assets/pawkit_logo.png";

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

type MenuItem = Required<MenuProps>["items"][number];

interface DataType {
  createdAt: string;
  bookingId: string;
  petcustomerUsername: string;
  serviceName: string;
  petCount: number;
  status: "In Progress" | "Confirmed" | "Cancelled";
  total: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Booking Created",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    key: "bookingId",
  },
  {
    title: "Owner Name",
    dataIndex: "petcustomerUsername",
    key: "petcustomerUsername",
  },
  {
    title: "Service",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Pet(s)",
    dataIndex: "petCount",
    key: "petCount",
  },
  {
    title: "Booking Status",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      if (status === "In Progress") {
        return (
          <Tag color="warning" key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      } else if (status === "Cancelled") {
        return (
          <Tag color="error" key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      } else if (status === "Confirmed") {
        return (
          <Tag color="success" key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    },
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (value) => `S$${value}`,
  },
  {
    title: "Action",
    key: "action",
    render: () => <MoreOutlined />,
  },
];

const data: DataType[] = [
  {
    bookingId: "PET-11111",
    createdAt: "02/05/2024 10:38:13",
    petcustomerUsername: "Jane Doe",
    serviceName: "Grooming",
    petCount: 1,
    status: "In Progress",
    total: 150,
  },
  {
    bookingId: "PET-11112",
    createdAt: "02/05/2024 10:38:13",
    petcustomerUsername: "Jane Doe",
    serviceName: "Grooming",
    petCount: 1,
    status: "Cancelled",
    total: 200,
  },
  {
    bookingId: "PET-11113",
    createdAt: "02/05/2024 10:38:13",
    petcustomerUsername: "Jane Doe",
    serviceName: "Grooming",
    petCount: 1,
    status: "Confirmed",
    total: 15,
  },
  {
    bookingId: "PET-11114",
    createdAt: "02/05/2024 10:38:13",
    petcustomerUsername: "Jane Doe",
    serviceName: "Grooming",
    petCount: 1,
    status: "In Progress",
    total: 23,
  },
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Booking", "1", <DashboardOutlined />),
  getItem("Services", "2", <GroupOutlined />),
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img width={100} src={PawkitLogo} />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex
            gap='middle'
            justify="flex-end"
            align="center"
            style={{ height: "100%", padding: 24}}
          >
            <Avatar icon={<UserOutlined />} />
            <Typography>Jonathan Joestar</Typography>

            <Typography.Text type="secondary">Admin</Typography.Text>
          </Flex>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              margin: "16px 0",
              padding: 16,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Flex gap="middle">
              <RangePicker />
              <Select
                // defaultValue="all"
                placeholder="Service Type"
                style={{ width: 180 }}
                // onChange={handleChange}
                options={[
                  { value: "all", label: "All" },
                  { value: "grooming", label: "Grooming" },
                  { value: "vaccination", label: "Vaccination" },
                ]}
              />
              <Select
                // defaultValue="all"
                placeholder="Status"
                style={{ width: 180 }}
                // onChange={handleChange}
                options={[
                  { value: "all", label: "All" },
                  { value: "in progress", label: "In Progress" },
                  { value: "cancelled", label: "Cancelled" },
                  { value: "confirmed", label: "Confirmed" },
                ]}
              />
            </Flex>
          </div>
          <div
            style={{
              margin: "16px 0",
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Pawkit ©{new Date().getFullYear()} Created by Pawkit Dev
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
