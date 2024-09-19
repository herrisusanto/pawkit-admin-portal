import { Button, Flex, Table, TableProps } from "antd";
import { Disclaimer } from "../../api/graphql/API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { graphqlClient } from "../../api/core";
import { listDisclaimers } from "../../api/graphql/queries";
import { fetchServiceById } from "../../api/service-booking";
import { useSetAtom } from "jotai";
import { disclaimerFormModalAtom } from "../DisclaimerFormModal/state";
import { EditOutlined } from "@ant-design/icons";

export const ServiceDisclaimers = () => {
  const { serviceId } = useParams();
  const { data: service } = useQuery({
    queryKey: ["services", serviceId],
    queryFn: () => fetchServiceById(serviceId as string),
    enabled: !!serviceId,
  });
  const { data: disclaimers } = useQuery({
    queryKey: ["disclaimers", serviceId],
    queryFn: () =>
      graphqlClient.graphql({
        query: listDisclaimers,
        variables: { filter: { serviceName: { eq: service?.name } } },
      }),
    select(data) {
      return data.data.listDisclaimers.items;
    },
    enabled: !!service,
  });
  const setDisclaimerFormModal = useSetAtom(disclaimerFormModalAtom);

  const openDisclaimerFormModal = (name?: string) => {
    setDisclaimerFormModal({
      open: true,
      serviceId: serviceId as string,
      name,
    });
  };

  const columns: TableProps<Disclaimer>["columns"] = [
    { title: "name", dataIndex: "name" },
    { title: "Header", dataIndex: "header" },
    { title: "Subheader", dataIndex: "subheader" },
    { title: "Text", dataIndex: "text" },
    {
      title: "Actions",
      render(_, record) {
        return (
          <Button
            icon={<EditOutlined />}
            onClick={() => openDisclaimerFormModal(record.name)}
          />
        );
      },
    },
  ];

  const createDisclaimerDisabled = (disclaimers?.length || 0) > 0;

  return (
    <Flex vertical gap={16}>
      <Flex justify="flex-end">
        <Button
          type="primary"
          disabled={createDisclaimerDisabled}
          onClick={() => openDisclaimerFormModal()}
        >
          Create Disclaimer
        </Button>
      </Flex>
      <Table columns={columns} dataSource={disclaimers} />
    </Flex>
  );
};

export default ServiceDisclaimers;
