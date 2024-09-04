import { useQuery } from "@tanstack/react-query";
import {
  listUsers,
  searchUsersByName,
  searchUsersByPhoneNumber,
} from "../api/admin";

export const useUsers = (name?: string) => {
  const select = (data: any) => {
    const users = data["Users"];
    return users
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
  };

  const { data: usersSearch, isFetching: usersSearchPending } = useQuery({
    queryKey: ["users_search", name],
    queryFn: () => searchUsersByName(name as string),
    select,
    enabled: !!name,
  });
  const { data: users, isFetching: usersPending } = useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
    select,
  });

  console.log(usersSearch);

  return {
    isFetching: usersSearchPending || usersPending,
    data: name ? usersSearch : users,
  };
};

export const useSearchUsers = (query?: string) => {
  const isNumber = query?.[0] === "+";

  const select = (data: any) => {
    const users = data["Users"];
    return users
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
  };

  const { data: usersSearch, isFetching: usersSearchPending } = useQuery({
    queryKey: ["users_search", query],
    queryFn: () =>
      isNumber
        ? searchUsersByPhoneNumber(query as string)
        : searchUsersByName(query as string),
    select,
    enabled: !!query,
  });

  return {
    isFetching: usersSearchPending,
    data: query ? usersSearch : [],
  };
};
