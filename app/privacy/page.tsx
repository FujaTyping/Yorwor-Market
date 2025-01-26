"use client";

import { useState } from "react";
import React from "react";

function PrivacyPage() {
  const [title] = useState("Yorwor Market - นโยบายความเป็นส่วนตัว");

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
                    นโยบายความเป็นส่วนตัว
                  </h1>
                  <div className="flex">
                    <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
                    <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  Yorwor Market
                  ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งานทุกท่าน
                  โดยนโยบายนี้มีวัตถุประสงค์เพื่ออธิบายถึงวิธีที่เราจัดเก็บ
                  ใช้งาน และปกป้องข้อมูลส่วนบุคคลของคุณ
                  กรุณาอ่านนโยบายนี้อย่างละเอียด หากคุณใช้งานเว็บไซต์ Yorwor
                  Market ถือว่าคุณยอมรับข้อกำหนดทั้งหมดในนโยบายนี้
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
              1. ข้อมูลที่เราเก็บรวบรวม
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              Yorwor Market
              จะเก็บข้อมูลส่วนบุคคลของผู้ใช้งานเท่าที่จำเป็นสำหรับการให้บริการเท่านั้น
              ได้แก่
              <br />
              <span className="text-2xl">•</span> ชื่อ :
              สำหรับการแสดงตัวตนของผู้ใช้งาน
              <br />
              <span className="text-2xl">•</span> อีเมล : สำหรับการลงทะเบียน
              การติดต่อ และการกู้คืนบัญชี
              <br />
              <span className="text-2xl">•</span> รูปโปรไฟล์ :
              สำหรับสร้างประสบการณ์การใช้งานที่เป็นมิตรและระบุตัวตนของผู้ใช้งานในระบบ
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
              2. วัตถุประสงค์ในการใช้ข้อมูล
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              ข้อมูลที่เก็บรวบรวมจะถูกใช้ในวัตถุประสงค์ต่อไปนี้
              <br />
              <span className="text-2xl">•</span>{" "}
              เพื่อระบุตัวตนของผู้ใช้งานและรักษาความปลอดภัยของบัญชี
              <br />
              <span className="text-2xl">•</span>{" "}
              เพื่อสนับสนุนการติดต่อและการให้บริการ
              <br />
              <span className="text-2xl">•</span>{" "}
              เพื่อสร้างประสบการณ์การใช้งานที่สะดวกสบายและเป็นส่วนตัว
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
              3. การเปิดเผยข้อมูลส่วนบุคคล
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              Yorwor Market ให้ความสำคัญกับการปกป้องข้อมูลของคุณ
              โดยข้อมูลส่วนบุคคลจะไม่ถูกขายหรือเปิดเผยแก่บุคคลที่สาม
              ยกเว้นในกรณีดังต่อไปนี้
              <br />
              <span className="text-2xl">•</span> ได้รับความยินยอมจากผู้ใช้งาน
              <br />
              <span className="text-2xl">•</span>{" "}
              ปฏิบัติตามข้อกำหนดทางกฎหมายหรือคำสั่งศาล
              <br />
              <span className="text-2xl">•</span>{" "}
              เพื่อรักษาความปลอดภัยและป้องกันการกระทำที่ผิดกฎหมาย
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
              4. การปกป้องข้อมูล
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              เราใช้มาตรการที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณ
              <br />
              <span className="text-2xl">•</span>{" "}
              การจัดการสิทธิ์การเข้าถึงข้อมูลเฉพาะบุคคลที่เกี่ยวข้อง
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
              5. สิทธิของผู้ใช้งาน
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              คุณมีสิทธิ์ในการจัดการข้อมูลส่วนบุคคลของคุณ ดังนี้
              <br />
              <span className="text-2xl">•</span>{" "}
              ขอเข้าถึงและตรวจสอบข้อมูลส่วนบุคคลของคุณ
              <br />
              <span className="text-2xl">•</span>{" "}
              ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่ครบถ้วน
              <br />
              <span className="text-2xl">•</span> ขอให้ลบข้อมูลส่วนบุคคล
              หากไม่มีความจำเป็นในการเก็บรักษา
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
              6. การยอมรับข้อตกลงและเงื่อนไข
            </h2>
          </div>
          <div>
            <p className="mt-2 text-lg leading-8">
              Yorwor Market
              ขอสงวนสิทธิ์ในการเปลี่ยนแปลงหรือปรับปรุงนโยบายความเป็นส่วนตัวนี้ได้ตลอดเวลา
              โดยไม่มีการแจ้งให้ทราบล่วงหน้า การเปลี่ยนแปลงใด ๆ
              จะถูกอัปเดตในหน้านี้ และมีผลบังคับใช้ทันทีที่เผยแพร่
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 px-10">
          <div>
            <h2 className="text-2xl inline-block AnakotmaiBOLD">
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
              การใช้งานเว็บไซต์ Yorwor Market ถือว่าคุณได้อ่าน ทำความเข้าใจ
              และยอมรับเงื่อนไขทั้งหมดในนโยบายนี้แล้ว
              รวมถึงการเปลี่ยนแปลงที่อาจเกิดขึ้นในอนาคต{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPage;
