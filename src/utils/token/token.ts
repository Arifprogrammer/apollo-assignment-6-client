"use server";

import { cookies } from "next/headers";

export const getToken = () => {
  return cookies().get("token")?.value;
};

export const setToken = (token: string) => {
  cookies().set("token", token);
};
