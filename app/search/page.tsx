// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";
import { LuPackageSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

import marketConfig from "@/market-config.mjs";

export default function Home() {
  const [title] = useState("Yorwor Market");
  const [goodsList, setGoodsList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [gSearch, setGSearch] = useState("");
  const router = useRouter();
  const [searchQ, setSearchQ] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?query=${searchQ}`);
      window.location.reload();
    }
  };

  useEffect(() => {
    setPageStatus("Loading");
    const queryParams = new URLSearchParams(window.location.search);
    const GQuery = queryParams.get('query');
    setGSearch(`${GQuery}`);
    setSearchQ(`${GQuery}`);
    axios
      .put(`${marketConfig.apiServer}good/bulk/search`, { searchQuery: `${GQuery}` })
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
      <div className="flex flex-col items-center justify-center gap-5 m-10">
        <div className="text-center">
          <h1 className="text-3xl">Yorwor Market</h1>
          <h3>Hatyaiwittayalai School</h3>
        </div>
        <div className="flex flex-row gap-5">
          <Button
            startContent={<IoChevronBack />}
            style={{ backgroundColor: "white" }}
            variant="bordered"
          >
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        <div>
          {pageStatus == "Loading" ? (
            <>
              <div className="flex items-center gap-4 mt-5">
                <Spinner color="default" />
                <h1 className="text-xl">Searching for product</h1>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div>
                  <Input
                    labelPlacement="outside-left"
                    variant="bordered"
                    label="Search"
                    placeholder="eg. Cookie"
                    type="text"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    startContent={<LuPackageSearch />}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div>
                  <p className="w-full text-xl">Result for {gSearch} : {goodsList.length} items</p>
                </div>
              </div>
              {
                goodsList.length > 0 ? (
                  <>
                    <section className="max-w-6xl">
                      <div>
                        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
                          {goodsList.map((list, index) => (
                            <>
                              <Link href={`/product?id=${list.id}`}>
                                <article key={index} className="relative">
                                  <div className="aspect-square overflow-hidden rounded-lg">
                                    <img loading="lazy" className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg" src={list.photoURL} alt="Product" />
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
                  <h1 className="text-xl text-center mt-5">No products for : {gSearch}</h1>
                )
              }
            </>
          )}
        </div>
      </div>
    </>
  );
}
