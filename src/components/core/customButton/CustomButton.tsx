"use client";

import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

type TButtonProps = {
  className?: string;
  type: "button" | "reset" | "submit" | undefined;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | undefined;
  radius?: "sm" | "md" | "lg" | "full" | "none";
  disabled?: boolean | undefined;
  loading?: boolean | undefined;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?:
    | "solid"
    | "faded"
    | "bordered"
    | "light"
    | "flat"
    | "ghost"
    | "shadow"
    | undefined;
};

const CustomButton = ({
  type,
  disabled,
  size,
  radius,
  children,
  variant,
  color,
  loading,
  className,
}: TButtonProps) => {
  return (
    <Button
      type={type}
      color={color ? color : "primary"}
      isDisabled={!!disabled}
      isLoading={!!loading}
      size={size ? size : "md"}
      variant={variant ? variant : "solid"}
      radius={radius ? radius : "none"}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
