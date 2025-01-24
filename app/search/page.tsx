// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsBagXFill } from "react-icons/bs";
import ProductLoaders from "@/components/productLoaders";

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
        <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">ค้นหาสินค้า</h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mt-2 mx-10">
        <div>
          {pageStatus == "Loading" ? (
            <>
              <ProductLoaders />
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
