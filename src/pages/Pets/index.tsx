import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Flex, Table, TableProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPetsByCustomer } from "../../api/pet";
import { Pet } from "../../api/graphql/API";
import { petDetailsAtom } from "../../views/PetDetails/state";
import { useSetAtom } from "jotai";
import { EyeOutlined } from "@ant-design/icons";

export const Pets = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: pets } = useQuery({
    queryKey: ["pets", userId],
    queryFn: () => fetchPetsByCustomer(userId as string),
  });
  const setPetDetails = useSetAtom(petDetailsAtom);

  const columns: TableProps<Pet>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Pet type",
      dataIndex: "petType",
    },
    {
      title: "Breed type",
      dataIndex: "breedName",
    },
    {
      title: "Weight",
      dataIndex: "weightValue",
      render(value, record) {
        return value ? `${value} ${record.weightUnit || "KG"}` : "-";
      },
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      render(value) {
        return value ? value : "-";
      },
    },
    {
      key: "x",
      title: "Actions",
      render(_, record) {
        return (
          <Flex>
            <Button
              onClick={() => {
                setPetDetails({ open: true, petId: record.id });
              }}
            >
              <EyeOutlined />
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <Flex vertical gap={16} className="py-4">
      <Breadcrumb
        items={[
          {
            title: "Users",
            className: "hover:cursor-pointer",
            onClick: () => {
              navigate("/users");
            },
          },
          {
            title: "Pets",
          },
        ]}
      />
      <Table columns={columns} dataSource={pets} />
    </Flex>
  );
};
