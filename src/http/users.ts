import { AxiosResponse } from "axios";

import { $host } from "./";
import { User } from "../types";

export const fetchDeleteUser = async (
  userId: number
): Promise<AxiosResponse<User>> => {
  return await $host.delete(`/users/${userId}`);
};
