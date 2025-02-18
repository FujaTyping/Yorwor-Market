// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "./about.css";

import "aos/dist/aos.css";
import KF from "@/assets/media/KF.webp";
import AUM from "@/assets/media/AUM.webp";
import PT from "@/assets/media/PT.webp";
import Cover from "@/assets/media/Cover.webp"
import Draft from "@/assets/media/CoverDraft.webp"

function AboutPage() {
  const [title] = useState("Yorwor Market - เกี่ยวกับโครงงาน");

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <div className="pt-1 pb-5">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-6xl mx-auto px-10 my-8">
            <div>
              <div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-3xl md:text-4xl mb-3 AnakotmaiBOLD">
                    โครงงาน ญ.ว. มาร์เก็ต
                  </h1>
                  <div className="flex">
                    <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
                    <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  Yorwor Market
                  คือเว็บไซต์ซื้อขายสินค้าที่ออกแบบมาโดยเฉพาะสำหรับนักเรียนและบุคลากรโรงเรียนหาดใหญ่วิทยาลัย
                  เรามุ่งเน้นการสร้างแพลตฟอร์มที่ใช้งานง่าย ปลอดภัย และสะดวกสบาย
                  เพื่อสนับสนุนการซื้อขายภายในชุมชนโรงเรียน
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 px-10" data-aos="fade-up">
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
        <div className="max-w-6xl mx-auto mt-6 px-10 mb-6" data-aos="fade-up">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              สมาชิกโครงงาน
            </h2>
            <p>Yorwor Market</p>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-md:justify-center mt-6">
            <div className="grid grid-cols-3 items-center bg-blue-500 p-4 rounded-lg relative">
              <div className="aspect-square col-span-2 min-h-[190px]">
                <img
                  alt="Profile"
                  className="rounded-lg h-full w-full object-cover"
                  src={KF.src}
                />
              </div>

              <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                <h4 className="text-sm AnakotmaiBOLD">นาย สิรภพ สุขชู</h4>
                <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
                <p className="mt-2 text-xs">ผู้พัฒนาเว็ปไชต์</p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center bg-blue-500 p-4 rounded-lg relative">
              <div className="aspect-square col-span-2 min-h-[190px]">
                <img
                  alt="Profile"
                  className="rounded-lg h-full w-full object-cover"
                  src={AUM.src}
                />
              </div>

              <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                <h4 className="text-sm AnakotmaiBOLD">นาย ภูเบศ มานะจิตร์</h4>
                <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
                <p className="mt-2 text-xs">ผู้ประสานงานเอกสาร</p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center bg-blue-500 p-4 rounded-lg relative">
              <div className="aspect-square col-span-2 min-h-[190px]">
                <img
                  alt="Profile"
                  className="rounded-lg h-full w-full object-cover"
                  src={PT.src}
                />
              </div>

              <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                <h4 className="text-sm AnakotmaiBOLD">นาย ธีร์ธวัช อรัญดร</h4>
                <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
                <p className="mt-2 text-xs">ผู้ประสานงานเอกสาร</p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center bg-blue-500 p-4 rounded-lg relative">
              <div className="col-span-2 min-h-[190px]">
                <img
                  alt="Profile"
                  className="rounded-lg"
                  src="https://lh3.googleusercontent.com/a-/ALV-UjWMr9Yd1To-C-HBYVYppoM_Su532mA2SFd2kWtJ1mdVebM0VfqRvw=s512-c"
                />
              </div>

              <div className="bg-white rounded-lg p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                <h4 className="text-sm AnakotmaiBOLD">ครู อัญชลี สุทธิสว่าง</h4>
                <p className="text-[10px] mt-0.5">โรงเรียนหาดใหญ่วิทยาลัย</p>
                <p className="mt-2 text-xs">ครูที่ปรึกษา</p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center bg-blue-500 p-4 rounded-lg relative">
              <div className="col-span-2 min-h-[190px]">
                <img
                  alt="Profile"
                  className="rounded-lg"
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
        <div className="max-w-6xl mx-auto mt-10 px-10 mb-6" data-aos="fade-up">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              เทคโนโลยีที่ใช้
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              เราใช้เทคโนโลยีที่ทันสมัยและเหมาะสม
              เพื่อสร้างแพลตฟอร์มที่มีประสิทธิภาพ ใช้งานง่าย
              และปลอดภัยสำหรับผู้ใช้ทุกคน
            </p>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center justify-center mt-2 gap-5 md:gap-0 md:justify-around">
                <img
                  alt="React Logo"
                  className="h-20"
                  src="https://logos-world.net/wp-content/uploads/2023/08/React-Symbol-500x281.png"
                />
                <img
                  alt="NextJS Logo"
                  className="h-16"
                  src="https://devtop.io/wp-content/uploads/2022/11/Next-JS.png"
                />
                <img
                  alt="Elysia Logo"
                  className="h-14"
                  src="https://miro.medium.com/v2/resize:fit:800/1*mbTzC0Ovq8TVoKxnTGb3Rw.jpeg"
                />
                <img
                  alt="Firebase Logo"
                  className="h-14"
                  src="https://www.4xtreme.com/wp-content/uploads/2020/11/logo-standard.png"
                />
                <img
                  alt="PWA Logo"
                  className="h-8"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlnahGOk3k-sKkX6w39fyZa81dC0VHENpmLw&s"
                />
                <img
                  alt="HeroUI Logo"
                  className="h-14"
                  src="https://raw.githubusercontent.com/heroui-inc/heroui/main/apps/docs/public/isotipo.png"
                />
                <img
                  alt="Bun Logo"
                  className="h-16"
                  src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*qmXv0xChExVfkhbWVj9XLg.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 px-10" data-aos="fade-up">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              หลักการ {"(วิธีการ)"}
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              Yorwor Market <span className="AnakotmaiBOLD">MVP</span> คือการสร้างเว็บแพลตฟอร์มที่รวมฟีเจอร์สำคัญที่สุดสำหรับการซื้อขายสินค้าในโรงเรียน เป็นแพลตฟอร์มที่รวมฟีเจอร์สำคัญที่สุด เว็ปไม่จำเป็นต้องสวย เพราะถ้าฟีเจอร์ดี ยังไงก็มีคนใช้
            </p>
            <section className="mt-5 mb-5">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <div className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded-lg group hover:shadow-lg hover:border-blue-500 hover:ring-1 hover:ring-blue-500/20">
                    <div className="flex items-center p-6">
                      <div
                        className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-blue-50 group-hover:bg-blue-100">
                        <span className="text-4xl AnakotmaiBOLD">M</span>
                      </div>

                      <div className="flex-grow ml-6">
                        <h3
                          className="text-lg AnakotmaiBOLD transition-colors duration-200 line-clamp-1 group-hover:text-blue-600">
                          Minimum
                        </h3>
                        <div className="inline-flex items-center mt-1">
                          <span className="rounded">
                            ขั้นต่ำ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded-lg group hover:shadow-lg hover:border-blue-500 hover:ring-1 hover:ring-blue-500/20">
                    <div className="flex items-center p-6">
                      <div
                        className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-blue-50 group-hover:bg-blue-100">
                        <span className="text-4xl AnakotmaiBOLD">V</span>
                      </div>

                      <div className="flex-grow ml-6">
                        <h3
                          className="text-lg AnakotmaiBOLD transition-colors duration-200 line-clamp-1 group-hover:text-blue-600">
                          Viable
                        </h3>
                        <div className="inline-flex items-center mt-1">
                          <span className="rounded">
                            มีความสามารถ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="block h-full transition-all duration-200 bg-white border border-gray-200 rounded-lg group hover:shadow-lg hover:border-blue-500 hover:ring-1 hover:ring-blue-500/20">
                    <div className="flex items-center p-6">
                      <div
                        className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-blue-50 group-hover:bg-blue-100">
                        <span className="text-4xl AnakotmaiBOLD">P</span>
                      </div>

                      <div className="flex-grow ml-6">
                        <h3
                          className="text-lg AnakotmaiBOLD transition-colors duration-200 line-clamp-1 group-hover:text-blue-600">
                          Product
                        </h3>
                        <div className="inline-flex items-center mt-1">
                          <span className="rounded">
                            ผลิตภัณฑ์
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
            <div>
              <p className="mt-2 text-lg leading-8">
                เป้าหมาย MVP
                <br />
                <span className="text-2xl">•</span>{" "}
                ทดสอบว่าผู้ใช้งานสะดวกและพึงพอใจในระบบ
                <br />
                <span className="text-2xl">•</span>{" "}
                วัดความต้องการและการตอบรับจากกลุ่มเป้าหมาย
                <br />
                <span className="text-2xl">•</span>{" "}
                รับฟีดแบ็กเพื่อนำไปพัฒนาเวอร์ชันต่อไป
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-5 px-10 mb-10" data-aos="fade-up">
        <div>
          <h2 className="text-3xl inline-block AnakotmaiBOLD">
            เอกสาร
          </h2>
        </div>
        <div>
          <p className="mt-2 text-lg leading-8">
            รายงานผลการดำเนินโครงงาน
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-14 items-center mt-10 md:mt-8">
          <div>
            <a
              className="book-container"
              href="https://padlet.com/kru_an/2-67-4-5-creative-integration-project-sharing-notes-y95td5qkktywb9ku/wish/lkROZP5Jj8kXWjMg"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="book">
                <img
                  alt="Draft"
                  src={Draft.src}
                />
              </div>
            </a>
            <p className="text-center mt-5">โครงร่างโครงงาน</p>
          </div>
          <div>
            <a
              className="book-container"
              href="/media/รายงานโครงงาน.pdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="book">
                <img
                  alt="Cover"
                  src={Cover.src}
                />
              </div>
            </a>
            <p className="text-center mt-5">รายงานโครงงาน 5 บท</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
