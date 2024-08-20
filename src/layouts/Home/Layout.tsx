import React, { useEffect, useState } from "react";
import {
  DashboardOutlined,
  GroupOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  MenuProps,
  Flex,
  Avatar,
  Typography,
  Button,
  Layout,
  Menu,
  theme,
  message,
} from "antd";
import PawkitLogo from "../../assets/pawkit_logo.png";
import {
  fetchAuthSession,
  fetchUserAttributes,
  GetCurrentUserOutput,
  signOut,
} from "aws-amplify/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { currentAuthenticatedUser } from "../../api.backup/auth";
import { useQuery } from "@tanstack/react-query";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

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
  getItem(<Link to="dashboard">Dashboard</Link>, "1", <DashboardOutlined />),
  getItem(<Link to="bookings">Bookings</Link>, "2", <DashboardOutlined />),
  getItem(<Link to="services">Services</Link>, "3", <GroupOutlined />),
];

export const HomeLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: userAttributes } = useQuery({
    queryKey: ["user_attributes"],
    queryFn: fetchUserAttributes,
  });
  const [user, setUser] = useState<GetCurrentUserOutput | null>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authSession = (
        await fetchAuthSession()
      ).tokens?.accessToken.toString();
      if (!authSession) {
        navigate("/login");
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err: any) {
      message.error(`Error sign out: ${err?.message}`, 2.5);
    }
  };

  const getUser = async () => {
    const user = await currentAuthenticatedUser();
    setUser(user);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
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
            className="!border-0"
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
              <Avatar src={userAttributes?.picture} icon={<UserOutlined />} />
              <Typography>{userAttributes?.name}</Typography>

              <Button type="text" danger onClick={handleSignOut}>
                Sign Out
              </Button>
            </Flex>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Pawkit ©{new Date().getFullYear()} Created by Pawkit Dev
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default HomeLayout;
