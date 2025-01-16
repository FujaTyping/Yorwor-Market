"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import useLocalStorge from "@/lib/localstorage-db";
import { signInWithGoogle } from "../lib/firebase-auth";
import { ToastContainer, toast } from "react-toastify";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import YorworLogo from "@/app/favicon.ico";
import { IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from "@/lib/firebase-config";

export const NavbarNX = () => {
  const { FireUser } = useLocalStorge();
  const router = useRouter();
  const app = initializeApp(firebaseConfig);

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
                <Dropdown>
                  <DropdownTrigger>
                    <Avatar className="cursor-pointer" src={FireUser.photoURL} />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem as={Link} href="/user" startContent={<MdSpaceDashboard />} key="new">Dashboard</DropdownItem>
                    <DropdownItem startContent={<IoLogOut />} key="report" className="text-danger" color="danger"
                      onPress={() => {
                        const id = toast.loading("Loging out...");
                        const auth = getAuth(app);

                        signOut(auth)
                          .then(() => {
                            toast.update(id, {
                              render: `Logout success`,
                              type: "success",
                              isLoading: false,
                              autoClose: 3000,
                            });
                            setTimeout(() => {
                              router.push("/");
                              window.location.reload();
                            }, 1500);
                          })
                          .catch((error) => {
                            toast.update(id, {
                              render: `Logout failed ${error.message}`,
                              closeOnClick: true,
                              type: "error",
                              isLoading: false,
                              autoClose: 10000,
                            });
                          });
                      }}
                    >Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
