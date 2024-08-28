import {
  DatePicker,
  Flex,
  Form,
  FormProps,
  InputNumber,
  message,
  Modal,
} from "antd";
import { useAtom } from "jotai";
import { timeslotFormModalAtom } from "./state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTimeSlot,
  fetchTimeSlotById,
  modifyTimeSlot,
} from "../../api/service-booking";
import dayjs from "dayjs";
import { useEffect } from "react";

const TimeslotFormModal = () => {
  const [form] = Form.useForm();
  const [state, setState] = useAtom(timeslotFormModalAtom);
  const { open, serviceId, timeslotId } = state;
  const queryClient = useQueryClient();
  const { data: timeslot } = useQuery({
    queryKey: ["service", "timeslots", serviceId, timeslotId],
    queryFn: () => fetchTimeSlotById(timeslotId as string),
    enabled: !!timeslotId,
  });
  const mutationAddTimeslot = useMutation({
    mutationFn: addTimeSlot,
    onSuccess() {
      message.success("Timeslot has been created");
    },
  });
  const mutationModifyTimeslot = useMutation({
    mutationFn: modifyTimeSlot,
    onSuccess() {
      message.success("Timeslot has been updated");
    },
  });
  const mutationIsPending =
    mutationAddTimeslot.isPending || mutationModifyTimeslot.isPending;

  const handleCancel = () => {
    setState({ open: false, serviceId: null, timeslotId: null });
  };

  const handleFininsh: FormProps<{
    startDateTime: dayjs.Dayjs;
    capacity: number;
  }>["onFinish"] = async ({ startDateTime, capacity }) => {
    try {
      if (timeslot) {
        await mutationModifyTimeslot.mutateAsync({
          serviceId: serviceId as string,
          capacity,
          isFull: false,
          startDateTime: startDateTime.toISOString(),
          bookingCount: 0,
          bookingIds: [],
        });
      } else {
        await mutationAddTimeslot.mutateAsync({
          serviceId: serviceId as string,
          capacity,
          isFull: false,
          startDateTime: startDateTime.toISOString(),
          bookingCount: 0,
          bookingIds: [],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["service", serviceId, "timeslots"],
      });
      handleCancel();
    } catch (error) {
      message.error(typeof error === "string" ? error : JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (timeslot) {
      const { startDateTime, ...values } = timeslot;
      form.setFieldsValue({ ...values, startDateTime: dayjs(startDateTime) });
    }
  }, [timeslot, form]);

  return (
    <Modal
      open={open}
      title="Edit Timeslot"
      onCancel={handleCancel}
      onOk={form.submit}
      confirmLoading={mutationIsPending}
    >
      <div className="pt-4">
        <Form layout="vertical" form={form} onFinish={handleFininsh}>
          <Flex gap={16}>
            <Form.Item name="startDateTime" label="Datetime" className="w-full">
              <DatePicker
                disabled={typeof timeslot !== "undefined"}
                showTime={{ showSecond: false }}
                className="w-full"
              />
            </Form.Item>
            <Form.Item name="capacity" label="Capacity" className="w-full">
              <InputNumber min={1} max={3} className="w-full" />
            </Form.Item>
          </Flex>
        </Form>
      </div>
    </Modal>
  );
};

export default TimeslotFormModal;
