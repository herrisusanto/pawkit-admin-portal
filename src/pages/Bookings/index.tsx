import { useState } from "react";
import {
  Button,
  Col,
  Flex,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import { BookingStatus } from "../../api.backup/graphql/API";
import { format } from "date-fns";
import {
  fetchBookings,
  removeBooking,
  updateBookingStatus,
} from "../../api.backup/service-booking";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Booking } from "../../api/graphql/API";
import { useNavigate } from "react-router-dom";

export function Bookings() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedRecord, setOpenedRecord] = useState<any>({});
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
    setBookingStatus(record.status);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenedRecord({});
    setBookingStatus(null);
  };

  const handleChangeStatus = (value: BookingStatus) => {
    setBookingStatus(value);
  };

  const handleUpdateBooking = async (
    customerUsername: string,
    timeSlotId: string
  ) => {
    try {
      messageApi.open({
        type: "loading",
        content: "Action in progress..",
        duration: 2.5,
      });
      if (bookingStatus) {
        const result = await updateBookingStatus(
          customerUsername,
          timeSlotId,
          bookingStatus,
          false
        );
        if (result) {
          queryClient.invalidateQueries({ queryKey: ["bookings"] });
          message.success("Update Booking Success", 2.5);
          setIsModalOpen(false);
          setOpenedRecord({});
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

  const columns: TableColumnsType<Booking> = [
    {
      title: "Booking Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return createdAt
          ? format(new Date(createdAt), "yyyy/MM/dd HH:mm:ss")
          : "";
      },
    },
    {
      title: "Date of Booking",
      dataIndex: "startDateTime",
      key: "startDateTime",
      render: (startDateTime) => {
        return startDateTime
          ? format(new Date(startDateTime), "yyyy/MM/dd HH:mm:ss")
          : "";
      },
    },
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer ID",
      dataIndex: "customerUsername",
      key: "customerUsername",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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

  const bookingStatusOptions = (status: BookingStatus | null) => {
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
        <Table columns={columns} dataSource={bookings} loading={isPending} />
      </div>
      <Modal
        title="Booking Detail"
        open={isModalOpen}
        // footer={null}
        onOk={() =>
          handleUpdateBooking(
            openedRecord?.customerUsername,
            openedRecord?.timeSlotId
          )
        }
        okText="Update Booking Status"
        onCancel={handleCancel}
      >
        <Typography.Title level={3}>ID: {openedRecord?.id}</Typography.Title>
        <Flex vertical gap={24} style={{ marginBottom: 30 }}>
          <Row>
            <Col span={12}>
              <Typography.Text type="secondary">Date Created</Typography.Text>
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
              <Select
                // defaultValue="all"
                value={bookingStatus}
                placeholder="Status"
                style={{ width: 180 }}
                onChange={handleChangeStatus}
                options={bookingStatusOptions(openedRecord.status)}
              />
            </Col>
          </Row>
        </Flex>
      </Modal>
    </>
  );
}

export default Bookings;
