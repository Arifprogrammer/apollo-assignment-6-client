"use client";

import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const CustomInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input {...field} type={type} label={label} isDisabled={disabled} />
            {error && <small className="text-red-600">{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;
