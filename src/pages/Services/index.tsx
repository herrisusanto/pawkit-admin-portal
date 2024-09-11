import { useMemo } from "react";
import {
  Button,
  Flex,
  Popconfirm,
  Table,
  TableProps,
  message,
  theme,
} from "antd";
import { PetType, Service, ServiceCategory } from "../../api/graphql/API";
import { fetchServices, removeService } from "../../api/service-booking";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { serviceFormModalAtom } from "../../views/ServiceFormModal/state";

type DeleteServicePayload = {
  name: string;
  serviceProviderName: string;
  category: ServiceCategory;
  petType: PetType;
};

export function Services() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: services, isFetching } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices({}),
    select(data) {
      return data.sort((a, b) => Number(a.id) - Number(b.id));
    },
  });
  const setServiceFormModal = useSetAtom(serviceFormModalAtom);
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
                onClick={() =>
                  setServiceFormModal({ open: true, serviceId: record.id })
                }
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
    [services]
  );

  return (
    <>
      {contextHolder}

      <Flex justify="end">
        <Button
          style={{ marginTop: 16 }}
          onClick={() => setServiceFormModal({ open: true })}
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
          loading={isFetching}
          pagination={false}
        />
      </div>
    </>
  );
}

export default Services;
