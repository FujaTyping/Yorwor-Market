// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { SiFusionauth } from "react-icons/si";
import { AiOutlineProduct } from "react-icons/ai";
import { TbMessageReport } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaShopLock } from "react-icons/fa6";

import LineOC from "@/assets/media/openchat.webp";
import BannerImg from "@/assets/media/o.webp";

export default function Home() {
  const [title] = useState("Yorwor Market");

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <section className="w-full flex py-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-5">
              <span className="rounded-full uppercase bg-blue-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                ยินดีต้อนรับเข้าสู่
              </span>
              <p className="mt-1 text-4xl AnakotmaiBOLD sm:tracking-tight lg:text-5xl">
                แพลตฟอร์มซื้อขายออนไลน์ของชาว{" "}
                <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent AnakotmaiBOLD">
                  ฟ้า-แดง
                </span>
              </p>
              <p className="mt-5 mx-auto text-xl">
                พื้นที่สำหรับนักเรียนและบุคลากรในโรงเรียน
                ซื้อขายสินค้าอย่างสะดวก ปลอดภัย เช่น ของใช้ส่วนตัว หนังสือเรียน
                อุปกรณ์การศึกษา
                เน้นสร้างรายได้เสริมนักเรียนและสนับสนุนความสัมพันธ์ในชุมชนโรงเรียนผ่านระบบที่น่าเชื่อถือ
              </p>
            </div>
            <div className="flex gap-3 flex-col sm:flex-row items-center justify-center mt-6">
              <Button
                as={Link}
                className="w-full sm:w-auto"
                color="primary"
                href="/goods"
                size="lg"
              >
                ดูสินค้าทั้งหมด
              </Button>
              <Button
                as={Link}
                className="w-full sm:w-auto"
                color="primary"
                href="/about"
                size="lg"
                variant="bordered"
              >
                เกี่ยวกับโครงงาน
              </Button>
            </div>
          </div>
        </section>
        <div className="relative mx-auto -mt-2">
          <div className="lg:max-w-4xl lg:mx-auto">
            <img
              alt="Banner"
              className="rounded-lg md:mpx-8"
              height={630}
              src={BannerImg.src}
              width={1200}
            />
          </div>
        </div>
        <div className="mt-3" data-aos="fade-up">
          <div className="max-w-6xl mx-auto mt-2">
            <h2 className="sm:text-4xl text-2xl AnakotmaiBOLD text-center">
              ฟีเจอร์เด่นของ Yorwor Market
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 max-md:max-w-lg mx-auto mt-5">
              <div className="rounded-xl group p-8 text-center hover:bg-blue-500 hover:text-white hover:shadow-xl transition duration-300 border">
                <SiFusionauth className="w-10 h-10 mb-6 inline-block" />
                <h3 className="text-xl AnakotmaiBOLD mb-3">ระบบยืนยันตัวตน</h3>
                <p className="text-sm">
                  ระบบยืนยันตัวตนเฉพาะสำหรับบุคลากรและนักเรียนในโรงเรียนหาดใหญ่วิทยาลัย
                  เพื่อความปลอดภัยและป้องกันการเข้าถึงจากบุคคลภายนอก
                </p>
              </div>

              <div className="rounded-xl group p-8 text-center hover:bg-blue-500 hover:text-white hover:shadow-xl transition duration-300 border">
                <AiOutlineProduct className="w-10 h-10 mb-6 inline-block" />
                <h3 className="text-xl AnakotmaiBOLD mb-3">
                  การจัดการสินค้าส่วนตัว
                </h3>
                <p className="text-sm">
                  ผู้ใช้งานสามารถเพิ่ม แก้ไข
                  และจัดการสินค้าในร้านค้าของตัวเองได้อย่างสะดวก
                  พร้อมแสดงรูปภาพและรายละเอียดที่ครบถ้วน
                </p>
              </div>

              <div className="rounded-xl group p-8 text-center hover:bg-blue-500 hover:text-white hover:shadow-xl transition duration-300 border">
                <TbMessageReport className="w-10 h-10 mb-6 inline-block" />
                <h3 className="text-xl AnakotmaiBOLD mb-3">รายงานปัญหา</h3>
                <p className="text-sm">
                  ระบบแจ้งปัญหาหรือรายงานพฤติกรรมที่ไม่เหมาะสม เช่น
                  สินค้าที่ไม่ตรงตามเงื่อนไข เพื่อให้ทีมงาน Yorwor Market
                  สามารถตรวจสอบและดำเนินการได้อย่างรวดเร็ว
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-3 mb-7" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div>
              <h2 className="sm:text-4xl text-2xl AnakotmaiBOLD text-center">
                ทำไมต้องเลือก Yorwor Market ?
              </h2>
              <p className="max-w-3xl mx-auto mt-2 text-xl text-center">
                เพราะเรามอบประสบการณ์การซื้อขายที่ปลอดภัยและสะดวกกว่าการใช้ Line
                OpenChat
              </p>
            </div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center mt-6">
              <div>
                <div className="mt-4 space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center rounded-md">
                        <FaSearch className="w-6 h-6 mt-1" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg AnakotmaiBOLD">
                        ค้นหาสินค้าที่รวดเร็วและแม่นยำ
                      </h4>
                      <p className="mt-2 ">
                        Line OpenChat : ต้องเลื่อนย้อนดูข้อความเก่าในแชท
                        ทำให้เสียเวลาและพลาดสินค้าสำคัญ
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center rounded-md">
                        <FaSortAmountDown className="w-6 h-6 mt-1" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg AnakotmaiBOLD">
                        การจัดหมวดหมู่สินค้า
                      </h4>
                      <p className="mt-2 ">
                        Line OpenChat : ไม่มีการจัดหมวดหมู่
                        ต้องเลื่อนดูข้อความในแชทที่กระจัดกระจาย
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center rounded-md">
                        <FaShopLock className="w-6 h-6 mt-1" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg AnakotmaiBOLD">
                        การออกแบบเพื่อความสะดวกและปลอดภัย
                      </h4>
                      <p className="mt-2 ">
                        Yorwor Market
                        ออกแบบมาโดยเฉพาะสำหรับบุคลากรในโรงเรียนหาดใหญ่วิทยาลัย
                        ทำให้ใช้งานสะดวกและปลอดภัยยิ่งขึ้น ต่างจาก Line OpenChat
                        ซึ่งเป็นแอปพลิเคชันทั่วไปที่ไม่ได้เน้นการใช้งานเฉพาะกลุ่ม
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <img
                  alt="Line OpenChat"
                  className="mx-auto rounded-lg shadow-lg"
                  height={720}
                  src={LineOC.src}
                  width={1080}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
