import {
  Button,
  Flex,
  Space,
  Table,
  TableProps,
  Tag,
  theme,
  Typography,
} from "antd";
import { listUsers } from "../../api/admin";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function Users() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {
    data: usersData,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: listUsers,
    getNextPageParam: (lastPage) => {
      return lastPage?.["NextToken"];
    },
    initialPageParam: null,
    select(data) {
      return data.pages.flatMap((page) => page["Users"]);
    },
  });

  const users = useMemo(() => {
    return usersData?.map(
      (user: {
        Attributes: { Name: string; Value: string }[];
        Enabled: boolean;
        UserStatus: string;
      }) => {
        return Array.from(user["Attributes"]).reduce((prev, curr) => {
          return {
            ...prev,
            [curr["Name"]]: curr["Value"],
            enabled: user["Enabled"],
            user_status: user["UserStatus"],
          };
        }, {});
      }
    );
  }, [usersData]);

  const columns: TableProps<any>["columns"] = [
    { title: "User ID", dataIndex: "sub", key: "sub" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render(value) {
        return value ? value : "n/a";
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render(value, record) {
        const isPhoneNumberVerified =
          record["phone_number_verified"] === "true";
        return (
          <Space>
            <Typography.Text>{value}</Typography.Text>
            <Tag color={isPhoneNumberVerified ? "green" : "red"}>
              {isPhoneNumberVerified ? "Verified" : "Unverified"}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render(value, record) {
        const isEmailVerified = record["email_verified"] === "true";
        return (
          <Space>
            <Typography.Text>{value ? value : "n/a"}</Typography.Text>
            {value && (
              <Tag color={isEmailVerified ? "green" : "red"}>
                {isEmailVerified ? "Verified" : "Unverified"}
              </Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      render(value) {
        return (
          <Tag color={value ? "green" : "red"}>
            {value ? "Enabled" : "Disabled"}
          </Tag>
        );
      },
    },
    {
      title: "User Status",
      dataIndex: "user_status",
      key: "user_status",
      render(value) {
        const isConfirmed = value === "CONFIRMED";
        return <Tag color={isConfirmed ? "green" : "red"}>{value}</Tag>;
      },
    },
  ];

  return (
    <div
      style={{
        margin: "16px 0",
        minHeight: 360,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Table
        virtual
        rowKey="sub"
        columns={columns}
        dataSource={users}
        loading={isPending}
        pagination={false}
        footer={() => (
          <Flex justify="center">
            <Space size={16}>
              {hasNextPage && (
                <Button
                  onClick={() => {
                    fetchNextPage();
                  }}
                >
                  Load more
                </Button>
              )}
            </Space>
          </Flex>
        )}
      />
    </div>
  );
}
