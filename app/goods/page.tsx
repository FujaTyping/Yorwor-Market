"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";

function GoodPage() {
  const [title] = useState("Yorwor Market - สินค้าทั้งหมด");
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
      <meta content={title} property="og:title" />
      <div>
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">
            สินค้าทั้งหมด
          </h1>
          <div className="flex">
            <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
            <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
          {pageStatus == "Loading" ? (
            <>
              <div>
                <ProductLoaders />
              </div>
            </>
          ) : (
            <>
              <section className="max-w-6xl pb-7 -mt-2">
                <h1 className="text-xl my-2">
                  สินค้าทั้งหมดของ{" "}
                  <span className="AnakotmaiBOLD">Yorwor Market</span>
                </h1>
                <div>
                  <GoodsGrid goodsList={goodsList} />
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default GoodPage;
