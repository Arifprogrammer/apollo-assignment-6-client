"use client";
import { store } from "@/src/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
