"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@heroui/button";
import { IoIosArrowBack } from "react-icons/io";

function Notfound() {
  const router = useRouter();

  return (
    <>
      <div className="mx-10">
        <div className="flex items-center justify-center min-h-screen px-2">
          <div className="text-center">
            <h1 className="text-7xl md:text-9xl AnakotmaiBOLD">404</h1>
            <p className="text-xl md:text-2xl mt-4">อ๊ะ! ไม่พบหน้านี้</p>
            <p className="mt-2 mb-4">
              หน้าที่คุณกำลังค้นหาไม่มีอยู่หรือถูกย้ายแล้วไปที่อื่นแล้ว
            </p>
            <Button
              color="primary"
              startContent={<IoIosArrowBack />}
              onPress={() => {
                router.back();
              }}
            >
              กลับไปหน้าก่อนหน้านี้
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notfound;
