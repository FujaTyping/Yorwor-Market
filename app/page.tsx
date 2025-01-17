// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { BsBagXFill } from "react-icons/bs";
import GoodsGrid from "@/components/productGrid";

import marketConfig from "@/market-config.mjs";

export default function Home() {
  const [title] = useState("Yorwor Market");
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
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <div className="text-center">
          <h1 className="text-3xl AnakotmaiBOLD">Yorwor Market</h1>
          <h3>โรงเรียนหาดใหญ่วิทยาลัย</h3>
        </div>
        <div>
          {pageStatus == "Loading" ? (
            <>
              <div className="flex items-center gap-4 mt-5">
                <Spinner color="default" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl AnakotmaiBOLD">กำลังโหลดสินค้า</h1>
                  <p>อาจจะใช้เวลาสัก 1-2 นาที</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {
                goodsList.length > 0 ? (
                  <>
                    <section className="max-w-6xl">
                      <h1 className="text-xl my-2">สินค้าทั้งหมดของ <span className="AnakotmaiBOLD">Yorwor Market</span></h1>
                      <div>
                        <GoodsGrid goodsList={goodsList} />
                      </div>
                    </section>
                  </>
                ) : (
                  <div className="flex items-center flex-col md:flex-row md:gap-6 mt-5">
                    <BsBagXFill className="w-8 h-8" />
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl text-center mt-3 AnakotmaiBOLD">ยังไม่มีสินค้า ณ ตอนนี้</h1>
                      <p className="text-center">ลองเป็นคนแรกที่ลงขายของดูสิ !</p>
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
