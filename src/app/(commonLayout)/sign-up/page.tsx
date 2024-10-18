"use client";

import CustomForm from "@/src/components/core/customForm/CustomForm";
import CustomInput from "@/src/components/core/customInput/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { registrationSchema } from "@/src/schemas/auth.schema";
import CustomButton from "@/src/components/core/customButton/CustomButton";
import Link from "next/link";
import Swal from "sweetalert2";
import { ChangeEvent, useState } from "react";
import { useRegisterMutation } from "@/src/redux/features/auth/api";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  //* nextjs hooks
  const router = useRouter();

  //* react hooks
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  //* redux hooks
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("image", imageFile as File);
    try {
      const res = await register(formData).unwrap();

      if (res.success) {
        setDefaultValues({
          name: "",
          email: "",
          password: "",
        });
        setImageFile(null);

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

        router.push("/sign-in");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
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
        icon: "error",
        title: `${err.data?.errorMessages[0].message}`,
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="min-h-[calc(100vh-68px)] grid place-items-center">
        <div className="card w-80 md:w-[30rem] shrink-0 shadow-2xl p-4 md:p-6 border-2 border-[#54baf1]">
          <h1 className="mb-4 text-2xl">Sign Up</h1>
          <CustomForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(registrationSchema)}
          >
            <div className="flex gap-2 h-16">
              <label
                htmlFor="image"
                className={`flex justify-center border-2 border-dashed border-[#146a99] rounded-md cursor-pointer py-4 mb-2 ${
                  imageFile ? "basis-4/5" : "basis-full"
                } h-full`}
              >
                Upload Image
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="profile-photo-preview"
                  className="basis-[18%] size-auto object-contain"
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="mb-2 hidden"
              id="image"
              onChange={handleImageChange}
            />
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
            <CustomButton
              type="submit"
              radius="sm"
              className="mt-2"
              loading={isLoading}
            >
              Sign Up
            </CustomButton>
          </CustomForm>
          <p className="text-sm mt-2">
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
