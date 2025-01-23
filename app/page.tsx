// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";
import { SiFusionauth } from "react-icons/si";
import { AiOutlineProduct } from "react-icons/ai";
import { TbMessageReport } from "react-icons/tb";

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
                className="mt-1 text-4xl AnakotmaiBOLD sm:tracking-tight lg:text-5xl">
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
              <ProductLoaders />
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
        <div>
          <div className="max-w-6xl mx-auto mb-5 mt-1">
            <h2 className="sm:text-4xl text-2xl AnakotmaiBOLD text-center">ฟีเจอร์เด่นของ Yorwor Market</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto mt-5">
              <div className="rounded-xl group p-8 text-center hover:bg-blue-500 hover:text-white hover:shadow-xl transition duration-300">
                <SiFusionauth className="w-10 h-10 mb-6 inline-block" />
                <h3 className="text-xl AnakotmaiBOLD mb-3">ระบบยืนยันตัวตน</h3>
                <p className="group-hover:text-white text-sm">ระบบยืนยันตัวตนเฉพาะสำหรับบุคลากรและนักเรียนในโรงเรียนหาดใหญ่วิทยาลัย เพื่อความปลอดภัยและป้องกันการเข้าถึงจากบุคคลภายนอก</p>
              </div>

              <div className="rounded-xl group p-8 text-center hover:bg-blue-500 hover:text-white hover:shadow-xl transition duration-300">
                <AiOutlineProduct className="w-10 h-10 mb-6 inline-block" />
                <h3 className="text-xl AnakotmaiBOLD mb-3">การจัดการสินค้าส่วนตัว</h3>
                <p className="group-hover:text-white text-sm">ผู้ใช้งานสามารถเพิ่ม แก้ไข และจัดการสินค้าในร้านค้าของตัวเองได้อย่างสะดวก พร้อมแสดงรูปภาพและรายละเอียดที่ครบถ้วน</p>
              </div>

              <div className="rounded-xl group p-8 text-center hover:bg-blue-500 hover:text-white hover:shadow-xl transition duration-300">
                <TbMessageReport className="w-10 h-10 mb-6 inline-block" />
                <h3 className="text-xl AnakotmaiBOLD mb-3">รายงานปัญหา</h3>
                <p className="group-hover:text-white text-sm">ระบบแจ้งปัญหาหรือรายงานพฤติกรรมที่ไม่เหมาะสม เช่น สินค้าที่ไม่ตรงตามเงื่อนไข เพื่อให้ทีมงาน Yorwor Market สามารถตรวจสอบและดำเนินการได้อย่างรวดเร็ว</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
