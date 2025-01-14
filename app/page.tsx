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
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";
import { LuPackageSearch } from "react-icons/lu";

import { signInWithGoogle } from "../lib/firebase-auth";

import marketConfig from "@/market-config.mjs";
import useLocalStorge from "@/lib/localstorage-db";


export default function Home() {
  const [title] = useState("Yorwor Market");
  const router = useRouter();
  const { FireUser } = useLocalStorge();
  const [goodsList, setGoodsList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");

  useEffect(() => {
    setPageStatus("Loading");
    axios
      .get(`${marketConfig.apiServer}good`)
      .then((response) => {
        setPageStatus("Finish");
        setGoodsList(response.data.Goods);
      })
      .catch(() => {
        setPageStatus("Error");
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
              <Button
                startContent={<FaUser />}
                style={{ backgroundColor: "white" }}
                variant="bordered"
              >
                <Link href={`/user?uid=${FireUser.uid}`}>User</Link>
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          {pageStatus == "Loading" ? (
            <>
              <div className="flex items-center gap-4 mt-5">
                <Spinner color="default" />
                <h1 className="text-xl">Loading product</h1>
              </div>
            </>
          ) : (
            <>
              {
                goodsList.length > 0 ? (
                  <>

                    <section className="max-w-6xl">
                      <Input
                        className="w-full"
                        labelPlacement="outside-left"
                        variant="bordered"
                        label="Search"
                        placeholder="eg. Cookie"
                        type="text"
                        startContent={<LuPackageSearch />}
                      />
                      <div>
                        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
                          {goodsList.map((list, index) => (
                            <>
                              <Link href={`/product?id=${list.id}`}>
                                <article key={index} className="relative">
                                  <div className="aspect-square overflow-hidden rounded-lg">
                                    <img className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg" src={list.photoURL} alt="Product" />
                                  </div>
                                  <div className="absolute top-0 m-1 rounded-full bg-white">
                                    <p className="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">Sale</p>
                                  </div>
                                  <div className="mt-4 flex flex-col md:flex-row items-start justify-between">
                                    <div className="flex flex-col">
                                      <h3 className="font-bold leading-tight break-words">
                                        {list.title}
                                      </h3>
                                      <h1 className="leading-tight break-words">By : {list.author.displayName}</h1>
                                    </div>

                                    <div className="text-right mt-2 md:mt-0">
                                      <p>{list.price} ฿</p>
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </>
                          ))}
                        </div>
                      </div>
                    </section>
                  </>
                ) : (
                  <h1 className="text-xl text-center mt-3">No products available at the moment.</h1>
                )
              }
            </>
          )}
        </div>
      </div>
    </>
  );
}
