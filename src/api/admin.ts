import { get, post } from "aws-amplify/api";
import { fetchAuthSession } from "@aws-amplify/core";
import { ConsoleLogger } from "aws-amplify/utils";
import { deactivateCustomer, reactivateCustomer } from "./customer";

const logger = new ConsoleLogger("api/admin.ts");

export const disableUser = async (username: string) => {
  const apiName = "AdminQueries";
  const path = "/disableUser";
  const options = {
    body: {
      username,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  logger.info("Disabling user with username=", username);
  await deactivateCustomer(username);
  return post({ apiName, path, options });
};

export const enableUser = async (username: string) => {
  const apiName = "AdminQueries";
  const path = "/enableUser";
  const options = {
    body: {
      username,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  logger.info("Enabling user with username=", username);
  await reactivateCustomer(username);
  return post({ apiName, path, options });
};

export const listUsers = async ({ pageParam }: { pageParam?: any }) => {
  const apiName = "AdminQueries";
  const path = "/listUsers";
  const queryParams: { limit: string; token?: string } = { limit: "60" };
  if (pageParam) {
    queryParams["token"] = pageParam;
  }
  const options = {
    queryParams,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  const { body } = await get({ apiName, path, options }).response;
  return (await body.json()) as any;
};

export const getUser = async (username: string) => {
  const apiName = "AdminQueries";
  const path = `/getUser?username=${username}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  const { body } = await get({ apiName, path, options }).response;
  return await body.json();
};
