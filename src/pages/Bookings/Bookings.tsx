import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Modal,
  Row,
  Select,
  Table,
  TableProps,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import { BookingStatus, ListBookingsQuery } from "../../api/graphql/API";
import { format } from "date-fns";
import { fetchBookings, updateBookingStatus } from "../../api/service-booking";
import { EditOutlined } from "@ant-design/icons";

function Bookings() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const [bookingList, setBookingList] = useState<any[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openedRecord, setOpenedRecord] = useState<any>({});
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | null>(
    null
  );

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
        title: "Customer ID",
        dataIndex: "customerUsername",
        key: "customerUsername",
      },
      {
        title: "Time Slot ID",
        dataIndex: "timeSlotId",
        key: "timeSlotId",
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

  const getBookings = async () => {
    setLoading(true);
    try {
      const result = await fetchBookings({});
      if (result) {
        setBookingList(result);
      }
    } catch (err: any) {
      message.error(`error when fetching data: ${err?.message}`, 2.5);
    } finally {
      setLoading(false);
    }
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
          getBookings();

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

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
      {/* 
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
           */}
      <div
        style={{
          margin: "16px 0",
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table columns={columns} dataSource={bookingList} loading={loading} />
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
    </>
  );
}

export default Bookings;
