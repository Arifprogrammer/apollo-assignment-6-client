"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/nextUIComponents/theme-switch";
import { title } from "../nextUIComponents/primitives";
import { useUser } from "@/src/app/context/user.provider";
import { logout } from "@/src/utils/auth/auth";
import Link from "next/link";

export const Navbar = () => {
  //* react hooks
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Laptop & desktop Version */}

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className={title({ color: "blue", size: "sm" })}>Root Riot</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 ml-2">
          {siteConfig.navItems.map((item) => {
            return (
              !item.label.includes("Sign") && (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              )
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <ul className="hidden lg:flex gap-4 ml-2 items-center">
          {!user ? (
            siteConfig.navItems.map((item) => {
              return (
                item.label.includes("Sign") && (
                  <NavbarItem key={item.href}>
                    <NextLink
                      className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-primary data-[active=true]:font-medium"
                      )}
                      color="foreground"
                      href={item.href}
                    >
                      {item.label}
                    </NextLink>
                  </NavbarItem>
                )
              );
            })
          ) : (
            <>
              <NavbarItem>
                <Link href={"/profile"}>
                  <img
                    src={user.profilePhoto}
                    className="size-10 rounded-full object-cover"
                    alt=""
                  />
                </Link>
              </NavbarItem>
              <NavbarItem onClick={handleLogout} key="logout">
                <p
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                >
                  Log out
                </p>
              </NavbarItem>
            </>
          )}
        </ul>
      </NavbarContent>

      {/* Mobile Version */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => {
            return user ? (
              !item.label.includes("Sign") && (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <NextLink color="foreground" href={item.href}>
                    {item.label}
                  </NextLink>
                </NavbarMenuItem>
              )
            ) : (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink color="foreground" href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            );
          })}
          {user && (
            <>
              <NavbarMenuItem onClick={handleLogout} key="logout">
                <p
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                >
                  Log out
                </p>
              </NavbarMenuItem>
              <NavbarMenuItem onClick={handleLogout} key="photo">
                <Link href={"/profile"}>
                  <img
                    src={user.profilePhoto}
                    className="size-10 rounded-full object-cover"
                    alt=""
                  />
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
