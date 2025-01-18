import React from "react";
import { Spinner } from "@nextui-org/spinner";

function loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <div className="text-center">
          <h1 className="text-3xl AnakotmaiBOLD">Yorwor Market</h1>
          <h3>โรงเรียนหาดใหญ่วิทยาลัย</h3>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <Spinner color="default" />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl AnakotmaiBOLD">กำลังดึงข้อมูลการค้นหา</h1>
            <p>กรุณารอสักครู่ หากใช้เวลานานกรุณาเช็คคำค้นหาใหม่</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default loading;
