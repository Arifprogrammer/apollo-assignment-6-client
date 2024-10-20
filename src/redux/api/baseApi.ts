"use client";

import { alert } from "@/src/utils/alert/alert";
import { getToken } from "@/src/utils/token/token";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: async (headers) => {
    const token = await getToken();

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = (await baseQuery(args, api, extraOptions)) as any;

  if (result?.error?.status === 404) {
    const Toast = alert();

    Toast.fire({
      icon: "error",
      title: `${result?.error?.data?.message}`,
    });
  }

  if (result?.error?.status === 403) {
    const Toast = alert();

    Toast.fire({
      icon: "error",
      title: `${result?.error?.data?.message}`,
    });
  }

  if (result?.error?.status === 401) {
    // api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToken,
  tagTypes: [],
  endpoints: () => ({}),
});
