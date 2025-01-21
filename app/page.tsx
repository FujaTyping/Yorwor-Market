// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import Loaders from "@/components/loaders";

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
      <meta content={title} property="og:title" />
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <section className="w-full flex py-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-5">
              <span
                className="rounded-full uppercase bg-blue-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                ยินดีต้อนรับเข้าสู่
              </span>
              <p
                className="mt-1 text-4xl AnakotmaiBOLD sm:text-5xl sm:tracking-tight lg:text-6xl">
                แพลตฟอร์มซื้อขายออนไลน์ของชาว <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent AnakotmaiBOLD">ฟ้า-แดง</span>
              </p>
              <p className="mt-5 mx-auto text-xl">
                สถานที่ที่นักเรียนและบุคลากรในโรงเรียนสามารถซื้อขายสินค้าได้อย่างสะดวก รวดเร็ว และปลอดภัย ไม่ว่าจะเป็นของใช้ส่วนตัว หนังสือเรียน หรืออุปกรณ์การศึกษา เรามุ่งเน้นการสร้างรายได้เสริมให้นักเรียน พร้อมสนับสนุนความสัมพันธ์ในชุมชนโรงเรียนผ่านการแลกเปลี่ยนสินค้าในระบบที่เป็นระเบียบและน่าเชื่อถือ
              </p>
            </div>
          </div>
        </section>
        <div>
          {pageStatus == "Loading" ? (
            <>
              <Loaders />
            </>
          ) : (
            <>
              <section className="max-w-6xl pb-7">
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
