"use client";

import { useState } from "react";
import React from "react";

function TermsPage() {
  const [title] = useState("Yorwor Market - ข้อตกลงและเงื่อนไขการใช้บริการ");

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
                    ข้อตกลงและเงื่อนไขการใช้บริการ
                  </h1>
                  <div className="flex">
                    <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
                    <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  เว็บไซต์ Yorwor Market
                  ได้จัดทำขึ้นเพื่อเป็นพื้นที่สำหรับการซื้อขายสินค้าและบริการภายในโรงเรียนหาดใหญ่วิทยาลัย
                  โดยการใช้บริการบนเว็บไซต์นี้ถือว่าคุณยอมรับข้อตกลงและเงื่อนไขต่อไปนี้อย่างสมบูรณ์
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              1. วัตถุประสงค์ของเว็บไซต์
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              Yorwor Market
              เป็นแพลตฟอร์มสำหรับบุคลากรและนักเรียนในโรงเรียนหาดใหญ่วิทยาลัย
              เพื่ออำนวยความสะดวกในการซื้อขายสินค้าและบริการระหว่างกัน
              โดยไม่อนุญาตให้บุคคลภายนอกเข้ามาใช้งาน
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              2. ความรับผิดชอบของผู้ใช้งาน
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              <span className="text-2xl">•</span>{" "}
              ผู้ใช้งานต้องไม่โพสต์หรือขายสินค้าต้องห้าม เช่น สารเสพติด อาวุธ
              หรือสินค้าที่ผิดกฎหมาย
              <br />
              <span className="text-2xl">•</span>{" "}
              ผู้ใช้งานต้องรับผิดชอบต่อสินค้าและข้อมูลที่ตนเองโพสต์
              <br />
              <span className="text-2xl">•</span> ห้ามกระทำการใด ๆ
              ที่เป็นการละเมิดสิทธิของผู้อื่น เช่น การหลอกลวงหรือใช้ข้อมูลปลอม
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              3. การจัดการเนื้อหาและการใช้งานเว็บไซต์
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              <span className="text-2xl">•</span>{" "}
              ทีมงานมีสิทธิ์ในการลบหรือแก้ไขเนื้อหาที่ไม่เหมาะสมหรือผิดกฎระเบียบ
              <br />
              <span className="text-2xl">•</span> Yorwor Market
              ไม่มีส่วนเกี่ยวข้องในข้อพิพาทระหว่างผู้ซื้อและผู้ขาย
              แต่เราพร้อมให้คำแนะนำและช่วยเหลือในกรณีที่จำเป็น
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              4. ความเป็นส่วนตัว
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              <span className="text-2xl">•</span>{" "}
              ข้อมูลส่วนตัวของผู้ใช้งานจะได้รับการคุ้มครองและเก็บรักษาอย่างปลอดภัย
              <br />
              <span className="text-2xl">•</span> Yorwor Market
              จะไม่นำข้อมูลส่วนตัวของผู้ใช้งานไปเผยแพร่หรือใช้งานโดยไม่ได้รับอนุญาต
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              5. การปรับปรุงข้อตกลงและเงื่อนไข
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              เราขอสงวนสิทธิ์ในการปรับปรุงข้อตกลงและเงื่อนไขได้ทุกเมื่อ
              โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              การเปลี่ยนแปลงจะมีผลทันทีเมื่อมีการเผยแพร่บนเว็บไซต์
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              6. การยอมรับข้อตกลงและเงื่อนไข
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              <span className="text-2xl">•</span> การเข้าถึงและใช้งานเว็บไซต์
              Yorwor Market
              ถือว่าผู้ใช้งานได้อ่านและยอมรับข้อตกลงและเงื่อนไขทั้งหมดนี้อย่างสมบูรณ์
              <br />
              <span className="text-2xl">•</span>{" "}
              หากผู้ใช้งานไม่เห็นด้วยกับข้อกำหนดใด ๆ
              กรุณาหยุดใช้งานเว็บไซต์ทันที
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-3xl inline-block AnakotmaiBOLD">
              7. การติดต่อทีมงาน Yorwor Market
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับการใช้บริการ
              สามารถติดต่อทีมงานได้ที่
              <br />
              อีเมล : yorwor@siraphop.me
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 px-10 mb-4">
          <div>
            <p className="mt-2 text-lg leading-8">
              โปรดอ่านและทำความเข้าใจข้อตกลงนี้ก่อนการใช้งาน
              หากคุณเริ่มใช้งานเว็บไซต์ Yorwor Market
              ถือว่าคุณยอมรับข้อตกลงและเงื่อนไขทั้งหมดที่ระบุไว้
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsPage;
