// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

import useLocalStorge from "@/lib/localstorage-db";
import marketConfig from "@/market-config.mjs";
import firebaseConfig from "@/lib/firebase-config";

export default function UserPage() {
  const [title] = useState("Yorwor Market");
  const router = useRouter();
  const { FireUser } = useLocalStorge();
  const app = initializeApp(firebaseConfig);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (FireUser?.uid) {
      axios
        .put(`${marketConfig.apiServer}user`, { uID: `${FireUser.email}` })
        .then((response) => {
          setUserDetails(response.data.User);
        })
        .catch(() => {
          setUserDetails([]);
        });
    }
  }, [FireUser]);

  return (
    <>
      <title>{`${title} - ${FireUser.email}`}</title>
      <ToastContainer
        closeOnClick
        newestOnTop
        hideProgressBar={false}
        position="bottom-right"
      />
      <div className="flex flex-col items-center justify-center gap-5 m-10">
        <div className="text-center">
          <h1 className="text-3xl">Yorwor Market</h1>
          <h3>Hatyaiwittayalai School</h3>
        </div>
        {FireUser.uid ? (
          <>
            <User
              avatarProps={{
                src: FireUser.photoURL,
                size: "lg",
              }}
              description={FireUser.email}
              name={FireUser.displayName}
            />
            <div className="flex flex-row gap-5">
              <Button
                color="danger"
                startContent={<FcGoogle />}
                variant="bordered"
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
              >
                Logout
              </Button>
              <Link href={`/`}>
                <Button
                  style={{ backgroundColor: "white" }}
                  variant="bordered"
                >
                  Back to home
                </Button>
              </Link>
            </div>
            <div className="overflow-hidden">
              <h1 className="mt-5 text-left pb-3">Your product</h1>
              <table className="w-full text-sm leading-5 border border-gray-300 shadow-sm rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">{"<:id>"}</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails.goods?.map((list, index) => (
                    <>
                      <tr key={index} className="bg-gray-50">
                        <td className="py-3 px-4 text-left font-medium text-gray-600">ID</td>
                        <td className="py-3 px-4 text-left">{list}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          "No auth found"
        )}
      </div>
    </>
  );
}
