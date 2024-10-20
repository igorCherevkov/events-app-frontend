import { AxiosResponse } from "axios";

import { $host } from "./";
import { User } from "../types";

export const fetchRegistration = async (
  email: string,
  password: string
): Promise<AxiosResponse<User & { token: string }>> => {
  return await $host.post("/auth/registration", {
    email,
    password,
  });
};

export const fetchLogin = async (
  email: string,
  password: string
): Promise<AxiosResponse<User & { token: string }>> => {
  return await $host.post("/auth/login", {
    email,
    password,
  });
};

export const fetchCheckAuth = async (): Promise<
  AxiosResponse<User & { token: string }>
> => {
  return await $host.get("/auth/profile");
};
