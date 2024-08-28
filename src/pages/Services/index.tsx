import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Table,
  TableProps,
  Tabs,
  Upload,
  message,
  theme,
} from "antd";
import {
  CreateServiceInput,
  PetType,
  Service,
  ServiceCategory,
  UpdateServiceInput,
} from "../../api/graphql/API";
import {
  addService,
  fetchServices,
  modifyService,
  removeService,
} from "../../api/service-booking";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchServiceProviders } from "../../api/service-provider";
import { getUrl, uploadData } from "aws-amplify/storage";
import { FileType, getBase64 } from "../../utils";
import { useNavigate } from "react-router-dom";

type DeleteServicePayload = {
  name: string;
  serviceProviderName: string;
  category: ServiceCategory;
  petType: PetType;
};

const PRICING_WEIGHTS = [
  "xsWeightPrice",
  "sWeightPrice",
  "mWeightPrice",
  "lWeightPrice",
  "xlWeightPrice",
  "xxlWeightPrice",
];

export function Services() {
  const [form] = Form.useForm();
  const petType = Form.useWatch("petType", form);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: serviceProviders, isPending: serviceProvidersPending } =
    useQuery({
      queryKey: ["service_providers"],
      queryFn: () => fetchServiceProviders({}),
    });
  const { data: services, isPending } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices({}),
    select(data) {
      return data.sort((a, b) => Number(a.id) - Number(b.id));
    },
  });
  const { data: servicesAsOptions, isPending: servicesAsOptionsPending } =
    useQuery({
      queryKey: ["services", petType],
      queryFn: () => fetchServices({ filter: { petType: { eq: petType } } }),
      select(data) {
        return data
          .sort((a, b) => Number(a.id) - Number(b.id))
          .map((service) => ({
            value: service.id,
            label: service.name,
          }));
      },
      enabled: !!petType,
    });
  const serviceProvidersAsOptions = useMemo(() => {
    return serviceProviders?.map((serviceProvider) => ({
      value: serviceProvider.id,
      label: serviceProvider.name,
    }));
  }, [serviceProviders]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedRecord, setOpenedRecord] = useState<Service | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageObj, setImageObj] = useState<FileType | null>();
  const handleShowModal = (record: any, type?: string) => {
    if (type === "create") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
      setOpenedRecord(record);
    }
  };
  const serviceImageUrl = useQuery({
    queryKey: ["service_image", openedRecord?.s3ImageKey],
    queryFn: () =>
      getUrl({
        key: openedRecord?.s3ImageKey as string,
        options: { validateObjectExistence: true },
      }),
    select(data) {
      return data.url;
    },
    enabled: !!openedRecord?.s3ImageKey,
  });
  const mutationModifyService = useMutation({
    mutationFn: modifyService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      message.success("Update Service Success", 2.5);
      setIsModalOpen(false);
      setOpenedRecord(null);
      handleCancel();
    },
  });
  const mutationAddService = useMutation({
    mutationFn: addService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      message.success("Create Service Success", 2.5);
      setOpenedRecord(null);
      handleCancel();
    },
  });
  const mutationDeleteService = useMutation({
    mutationFn: ({
      name,
      serviceProviderName,
      petType,
      category,
    }: DeleteServicePayload) =>
      removeService(name, serviceProviderName, category, petType),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      message.success("Delete Service Success", 2.5);
    },
  });
  const mutationUploadData = useMutation({
    mutationFn: ({
      imageObj,
      filePath,
    }: {
      imageObj: File;
      filePath: string;
    }) =>
      uploadData({
        data: imageObj as FileType,
        key: String(filePath),
        options: { accessLevel: "guest" },
      }).result,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["service_image", openedRecord?.s3ImageKey],
      });
    },
  });
  const mutationPending =
    mutationUploadData.isPending ||
    mutationAddService.isPending ||
    mutationModifyService.isPending;

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenedRecord(null);
    setImageObj(null);
    setImageUrl(null);
    form.resetFields();
  };

  const handleFinish: FormProps["onFinish"] = async (values) => {
    const formattedValues = { ...values };
    PRICING_WEIGHTS.forEach((weight) => {
      if (!values?.[weight]?.["amount"]) {
        formattedValues[weight] = null;
      }
    });
    if (imageObj) {
      const fileExtension = imageObj?.name.split(".")[1];
      const uploadedFile = await mutationUploadData.mutateAsync({
        imageObj: imageObj as FileType,
        filePath: `album/services/${values["name"]}.${fileExtension}`,
      });
      const filePath = uploadedFile.key;
      formattedValues["s3ImageKey"] = filePath;
    }
    if (openedRecord) {
      await handleUpdateService(formattedValues);
    } else {
      await handleCreateService(formattedValues);
    }
  };

  const handleUpdateService = async (payload: UpdateServiceInput) => {
    try {
      await mutationModifyService.mutateAsync(payload);
    } catch (err: any) {
      message.error(`error: ${err?.message}`, 2.5);
    }
  };

  const handleDelete = (record: {
    name: string;
    serviceProviderName: string;
    category: ServiceCategory;
    petType: PetType;
  }) => {
    handleDeleteService(record);
  };

  const handleDeleteService = async (payload: DeleteServicePayload) => {
    try {
      await mutationDeleteService.mutateAsync(payload);
    } catch (err: any) {
      message.error(`error: ${err?.message}`, 2.5);
    }
  };

  const handleCreateService = async (payload: CreateServiceInput) => {
    try {
      await mutationAddService.mutateAsync(payload);
    } catch (err: any) {
      message.error(`error when fetching data: ${err?.message}`, 2.5);
    }
  };

  useEffect(() => {
    if (openedRecord) {
      const {
        serviceProviderId,
        defaultDisplay,
        onlinePaymentAccepted,
        ...values
      } = openedRecord as Service;
      form.setFieldsValue({
        ...values,
        serviceProviderId,
        serviceProviderName: values.serviceProviderName,
        defaultDisplay: String(defaultDisplay),
        onlinePaymentAccepted: String(onlinePaymentAccepted),
      });
    }
  }, [openedRecord, form]);

  const renderWeightPricing = (name: string) => (
    <>
      <Flex gap={16}>
        <Form.Item
          name={[name, "additionalDuration"]}
          label="Additional duration"
          initialValue={0}
        >
          <InputNumber min={0} addonAfter="Minutes" />
        </Form.Item>
        <Form.Item name={[name, "amount"]} label="Amount" initialValue={0}>
          <InputNumber step={0.01} min={0} addonAfter="SGD" />
        </Form.Item>
      </Flex>
      <Flex gap={16}>
        <Form.Item
          name={[name, "minWeight"]}
          label="Min weight"
          initialValue={0}
        >
          <InputNumber step={0.01} min={0} addonAfter="KG" />
        </Form.Item>
        <Form.Item
          name={[name, "maxWeight"]}
          label="Max weight"
          initialValue={0}
        >
          <InputNumber step={0.01} min={0} addonAfter="KG" />
        </Form.Item>
      </Flex>
      <Form.Item hidden name={[name, "weightUnit"]} initialValue="KG">
        <InputNumber step={0.01} />
      </Form.Item>
      <Form.Item
        hidden
        name={[name, "additionalDurationUnit"]}
        initialValue="MINUTES"
      >
        <InputNumber />
      </Form.Item>
    </>
  );

  const columns: TableProps<Service>["columns"] = useMemo(
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
          if ((parentServiceIds?.length || 0) > 0) {
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
                shape="circle"
                onClick={() => {
                  navigate(`/services/${record.id}`);
                }}
              >
                <EyeOutlined />
              </Button>
              <Button
                onClick={() => handleShowModal(record)}
                type="default"
                shape="circle"
                icon={<EditOutlined />}
              />
              <Popconfirm
                title={`Are you sure you want to delete "${record.name}" service?`}
                onConfirm={() =>
                  handleDelete({
                    name: record.name,
                    serviceProviderName: record.serviceProviderName,
                    category: record.serviceCategory,
                    petType: record.petType,
                  })
                }
              >
                <Button
                  type="default"
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Flex>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [services, openedRecord]
  );

  return (
    <>
      {contextHolder}

      <Flex justify="end">
        <Button
          style={{ marginTop: 16 }}
          onClick={() => handleShowModal({}, "create")}
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={services}
          loading={isPending}
          pagination={false}
        />
      </div>
      <Modal
        title="Edit Service"
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
          onFinish={handleFinish}
        >
          <Flex justify="center" className="py-4">
            <Card title="Service Image">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={(file) => {
                  setImageObj(file);
                  getBase64(file as FileType, (url) => {
                    setImageUrl(url);
                  });
                  return false;
                }}
              >
                <Image
                  src={(imageUrl as string) || serviceImageUrl.data?.href}
                  preview={false}
                />
              </Upload>
            </Card>
          </Flex>
          <Flex gap={16}>
            <Form.Item
              name="name"
              label="Name"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="serviceProviderId"
              label="Service provider"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Select
                loading={serviceProvidersPending}
                options={serviceProvidersAsOptions}
                onSelect={(_, option) => {
                  form.setFieldValue("serviceProviderName", option["label"]);
                }}
              />
            </Form.Item>
          </Flex>
          <Flex gap={16}>
            <Form.Item
              name="serviceCategory"
              label="Service category"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: "Grooming", value: ServiceCategory.GROOMING },
                  { label: "Vaccination", value: ServiceCategory.VACCINATION },
                  {
                    label: "Medical Sitting",
                    value: ServiceCategory.MEDICAL_SITTING,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="petType"
              label="Pet type"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: "Dog", value: "DOG" },
                  { label: "Cat", value: "CAT" },
                ]}
              />
            </Form.Item>
          </Flex>
          <Flex gap={16}>
            <Form.Item
              name="basePrice"
              label="Base price"
              rules={[{ required: true }]}
            >
              <InputNumber step={0.01} min={0} addonAfter="SGD" />
            </Form.Item>
            <Form.Item
              name="baseDuration"
              label="Base duration"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} addonAfter="Minutes" />
            </Form.Item>
          </Flex>
          <Flex gap={16}>
            <Form.Item
              name="defaultDisplay"
              label="Is main service?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio.Button value="true">Yes</Radio.Button>
                <Radio.Button value="false">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="displayPriority" label="Display priority">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="onlinePaymentAccepted"
              label="Allow online payment?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio.Button value="true">Yes</Radio.Button>
                <Radio.Button value="false">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Flex>
          <Form.Item name="shortDescription" label="Short description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="longDescription" label="Long description">
            <Input.TextArea />
          </Form.Item>
          <Flex gap={16} wrap>
            <Card title="Weight pricing">
              <Tabs
                items={[
                  {
                    key: "1",
                    label: "XS",
                    children: renderWeightPricing("xsWeightPrice"),
                  },
                  {
                    key: "2",
                    label: "S",
                    children: renderWeightPricing("sWeightPrice"),
                  },
                  {
                    key: "3",
                    label: "M",
                    children: renderWeightPricing("mWeightPrice"),
                  },
                  {
                    key: "4",
                    label: "L",
                    children: renderWeightPricing("lWeightPrice"),
                  },
                  {
                    key: "5",
                    label: "XL",
                    children: renderWeightPricing("xlWeightPrice"),
                  },
                  {
                    key: "6",
                    label: "XXL",
                    children: renderWeightPricing("xxlWeightPrice"),
                  },
                ]}
              />
            </Card>
            <Form.Item shouldUpdate className="w-full">
              {({ getFieldValue }) => {
                const isMainService =
                  getFieldValue(["defaultDisplay"]) === "true";
                return isMainService ? (
                  <Form.Item name="childServiceIds" label="Addons">
                    <Select
                      loading={servicesAsOptionsPending}
                      options={servicesAsOptions}
                      mode="multiple"
                    />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>
          </Flex>
          <Form.Item name="currency" initialValue="SGD" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="baseDurationUnit" initialValue="MINUTES" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="serviceProviderName" hidden>
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-4"
            loading={mutationPending}
          >
            Save Changes
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default Services;
