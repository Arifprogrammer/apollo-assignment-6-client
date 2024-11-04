"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/src/types";

export const getCurrentUser = () => {
  const accessToken = cookies().get("token")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = jwtDecode<Partial<IUser>>(accessToken);

    return {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      profilePhoto: decodedToken.profilePhoto,
    };
  }

  return decodedToken;
};

export const logout = () => {
  cookies().delete("token");
};
