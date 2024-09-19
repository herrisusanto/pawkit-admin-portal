import { Button, Form, FormProps, Input, message, Modal } from "antd";
import { useAtom } from "jotai";
import { disclaimerFormModalAtom } from "./state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchServiceById } from "../../api/service-booking";
import { useEffect } from "react";
import { graphqlClient } from "../../api/core";
import { getDisclaimer } from "../../api/graphql/queries";
import {
  createDisclaimer,
  updateDisclaimer,
} from "../../api/graphql/mutations";
import {
  CreateDisclaimerInput,
  UpdateDisclaimerInput,
} from "../../api/graphql/API";

export const DisclaimerFormModal = () => {
  const [form] = Form.useForm();
  const [state, setState] = useAtom(disclaimerFormModalAtom);
  const { open, serviceId, name } = state;
  const queryClient = useQueryClient();
  const { data: service } = useQuery({
    queryKey: ["services", serviceId],
    queryFn: () => fetchServiceById(serviceId as string),
    enabled: !!serviceId,
  });
  const { data: disclaimer } = useQuery({
    queryKey: ["disclaimer", serviceId],
    queryFn: () =>
      graphqlClient.graphql({
        query: getDisclaimer,
        variables: { name: name as string },
      }),
    select(data) {
      return data.data.getDisclaimer;
    },
    enabled: !!service,
  });
  const mutationCreateDisclaimer = useMutation({
    mutationFn: (input: CreateDisclaimerInput) =>
      graphqlClient.graphql({
        query: createDisclaimer,
        variables: {
          input,
        },
      }),
  });
  const mutationUpdateDisclaimer = useMutation({
    mutationFn: (input: UpdateDisclaimerInput) =>
      graphqlClient.graphql({
        query: updateDisclaimer,
        variables: {
          input,
        },
      }),
  });

  const handleCancel = () => {
    form.resetFields();
    setState({ open: false });
  };

  const handleFinish: FormProps["onFinish"] = (values) => {
    try {
      const formattedValues: CreateDisclaimerInput | UpdateDisclaimerInput = {
        ...values,
        serviceName: service?.name,
        serviceProviderName: service?.serviceProviderName,
        serviceCategory: service?.serviceCategory,
        petType: service?.petType,
      };
      if (disclaimer) {
        mutationUpdateDisclaimer.mutateAsync(formattedValues);
      } else {
        mutationCreateDisclaimer.mutateAsync(formattedValues);
      }
      message.success("Disclaimer has been created");
      queryClient.invalidateQueries({ queryKey: ["disclaimers", serviceId] });
      handleCancel();
    } catch (error) {
      message.error(typeof error === "string" ? error : "Something wrong");
    }
  };

  useEffect(() => {
    if (disclaimer) {
      form.setFieldsValue(disclaimer);
    }
  }, [disclaimer, form]);

  return (
    <Modal
      title="Edit Service"
      open={open}
      footer={null}
      width="100%"
      className="max-w-[700px]"
      onCancel={handleCancel}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item name="name" label="Name">
          <Input disabled={!!disclaimer} />
        </Form.Item>
        <Form.Item name="header" label="Header">
          <Input />
        </Form.Item>
        <Form.Item name="subheader" label="Subheader">
          <Input />
        </Form.Item>
        <Form.Item name="text" label="Content">
          <Input.TextArea autoSize={{ minRows: 12 }} />
        </Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form>
    </Modal>
  );
};

export default DisclaimerFormModal;
