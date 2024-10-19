"use client";

import CustomButton from "@/src/components/core/customButton/CustomButton";
import CustomForm from "@/src/components/core/customForm/CustomForm";
import CustomInput from "@/src/components/core/customInput/CustomInput";
import { useForgotPasswordMutation } from "@/src/redux/features/auth/api";
import { forgotPasswordSchema } from "@/src/schemas/auth.schema";
import { alert } from "@/src/utils/alert/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ForgotPasswordPage = () => {
  //* react hooks
  const [defaultValues, setDefaultValues] = useState({
    email: "",
  });

  //* redux hooks
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();

      if (res.success) {
        setDefaultValues({
          email: "",
        });

        const Toast = alert();

        Toast.fire({
          icon: "success",
          title: `Sent reset password link to your email`,
        });
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
    <section className="min-h-[calc(100vh-68px)] grid place-items-center">
      <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl p-4 md:p-6 border-2 border-[#54baf1]">
        <h1 className="mb-4 text-2xl">Forgot Password</h1>
        <CustomForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(forgotPasswordSchema)}
        >
          <CustomInput
            type="email"
            name="email"
            label="Enter your account email"
            className="mb-2"
          />
          <CustomButton
            type="submit"
            radius="sm"
            className="mt-2"
            loading={isLoading}
          >
            Send
          </CustomButton>
        </CustomForm>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
