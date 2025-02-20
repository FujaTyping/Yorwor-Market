// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import NoG from "@/assets/media/icon/Animated/NoGoods.gif";
import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";

export default function CategoryPage() {
  const [title, setTitle] = useState("Yorwor Market");
  const [duckList, setDuckList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [typeQ, setTypeQ] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const GType = queryParams.get("type");

    setTypeQ(GType);
    setTitle(`Yorwor Market - ${GType}`);
    axios
      .put(`${marketConfig.apiServer}category/bulk`, { categoryQuery: GType })
      .then((response) => {
        if (response.data.error) {
          setPageStatus("Error");
          setDuckList([]);
        } else {
          setPageStatus("Finish");
          setDuckList(response.data.Goods);
        }
      })
      .catch(() => {
        setPageStatus("Error");
        setDuckList([]);
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">
          ประเภทสินค้า
        </h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
          <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5  mx-10">
        <div className="flex flex-col justify-center">
          {pageStatus == "Loading" ? (
            <>
              <ProductLoaders />
            </>
          ) : (
            <>
              {duckList.length > 0 ? (
                <>
                  <section className="max-w-6xl mb-2">
                    <div>
                      <h1 className="text-xl my-2">
                        สินค้าประเภท{" "}
                        <span className="AnakotmaiBOLD">{typeQ}</span> : ทั้งหมด{" "}
                        <span className="AnakotmaiBOLD">{duckList.length}</span>{" "}
                        รายการ
                      </h1>
                      <GoodsGrid goodsList={duckList} />
                    </div>
                  </section>
                </>
              ) : (
                <div className="flex items-center justify-center flex-col h-72 my-3 gap-3 flex-col">
                  <img alt="AnimatedIcon" className="w-24 h-24" src={NoG.src} />
                  <div className="gap-1">
                    <h1 className="text-xl text-center">
                      สินค้าประเภท{" "}
                      <span className="AnakotmaiBOLD">{typeQ}</span> ยังไม่มีเลย
                    </h1>
                    <p className="text-center">
                      คุณอาจจะเป็นคนแรกที่ลงขายสินค้าประเภทนี้ ก็ได้
                    </p>
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
