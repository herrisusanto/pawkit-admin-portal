import React, { useEffect, useState } from "react";
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
  Button,
  Layout,
  Menu,
  Table,
  Tag,
  theme,
} from "antd";
import PawkitLogo from "../../assets/pawkit_logo.png";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { fetchBookings } from "../../api/booking";
import { BookingStatus, ListBookingsQuery } from "../../API";
import { format } from "date-fns";

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

type MenuItem = Required<MenuProps>["items"][number];

const columns: TableProps<ListBookingsQuery>["columns"] = [
  {
    title: "Booking Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return createdAt
        ? format(new Date(createdAt), "yyyy-MM-dd hh:mm aa")
        : "";
    },
  },
  {
    title: "Booking ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Owner Name",
    dataIndex: "customerUsername",
    key: "customerUsername",
  },
  {
    title: "Service",
    dataIndex: "serviceName",
    key: "serviceName",
  },
  {
    title: "Booking Status",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      if (status === BookingStatus.PENDING) {
        return (
          <Tag color="warning" key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      } else if (status === BookingStatus.CANCELLED) {
        return (
          <Tag color="error" key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      } else if (
        status === BookingStatus.CONFIRMED ||
        status === BookingStatus.COMPLETED
      ) {
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
    dataIndex: "amount",
    key: "amount",
    render: (value) => `S$${value}`,
  },
  {
    title: "Action",
    key: "action",
    render: () => <MoreOutlined />,
  },
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
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
  const [bookingList, setBookingList] = useState<any[]>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authSession = (
        await fetchAuthSession()
      ).tokens?.accessToken.toString();
      if (!authSession) {
        navigate("/login");
      }
      console.log((await fetchAuthSession()).tokens?.accessToken.toString());
    })();

    const getBookings = async () => {
      try {
        const result = await fetchBookings();
        console.log(result);
        if (result) {
          setBookingList(result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
            gap="middle"
            justify="flex-end"
            align="center"
            style={{ height: "100%", padding: 24 }}
          >
            <Avatar icon={<UserOutlined />} />
            <Typography>Jonathan Joestar</Typography>

            <Button type="text" danger onClick={handleSignOut}>
              Sign Out
            </Button>
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
            <Table columns={columns} dataSource={bookingList} />
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
