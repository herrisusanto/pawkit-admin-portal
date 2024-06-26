import React, { useEffect, useMemo, useState } from "react";
import {
  DashboardOutlined,
  EditOutlined,
  GroupOutlined,
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
  Modal,
  Col,
  Row,
} from "antd";
import PawkitLogo from "../../assets/pawkit_logo.png";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { fetchBookings, updateBookingStatus } from "../../api/booking";
import { BookingStatus, ListBookingsQuery } from "../../API";
import { format } from "date-fns";

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

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
  getItem("Booking", "1", <DashboardOutlined />),
  getItem("Services", "2", <GroupOutlined />),
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [bookingList, setBookingList] = useState<any[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedRecord, setOpenedRecord] = useState<any>({});
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | null>(
    null
  );
  const navigate = useNavigate();

  const columns: TableProps<ListBookingsQuery>["columns"] = useMemo(
    () => [
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
        render: (_, record) => {
          return (
            <Flex>
              <Button
                onClick={() => handleShowModal(record)}
                type="default"
                shape="circle"
                icon={<EditOutlined />}
                size="small"
              />
            </Flex>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookingList, openedRecord]
  );

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenedRecord({});
    setBookingStatus(null);
  };

  const handleShowModal = (record: any) => {
    setIsModalOpen(true);
    setOpenedRecord(record);
    setBookingStatus(record.status);
  };

  useEffect(() => {
    (async () => {
      const authSession = (
        await fetchAuthSession()
      ).tokens?.accessToken.toString();
      if (!authSession) {
        navigate("/login");
      }
    })();

    const getBookings = async () => {
      try {
        const result = await fetchBookings();
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

  const handleUpdateBooking = async (id: string) => {
    try {
      if (bookingStatus) {
        const result = await updateBookingStatus(id, bookingStatus, false);
        if (result) {
          setIsModalOpen(false);
          setOpenedRecord({});
          setBookingStatus(null);
        }
      }
      // if (result) {
      //   setBookingList(result);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = (value: BookingStatus) => {
    setBookingStatus(value);
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
            <Typography>Admin</Typography>

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
          <Modal
            title="Booking Detail"
            open={isModalOpen}
            // footer={null}
            onOk={() => handleUpdateBooking(openedRecord?.id)}
            okText="Update Booking Status"
            onCancel={handleCancel}
          >
            <Typography.Title level={3}>
              ID: {openedRecord?.id}
            </Typography.Title>
            <Flex vertical gap={24} style={{ marginBottom: 30 }}>
              <Row>
                <Col span={12}>
                  <Typography.Text type="secondary">
                    Date Created
                  </Typography.Text>
                  <br />
                  <Typography.Text>
                    {openedRecord?.startDateTime
                      ? format(
                          new Date(openedRecord?.startDateTime),
                          "yyyy/MM/dd hh:mm aa"
                        )
                      : "-"}
                  </Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text type="secondary">Booking ID</Typography.Text>
                  <br />
                  <Typography.Text>
                    {openedRecord?.id ? openedRecord?.id : "-"}
                  </Typography.Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Typography.Text type="secondary">Owner Name</Typography.Text>
                  <br />
                  <Typography.Text>
                    {openedRecord?.customerUsername
                      ? openedRecord?.customerUsername
                      : "-"}
                  </Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text type="secondary">Status</Typography.Text>
                  <br />
                  {/* <Typography.Text>
                    {openedRecord?.status ? openedRecord?.status : "-"}
                  </Typography.Text> */}

                  <Select
                    // defaultValue="all"
                    value={bookingStatus}
                    placeholder="Status"
                    style={{ width: 180 }}
                    onChange={handleChangeStatus}
                    options={[
                      {
                        value: BookingStatus.COMPLETED,
                        label: BookingStatus.COMPLETED,
                      },
                      {
                        value: BookingStatus.CONFIRMED,
                        label: BookingStatus.CONFIRMED,
                      },
                      {
                        value: BookingStatus.PENDING,
                        label: BookingStatus.PENDING,
                      },
                      {
                        value: BookingStatus.IN_PROGRESS,
                        label: BookingStatus.IN_PROGRESS,
                      },
                      {
                        value: BookingStatus.CANCELLED,
                        label: BookingStatus.CANCELLED,
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Flex>
          </Modal>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Pawkit ©{new Date().getFullYear()} Created by Pawkit Dev
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
