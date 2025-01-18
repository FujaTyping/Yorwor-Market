// @ts-nocheck
"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { Avatar } from "@nextui-org/avatar";
import { LuPackageSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";

import { signInWithGoogle } from "../lib/firebase-auth";

import YorworLogo from "@/app/favicon.ico";
import useLocalStorge from "@/lib/localstorage-db";

export const NavbarNX = () => {
  const { FireUser } = useLocalStorge();
  const [searchQ, setSearchQ] = useState("");
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!searchQ == "") {
        router.push(`/search?query=${searchQ}`);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <ToastContainer
        closeOnClick
        newestOnTop
        hideProgressBar={false}
        position="bottom-right"
      />
      <Navbar shouldHideOnScroll maxWidth="full">
        <NavbarBrand as={Link} className="cursor-pointer" href={"/"}>
          <img alt="Logo" src={YorworLogo.src} />
          <p className="ml-2 AnakotmaiBOLD text-inherit">Yorwor Market</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/about">
              เกี่ยวกับโครงงาน
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              ติดต่อ
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Input
              className="w-full"
              labelPlacement="outside-left"
              placeholder="ค้นหาสินค้า"
              startContent={<LuPackageSearch />}
              type="text"
              variant="bordered"
              onChange={(e) => setSearchQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </NavbarItem>
          <NavbarItem>
            {FireUser.uid ? (
              <>
                <Tooltip
                  content={
                    <div className="px-1 py-2">
                      <p className="AnakotmaiBOLD">เข้าสู่ระบบด้วย</p>
                      <p>{FireUser.email}</p>
                    </div>
                  }
                >
                  <Link href={"/user"}>
                    <Avatar
                      className="cursor-pointer"
                      src={FireUser.photoURL}
                    />
                  </Link>
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={() => {
                    const id = toast.loading("กำลังล็อกอิน ...");

                    signInWithGoogle()
                      .then(() => {
                        toast.update(id, {
                          render: `ล็อกอินสำเร็จ`,
                          type: "success",
                          isLoading: false,
                          autoClose: 3000,
                        });
                        setTimeout(() => {
                          window.location.reload();
                          router.push("/user");
                        }, 1500);
                      })
                      .catch((error) => {
                        toast.update(id, {
                          render: `ไม่สามารถล็อกอินได้ ${error.message}`,
                          closeOnClick: true,
                          type: "error",
                          isLoading: false,
                          autoClose: 10000,
                        });
                      });
                  }}
                >
                  เข้าสู่ระบบบ
                </Button>
              </>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
