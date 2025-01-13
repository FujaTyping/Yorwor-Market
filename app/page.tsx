// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

import { signInWithGoogle } from "../lib/firebase-auth";

import marketConfig from "@/market-config.mjs";
import useLocalStorge from "@/lib/localstorage-db";


export default function Home() {
  const [title] = useState("Yorwor Market");
  const router = useRouter();
  const { FireUser } = useLocalStorge();
  const [goodsList, setGoodsList] = useState([]);

  useEffect(() => {
    axios
      .get(`${marketConfig.apiServer}good`)
      .then((response) => {
        setGoodsList(response.data.Goods);
      })
      .catch(() => {
        setGoodsList([]);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
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
        <div className="flex flex-row gap-5">
          <Button
            startContent={<FcGoogle />}
            style={{ backgroundColor: "white" }}
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
            Google Login
          </Button>
          {FireUser.uid ? (
            <>
              <Link href={`/user?uid=${FireUser.uid}`}>
                <Button
                  startContent={<FaUser />}
                  style={{ backgroundColor: "white" }}
                  variant="bordered"
                >
                  User
                </Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          {
            goodsList.length > 0 ? (
              <section
                className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
                id="Projects"
              >
                {goodsList.map((list, index) => (
                  <div
                    key={index}
                    className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                  >
                    <Link href={`/product?id=${list.id}`}>
                      <img
                        alt="Product"
                        className="h-80 w-72 object-cover rounded-t-xl"
                        src={list.photoURL}
                      />
                      <div className="px-4 py-3 w-72">
                        <span className="text-gray-400 mr-3 uppercase text-xs">
                          Product
                        </span>
                        <p className="text-lg font-bold text-black truncate block capitalize">
                          {list.title}
                        </p>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-black cursor-auto my-3">
                            {list.price} Baht
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </section>
            ) : (
              <h1 className="text-xl text-center mt-3">No products available at the moment.</h1>
            )
          }
        </div>
      </div>
    </>
  );
}
