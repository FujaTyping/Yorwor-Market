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
import { BsBagXFill } from "react-icons/bs";

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
      searchforItems(searchQ);
    }
  };

  function searchforItems(GGID) {
    if (GGID == "") {
      router.push("/")
    } else {
      setPageStatus("Loading");
      setGSearch(`${GGID}`);
      setSearchQ(`${GGID}`);
      axios
        .put(`${marketConfig.apiServer}good/bulk/search`, { searchQuery: `${GGID}` })
        .then((response) => {
          setPageStatus("Finish");
          setGoodsList(response.data.Goods);
        })
        .catch(() => {
          setPageStatus("Error");
          setGoodsList([]);
        });
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const GQuery = queryParams.get('query');
    searchforItems(GQuery);
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
                  <h1 className="text-xl">Searching for product</h1>
                  <p>This may take a few second</p>
                </div>
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
                  <div className="flex items-center justify-center mt-8 gap-3 flex-col">
                    <BsBagXFill className="h-8 w-8" />
                    <div className="gap-1">
                      <h1 className="text-xl text-center">No products for : {gSearch}</h1>
                      <p className="text-center">Search with another query</p>
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
