"use client";

import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";

type TInputProps = {
  type: string;
  className?: string;
  name: string;
  size?: "sm" | "md" | "lg" | undefined;
  label?: string;
  disabled?: boolean;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled,
  size,
  className,
}: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              type={type}
              size={size ? size : "sm"}
              label={label}
              variant={"underlined"}
              isDisabled={!!disabled}
              className={className}
            />
            {error && <small className="text-red-600">{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;
