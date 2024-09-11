import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  Tabs,
  Upload,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  CreateServiceInput,
  Service,
  ServiceCategory,
  UpdateServiceInput,
} from "../../api/graphql/API";
import { FileType, getBase64 } from "../../utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUrl, uploadData } from "aws-amplify/storage";
import {
  addService,
  fetchServiceById,
  fetchServices,
  modifyService,
} from "../../api/service-booking";
import { fetchServiceProviders } from "../../api/service-provider";
import { useAtom } from "jotai";
import { serviceFormModalAtom } from "./state";

const PRICING_WEIGHTS = [
  "xsWeightPrice",
  "sWeightPrice",
  "mWeightPrice",
  "lWeightPrice",
  "xlWeightPrice",
  "xxlWeightPrice",
];

const ServiceFormModal = () => {
  const [state, setState] = useAtom(serviceFormModalAtom);
  const { open, serviceId } = state;
  const [form] = Form.useForm();
  const petType = Form.useWatch("petType", form);
  const queryClient = useQueryClient();
  const { data: service } = useQuery({
    queryKey: ["services", serviceId],
    queryFn: () => fetchServiceById(serviceId as string),
    enabled: !!serviceId,
  });
  const { data: serviceProviders, isFetching: serviceProvidersPending } =
    useQuery({
      queryKey: ["service_providers"],
      queryFn: () => fetchServiceProviders({}),
    });
  const { data: servicesAsOptions, isFetching: servicesAsOptionsPending } =
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

  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageObj, setImageObj] = useState<FileType | null>();
  const serviceImageUrl = useQuery({
    queryKey: ["service_image", service?.s3ImageKey],
    queryFn: () =>
      getUrl({
        key: service?.s3ImageKey as string,
        options: { validateObjectExistence: true },
      }),
    select(data) {
      return data.url;
    },
    enabled: !!service?.s3ImageKey,
  });
  const mutationModifyService = useMutation({
    mutationFn: modifyService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      message.success("Update Service Success", 2.5);
      setState({ open: false, serviceId: null });
      handleCancel();
    },
  });
  const mutationAddService = useMutation({
    mutationFn: addService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      message.success("Create Service Success", 2.5);
      handleCancel();
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
        queryKey: ["service_image", service?.s3ImageKey],
      });
    },
  });
  const mutationPending =
    mutationUploadData.isPending ||
    mutationAddService.isPending ||
    mutationModifyService.isPending;

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
    if (service) {
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

  const handleCreateService = async (payload: CreateServiceInput) => {
    try {
      await mutationAddService.mutateAsync(payload);
    } catch (err: any) {
      message.error(`error when fetching data: ${err?.message}`, 2.5);
    }
  };

  const handleCancel = () => {
    setState({ open: false, serviceId: null });
    setImageObj(null);
    setImageUrl(null);
    form.resetFields();
  };

  useEffect(() => {
    if (service) {
      const {
        serviceProviderId,
        defaultDisplay,
        onlinePaymentAccepted,
        ...values
      } = service as Service;
      form.setFieldsValue({
        ...values,
        serviceProviderId,
        serviceProviderName: values.serviceProviderName,
        defaultDisplay: String(defaultDisplay),
        onlinePaymentAccepted: String(onlinePaymentAccepted),
      });
    }
  }, [service, form]);

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

  return (
    <Modal
      title="Edit Service"
      open={open}
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
                  label: "Pet Sitting",
                  value: ServiceCategory.PET_SITTING,
                },
                {
                  label: "Nursing",
                  value: ServiceCategory.NURSING,
                },
                {
                  label: "Transport",
                  value: ServiceCategory.TRANSPORT,
                },
                {
                  label: "Vet Consult",
                  value: ServiceCategory.VET_CONSULT,
                },
                {
                  label: "Wellness",
                  value: ServiceCategory.WELLNESS,
                },
                {
                  label: "Microchipping",
                  value: ServiceCategory.MICROCHIPPING,
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
                { label: "Rabbit", value: "RABBIT" },
                { label: "Guinea Pig", value: "GUINEA_PIG" },
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
        <Form.Item
          shouldUpdate={(prev, curr) =>
            prev["defaultDisplay"] !== curr["defaultDisplay"] ||
            prev["petType"] !== curr["petType"]
          }
          noStyle
        >
          {({ getFieldValue }) => {
            const isMainService = getFieldValue(["defaultDisplay"]) === "true";
            const petType = typeof getFieldValue(["petType"]) !== "undefined";
            return isMainService ? (
              <Form.Item name="childServiceIds" label="Addons">
                <Select
                  loading={servicesAsOptionsPending}
                  options={servicesAsOptions}
                  mode="multiple"
                  disabled={!petType}
                  placeholder={!petType ? "Select pet type first" : null}
                />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
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
  );
};

export default ServiceFormModal;
