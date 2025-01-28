"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Tooltip } from "@heroui/tooltip";
import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";
import CategoryGrid from "@/components/categoryGrid";
import { MdInfoOutline } from "react-icons/md";

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
              {goodsList.length > 0 ? (
                <>
                  <div className="max-w-6xl w-full -mt-2 mb-1">
                    <h1 className="text-xl my-2 mb-3 flex items-center gap-2">
                      หมวดหมู่สินค้า
                      <Tooltip
                        content={
                          <div className="px-1 py-2">
                            <p className="AnakotmaiBOLD">เลื่อน ซ้าย-ขวา เพื่อดูหมวดหมู่ทั้งหมด</p>
                            <p>ไอคอนโดย : Flaticon {"(@justicon)"}</p>
                          </div>
                        }
                      >
                        <MdInfoOutline className="w-6 h-6 cursor-help" />
                      </Tooltip>
                    </h1>
                    <CategoryGrid />
                  </div>
                </>
              ) : (<></>)}
              <section className="max-w-6xl pb-7 -mt-2">
                <h1 className="text-xl my-2">
                  สินค้าทั้งหมดของ{" "}
                  <span className="AnakotmaiBOLD">Yorwor Market</span>
                </h1>
                <div className="-mt-1">
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
