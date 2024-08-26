import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { useEffect, useMemo } from "react";
import { useUsers } from "../../hooks";
import { fetchPetsByCustomer } from "../../api/pet";
import {
  addBooking,
  fetchServices,
  updateBookingStatus,
} from "../../api/service-booking";
import dayjs from "dayjs";
import {
  BookingStatus,
  BookingType,
  Currency,
  Service,
} from "../../api/graphql/API";
import { getAdditionalPrice } from "../../utils";
import { addOrder } from "../../api/order";

export const CreateBooking = () => {
  const [form] = Form.useForm();
  const customerId = Form.useWatch("customerId", form);
  const petId = Form.useWatch("petId", form);
  const serviceId = Form.useWatch("serviceId", form);
  const selectedAddons = Form.useWatch("addOns", form);
  const users = useUsers();
  const usersAsOptions = useMemo(() => {
    return (
      users &&
      users.map((user: any) => ({
        value: user.sub,
        label: (
          <Space>
            <Typography.Text>{user.name || user.sub}</Typography.Text>
            <Tag color="blue">{user.phone_number}</Tag>
          </Space>
        ),
      }))
    );
  }, [users]);
  const { data: userPets } = useQuery({
    queryKey: ["pets", customerId],
    queryFn: () => fetchPetsByCustomer(customerId),
    enabled: !!customerId,
  });
  const selectedPet = useMemo(() => {
    return userPets?.find((pet) => pet.id === petId);
  }, [userPets, petId]);
  const userPetsAsOptions = useMemo(() => {
    return userPets?.map((pet) => ({ value: pet.id, label: pet.name }));
  }, [userPets]);
  const { data: services } = useQuery({
    queryKey: ["services", selectedPet?.petType],
    queryFn: () =>
      fetchServices({
        filter: {
          defaultDisplay: { eq: true },
          petType: { eq: selectedPet?.petType },
        },
      }),
    enabled: !!selectedPet,
  });
  const selectedService = useMemo(() => {
    return services?.find((service) => service.id === serviceId);
  }, [services, serviceId]);
  const servicesAsOptions = useMemo(() => {
    return services?.map((service) => ({
      value: service.id,
      label: `${service.name} | S$ ${service.basePrice}`,
    }));
  }, [services]);
  const { data: addons } = useQuery({
    queryKey: ["addons", serviceId],
    queryFn: () =>
      fetchServices({
        filter: {
          parentServiceIds: { attributeExists: true },
          petType: { eq: selectedPet?.petType },
        },
      }),
    select(data) {
      return data.filter((service) =>
        service.parentServiceIds?.includes(selectedService?.id as string)
      );
    },
    enabled: !!selectedService,
  });
  const addonsAsOptions = useMemo(() => {
    return addons?.map((addon) => ({
      value: addon.id,
      label: `${addon.name} | S$ ${addon.basePrice + getAdditionalPrice(Number(selectedPet?.weightValue), addon) || 0}`,
    }));
  }, [addons, selectedPet]);

  const estimatedPrice = useMemo(() => {
    const service = selectedService;

    const pet = selectedPet;

    const additionalPrice = getAdditionalPrice(
      pet?.weightValue ?? 0,
      service as Service
    );

    const addonServicesPrice = selectedAddons?.reduce(
      (prevValue: any, serviceId: any) => {
        const addonService = addons?.find(
          (service: Service) => service.id === serviceId
        );
        const additionalAddOnPrice = getAdditionalPrice(
          pet?.weightValue ?? 0,
          addonService as Service
        );
        const addOnBasePrice = addonService?.basePrice || 0;
        return addOnBasePrice + additionalAddOnPrice + prevValue;
      },
      0
    );

    const basePrice = service?.basePrice || 0;
    return basePrice + additionalPrice + (addonServicesPrice || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddons, selectedService]);

  const mutationAddOrder = useMutation({
    mutationFn: ({
      customerId,
      currency,
    }: {
      customerId: string;
      currency: Currency;
    }) => addOrder(customerId, currency),
  });
  const mutationAddBooking = useMutation({
    mutationFn: addBooking,
    async onSuccess(data) {
      await mutationUpdateBooking.mutateAsync({
        customerUsername: data.booking.customerUsername,
        timeSlotId: data.booking.timeSlotId,
      });
      message.success("Booking has been created", 3);
      form.resetFields();
    },
  });
  const mutationUpdateBooking = useMutation({
    mutationFn: ({
      customerUsername,
      timeSlotId,
    }: {
      customerUsername: string;
      timeSlotId: string;
    }) =>
      updateBookingStatus(
        customerUsername,
        timeSlotId,
        undefined,
        BookingStatus.CONFIRMED,
        false
      ),
  });

  const handleFinish: FormProps["onFinish"] = async ({
    startDateTime,
    petId,
    address,
    ...values
  }) => {
    const addedOrder = await mutationAddOrder.mutateAsync({
      customerId,
      currency: Currency.SGD,
    });
    const formattedStartDateTime = dayjs(startDateTime).toISOString();
    const formattedValues = {
      ...values,
      orderId: addedOrder.id,
      currency: Currency.SGD,
      bookingType: BookingType.PAID,
      amount: estimatedPrice,
      petIds: [petId],
      startDateTime: formattedStartDateTime,
      address,
    };
    mutationAddBooking.mutate(formattedValues);
  };

  useEffect(() => {
    if (customerId) {
      const user = users.find((user: any) => user.sub === customerId);
      console.log(user);
      if (user?.address) {
        form.setFieldValue("address", user.address);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <div className="my-6 p-8 bg-white rounded-2xl">
      <Form onFinish={handleFinish} layout="vertical" form={form}>
        <Form.Item name="customerId" label="User">
          <Select
            options={usersAsOptions}
            onChange={() => {
              form.resetFields(["petId", "serviceId", "addOns"]);
            }}
          />
        </Form.Item>
        <Form.Item name="address" label="Address" initialValue="">
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="petId" label="Pet">
              <Select
                options={userPetsAsOptions}
                onChange={() => {
                  form.resetFields(["serviceId", "addOns"]);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="serviceId" label="Service">
              <Select
                options={servicesAsOptions}
                onChange={() => {
                  form.resetFields(["addOns"]);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="addOns" label="Addons" initialValue={[]}>
              <Select options={addonsAsOptions} mode="multiple" />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Form.Item name="startDateTime" label="Date">
            <DatePicker showTime={{ showSecond: false, minuteStep: 15 }} />
          </Form.Item>
        </Space>
        <Row justify="space-between" align="bottom">
          <Col>
            <Space direction="vertical" size={0}>
              <Typography.Text className="text-gray-600 text-xs font-medium">
                Total S$
              </Typography.Text>
              <Typography.Text className="text-green-600 text-2xl font-medium">
                {estimatedPrice || 0}
              </Typography.Text>
            </Space>
          </Col>
          <Col>
            <Button htmlType="submit">Create Booking</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateBooking;
