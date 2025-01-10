"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { signInWithGoogle } from "../lib/firebase-auth";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import useLocalStorge from "@/lib/localstorage-db";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [title] = useState("Yorwor Market");
  const { FireUser } = useLocalStorge();

  return (
    <>
      <title>{title}</title>
      <ToastContainer position="bottom-right" newestOnTop closeOnClick hideProgressBar={false} />
      <div className="h-screen flex flex-col items-center justify-center gap-5">
        <div className="text-center">
          <h1 className="text-3xl">Yorwor Market</h1>
          <h3>Hatyaiwittayalai School</h3>
        </div>
        <div className="flex flex-row gap-5">
          <Button style={{ backgroundColor: 'white' }} startContent={<FcGoogle />} variant="bordered"
            onPress={() => {
              const id = toast.loading("Loging in...")
              signInWithGoogle()
                .then(() => {
                  toast.update(id, { render: `Login success`, type: "success", isLoading: false, autoClose: 3000 });
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500);
                })
                .catch((error) => {
                  toast.update(id, { render: `Login failed ${error.message}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
                });
            }}
          >
            Google Login
          </Button>
          {FireUser.uid ? (
            <>
              <Link href={`/user/${FireUser.uid}`}>
                <Button style={{ backgroundColor: 'white' }} startContent={<FaUser />} variant="bordered">
                  User
                </Button>
              </Link>
            </>
          ) : (<></>)}
        </div>
      </div>
    </>
  );
}
