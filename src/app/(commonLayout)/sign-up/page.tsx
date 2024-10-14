"use client";

import CustomForm from "@/src/components/core/customForm/CustomForm";
import CustomInput from "@/src/components/core/customInput/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "@/src/components/nextUIComponents/primitives";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { registrationSchema } from "@/src/schemas/auth.schema";

export default function SignUpPage() {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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
    <div>
      <h1 className={title()}>Sign Up</h1>
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(registrationSchema)}
      >
        <CustomInput type="text" name="name" label="Name" />
      </CustomForm>
    </div>
  );
}
