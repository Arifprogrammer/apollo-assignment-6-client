"use client";

import CustomForm from "@/src/components/core/customForm/CustomForm";
import CustomInput from "@/src/components/core/customInput/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { registrationSchema } from "@/src/schemas/auth.schema";
import CustomButton from "@/src/components/core/customButton/CustomButton";
import Link from "next/link";

export default function SignUpPage() {
  const defaultValues = {
    name: "",
    /* email: "",
    password: "",
    phone: "",
    address: "", */
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data);
      /* const res = await register(data).unwrap();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `${res.message}`,
      });

      navigate("/login"); */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      /*  const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `${err.data.errorMessages[0].message}`,
      }); */
    }
  };

  return (
    <>
      <section className="min-h-[calc(100vh-68px)] grid place-items-center">
        <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl p-4 md:p-6 border-2 border-[#54baf1]">
          <h1 className="mb-4">Sign Up</h1>
          <CustomForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(registrationSchema)}
          >
            <CustomInput
              type="text"
              name="name"
              label="Name"
              className="mb-2"
            />
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
            <CustomButton type="submit" radius="sm" className="mt-2">
              Sign Up
            </CustomButton>
          </CustomForm>
          <p className="text-sm mt-px">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="cursor-pointer text-[#54baf1] mt-px">Login</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
