import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api/admin";

export const useUsers = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
    select(data) {
      return data
        .filter((user: any) => user["UserStatus"] === "CONFIRMED")
        .map((user: any) => {
          const userAttributes = Array.from(user["Attributes"]).reduce(
            (prev: any, current: any) => ({
              ...prev,
              [current["Name"]]: current["Value"],
            }),
            {}
          );
          return userAttributes;
        });
    },
  });

  return users;
};
