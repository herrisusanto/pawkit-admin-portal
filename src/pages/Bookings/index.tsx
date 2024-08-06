import { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import {
  fetchServiceById,
  fetchBookings,
  removeBooking,
  updateBookingStatus,
} from "../../api/service-booking";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Booking, Pet, BookingStatus } from "../../api/graphql/API";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/admin";

export function Bookings() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedRecord, setOpenedRecord] = useState<Booking | null>();
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | null>(
    null
  );
  const { data: bookings, isPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings({}),
    select(data) {
      return data.sort(
        (a, b) => dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
      ) as Booking[];
    },
  });

  const handleShowModal = (record: any) => {
    setIsModalOpen(true);
    setOpenedRecord(record);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenedRecord(null);
    form.resetFields();
  };

  const handleFinish: FormProps["onFinish"] = async (values) => {
    const { bookingStatus, startDateTime } = values;
    const customerUsername = openedRecord?.customerUsername as string;
    const formattedStartDateTime = dayjs(startDateTime).toISOString();
    try {
      messageApi.open({
        type: "loading",
        content: "Action in progress..",
        duration: 2.5,
      });
      if (bookingStatus) {
        const result = await updateBookingStatus(
          customerUsername,
          openedRecord?.timeSlotId as string,
          formattedStartDateTime,
          bookingStatus,
          false
        );
        if (result) {
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
          message.success("Update Booking Success", 2.5);
          setIsModalOpen(false);
          setOpenedRecord(null);
          setBookingStatus(null);
        }
      }
    } catch (err: any) {
      message.error(`Update Booking failed: ${err?.message}`, 2.5);
    }
  };

  const mutationDeleteBooking = useMutation({
    mutationFn: removeBooking,
    onSuccess() {
      message.success("Booking has been deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  useEffect(() => {
    if (openedRecord) {
      form.setFieldsValue({
        startDateTime: dayjs(openedRecord.startDateTime),
        bookingStatus: openedRecord.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedRecord]);

  const columns: TableColumnsType<Booking> = [
    {
      title: "Booking Datetime",
      dataIndex: "startDateTime",
      key: "startDateTime",
      width: 200,
      render: (startDateTime) => {
        return startDateTime
          ? dayjs(startDateTime).format("DD/MM/YYYY HH:mm")
          : "";
      },
    },
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Customer",
      dataIndex: "customerId",
      key: "customer",
      width: 280,
      render(value) {
        return <CustomerDetails customerId={value} />;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Services",
      dataIndex: "serviceName",
      key: "serviceName",
      width: 250,
      render(value, record) {
        return (
          <Space size={0} direction="vertical">
            <Typography.Text style={{ fontWeight: 700 }}>
              Service
            </Typography.Text>
            <Typography.Text>{value}</Typography.Text>
            {(record.addOns?.length || 0) > 0 && (
              <>
                <Typography.Text style={{ fontWeight: 700 }}>
                  Addons
                </Typography.Text>
                {record.addOns?.map((id) => (
                  <ServiceAddon key={id} addonId={id} />
                ))}
              </>
            )}
          </Space>
        );
      },
    },
    {
      title: "Pets",
      key: "pets",
      dataIndex: "pets",
      width: 300,
      render(value) {
        const pets: Pet[] = Array.from(value?.["items"] || []).map(
          (petItem: any) => petItem?.["pet"]
        );
        return (
          <Space size={16} direction="vertical">
            {pets.map((pet) => (
              <Space key={pet.id} direction="vertical">
                <Space>
                  <Typography.Text style={{ fontWeight: 700 }}>
                    Name:
                  </Typography.Text>
                  <Typography.Text>{pet.name}</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text style={{ fontWeight: 700 }}>
                    Birthdate:
                  </Typography.Text>
                  <Typography.Text>{pet.birthdate}</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text style={{ fontWeight: 700 }}>
                    Breed:
                  </Typography.Text>
                  <Typography.Text>{pet.breedName}</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text style={{ fontWeight: 700 }}>
                    Weight:
                  </Typography.Text>
                  <Typography.Text>{pet.weightValue} KG</Typography.Text>
                </Space>
              </Space>
            ))}
          </Space>
        );
      },
    },
    {
      title: "Booking Status",
      key: "status",
      dataIndex: "status",
      width: 150,
      render: (status) => {
        if (status === BookingStatus.CANCELLED) {
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
        } else {
          return (
            <Tag color="warning" key={status}>
              {status.toUpperCase().replaceAll("_", " ")}
            </Tag>
          );
        }
      },
    },
    {
      title: "Total",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (value) => `S$${value}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        getUser(record.customerUsername);
        return (
          <Space size={8}>
            <Button
              onClick={() => handleShowModal(record)}
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
            />
            <Popconfirm
              title="Are you sure to delete this booking?"
              onConfirm={() => {
                mutationDeleteBooking.mutate({
                  customerUsername: record.customerUsername,
                  timeSlotId: record.timeSlotId,
                });
              }}
            >
              <Button size="small" shape="circle" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const bookingStatusOptions = (status?: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return [
          {
            value: BookingStatus.CONFIRMED,
            label: BookingStatus.CONFIRMED,
          },
          {
            value: BookingStatus.CANCELLED,
            label: BookingStatus.CANCELLED,
          },
        ];
      case BookingStatus.CONFIRMED:
        return [
          {
            value: BookingStatus.IN_PROGRESS,
            label: BookingStatus.IN_PROGRESS,
          },
          {
            value: BookingStatus.CANCELLED,
            label: BookingStatus.CANCELLED,
          },
        ];
      case BookingStatus.IN_PROGRESS:
        return [
          {
            value: BookingStatus.COMPLETED,
            label: BookingStatus.COMPLETED,
          },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {contextHolder}
      <Flex justify="end" className="mt-4">
        <Button
          onClick={() => navigate("/bookings/new")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Create Booking
        </Button>
      </Flex>
      <div
        style={{
          margin: "16px 0",
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table
          rowKey="id"
          virtual
          columns={columns}
          dataSource={bookings}
          loading={isPending}
        />
      </div>
      <Modal
        title="Booking Detail"
        open={isModalOpen}
        onOk={form.submit}
        okText="Update Booking Status"
        onCancel={handleCancel}
      >
        <Typography.Title level={3}>ID: {openedRecord?.id}</Typography.Title>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Flex vertical gap={24} style={{ marginBottom: 30 }}>
            <Row>
              <Col span={12}>
                <Form.Item name="startDateTime" label="Date">
                  <DatePicker showTime={{ showSecond: false }} />
                </Form.Item>
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
                <Form.Item name="bookingStatus">
                  <Select
                    value={bookingStatus}
                    placeholder="Status"
                    style={{ width: 180 }}
                    options={bookingStatusOptions(openedRecord?.status)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}

const CustomerDetails = ({ customerId }: { customerId: string }) => {
  const { data: user, isPending } = useQuery({
    queryKey: ["users", customerId],
    queryFn: () => getUser(customerId),
  });
  const userAttributes: any = Array.from(
    (user as any)?.["UserAttributes"] || []
  ).reduce((prev: any, curr: any) => {
    return { ...prev, [curr["Name"]]: curr["Value"] };
  }, {});
  console.log(customerId);
  return isPending ? (
    <Spin />
  ) : (
    <Space size={0} direction="vertical">
      <Space>
        <Typography.Text style={{ fontWeight: 700 }}>Name:</Typography.Text>
        <Typography.Text>{userAttributes["name"]}</Typography.Text>
      </Space>
      <Space>
        <Typography.Text style={{ fontWeight: 700 }}>Phone:</Typography.Text>
        <Typography.Text>{userAttributes["phone_number"]}</Typography.Text>
      </Space>
      <Space>
        <Typography.Text style={{ fontWeight: 700 }}>Email:</Typography.Text>
        <Typography.Text>{userAttributes["email"]}</Typography.Text>
      </Space>
    </Space>
  );
};

const ServiceAddon = ({ addonId }: { addonId: string }) => {
  const { data: addon } = useQuery({
    queryKey: ["services", addonId],
    queryFn: () => fetchServiceById(addonId),
  });
  return (
    <Space align="start">
      <span>-</span>
      <Typography.Text>{addon?.name}</Typography.Text>
    </Space>
  );
};

export default Bookings;
