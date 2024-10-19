"use client";

import CustomButton from "@/src/components/core/customButton/CustomButton";
import CustomForm from "@/src/components/core/customForm/CustomForm";
import CustomInput from "@/src/components/core/customInput/CustomInput";
import { useResetPasswordMutation } from "@/src/redux/features/auth/api";
import { resetPasswordSchema } from "@/src/schemas/auth.schema";
import { alert } from "@/src/utils/alert/alert";
import { setToken } from "@/src/utils/token/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ResetPasswordPage = () => {
  //* nextjs hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  //* react hooks
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    newPassword: "",
  });

  useEffect(() => {
    if (token) {
      // saving token in cookies
      const saveTokenAsync = async () => {
        await setToken(token);
      };

      saveTokenAsync();
    }
  }, [token]);

  //* redux hooks
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await resetPassword(data).unwrap();

      // saving token in cookies
      await setToken(res.token);

      if (res.success) {
        setDefaultValues({
          email: "",
          newPassword: "",
        });

        const Toast = alert();

        Toast.fire({
          icon: "success",
          title: `${res.message}`,
        });
      }

      router.push("/sign-in");

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
    <section className="min-h-[calc(100vh-68px)] grid place-items-center">
      <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl p-4 md:p-6 border-2 border-[#54baf1]">
        <h1 className="mb-4 text-2xl">Reset Password</h1>
        <CustomForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(resetPasswordSchema)}
        >
          <CustomInput
            type="email"
            name="email"
            label="Enter your account email"
            className="mb-2"
          />
          <CustomInput
            type="password"
            name="newPassword"
            label="New Password"
            className="mb-2"
          />
          <CustomButton
            type="submit"
            radius="sm"
            className="mt-2"
            loading={isLoading}
          >
            Reset
          </CustomButton>
        </CustomForm>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
