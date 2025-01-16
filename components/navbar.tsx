"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import useLocalStorge from "@/lib/localstorage-db";
import { signInWithGoogle } from "../lib/firebase-auth";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import YorworLogo from "@/app/favicon.ico";

export const NavbarNX = () => {
  const { FireUser } = useLocalStorge();
  const router = useRouter();

  return (
    <>
      <ToastContainer
        closeOnClick
        newestOnTop
        hideProgressBar={false}
        position="bottom-right"
      />
      <Navbar shouldHideOnScroll>
        <NavbarBrand className="cursor-pointer" as={Link} href={"/"}>
          <img src={YorworLogo.src} alt="Logo" />
          <p className="ml-2 font-bold text-inherit">Yorwor Market</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              About US
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contract
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {FireUser.uid ? (
              <>
                <Link href={"/user"}>
                  <Avatar className="cursor-pointer" src={FireUser.photoURL} />
                </Link>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={() => {
                    const id = toast.loading("Loging in...");

                    signInWithGoogle()
                      .then(() => {
                        toast.update(id, {
                          render: `Login success`,
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
                          render: `Login failed ${error.message}`,
                          closeOnClick: true,
                          type: "error",
                          isLoading: false,
                          autoClose: 10000,
                        });
                      });
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
