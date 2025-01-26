"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";
import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";

import EduCar from "@/assets/media/icon/Edu.webp"
import FoodCar from "@/assets/media/icon/Food.webp"
import DrinkCar from "@/assets/media/icon/Drink.webp"
import FasionCar from "@/assets/media/icon/Fashion.webp"
import HandCar from "@/assets/media/icon/Hand.webp"
//import GoodCar from "@/assets/media/icon/Good.webp"
import DecoCar from "@/assets/media/icon/Decorate.webp"

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
              <div className="max-w-6xl w-full -mt-2">
                <h1 className="text-xl my-2 mb-3">
                  หมวดหมู่สินค้า
                </h1>
                <section className="bg-white w-full flex justify-center items-center">
                  <div className="max-w-6xl mx-auto w-full">
                    <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
                      <Link href={"/goods/category?type=อุปกรณ์การเรียน"} className="flex flex-col items-center justify-center gap-2">
                        <img src={EduCar.src} alt="Edu" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">อุปกรณ์การเรียน</p>
                      </Link>
                      <Link href={"/goods/category?type=อาหาร"} className="flex flex-col items-center justify-center gap-2">
                        <img src={FoodCar.src} alt="Food" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">อาหาร</p>
                      </Link>
                      <Link href={"/goods/category?type=เครื่องดื่ม"} className="flex flex-col items-center justify-center gap-2">
                        <img src={DrinkCar.src} alt="Drink" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">เครื่องดื่ม</p>
                      </Link>
                      <Link href={"/goods/category?type=สินค้าแฟชั่น"} className="flex flex-col items-center justify-center gap-2">
                        <img src={FasionCar.src} alt="Fashion" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">สินค้าแฟชั่น</p>
                      </Link>
                      <Link href={"/goods/category?type=ของตกแต่ง"} className="flex flex-col items-center justify-center gap-2">
                        <img src={DecoCar.src} alt="Deco" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">ของตกแต่ง</p>
                      </Link>
                      <Link href={"/goods/category?type=สินค้ามือ 2"} className="flex flex-col items-center justify-center gap-2">
                        <img src={HandCar.src} alt="Hand" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">สินค้ามือ 2</p>
                      </Link>
                      {/*
                      <Link href={"/goods/category?type=อื่นๆ"} className="flex flex-col items-center justify-center gap-2">
                        <img src={GoodCar.src} alt="Good" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">อื่นๆ</p>
                      </Link>
                      */}
                    </div>
                  </div>
                </section>
              </div>
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
