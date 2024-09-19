import {
  Button,
  DatePicker,
  Flex,
  message,
  Popconfirm,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useParams } from "react-router-dom";
import { TimeSlot } from "../../api/graphql/API";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTimeSlots, removeTimeSlot } from "../../api/service-booking";
import { useState } from "react";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import { timeslotFormModalAtom } from "../../views/TimeslotFormModal/state";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const ServiceTimeslots = () => {
  const { serviceId } = useParams();
  const setTimeslotFormModal = useSetAtom(timeslotFormModalAtom);
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
  const queryClient = useQueryClient();
  const { data: timeslots } = useQuery({
    queryKey: ["service", serviceId, "timeslots", date?.toISOString()],
    queryFn: () =>
      fetchTimeSlots({
        serviceId: serviceId as string,
        startDateTime: { beginsWith: date?.format("YYYY-MM-DD") },
        filter: { isFull: { eq: false } },
      }),
    enabled: !!serviceId,
  });
  const mutationRemoveTimeslot = useMutation({
    mutationFn: ({
      serviceId,
      startDateTime,
    }: {
      serviceId: string;
      startDateTime: string;
    }) => removeTimeSlot(serviceId, startDateTime),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["service", serviceId, "timeslots"],
      });
      message.success("Timeslot has been deleted");
    },
  });

  const handleRemoveTimeslot = async (data: {
    serviceId: string;
    startDateTime: string;
  }) => {
    mutationRemoveTimeslot.mutate(data);
  };

  const columns: TableProps<TimeSlot>["columns"] = [
    {
      title: "Datetime",
      dataIndex: "startDateTime",
      render(value) {
        return dayjs(value).format("YYYY-MM-DD hh:mm A");
      },
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
    },
    {
      title: "Is full?",
      dataIndex: "isFull",
      render(value) {
        return value ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "x",
      render(_, record) {
        return (
          <Flex gap={12}>
            <Button
              shape="circle"
              onClick={() =>
                setTimeslotFormModal({
                  open: true,
                  serviceId: serviceId as string,
                  timeslotId: record.id,
                })
              }
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure to delete this timeslot?"
              onConfirm={() =>
                handleRemoveTimeslot({
                  serviceId: record.serviceId,
                  startDateTime: record.startDateTime,
                })
              }
            >
              <Button shape="circle" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between">
        <DatePicker defaultValue={date} onChange={setDate} />
        <Button
          type="primary"
          onClick={() => {
            setTimeslotFormModal({
              open: true,
              serviceId: serviceId as string,
              timeslotId: null,
            });
          }}
        >
          Create Timeslot
        </Button>
      </Flex>
      <Table columns={columns} dataSource={timeslots} />
    </Flex>
  );
};

export default ServiceTimeslots;
