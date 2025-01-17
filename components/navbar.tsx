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
import { Tooltip } from "@nextui-org/tooltip";

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
          <p className="ml-2 AnakotmaiBOLD text-inherit">Yorwor Market</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
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
                  <Link href={"/user"}><Avatar className="cursor-pointer" src={FireUser.photoURL} /></Link>
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
