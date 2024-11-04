import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  id?: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
  favoritePosts: string[];
  password: string;
  profilePhoto: string;
  passwordChangedAt?: Date;
  role: "user" | "admin";
  isVerified: boolean;
  isDeleted: boolean;
}
