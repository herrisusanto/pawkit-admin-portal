import { useMemo, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Table,
  TableProps,
  message,
  theme,
} from "antd";
import {
  CreateServiceInput,
  PetType,
  ServiceCategory,
  UpdateServiceInput,
} from "../../api/graphql/API";
import {
  addService,
  fetchServices,
  modifyService,
  removeService,
} from "../../api/service-booking";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const defaultServiceValues = {
  name: "",
  serviceCategory: "VACCINATION",
  serviceProviderId: "e95a15bc-b061-70a5-d156-5157ca3094b9",
  serviceProviderName: "Pawkit Pte Ltd",
  petType: "DOG",
  defaultDisplay: true,
  displayPriority: null,
  onlinePaymentAccepted: true,
  currency: "SGD",
  basePrice: 0,
  baseDuration: 0,
  baseDurationUnit: "MINUTES",
  additionalPetPrice: null,
  xsWeightPrice: {
    minWeight: 0,
    maxWeight: 0,
    amount: 0,
  },
  sWeightPrice: {
    minWeight: 0,
    maxWeight: 0,
    amount: 0,
  },
  mWeightPrice: {
    minWeight: 0,
    maxWeight: 0,
    amount: 0,
  },
  lWeightPrice: {
    minWeight: 0,
    maxWeight: 0,
    amount: 0,
  },
  xlWeightPrice: {
    minWeight: 0,
    maxWeight: 0,
    amount: 0,
  },
  xxlWeightPrice: {
    minWeight: 0,
    maxWeight: 0,
    amount: 0,
  },
  shortDescription: null,
  longDescription: null,
  s3ImageKey: "",
  serviceBreakdown: null,
  additionalInfo: null,
  faq: null,
  goodToKnow: null,
  parentServiceIds: null,
  childServiceIds: null,
  disclaimerName: null,
  timeSlotIds: null,
  bookingIds: null,
  requiredQuestionIds: null,
};

export function Services() {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { data: services, isPending } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices({}),
    select(data) {
      return data.sort((a, b) => Number(a.id) - Number(b.id));
    },
  });
  const servicesAsOptions = useMemo(() => {
    return services?.map((service) => ({
      value: service.id,
      label: service.name,
    }));
  }, [services]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [openedRecord, setOpenedRecord] = useState<UpdateServiceInput | null>(
    null
  );
  const handleShowModal = (record: any, type?: string) => {
    if (type === "create") {
      setIsModalCreateOpen(true);
    } else {
      setIsModalOpen(true);
    }
    setOpenedRecord(record);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalCreateOpen(false);
    setOpenedRecord(null);
    form.resetFields();
  };

  const columns: TableProps<any>["columns"] = useMemo(
    () => [
      {
        title: "Service ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Service Type",
        dataIndex: "parentServiceIds",
        key: "parentServiceIds",
        render: (_, { parentServiceIds }) => {
          if (parentServiceIds?.length > 0) {
            return "Add-On";
          } else {
            return "Main Service";
          }
        },
      },
      {
        title: "Service Category",
        dataIndex: "serviceCategory",
        key: "serviceCategory",
      },
      {
        title: "Pet Type",
        dataIndex: "petType",
        key: "petType",
      },
      {
        title: "Base Price",
        dataIndex: "basePrice",
        key: "basePrice",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          return (
            <Flex gap={4}>
              <Button
                onClick={() => handleShowModal(record)}
                type="default"
                shape="circle"
                icon={<EditOutlined />}
              />
              <Button
                onClick={() =>
                  confirmDelete({
                    name: record.name,
                    serviceProviderName: record.serviceProviderName,
                    category: record.serviceCategory,
                    petType: record.petType,
                  })
                }
                type="default"
                shape="circle"
                danger
                icon={<DeleteOutlined />}
              />
            </Flex>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [services, openedRecord]
  );

  const handleUpdateService = async (payload: UpdateServiceInput) => {
    try {
      const result2 = await modifyService(payload);
      if (result2) {
        queryClient.invalidateQueries({ queryKey: ["services"] });
        message.success("Update Service Success", 2.5);
        setIsModalOpen(false);
        setOpenedRecord(null);
      }
    } catch (err: any) {
      message.error(`error: ${err?.message}`, 2.5);
    }
  };

  const confirmDelete = (record: {
    name: string;
    serviceProviderName: string;
    category: ServiceCategory;
    petType: PetType;
  }) => {
    Modal.warning({
      title: "Delete Service",
      content: `Are you sure you want to delete "${record.name}" service?`,
      onOk() {
        handleDeleteService(record);
      },
    });
  };

  const handleDeleteService = async (payload: {
    name: string;
    serviceProviderName: string;
    category: ServiceCategory;
    petType: PetType;
  }) => {
    try {
      const result2 = await removeService(
        payload.name,
        payload.serviceProviderName,
        payload.category,
        payload.petType
      );
      if (result2) {
        queryClient.invalidateQueries({ queryKey: ["services"] });
        message.success("Delete Service Success", 2.5);
      }
    } catch (err: any) {
      message.error(`error: ${err?.message}`, 2.5);
    }
  };

  const handleCreateService = async (payload: CreateServiceInput) => {
    try {
      const result2 = await addService(payload);
      if (result2) {
        queryClient.invalidateQueries({ queryKey: ["services"] });
        message.success("Create Service Success", 2.5);
        setIsModalCreateOpen(false);
        setOpenedRecord(null);
      }
    } catch (err: any) {
      message.error(`error when fetching data: ${err?.message}`, 2.5);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex justify="end">
        <Button
          style={{ marginTop: 16 }}
          onClick={() => handleShowModal(defaultServiceValues, "create")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Create Service
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
        <Table columns={columns} dataSource={services} loading={isPending} />
      </div>
      <Modal
        title={`Service Detail: ${openedRecord?.name}`}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="service-edit-form"
          layout="vertical"
          labelWrap
          labelAlign="left"
          size="large"
          onFinish={handleUpdateService}
        >
          {openedRecord &&
            Object.entries(openedRecord)
              .filter(
                ([k]) =>
                  k !== "createdAt" && k !== "updatedAt" && k !== "__typename"
              )
              .map(([k, v]: any) => {
                if (k === "parentServiceIds" || k === "childServiceIds") {
                  return (
                    <Form.Item name={k} label={k}>
                      <Select options={servicesAsOptions} mode="multiple" />
                    </Form.Item>
                  );
                }
                if (k === "bookingIds") {
                  return (
                    <Form.Item name={k} label={k}>
                      <Select options={[]} mode="multiple" />
                    </Form.Item>
                  );
                }
                if (typeof v === "object" && v) {
                  return Object.entries(v).map(([x]) => (
                    <Form.Item
                      key={`${k}-${x}`}
                      name={[k, x]}
                      label={`${k} ${x}`}
                    >
                      <Input />
                    </Form.Item>
                  ));
                } else if (
                  k === "name" ||
                  k === "serviceProviderName" ||
                  k === "serviceCategory" ||
                  k === "petType"
                ) {
                  return (
                    <Form.Item key={k} name={k} label={k}>
                      <Input disabled />
                    </Form.Item>
                  );
                }

                return (
                  <Form.Item key={k} name={k} label={k}>
                    <Input />
                  </Form.Item>
                );
              })}
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Create Service"
        open={isModalCreateOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="service-edit-form"
          layout="vertical"
          labelWrap
          labelAlign="left"
          size="large"
          onFinish={handleCreateService}
        >
          {defaultServiceValues &&
            Object.entries(defaultServiceValues).map(([k, v]: any) => {
              if (k === "parentServiceIds" || k === "childServiceIds") {
                return (
                  <Form.Item name={k} label={k}>
                    <Select options={servicesAsOptions} mode="multiple" />
                  </Form.Item>
                );
              }
              if (k === "bookingIds") {
                return (
                  <Form.Item name={k} label={k}>
                    <Select options={[]} mode="multiple" />
                  </Form.Item>
                );
              }
              if (typeof v === "object" && v) {
                return Object.entries(v).map(([x]) => (
                  <Form.Item
                    key={`${k}-${x}`}
                    name={[k, x]}
                    label={`${k} ${x}`}
                  >
                    <Input />
                  </Form.Item>
                ));
              }
              return (
                <Form.Item key={k} name={k} label={k}>
                  <Input />
                </Form.Item>
              );
            })}
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Services;
