"use client";

import { useState } from "react";

import KF from "@/assets/media/KF.jpg";
import AUM from "@/assets/media/AUM.jpg";
import PT from "@/assets/media/PT.jpg";

function AboutPage() {
  const [title] = useState("Yorwor Market - เกี่ยวกับโครงงาน");

  return (
    <>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto px-10 my-8">
          <div>
            <div>
              <h1 className="text-4xl AnakotmaiBOLD tracking-tight sm:text-center sm:text-5xl">
                โครงงาน ญ.ว. มาร์เก็ต
              </h1>
              <p className="mt-6 text-lg leading-8sm:text-center dark:text-gray-200">
                Yorwor Market
                คือเว็บไซต์ซื้อขายสินค้าที่ออกแบบมาโดยเฉพาะสำหรับนักเรียนและบุคลากรโรงเรียนหาดใหญ่วิทยาลัย
                เรามุ่งเน้นการสร้างแพลตฟอร์มที่ใช้งานง่าย ปลอดภัย และสะดวกสบาย
                เพื่อสนับสนุนการซื้อขายภายในชุมชนโรงเรียน
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-4 px-10">
        <div>
          <h2 className="text-3xl inline-block AnakotmaiBOLD">
            จุดเริ่มต้นของเรา
          </h2>
        </div>
        <div>
          <p className="mt-2 text-lg leading-8">
            Yorwor Market เกิดจากปัญหาที่พบในกลุ่มไลน์โอเพนแชท “Yorwor Market”
            ซึ่งเป็นช่องทางการซื้อขายสินค้าภายในโรงเรียน
            ทางทีมผู้จัดทำจึงตัดสินใจพัฒนารูปแบบใหม่ที่ใช้งานสะดวกขึ้น
            ด้วยการสร้างเว็บไซต์เฉพาะที่รวบรวมร้านค้าและสินค้าไว้ในที่เดียว
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 px-10">
        <div>
          <h2 className="text-3xl inline-block AnakotmaiBOLD">สมาชิกโครงงาน</h2>
          <p>Yorwor Market</p>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-md:justify-center mt-6">
          <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
            <div className="aspect-square col-span-2 min-h-[190px]">
              <img
                className="rounded-lg h-full w-full object-cover"
                alt="Profile"
                src={KF.src}
              />
            </div>

            <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
              <h4 className="text-sm AnakotmaiBOLD">นาย สิรภพ สุขชู</h4>
              <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
              <p className="mt-2 text-xs">ผู้พัฒนาเว็ปไชต์</p>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
            <div className="aspect-square col-span-2 min-h-[190px]">
              <img
                className="rounded-lg h-full w-full object-cover"
                alt="Profile"
                src={AUM.src}
              />
            </div>

            <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
              <h4 className="text-sm AnakotmaiBOLD">นาย ภูเบศ มานะจิตร์</h4>
              <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
              <p className="mt-2 text-xs">ผู้ประสานงานเอกสาร</p>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
            <div className="aspect-square col-span-2 min-h-[190px]">
              <img
                className="rounded-lg h-full w-full object-cover"
                alt="Profile"
                src={PT.src}
              />
            </div>

            <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
              <h4 className="text-sm AnakotmaiBOLD">นาย ธีร์ธวัช อรัญดร</h4>
              <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
              <p className="mt-2 text-xs">ผู้ประสานงานเอกสาร</p>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
            <div className="col-span-2 min-h-[190px]">
              <img
                className="rounded-lg"
                alt="Profile"
                src="https://lh3.googleusercontent.com/a-/ALV-UjWMr9Yd1To-C-HBYVYppoM_Su532mA2SFd2kWtJ1mdVebM0VfqRvw=s512-c"
              />
            </div>

            <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
              <h4 className="text-sm AnakotmaiBOLD">ครู อัญชลี สุทธิสว่าง</h4>
              <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
              <p className="mt-2 text-xs">ครูที่ปรึกษา</p>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center bg-gray-100 p-4 rounded-lg relative">
            <div className="col-span-2 min-h-[190px]">
              <img
                className="rounded-lg"
                alt="Profile"
                src="https://lh3.googleusercontent.com/a-/ALV-UjXyzgj6_V--gUsGL5qwdQGESGl2imfnJD4z3DGTsAmLEhjh-9KyMg=s512-c"
              />
            </div>

            <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
              <h4 className="text-sm AnakotmaiBOLD">ครู พิชญาภร หนูอุไร</h4>
              <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
              <p className="mt-2 text-xs">ครูที่ปรึกษา</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
