"use client";

import CustomForm from "@/src/components/core/customForm/CustomForm";
import CustomInput from "@/src/components/core/customInput/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { loginSchema } from "@/src/schemas/auth.schema";
import CustomButton from "@/src/components/core/customButton/CustomButton";
import Link from "next/link";
import { useState } from "react";
import { useLoginMutation } from "@/src/redux/features/auth/api";
import { useRouter } from "next/navigation";
import { setToken } from "@/src/utils/token/token";
import { alert } from "@/src/utils/alert/alert";
import { useUser } from "../../context/user.provider";
import { getCurrentUser } from "@/src/utils/auth/auth";
import { IUser } from "@/src/types";

export default function SignInPage() {
  //* nextjs hooks
  const router = useRouter();

  //* react hooks
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useUser();

  //* redux hooks
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      // saving token in cookies
      setToken(res.token);

      const user = await getCurrentUser();

      setUser(user as IUser);

      if (res.success) {
        setDefaultValues({
          email: "",
          password: "",
        });

        const Toast = alert();

        Toast.fire({
          icon: "success",
          title: `${res.message}`,
        });

        router.push("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const Toast = alert();

      Toast.fire({
        icon: "error",
        title: `${err.data?.errorMessages[0].message}`,
      });
    }
  };

  return (
    <>
      <section className="min-h-[calc(100vh-68px)] grid place-items-center">
        <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl p-4 md:p-6 border-2 border-[#54baf1]">
          <h1 className="mb-4 text-2xl">Sign In</h1>
          <CustomForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(loginSchema)}
          >
            <CustomInput
              type="email"
              name="email"
              label="Email"
              className="mb-2"
            />
            <CustomInput
              type="password"
              name="password"
              label="Password"
              className="mb-2"
            />
            <CustomButton
              type="submit"
              radius="sm"
              className="mt-2"
              loading={isLoading}
            >
              Sign In
            </CustomButton>
          </CustomForm>
          <div className="flex items-center justify-between">
            <p className="text-sm mt-2">
              Do not have an account?{" "}
              <Link href="/sign-up">
                <span className="cursor-pointer text-[#54baf1] mt-px">
                  Sign up
                </span>
              </Link>
            </p>
            <Link href="/forget-password">
              <span className="cursor-pointer text-[#54baf1] mt-px text-sm">
                forgot password?
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
