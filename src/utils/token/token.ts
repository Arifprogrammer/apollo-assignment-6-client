"use server";
import { cookies } from "next/headers";

export const getToken = () => {
  return cookies().get("token");
};

export const setToken = (token: string) => {
  return cookies().set("token", token);
};
