// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";
import { LuPackageSearch } from "react-icons/lu";
import { BsBagXFill } from "react-icons/bs";

import marketConfig from "@/market-config.mjs";
import useLocalStorge from "@/lib/localstorage-db";

export default function Home() {
  const [title] = useState("Yorwor Market");
  const router = useRouter();
  const { FireUser } = useLocalStorge();
  const [goodsList, setGoodsList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [searchQ, setSearchQ] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!searchQ == "") { router.push(`/search?query=${searchQ}`); }
    }
  };

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
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <div className="text-center">
          <h1 className="text-3xl">Yorwor Market</h1>
          <h3>Hatyaiwittayalai School</h3>
        </div>
        <div>
          {pageStatus == "Loading" ? (
            <>
              <div className="flex items-center gap-4 mt-5">
                <Spinner color="default" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl">Loading product</h1>
                  <p>This may take a few second</p>
                </div>
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
                        onChange={(e) => setSearchQ(e.target.value)}
                        startContent={<LuPackageSearch />}
                        onKeyDown={handleKeyDown}
                      />
                      <div>
                        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
                          {goodsList.map((list, index) => (
                            <>
                              <Link href={`/product?id=${list.id}`}>
                                <article key={index} className="relative">
                                  <div className="aspect-square overflow-hidden rounded-lg">
                                    <img loading="lazy" className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg" src={list.photoURL} alt="Product" />
                                  </div>
                                  <div style={{ zIndex: 11 }} className="absolute top-0 m-1 rounded-full bg-white">
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
                  <div className="flex items-center flex-col md:flex-row md:gap-6 mt-5">
                    <BsBagXFill className="w-8 h-8" />
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl text-center mt-3">No products available at the moment</h1>
                      <p className="text-center">The api might down</p>
                    </div>
                  </div>
                )
              }
            </>
          )}
        </div>
      </div>
    </>
  );
}
