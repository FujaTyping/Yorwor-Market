// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsBagXFill } from "react-icons/bs";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card"

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";

export default function SearchPage() {
  const [title] = useState("Yorwor Market");
  const [goodsList, setGoodsList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [gSearch, setGSearch] = useState("");
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  function searchforItems(GGID) {
    if (GGID == "") {
      router.push("/");
    } else {
      setPageStatus("Loading");
      setGSearch(`${GGID}`);
      axios
        .put(`${marketConfig.apiServer}good/bulk/search`, {
          searchQuery: `${GGID}`,
        })
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
    const GQuery = searchParams.get("query");

    if (GQuery) {
      setQuery(GQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      searchforItems(query);
    }
  }, [query]);

  return (
    <>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-2xl md:text-3xl mb-2 AnakotmaiBOLD">ค้นหาสินค้า</h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mt-2 mx-10">
        <div>
          {pageStatus == "Loading" ? (
            <>
              <div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {[...Array(5)].map((_, index) => (
                  <Card key={index} className="w-[150px] md:w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg h-32">
                      <div className="h-24 rounded-lg bg-default-300" />
                    </Skeleton>
                    <div className="space-y-3">
                      <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                      </Skeleton>
                      <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                      </Skeleton>
                      <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                      </Skeleton>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <>
              {goodsList.length > 0 ? (
                <>
                  <section className="max-w-6xl mb-5">
                    <p className="w-full text-xl">
                      เจอสินค้าสำหรับ{" "}
                      <span className="AnakotmaiBOLD">{gSearch}</span> :{" "}
                      <span className="AnakotmaiBOLD">{goodsList.length}</span>{" "}
                      รายการ
                    </p>
                    <div>
                      <GoodsGrid goodsList={goodsList} />
                    </div>
                  </section>
                </>
              ) : (
                <div className="flex flex-col h-72 items-center justify-center mt-4 gap-3 flex-col">
                  <BsBagXFill className="h-8 w-8" />
                  <div className="gap-1">
                    <h1 className="text-xl text-center">
                      ไม่เจอสินค้าสำหรับการค้นหา :{" "}
                      <span className="AnakotmaiBOLD">{gSearch}</span>
                    </h1>
                    <p className="text-center">ลองค้นหาด้วยคำอื่นดูสิ</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
